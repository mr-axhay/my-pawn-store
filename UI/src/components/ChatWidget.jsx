import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base } from "../API_URL";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (msgText) => {
    const text = msgText || input;
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch(base + "api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      setTimeout(() => {
        setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
        setTyping(false);
      }, 600);
    } catch (err) {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Server error. Try again." },
      ]);
    }
  };

  const quickActions = [
    "Show my products",
    "My orders",
    // "Evaluation status",
    "Product prices",
  ];

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#ff4d4f",
          color: "#fff",
          padding: "14px 18px",
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "18px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          zIndex: 999,
        }}
      >
        💬
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            style={{
              position: "fixed",
              bottom: "80px",
              right: "20px",
              width: "350px",
              height: "500px",
              background: "linear-gradient(135deg, #1e1e2f, #2a2a40)",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              zIndex: 999,
            }}
          >
            {/* Header */}
            <div
            onClick={() => setOpen(!open)}
              style={{
                padding: "15px",
                background: "#ff4d4f",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              PawnBot 🤖
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                padding: "10px",
                overflowY: "auto",
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent:
                      msg.from === "user" ? "flex-end" : "flex-start",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      background: msg.from === "user" ? "#ff4d4f" : "#2f2f48",
                      color: "#fff",
                      padding: "10px 14px",
                      borderRadius: "15px",
                      maxWidth: "70%",
                      fontSize: "14px",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {typing && (
                <div style={{ color: "#aaa", fontSize: "12px" }}>
                  Bot is typing...
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Quick Actions */}
            <div
              style={{
                padding: "5px",
                display: "flex",
                flexWrap: "wrap",
                gap: "5px",
              }}
            >
              {quickActions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  style={{
                    fontSize: "12px",
                    padding: "6px 10px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#444",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div
              style={{
                display: "flex",
                borderTop: "1px solid #333",
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "none",
                  outline: "none",
                  background: "#1e1e2f",
                  color: "#fff",
                }}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={() => sendMessage()}
                style={{
                  padding: "10px 15px",
                  background: "#ff4d4f",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                ➤
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
