# Auth Demo (Ionic + React + Express + Prisma)

Register, log in, and fetch a protected profile - pairs with the `2026-08-10`
mini workshop slide deck (`../../slides/2026-08-10.md`).

```text
auth-demo/
├── server/   # Express API: passport-local (login) + passport-jwt (protected routes)
└── client/   # Ionic React app: register/login form, then a protected profile view
```

- `POST /register`: hashes the password with `bcryptjs` and creates a `User` row
- `POST /login`: `passport-local` verifies the password, then the server signs and returns a JWT
- `GET /me`: protected by `passport-jwt`; only reachable with a valid `Authorization: Bearer <token>`
- The client stores the token in a **Zustand store** (`src/store/useAuthStore.ts`) with
  the `persist` middleware, which mirrors it to `localStorage` - the store is what makes
  the token reactive across components; `persist` is what survives a reload. A real
  Capacitor app would swap `persist`'s storage for `@capacitor/preferences` or secure
  storage instead of `localStorage`
- `GET /me` reads the token from the store and attaches it via a TanStack Query `useQuery`

**Database**: the server uses Prisma with **SQLite**, a demo-only simplification so
there's nothing to install or configure locally. The capstone stack uses **PostgreSQL**
(see `../../project_specs/capstone.md`) - swapping back is a one-line change to the
`datasource` block in `server/prisma/schema.prisma`; every other line of Prisma code
is identical either way.

## 1. Run the server

```bash
cd server
yarn install
cp .env.example .env      # sets DATABASE_URL and JWT_SECRET for local dev
npx prisma migrate dev    # creates prisma/dev.db from the committed migration
yarn start                # http://localhost:3000
```

## 2. Run the client

```bash
cd client
yarn install
cp .env.example .env      # VITE_API_URL defaults to http://localhost:3000
yarn dev                  # opens the app in your browser
```

Register an account, then log in - the app fetches `GET /me` and shows your user
ID and email, proving the stored token is valid. Log out to clear the token and
return to the login form.
