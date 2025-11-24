import { useEffect, useState, useRef } from "react";
import "../css/AdminAi.css";
import axios from "axios";

const AdminAi = () => {
  const [sessionId] = useState("ADMIN");
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);
  const [typing, setTyping] = useState(false);

  const chatEndRef = useRef(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [message, typing]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4004/api/ai/history/${sessionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const formatted = res.data.map((m) => ({
        role: m.role,
        message: m.message,
      }));

      setMessage(formatted);
    } catch (err) {
      console.error("Error Loading History ", err);
    }
  };

  const sendMessage = async (customInput) => {
    const finalMessage = customInput || input;

    if (!finalMessage.trim()) return;

    const userMsg = { role: "user", message: finalMessage };
    setMessage((prev) => [...prev, userMsg]);

    setTyping(true);

    try {
      const res = await axios.post(
        `http://localhost:4004/api/ai/chat/${sessionId}`,
        { message: finalMessage },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const aiMsg = { role: "ai", message: res.data };
      setMessage((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("Error sending message:", err);
    }

    setTyping(false);
    setInput("");
  };

  const clearHistory = async () => {
    try {
      await axios.delete(
        `http://localhost:4004/api/ai/history/${sessionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage([]);
    } catch (err) {
      console.error("Error clearing history:", err);
    }
  };

  // ⭐ NEW: Clickable suggestions
  const suggestions = [
    "Show today's patients",
    "Show this month's patients",
    "Show today's appointments",
    "Show this month's appointments",
    "Show total revenue",
    "Show active bills",
    "Appointments with status active",
    "Appointments with status pending",
  ];

  return (
    <div className="adminai-container">

      {/* HEADER */}
      <div className="adminai-header">
        <span className="adminai-logo">🤖</span>
        Admin AI Assistant
      </div>

      {/* ⭐ SUGGESTION BOX */}
      <div className="adminai-suggestions">
        {suggestions.map((s, idx) => (
          <button
            key={idx}
            className="adminai-suggestion-btn"
            onClick={() => sendMessage(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* CHAT AREA */}
      <div className="adminai-chat-area">
        {message.map((msg, i) => (
          <div
            key={i}
            className={`adminai-msg ${msg.role === "ai" ? "adminai-ai" : "adminai-user"}`}
          >
            {msg.message}
          </div>
        ))}

        {typing && (
          <div className="adminai-msg adminai-ai typing">
            <span></span><span></span><span></span>
          </div>
        )}

        <div ref={chatEndRef}></div>
      </div>

      {/* INPUT BAR */}
      <div className="adminai-input-box">
        <input
          type="text"
          placeholder="Send a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={() => sendMessage()}>➤</button>
      </div>

      <button className="adminai-clear-btn" onClick={clearHistory}>
        Clear Chat
      </button>
    </div>
  );
};

export default AdminAi;
