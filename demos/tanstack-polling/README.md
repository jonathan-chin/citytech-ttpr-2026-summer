# TanStack Query Polling Demo

Shows **client polling** with TanStack Query against a tiny Express server.
There is no WebSocket or push: the client just re-fetches `GET /` on an
interval, so anything POSTed to the server shows up on the next poll.

```text
tanstack-polling/
├── server/   # Express API: GET / (list messages), POST / (add one) — in-memory
└── client/   # Ionic React app that polls GET / and displays the messages
```

The client **only reads** (polls `GET /`). New messages come from **other people
POSTing** to the server (e.g. with Insomnia), which is the whole point of the demo.

## 1. Run the server and expose it

```bash
cd server
yarn install
yarn start            # http://localhost:3000
```

In another terminal, make it public with **ngrok** so classmates can reach it:

```bash
ngrok http 3000
```

Copy the `https://…ngrok…` URL it prints.

## 2. Run the client

```bash
cd client
yarn install
cp .env.example .env  # set VITE_API_URL to your ngrok URL (below)
yarn dev              # opens the app in your browser
```

Edit `.env` and set `VITE_API_URL` to the ngrok URL from step 1 (or leave the
default `http://localhost:3000` if you're running both locally). The client
polls every 1.5s and lists whatever is on the server.

## 3. Post messages (Insomnia / curl)

Other students add messages by POSTing to the exposed server — the client
never posts, it only polls:

```http
POST https://YOUR-NGROK-URL/
Content-Type: application/json

{ "name": "sam", "message": "hello" }
```

Within ~1.5 seconds the message appears in everyone's client.

> Messages are stored **in memory**, so restarting the server clears them.
