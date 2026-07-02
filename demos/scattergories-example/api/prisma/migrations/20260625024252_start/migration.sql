-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "room_code" TEXT NOT NULL,
    "letter" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answers" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "games_room_code_key" ON "games"("room_code");

-- CreateIndex
CREATE UNIQUE INDEX "answers_game_id_answer_key" ON "answers"("game_id", "answer");

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE;
