import { useState, useEffect, useRef, useCallback } from "react";

// ── Intelligence ───────────────────────────
export default function IntelligencePage({ insights, aiResponses }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "ai",
      text: "Hi Alex! Based on your April data, you're on track to save <strong>$7,438</strong> this month — that's 52.1% of income. Your biggest opportunity: entertainment spending is 13% over budget. Want me to suggest adjustments?",
    },
    {
      id: 2,
      role: "ai",
      text: "📈 Your ETF purchase from Apr 21 is still pending. Markets are up 1.4% since then — worth confirming it went through.",
    },
  ]);
  const [input, setInput] = useState("");
  const [rIdx, setRIdx] = useState(0);
  const msgsRef = useRef(null);

  const sendChat = () => {
    const msg = input.trim();
    if (!msg) return;
    const userMsg = { id: Date.now(), role: "user", text: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "ai", text: aiResponses[rIdx % aiResponses.length] },
      ]);
      setRIdx((r) => r + 1);
    }, 600);
  };

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages]);

  return (
    <>
      {/* AI Chat card */}
      <div className="card">
        <div className="card-hd">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "var(--r-sm)",
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              ✦
            </div>
            <div>
              <div className="card-title">Finsight AI</div>
              <div className="card-sub">Your personal financial intelligence</div>
            </div>
          </div>
          <div className="ai-status">
            <div className="ai-dot" />
            Online
          </div>
        </div>
        <div className="ai-chat">
          <div className="chat-msgs" ref={msgsRef}>
            {messages.map((m) => (
              <div key={m.id} className={`msg msg-${m.role}`}>
                <div className="msg-avatar">{m.role === "ai" ? "AI" : "AK"}</div>
                <div className="msg-bubble" dangerouslySetInnerHTML={{ __html: m.text }} />
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              className="f-input"
              type="text"
              placeholder="Ask about your finances…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendChat()}
            />
            <button className="btn btn-primary" onClick={sendChat}>
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Insights grid */}
      <div style={{ fontFamily: "var(--fn-d)", fontSize: 15, fontWeight: 700, color: "var(--text-1)" }}>
        Insights & Alerts
      </div>
      <div className="intel-grid">
        {insights.map((ins) => (
          <div key={ins.id} className="insight-card">
            <span className={`insight-tag ${ins.tagCls}`}>{ins.tag}</span>
            <div className="insight-title">{ins.title}</div>
            <div className="insight-body">{ins.body}</div>
            <div className="insight-foot">
              <span style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "var(--fn-m)" }}>{ins.date}</span>
              <button className="insight-action">{ins.action}</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
