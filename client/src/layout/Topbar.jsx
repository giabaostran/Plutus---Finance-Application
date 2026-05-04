// ── Topbar ─────────────────────────────────
export function Topbar({ title, theme, onThemeChange, onHamburger }) {
  const THEMES = ["light", "dark", "retro"];
  return (
    <header className="topbar">
      <button className="tb-hamburger" onClick={onHamburger}>
        <span />
        <span />
        <span />
      </button>
      <div className="tb-title">{title}</div>
      <div className="tb-right">
        <div className="theme-sw">
          {THEMES.map((t) => (
            <button key={t} className={`t-btn${theme === t ? " on" : ""}`} onClick={() => onThemeChange(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div
          className="tb-icon"
          title="Cycle theme"
          onClick={() => onThemeChange(THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length])}
        >
          ◑
        </div>
        <div className="tb-icon">🔔</div>
      </div>
    </header>
  );
}
