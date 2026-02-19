const path = require("path");
const dotenv = require("dotenv");

// Explicitly load correct .env file
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env";
// Look for .env in the ROOT directory (two levels up from src/config)
const envPath = path.join(__dirname, "../../", envFile);

console.log(`[DEBUG] Loading environment from: ${envPath}`);
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error(`[ERROR] Failed to load ${envFile}:`, result.error);
} else {
  console.log(`[DEBUG] loaded DB_HOST: ${process.env.DB_HOST}`);
}

module.exports = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",
};
