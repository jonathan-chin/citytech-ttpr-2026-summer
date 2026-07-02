// Starts the HTTP server. Run this with `yarn start` or `yarn dev`.

// Load .env into process.env first, before anything reads DATABASE_URL.
// This import must come before "./app.js" (which pulls in the database).
import "dotenv/config";
import app from "./app.js";

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Scattergories API listening on http://localhost:${PORT}`);
});
