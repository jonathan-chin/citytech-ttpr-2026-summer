# api

The Express + Prisma server for the Scattergories game. See the
[project README](../README.md) for setup, the API reference, and how to run it.

Written in TypeScript (Prisma 7). `yarn build` compiles `src/` to `dist/` with
`tsc`, and the app runs as plain compiled JavaScript on Node.

Quick start (after creating `.env` from `.env.example`):

```bash
yarn install
yarn generate   # generate the Prisma client into src/generated/prisma
yarn migrate
yarn build      # compile to dist/
yarn start      # run dist/server.js
```
