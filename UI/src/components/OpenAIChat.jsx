import React, { useState } from "react";
import axios from "axios";

const OpenAIChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { type: "user", text: input };
    setMessages(prev => [...prev, userMessage]);

    const res = await axios.post("http://localhost:3001/chat", {
      message: input,
      userId: "user123",
      product: {
        name: "Gold Ring",
        category: "Gold",
        weight: "10g",
        condition: "Good"
      }
    });

    const botMessage = { type: "bot", text: res.data.reply };

    setMessages(prev => [...prev, botMessage]);
    setInput("");
  };

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <h2>Pawnshop AI Chat</h2>

      <div style={{ height: "400px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{
            textAlign: msg.type === "user" ? "right" : "left",
            margin: "10px"
          }}>
            <span style={{
              background: msg.type === "user" ? "#007bff" : "#eee",
              color: msg.type === "user" ? "#fff" : "#000",
              padding: "8px",
              borderRadius: "10px"
            }}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about your item..."
        style={{ width: "70%" }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default OpenAIChat;