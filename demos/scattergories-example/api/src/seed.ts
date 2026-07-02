// Optional: a little starter data so a fresh database isn't empty.
//
//   yarn build && yarn seed
//
// Re-running is safe: it clears the two tables first, then inserts a couple
// of example games. Once you have data you like, export a dump with pgAdmin
// into the data/ folder so your teammates restore the same starting point.

// Load .env before importing the database client (which reads DATABASE_URL).
import "dotenv/config";
import prisma from "./db.js";

async function main() {
  // Clear old rows. Answers go first because they reference games.
  await prisma.answer.deleteMany();
  await prisma.game.deleteMany();

  const plum = await prisma.game.create({
    data: { roomCode: "PLUM42", letter: "B", topic: "Animals" },
  });

  await prisma.game.create({
    data: { roomCode: "KIWI88", letter: "S", topic: "Foods" },
  });

  // A couple of answers already claimed in the PLUM42 room.
  await prisma.answer.createMany({
    data: [
      { gameId: plum.id, username: "sam", answer: "Bear" },
      { gameId: plum.id, username: "kai", answer: "Bison" },
    ],
  });

  console.log("Seeded 2 games and 2 answers.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
