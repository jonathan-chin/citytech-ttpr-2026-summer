import express from "express";
import cors from "cors";

const app = express();
app.use(cors()); // allow the client (a different origin) to call this API
app.use(express.json());

// In-memory list of messages. Resets whenever the server restarts.
const messages = [];

// GET /  ->  return every message
app.get("/", (req, res) => {
  res.json(messages);
});

// POST /  ->  append { name, message } to the list
app.post("/", (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: "name and message are required" });
  }
  messages.push({ name, message });
  res.status(201).json({ name, message });
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
