// Builds the Express app and wires up the routes.
// Kept separate from server.ts so the app is easy to import and test.

import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import gamesRouter from "./routes/games.js";
import answersRouter from "./routes/answers.js";

const app = express();

// Parse JSON request bodies into req.body.
app.use(express.json());

// A simple health check, handy for confirming the server is up.
app.get("/", (_req: Request, res: Response) => {
  res.json({ ok: true, service: "scattergories-api" });
});

app.use("/games", gamesRouter);
app.use("/answers", answersRouter);

// Anything that didn't match a route above is a 404.
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

// Central error handler. Routes call next(err) and end up here, so a bug
// becomes a clean 500 instead of crashing the server.
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

export default app;
