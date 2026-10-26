const { askAgent } = require("../services/agentService");

async function chat(req, res) {

    try {

        const { message } = req.body;



        // AI Agent
        const reply = await askAgent(message);
        console.log("FINAL REPLY:", reply);
        return res.status(200).json({

            success: true,

            reply

        });

    } catch (error) {

        console.error("\n❌ Chat Controller Error");

        console.error(error);

        return res.status(500).json({

            success: false,

            reply: "Something went wrong."

        });

    }

}

module.exports = {

    chat,

};