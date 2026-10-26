const {
    listTools,
    callTool,
} = require("./mcpClient");

const {
    decideTool,
    generateResponse,
} = require("./geminiService");


async function askAgent(message) {

    try {

        console.log("\n==============================");
        console.log("🤖 MCP Nexus AI Agent Started");
        console.log("==============================");

        console.log("👤 User :", message);


        // -----------------------------
        // Step 1 : Get MCP Tools
        // -----------------------------

        const tools = await listTools();

        console.log("\n📦 Available Tools:");

        console.log(tools.map(tool => tool.name));


        // -----------------------------
        // Step 2 : Ask Gemini
        // -----------------------------

        const decision = await decideTool(message, tools);

        console.log("\n🧠 Gemini Decision:");

        console.log(decision);


        // -----------------------------
        // Step 3 : Order ID Required
        // -----------------------------

        if (decision.needs_order_id === true) {

            console.log("\n⚠️ Order ID is required");

            return "Please provide your order ID so I can check your order status.";

        }


        // -----------------------------
        // Step 4 : Tool Required
        // -----------------------------

        if (
            decision.tool &&
            decision.tool !== "none"
        ) {

            console.log(
                `\n🚀 Calling MCP Tool : ${decision.tool}`
            );


            const toolResult = await callTool(

                decision.tool,

                decision.arguments || {}

            );


            console.log("\n✅ Tool Response:");

            console.log(toolResult);


            // -----------------------------
            // Convert Tool Result
            // -----------------------------

            const toolText =
                toolResult.content?.[0]?.text ||
                JSON.stringify(toolResult.structuredContent);


            // -----------------------------
            // Ask Gemini for Final Reply
            // -----------------------------

            const finalPrompt = `
You are MCP Nexus AI.

The user asked:

${message}

Tool Result:

${toolText}

Reply naturally in simple English.

Do not mention JSON.

If the order status is "Delivered",
tell the user that the order has been delivered.

If the order status is "Dispatched",
tell the user that the order has been dispatched.

If the order status is "In Transit",
tell the user that the order is currently in transit.

Keep the response short and clear.
`;


            const finalAnswer =
                await generateResponse(finalPrompt);


            return finalAnswer;

        }


        // -----------------------------
        // Step 5 : Normal Chat
        // -----------------------------

        const normalReply =
            await generateResponse(message);


        return normalReply;


    } catch (error) {

        console.error("\n❌ Agent Error");

        console.error(error);

        return "Sorry, something went wrong while processing your request.";

    }

}


module.exports = {

    askAgent,

};