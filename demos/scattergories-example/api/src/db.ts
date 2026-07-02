// A single shared Prisma client for the whole app.
//
// Prisma 7 talks to the database through a *driver adapter* instead of a
// bundled engine. For PostgreSQL that's @prisma/adapter-pg, which holds the
// connection string. We load DATABASE_URL from .env via Node's --env-file flag
// (see the npm scripts), so it's already on process.env by the time this runs.

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Copy .env.example to .env and fill it in.",
  );
}

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ adapter });

export default prisma;
