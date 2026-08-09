import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set. Copy .env.example to .env first.");
}

// passport-local: verify email + password at login
passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return done(null, false, { message: "Invalid credentials" });
    }
    return done(null, user);
  })
);

// passport-jwt: verify the bearer token's signature on protected routes
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      const user = await prisma.user.findUnique({ where: { id: payload.sub } });
      return done(null, user ?? false);
    }
  )
);

const app = express();
app.use(cors()); // allow the browser client (a different origin) to read responses
app.use(express.json());
app.use(passport.initialize());

// Express 4 doesn't catch rejected promises from async handlers on its own,
// so an unhandled DB error would otherwise crash the whole server.
const asyncHandler = (fn) => (req, res, next) => fn(req, res, next).catch(next);

// POST /register  ->  hash the password, create the user
app.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, passwordHash } });
    res.status(201).json({ id: user.id, email: user.email });
  })
);

// POST /login  ->  passport-local verifies credentials, then sign a JWT
app.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
  const token = jwt.sign({ sub: req.user.id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// GET /me  ->  protected route, only reachable with a valid token
app.get("/me", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ id: req.user.id, email: req.user.email });
});

// Last resort: turn any thrown/rejected error into a 500 instead of crashing.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "internal server error" });
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
