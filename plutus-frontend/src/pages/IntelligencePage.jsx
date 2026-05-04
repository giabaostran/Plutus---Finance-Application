import React, { useState } from "react";


// --- Mock Data ---
const INSIGHTS_DATA = [
  {
    id: 1,
    tag: "⚠ Warning",
    tagClass: "tag-warn",
    title: "Entertainment Budget Exceeded",
    body: "You've spent $340 on entertainment this month — $40 over your $300 budget with 7 days remaining. Netflix, Spotify and a concert ticket were the main drivers.",
    date: "Apr 24, 2026",
    action: "Adjust budget →",
  },
  {
    id: 2,
    tag: "💡 Opportunity",
    tagClass: "tag-tip",
    title: "High-Yield Savings Available",
    body: "You have $14,200 sitting in a 0.4% APY savings account. Moving to a HYSA could earn you an extra $710/yr at current 5.4% rates.",
    date: "Apr 22, 2026",
    action: "Learn more →",
  },
  {
    id: 3,
    tag: "🔴 Alert",
    tagClass: "tag-alert",
    title: "Wire Transfer Failed",
    body: "A $5,000 wire transfer on Apr 19 failed — likely due to daily limit restrictions. Check with Bank of America or retry in smaller amounts.",
    date: "Apr 19, 2026",
    action: "View transaction →",
  },
  {
    id: 4,
    tag: "✦ Insight",
    tagClass: "tag-info",
    title: "On Pace for Best Savings Month",
    body: "At 52.1%, this is your highest savings rate in 8 months. If you maintain this trajectory, your Emergency Fund top-up goal will be hit by June 2026.",
    date: "Apr 24, 2026",
    action: "View goals →",
  },
];

export default function IntelligencePage({ isActive }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "AI",
      text: "Hi Alex! Based on your April data, you're on track to save $7,438 this month — that's 52.1% of income. Your biggest opportunity: entertainment spending is 13% over budget. Want me to suggest adjustments?",
    },
    {
      id: 2,
      sender: "AI",
      text: "📈 Your ETF purchase from Apr 21 is still pending. Markets are up 1.4% since then — worth confirming it went through.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const newMessage = {
      id: Date.now(),
      sender: "User",
      text: inputValue,
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // Optional: Simulate AI typing/reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "AI",
          text: "I'm looking into that for you. Give me a moment to analyze your recent transactions...",
        },
      ]);
    }, 800);
  };

  return (
    <div className={`page ${isActive ? "on" : ""}`} id="p-intelligence">
      {/* AI Chat Card */}
      <div className="card">
        <div className="card-hd">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div className="ai-icon-avatar">✦</div>
            <div>
              <div className="card-title">Finsight AI</div>
              <div className="card-sub">Your personal financial intelligence</div>
            </div>
          </div>
          <div className="ai-status">
            <div className="ai-dot"></div>
            Online
          </div>
        </div>

        <div className="ai-chat" style={{ maxHeight: "340px" }}>
          <div className="chat-msgs">
            {messages.map((msg) => (
              <div key={msg.id} className={`msg ${msg.sender === "AI" ? "msg-ai" : "msg-user"}`}>
                <div className="msg-avatar">{msg.sender === "AI" ? "AI" : "ME"}</div>
                <div className="msg-bubble">{msg.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="section-header-simple">Insights & Alerts</div>

      <div className="intel-grid">
        {INSIGHTS_DATA.map((item) => (
          <div key={item.id} className="insight-card">
            <span className={`insight-tag ${item.tagClass}`}>{item.tag}</span>
            <div className="insight-title">{item.title}</div>
            <div className="insight-body">{item.body}</div>
            <div className="insight-foot">
              <span className="insight-date">{item.date}</span>
              <button className="insight-action">{item.action}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
