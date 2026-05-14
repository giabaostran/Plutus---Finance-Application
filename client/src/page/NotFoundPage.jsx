// ─────────────────────────────────────────────
// NotFoundPage
// ─────────────────────────────────────────────
export default function NotFoundPage({ onNavigate, theme, onThemeChange }) {
  const THEMES = ["light", "dark", "retro", "retrofuture", "aero"];
  const LABELS = { light: "Light", dark: "Dark", retro: "Retro", retrofuture: "Retro-Fi", aero: "Aero" };

  const quickLinks = [
    { icon: "⬛", label: "Dashboard", id: "dashboard" },
    { icon: "⇄", label: "Transactions", id: "transactions" },
    { icon: "◈", label: "Assets", id: "assets" },
    { icon: "◎", label: "Goals", id: "goals" },
    { icon: "✦", label: "Intelligence", id: "intelligence" },
  ];

  return (
    <div className="e404-shell">
      {/* Theme picker */}
      <div style={{ position: "fixed", top: 16, right: 16, zIndex: 600 }}>
        <div className="theme-sw">
          {THEMES.map((t) => (
            <button key={t} className={`t-btn${theme === t ? " on" : ""}`} onClick={() => onThemeChange(t)}>
              {LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      <div className="e404-code">
        <span className="e404-glitch" data-text="404">
          404
        </span>
      </div>

      <div className="e404-title">Page not found</div>
      <div className="e404-sub">
        The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
      </div>

      <div className="e404-actions">
        <button className="btn btn-primary" onClick={() => onNavigate("dashboard")}>
          ← Back to Dashboard
        </button>
        <button className="btn btn-ghost" onClick={() => onNavigate("login")}>
          Sign out
        </button>
      </div>

      <div className="e404-card">
        <div className="e404-nav-title">Quick navigation</div>
        <div className="e404-nav-links">
          {quickLinks.map((l) => (
            <div key={l.id} className="e404-nav-link" onClick={() => onNavigate(l.id)}>
              <span className="e404-nav-link-icon">{l.icon}</span>
              {l.label}
              <span style={{ marginLeft: "auto", color: "var(--text-3)", fontSize: 12 }}>→</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
