// The pools the server picks from when it starts a new game.
//
// LETTERS leaves out the letters that make the game miserable (Q, U, V, X,
// Y, Z). Add them back if you want a harder game.

export const LETTERS = "ABCDEFGHIJKLMNOPRSTW".split("");

export const TOPICS = [
  "Animals",
  "Foods",
  "Movies",
  "Cities",
  "Countries",
  "Sports",
  "Colors",
  "Things in a kitchen",
  "Jobs",
  "Hobbies",
];

// Pick a random element from an array.
export function pick<T>(list: T[]): T {
  const index = Math.floor(Math.random() * list.length);
  return list[index]!;
}
