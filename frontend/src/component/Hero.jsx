// import { useState } from "react";
// import "../App.css";

// export default function Hero() {
//   const [status, setStatus] = useState("Idle");
//   const [response, setResponse] = useState("");

//   const callBackend = async () => {
//     setStatus("Connecting...");

//     try {
//       const result = await fetch("/api/message", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: "Hello from Nexus UI" }),
//       });

//       const data = await result.json();
//       setResponse(data.reply);
//       setStatus("Connected");
//     } catch (error) {
//       setStatus("Connection failed");
//       setResponse(error.message);
//     }
//   };

//   return (
//     <div className="hero">
//       <div className="hero-content">
//         <p className="hero-label">See Beyond the Shipment</p>

//         <h1 className="hero-title">
//           MCP
//           <br />
//           <span className="hero-subtitle">Nexus</span>
//         </h1>

//         <p className="hero-text">
//           Track orders, monitor deliveries, and get real-time updates through
//           intelligent conversations.
//         </p>

//         <div className="hero-actions">
//           <button className="hero-btn" onClick={callBackend}>
//             Launch Dashboard →
//           </button>

//           <button className="hero-link">Watch film</button>
//         </div>

//         <div className="hero-footer">
//           <span>v2.4 · Nexus</span>
//           <div className="hero-line"></div>
//           <span>{status}</span>
//         </div>

//         {response && <p className="hero-text">{response}</p>}
//       </div>
//     </div>
//   );
// }

import React from "react";
import { motion } from "framer-motion";
import {
  FaBrain,
  FaServer,
  FaBolt,
  FaArrowRight
} from "react-icons/fa";

const Hero = () => {
  return (
    <section id="home" className="hero">

      <div className="hero-container">

        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <div className="hero-badge">
            🚀 Next Generation AI Platform
          </div>

          <h1>
            Build
            <span> AI Agents </span>
            That Connect With
            <span> MCP Servers</span>
          </h1>

          <p>
            MCP Nexus is a modern AI orchestration platform that
            connects intelligent agents with external tools,
            servers, APIs and workflows using the Model Context
            Protocol.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Get Started
              <FaArrowRight />
            </button>

            <button className="secondary-btn">
              Documentation
            </button>
          </div>

          <div className="hero-stats">

            <div className="stat-card">
              <h3>99.9%</h3>
              <span>Uptime</span>
            </div>

            <div className="stat-card">
              <h3>50+</h3>
              <span>Integrations</span>
            </div>

            <div className="stat-card">
              <h3>24/7</h3>
              <span>AI Access</span>
            </div>

          </div>

        </motion.div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <div className="dashboard-card">

            <div className="dashboard-header">
              <div className="dot red"></div>
              <div className="dot yellow"></div>
              <div className="dot green"></div>
            </div>

            <div className="dashboard-content">

              <div className="status-card">
                <FaBrain />
                <div>
                  <h4>Gemini AI</h4>
                  <span>Connected</span>
                </div>
              </div>

              <div className="status-card">
                <FaServer />
                <div>
                  <h4>MCP Server</h4>
                  <span>Connected</span>
                </div>
              </div>

              <div className="status-card">
                <FaBolt />
                <div>
                  <h4>Agent Runtime</h4>
                  <span>Active</span>
                </div>
              </div>

            </div>

            <div className="terminal">

              <div className="terminal-line">
                ✔ MCP Connected
              </div>

              <div className="terminal-line">
                ✔ Gemini Ready
              </div>

              <div className="terminal-line">
                ✔ Agent Running
              </div>

              <div className="terminal-line typing">
                ▋
              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default Hero;