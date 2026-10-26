// import { useEffect, useRef, useState } from "react";
// import "../App.css";

// const seed = [
// {
// id: 1,
// from: "bot",
// text: "Hey there — I'm Nexus. Ask me about any shipment."
// },
// {
// id: 2,
// from: "user",
// text: "Where is order #DV-48211?"
// },
// {
// id: 3,
// from: "bot",
// text:
// "Order DV-48211 is in transit through Rotterdam hub."
// }
// ];

// export default function ChatWidget() {
// const [messages, setMessages] = useState(seed);
// const [input, setInput] = useState("");
// const scrollRef = useRef(null);

// useEffect(() => {
// scrollRef.current?.scrollTo({
// top: scrollRef.current.scrollHeight,
// behavior: "smooth"
// });
// }, [messages]);

// const send = async (e) => {
//   e.preventDefault();

//   if (!input.trim()) return;

//   const userMessage = input;
//   const id = Date.now();

//   // User Message Add
//   setMessages((prev) => [
//     ...prev,
//     {
//       id,
//       from: "user",
//       text: userMessage,
//     },
//   ]);

//   setInput("");

//   // Loading Message
//   setMessages((prev) => [
//     ...prev,
//     {
//       id: id + 1,
//       from: "bot",
//       text: "Scanning network...",
//     },
//   ]);

//   try {
//     const result = await fetch("/api/message", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         message: userMessage,
//       }),
//     });

//     const data = await result.json();

//     // Replace Loading Message
//     setMessages((prev) =>
//       prev.map((msg) =>
//         msg.id === id + 1
//           ? {
//               ...msg,
//               text: data.reply,
//             }
//           : msg
//       )
//     );
//   } catch (error) {
//     setMessages((prev) =>
//       prev.map((msg) =>
//         msg.id === id + 1
//           ? {
//               ...msg,
//               text: "Unable to connect to Gemini.",
//             }
//           : msg
//       )
//     );
//   }
// };

  

// return (
//   <div className="chat-card">
//     <div className="chat-header">
//       <div className="avatar">M</div>

//       <div>
//         <h3>Ask MCP Nexus </h3>
//         <p>● Online</p>
//       </div>
//     </div>

//     <div className="messages" ref={scrollRef}>
//       {messages.map((m) => (
//         <div
//           key={m.id}
//           className={
//             m.from === "bot" ? "bot-message" : "user-message"
//           }
//         >
//           {m.text}
//         </div>
//       ))}
//     </div>

//     <form onSubmit={send} className="chat-form">
//       <input
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Ask me..."
//       />

//       <button type="submit">→</button>
//     </form>
//   </div>
// );
// }

import React, { useEffect, useRef, useState } from "react";
import {
  FaRobot,
  FaPaperPlane,
  FaComments
} from "react-icons/fa";

const API_URL = "http://localhost:5000/api/message";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello 👋 Welcome to MCP Nexus. How can I help you today?"
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  const sendMessage = async () => {
    debugger;
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;

    setMessage("");

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: currentMessage
        })
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            data.reply ||
            "No response received."
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            "Unable to connect to MCP Nexus backend."
        }
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {!open && (
        <button
          className="chat-toggle"
          onClick={() => setOpen(true)}
        >
          <FaComments />
        </button>
      )}

      {open && (
        <div className="chat-widget">

          <div className="chat-header">

            <div className="chat-title">
              <FaRobot />
              <span>MCP Nexus AI</span>
            </div>

            <button
              className="close-btn"
              onClick={() => setOpen(false)}
            >
              ×
            </button>

          </div>

          <div className="chat-body">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.sender === "user"
                    ? "user-message"
                    : "ai-message"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="message ai-message">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef}></div>

          </div>

          <div className="chat-footer">

            <input
              type="text"
              placeholder="Ask MCP Nexus..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={handleKeyDown}
            />

            <button onClick={sendMessage}>
              <FaPaperPlane />
            </button>

          </div>

        </div>
      )}
    </>
  );
};

export default ChatWidget;