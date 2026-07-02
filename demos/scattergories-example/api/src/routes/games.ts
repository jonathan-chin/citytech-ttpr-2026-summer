// Routes for creating and listing games.

import express from "express";
import prisma from "../db.js";
import { LETTERS, TOPICS, pick } from "../game-data.js";

const router = express.Router();

// POST /games
// Body: { "roomCode": "PLUM42" }
// The server picks the letter and topic, not the client.
router.post("/", async (req, res, next) => {
  try {
    const { roomCode } = req.body;

    // Validate untrusted input before it reaches the database.
    if (typeof roomCode !== "string" || roomCode.trim() === "") {
      res.status(400).json({ error: "roomCode is required" });
      return;
    }

    const game = await prisma.game.create({
      data: {
        roomCode: roomCode.trim(),
        letter: pick(LETTERS),
        topic: pick(TOPICS),
      },
    });

    res.status(201).json({
      roomCode: game.roomCode,
      letter: game.letter,
      topic: game.topic,
    });
  } catch (err) {
    // P2002 = a UNIQUE constraint failed. Here it means room_code is taken.
    if ((err as { code?: string }).code === "P2002") {
      res.status(409).json({ error: "Room code already in use" });
      return;
    }
    next(err);
  }
});

// GET /games
// Returns every game with its room code, letter, and topic.
router.get("/", async (_req, res, next) => {
  try {
    const games = await prisma.game.findMany({
      orderBy: { createdAt: "desc" },
      select: { roomCode: true, letter: true, topic: true },
    });
    res.json(games);
  } catch (err) {
    next(err);
  }
});

export default router;
