require("dotenv").config();

const express = require("express");
const cors = require("cors");

const chatRoutes = require("./routes/chatRoutes");
const { connectMCP, disconnectMCP } = require("./services/mcpClient");

const app = express();

const PORT = process.env.PORT || 5000;

// ---------------------------
// Middleware
// ---------------------------

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ---------------------------
// Health Check
// ---------------------------

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "🚀 MCP Nexus Backend Running"

    });

});

// ---------------------------
// Routes
// ---------------------------

app.use("/api", chatRoutes);

// ---------------------------
// Global Error Handler
// ---------------------------

app.use((err, req, res, next) => {

    console.error("Global Error");

    console.error(err);

    res.status(500).json({

        success: false,

        message: "Internal Server Error"

    });

});

// ---------------------------
// Start Server
// ---------------------------

async function startServer() {

    try {

        await connectMCP();

        app.listen(PORT, () => {

            // console.log("\n===================================");

            // console.log("🚀 MCP Nexus Backend Started");

            // console.log("===================================");

            // console.log(`Server : http://localhost:${PORT}`);

            // console.log("Gemini : Connected");

            // console.log("MCP : Connected");

            // console.log("===================================\n");

        });

    } catch (error) {

        console.error("Server Startup Failed");

        console.error(error);

    }

}

startServer();

// ---------------------------
// Graceful Shutdown
// ---------------------------

process.on("SIGINT", async () => {

    // console.log("\nShutting Down...");

    await disconnectMCP();

    process.exit(0);

});