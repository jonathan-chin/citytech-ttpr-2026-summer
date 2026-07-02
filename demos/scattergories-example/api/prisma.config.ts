// Prisma 7 no longer auto-loads .env for CLI commands (migrate, generate,
// studio), so we load it ourselves with dotenv before reading DATABASE_URL.
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  // Prisma Migrate reads the connection URL from here now (it used to live in
  // schema.prisma). The running app gets the same URL via the adapter in
  // src/db.js.
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
