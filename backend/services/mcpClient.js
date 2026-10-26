const { Client } = require("@modelcontextprotocol/sdk/client/index.js");

const {
    StreamableHTTPClientTransport,
} = require("@modelcontextprotocol/sdk/client/streamableHttp.js");

let client = null;
let transport = null;


// ==========================================
// CONNECT MCP
// ==========================================

async function connectMCP() {

    try {

        // Already connected
        if (client) {
            return client;
        }

        transport = new StreamableHTTPClientTransport(
            new URL("http://localhost:8000/mcp")
        );

        client = new Client({
            name: "MCP Nexus Backend",
            version: "1.0.0",
        });

        await client.connect(transport);

        console.log("✅ Connected to MCP Server");

        return client;

    } catch (error) {

        console.error("❌ MCP Connection Failed");
        console.error(error);

        client = null;
        transport = null;

        throw error;
    }
}


// ==========================================
// LIST TOOLS
// ==========================================

async function listTools() {

    const mcpClient = await connectMCP();

    try {

        const result = await mcpClient.listTools();

        console.log(
            "🛠️ MCP Tools:",
            result.tools.map(tool => tool.name)
        );

        return result.tools;

    } catch (error) {

        console.error("❌ Failed to list MCP tools");

        // Reset broken connection
        await disconnectMCP();

        throw error;
    }
}


// ==========================================
// CALL TOOL
// ==========================================

async function callTool(toolName, args) {

    const mcpClient = await connectMCP();

    try {

        console.log(`🔧 Calling MCP Tool: ${toolName}`);

        console.log("Arguments:", args);

        const result = await mcpClient.callTool({

            name: toolName,

            arguments: args,

        });

        console.log(`✅ Tool ${toolName} completed`);

        return result;

    } catch (error) {

        console.error(`❌ Tool ${toolName} failed`);
        console.error(error);

        // IMPORTANT:
        // MCP session may have expired
        await disconnectMCP();

        throw error;
    }
}


// ==========================================
// DISCONNECT MCP
// ==========================================

async function disconnectMCP() {

    if (client) {

        try {

            await client.close();

        } catch (error) {

            console.error("MCP close error:", error);

        }

    }

    client = null;

    transport = null;

    console.log("🔄 MCP Client Reset");
}


// ==========================================

module.exports = {

    connectMCP,

    listTools,

    callTool,

    disconnectMCP,

};