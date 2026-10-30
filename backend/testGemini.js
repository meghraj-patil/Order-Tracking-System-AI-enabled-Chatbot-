require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function testGemini() {
    try {
        const response = await ai.models.generateContent({
            model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
            contents: "Say hello in one sentence.",
        });

        console.log("Gemini response:", response.text);
    } catch (error) {
        console.error("Gemini test failed:", error.message);
    }
}

testGemini();