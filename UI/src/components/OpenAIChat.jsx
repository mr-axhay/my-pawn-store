import React, { useState } from "react";
import axios from "axios";
import './OpenAIChat.css';

const OpenAIChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleSendMessage = async () => {
        if (!input) return;

        const userMessage = { type: "user", text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);
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
        setIsLoading(false);

    };

    return (
        <div className={`chatbot ${!isOpen ? "collapsed" : ""}`}>
            <div
                className="chat-header"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? "🤖 AI Assistant" : "💬"}
            </div>
            {isOpen && (
                <>
                    <div className="chat-body">
                        {messages.map((msg, i) => (
                            <div key={i} className={`message ${msg.type}`}>
                                <div className="bubble">{msg.text}</div>
                            </div>
                        ))}
                    </div>

                    <div className="chat-footer">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSendMessage();
                                }
                            }}
                            placeholder="Ask something..."
                        />

                        {isLoading && (
                            <div className="spinner-border text-secondary" type="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        )}

                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default OpenAIChat;