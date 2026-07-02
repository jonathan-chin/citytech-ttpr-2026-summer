// Route for submitting an answer to a game.

import express from "express";
import prisma from "../db.js";

const router = express.Router();

// POST /answers
// Body: { "roomCode": "PLUM42", "username": "sam", "answer": "Bear" }
//
// The server is the referee. It checks three things, in order:
//   1. the game exists
//   2. the answer starts with the game's letter        -> 400
//   3. the answer is new for this room (UNIQUE)         -> 409
router.post("/", async (req, res, next) => {
  try {
    const { roomCode, username, answer } = req.body;

    // Validate untrusted input.
    if (typeof roomCode !== "string" || roomCode.trim() === "") {
      res.status(400).json({ error: "roomCode is required" });
      return;
    }
    if (typeof username !== "string" || username.trim() === "") {
      res.status(400).json({ error: "username is required" });
      return;
    }
    if (typeof answer !== "string" || answer.trim() === "") {
      res.status(400).json({ error: "answer is required" });
      return;
    }

    const cleanRoom = roomCode.trim();
    const cleanAnswer = answer.trim();

    // 1. The game has to exist.
    const game = await prisma.game.findUnique({
      where: { roomCode: cleanRoom },
    });
    if (!game) {
      res.status(404).json({ error: "No game with that room code" });
      return;
    }

    // 2. The answer must start with the game's letter (case-insensitive).
    if (cleanAnswer[0]!.toUpperCase() !== game.letter.toUpperCase()) {
      res.status(400).json({ error: `Answer must start with ${game.letter}` });
      return;
    }

    // 3. Try to store it. The (game_id, answer) UNIQUE constraint rejects
    //    duplicates, and we turn that database error into a 409.
    await prisma.answer.create({
      data: {
        gameId: game.id,
        username: username.trim(),
        answer: cleanAnswer,
      },
    });

    res.status(201).json({ accepted: true });
  } catch (err) {
    if ((err as { code?: string }).code === "P2002") {
      res.status(409).json({ error: "Answer already taken" });
      return;
    }
    next(err);
  }
});

export default router;
