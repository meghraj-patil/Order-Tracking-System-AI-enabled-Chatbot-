require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ GEMINI_API_KEY not found in .env file");
    process.exit(1);
}

const ai = new GoogleGenAI({
    apiKey,
});

console.log("✅ Gemini Client Connected");

module.exports = ai;