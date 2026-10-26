const { getAvailableTools } = require("./services/geminiService");

async function test() {

    const tools = await getAvailableTools();

    console.log(tools);

}

test();