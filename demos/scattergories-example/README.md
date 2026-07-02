# Scattergories

A multi-user party game built on **Express + Prisma 7 + PostgreSQL**, written in
**TypeScript**, compiled with `tsc` to `dist/`, and run on plain Node.

> ⚠️ **This project targets Prisma ORM 7.** Prisma 7 changed how the client is
> generated and how it connects, so several things look different from older
> Prisma setups:
>
> - the database is reached through a **driver adapter** (`@prisma/adapter-pg`),
>   not a bundled engine;
> - the **client is generated into the repo** (`api/src/generated/prisma/`) and
>   imported from there, not from `@prisma/client`;
> - the connection `url` is **not** in `schema.prisma` - it lives in
>   `api/prisma.config.ts`;
> - **`.env` is not auto-loaded** - the app and `prisma.config.ts` load it with
>   [`dotenv`](https://github.com/motdotla/dotenv).
>
> See [Prisma 7 notes](#prisma-7-notes) for details. Pin the versions in
> [`api/package.json`](api/package.json) if you want to reproduce this exactly.

Each game has a **letter** and a **topic**. Players race to submit an answer in
that topic that starts with the letter. The first player to claim an answer
keeps it; duplicates are rejected. The server is the referee: it decides what
counts as a valid, unique answer. No accounts, no auth - a username is just a
label.

> **About this repo.** This is an example/reference implementation of the
> Scattergories group project, not a submission. It was written by Claude
> (Anthropic's Claude Code) and reviewed and directed by Jon Chin. Treat it as a
> worked example to learn from while building your own version with your team -
> and write your own AI-use disclosure for whatever you submit.

## Layout

```text
scattergories/
├── api/        # Express + Prisma server (the game API)
├── data/       # database dump to import (schema + starter data)
└── README.md   # this file
```

## How it works

Two tables with a one-to-many relationship - a `Game` has many `Answer`s:

```text
Game ──< Answer
 room_code (UNIQUE)        game_id ─┐
 letter                    answer    │  (game_id, answer) is UNIQUE
 topic                     username  │
```

The database does the hard enforcement for us:

- `room_code` is **UNIQUE**, so two games can't share a code.
- `(game_id, answer)` is **UNIQUE**, so an answer can't be claimed twice in the
  same room.

When one of those constraints fails, Prisma throws a `P2002` error and Express
turns it into a clean `409` response.

### Prisma 7 notes

This project uses Prisma 7, which works a little differently from older
tutorials:

- **Driver adapter.** The client talks to PostgreSQL through
  [`@prisma/adapter-pg`](https://www.prisma.io/docs/orm/overview/databases/postgresql)
  instead of a bundled engine. We build it in [`api/src/db.ts`](api/src/db.ts)
  and pass it to `new PrismaClient({ adapter })`.
- **Generated client lives in the repo.** `yarn generate` writes a TypeScript
  client into `api/src/generated/prisma/` (git-ignored), and we import from
  there - not from `@prisma/client`.
- **Connection URL moved out of the schema.** `schema.prisma` only declares the
  provider; the `DATABASE_URL` lives in [`api/prisma.config.ts`](api/prisma.config.ts)
  (for Migrate) and in the adapter (for the running app).
- **`.env` is loaded explicitly.** Prisma 7 no longer auto-loads `.env`, so we
  load it with [`dotenv`](https://github.com/motdotla/dotenv): `import "dotenv/config"`
  at the top of [`api/src/server.ts`](api/src/server.ts) (before anything reads
  the database) and in [`api/prisma.config.ts`](api/prisma.config.ts) for the
  Migrate CLI.

## Setup

### 1. Import the database

Restore the dump from [`data/`](data/) with pgAdmin, or build the tables from
scratch with Prisma. See [`data/README.md`](data/README.md) for both paths.

### 2. Configure `.env`

```bash
cd api
cp .env.example .env
```

Edit `.env` so `DATABASE_URL` points at your Postgres database, for example:

```text
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/scattergories?schema=public"
```

### 3. Install and run the API

This repo uses **Yarn 4** (see the `packageManager` field) and **Node 18+**
(Node 20+ recommended). If `yarn` isn't on your machine, run `corepack enable`
once and it will use the right version.

```bash
cd api
yarn install
yarn generate    # generate the Prisma client into src/generated/prisma
yarn migrate     # create the tables (skip if you restored a dump that already has them)
yarn build       # compile TypeScript to dist/
yarn seed        # optional: a couple of example games (runs dist/seed.js)
yarn start       # start the server on http://localhost:3000 (runs dist/server.js)
```

The code is **TypeScript**: `yarn build` compiles `src/` to `dist/` with `tsc`,
and `yarn start` runs the compiled `dist/server.js` on plain Node. While
developing, run `yarn build:watch` in one terminal (recompiles on save) and
`node --watch dist/server.js` in another. `yarn typecheck` type-checks without
emitting.

> Order matters the first time: `yarn generate` must run before `yarn build`
> (the build compiles the generated client too), and `yarn build` before
> `yarn seed` / `yarn start` (they run the compiled JS in `dist/`).

## Expose it so classmates can play

The game is multi-user, so other people need to reach your API. Use **ngrok**
to get a temporary public URL that tunnels to your local server:

```bash
ngrok http 3000
```

Share the `https://...ngrok...` URL it prints. Players send their answers
there. Expose the **API**, never your database directly.

## API

### `POST /games`

Create a game. You send a room code; the server picks the letter and topic.

```text
POST /games   { "roomCode": "PLUM42" }
201           { "roomCode": "PLUM42", "letter": "B", "topic": "Animals" }

POST /games   { "roomCode": "PLUM42" }
409           { "error": "Room code already in use" }
```

### `GET /games`

List every game.

```text
GET /games
[
  { "roomCode": "PLUM42", "letter": "B", "topic": "Animals" },
  { "roomCode": "KIWI88", "letter": "S", "topic": "Foods" }
]
```

### `POST /answers`

Submit an answer to a game.

```text
POST /answers   { "roomCode": "PLUM42", "username": "sam", "answer": "Bear" }
201             { "accepted": true }

POST /answers   { "roomCode": "PLUM42", "username": "kai", "answer": "Bear" }
409             { "error": "Answer already taken" }

POST /answers   { "roomCode": "PLUM42", "username": "kai", "answer": "Cat" }
400             { "error": "Answer must start with B" }
```

The server rejects an answer that doesn't start with the game's letter (`400`),
one that was already claimed in that room (`409`), and one sent to a room code
that doesn't exist (`404`).

## Try it with Insomnia

Import [`insomnia_collection.json`](insomnia_collection.json) to get every
request ready to run: **Insomnia -> Import -> From File**, then pick that file.

It comes with a **Base Environment** holding two variables:

- `base_url` - set this to `http://localhost:3000`, or to your **ngrok** URL
  when classmates are playing. Every request uses `{{ _.base_url }}`, so you
  only change it in one place.
- `roomCode` - the room every request points at (defaults to `PLUM42`).

A good run-through:

1. **Games -> Create game** - the response tells you the random **letter**.
2. **Games -> Create game again** - same code, so `409`.
3. **Answers -> Submit answer** - edit the answer so it starts with the letter
   you got back, then send it (`201`).
4. **Answers -> Submit same answer** - `409`, already taken.
5. **Answers -> Wrong letter** - `400`.

> The server picks the letter at random, so the canned "Bear" / "Cat" answers
> only line up when the game's letter is **B**. Change the answer in the request
> body to match whatever letter Create game returned.

## Or with curl

```bash
curl -X POST localhost:3000/games \
  -H 'Content-Type: application/json' \
  -d '{"roomCode":"PLUM42"}'

curl localhost:3000/games

curl -X POST localhost:3000/answers \
  -H 'Content-Type: application/json' \
  -d '{"roomCode":"PLUM42","username":"sam","answer":"Bear"}'
```

## AI-use disclosure

_Fill this in for your submission: say where and how your team used AI (which
tool, for what - scaffolding, debugging, writing docs, etc.)._

## Third-party packages

- [`express`](https://expressjs.com/) - HTTP server and routing.
- [`prisma`](https://www.prisma.io/) / `@prisma/client` - database schema,
  migrations, and queries against PostgreSQL.
- [`@prisma/adapter-pg`](https://www.prisma.io/docs/orm/overview/databases/postgresql) -
  the PostgreSQL driver adapter Prisma 7 uses to connect (bundles `pg`).
- [`dotenv`](https://github.com/motdotla/dotenv) - loads `DATABASE_URL` from
  `.env` (Prisma 7 no longer does this automatically).
- [`typescript`](https://www.typescriptlang.org/) - compiles `src/` to `dist/`
  (`tsc`); the app runs as plain compiled JavaScript on Node.
