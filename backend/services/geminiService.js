const ai = require("../config/gemini");

const MODEL = process.env.GEMINI_MODEL || "gemini-3.8-flash";

// --------------------
// Normal Chat Response
// --------------------
async function generateResponse(message) {
    try {

        const response = await ai.models.generateContent({
            model: MODEL,
            contents: message,
        });

        return response.text;

    } catch (error) {

console.error("Gemini Error:");
console.error(error);
        return "Sorry, I couldn't generate a response right now.";

    }
}

// --------------------
// AI Agent Decision
// --------------------
async function decideTool(message, tools) {

    try {

        const prompt = `
You are MCP Nexus AI Agent.

Available MCP Tools:

${JSON.stringify(tools, null, 2)}

User Message:

"${message}"

Rules:

1. The ONLY MCP tool available for this agent is "track_order".

2. If the user asks about:
   - order status
   - tracking an order
   - where is my order
   - where is my package
   - shipment status
   - delivery status
   - check my order
   - track my order

   then this is an ORDER TRACKING request.

3. If the user provides an order ID, use the "track_order" tool.

Example:

User:
"Where is my order ORD-202600016?"

Return:

{
    "tool": "track_order",
    "arguments": {
        "order_id": "ORD-202600016"
    }
}

4. If the user asks about an order but DOES NOT provide an order ID,
   DO NOT call the MCP tool.

   Return:

{
    "tool": "none",
    "needs_order_id": true
}

Example:

User:
"Where is my order?"

Return:

{
    "tool": "none",
    "needs_order_id": true
}

5. If the user is not asking about order tracking,
   return:

{
    "tool": "none",
    "needs_order_id": false
}

6. Return ONLY valid JSON.
7. Do NOT use markdown.
8. Do NOT explain anything.
`;

        const response = await ai.models.generateContent({
            model: MODEL,
            contents: prompt,
        });

        let text = response.text.trim();

        console.log("🧠 Raw Gemini Decision:", text);

        text = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const decision = JSON.parse(text);

        console.log("🧠 Parsed Gemini Decision:", decision);

        return decision;

    } catch (error) {

        console.error("❌ Tool Decision Error");
        console.error(error);

        return {
            tool: "none",
            needs_order_id: false
        };
    }
}
module.exports = {

    generateResponse,

    decideTool,

};