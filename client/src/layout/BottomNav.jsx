// ── BottomNav ──────────────────────────────
export default function BottomNav({ navItems, activePage, onNavigate }) {
  return (
    <nav className="bot-nav">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`bn-item${activePage === item.id ? " on" : ""}`}
          onClick={() => onNavigate(item.id)}
        >
          <span className="bn-ico">{item.icon}</span>
          {item.label.length > 6 ? item.label.slice(0, 5) + "…" : item.label}
        </button>
      ))}
    </nav>
  );
}
