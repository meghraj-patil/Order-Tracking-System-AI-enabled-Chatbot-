const { askAgent } = require("./services/agentService");

async function test() {
    console.log("Step 1");

    const result = await askAgent("Todays weather in New York City?");

    console.log("Step 2");

    console.log(result);
}

test();