
import { useState } from "react";
import "./ChatWidget.css";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.reply },
    ]);

    setInput("");
  };

  return (
    <div>
      {/* Floating Button */}
      <button className="chat-button" onClick={() => setOpen(!open)}>
        💬
      </button>

      {/* Chat Box */}
      {open && (
        <div className="chat-box">
          <div className="chat-header">Ask Anything</div>

          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role}>
                {msg.content}
              </div>
            ))}
          </div>

          <div className="chat-footer">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type here..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}