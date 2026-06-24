// sql_injection_demo.js
//
// EDUCATIONAL DEMO. This script is deliberately INSECURE to show how a SQL
// injection works. It builds a "query" by pasting raw user input into a
// string and running it with eval() -- the JavaScript equivalent of
// concatenating user input straight into SQL.
//
// NEVER write code like this for real. The safe version is at the bottom.
//
// Run it:  node demos/sql_injection_demo.js

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Pretend this array is a "users" table in a database.
const users = [
  { name: "Alice", role: "student" },
  { name: "Bob", role: "admin" },
  { name: "Carol", role: "student" },
];

console.log(`
SQL Injection Demo
==================
We build a query from your input and run it with eval(): the JavaScript
equivalent of pasting user input straight into SQL.

Try one of these at the prompt:
  Alice             normal use, finds just Alice
  ' || true || '    injection, returns EVERY user (like ' OR 1=1)
`);

rl.question("Enter your name: ", (name) => {
  // VULNERABLE: the user's input is pasted straight into code and executed.
  // Think of this string as the query a naive app would hand to the database.
  const query = `users.filter(u => u.name === '${name}')`;

  console.log("\nRunning query:");
  console.log("  " + query + "\n");

  let result;
  try {
    result = eval(query); // <-- the bug: running untrusted input as code
  } catch (err) {
    console.log("Query crashed:", err.message);
    return rl.close();
  }

  console.log("Result:", result);
  rl.close();
});

// Try these at the prompt:
//
//   Alice              -> returns just Alice (normal use)
//   ' || true || '     -> returns EVERY user (the classic "' OR 1=1" leak)
//
// THE FIX: never build code or SQL from input. Compare the value directly
// (the equivalent of a parameterized query), so input is treated as DATA:
//
//   const result = users.filter((u) => u.name === name);
