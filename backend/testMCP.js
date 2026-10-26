const { connectMCP } = require("./services/mcpClient");

async function test() {

    const client = await connectMCP();

    const result = await client.callTool({
        name: "track_order",
        arguments: {
            order_id: "DV48211"
        }
    });

    console.log(result);

}

test();