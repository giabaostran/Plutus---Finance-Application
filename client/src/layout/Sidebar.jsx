// ── Sidebar ────────────────────────────────
export default function Sidebar({ navItems, activePage, onNavigate, user, isOpen, onClose }) {
  const sections = [...new Set(navItems.map((n) => n.section))];
  return (
    <>
      <div className={`sb-backdrop${isOpen ? " on" : ""}`} onClick={onClose} />
      <aside className={`sidebar${isOpen ? " on" : ""}`}>
        <div className="sb-logo">
          <div className="sb-mark">P</div>
          <div className="sb-name">Plutus</div>
        </div>
        <nav className="sb-nav">
          {sections.map((section) => (
            <div key={section}>
              <div className="sb-section">{section}</div>
              {navItems
                .filter((n) => n.section === section)
                .map((item) => (
                  <div
                    key={item.id}
                    className={`sb-item${activePage === item.id ? " active" : ""}`}
                    onClick={() => {
                      onNavigate(item.id);
                      onClose();
                    }}
                  >
                    <div className="sb-active-bar" />
                    <span className="sb-item-icon">{item.icon}</span>
                    {item.label}
                    {item.badge && <span className="sb-badge">{item.badge}</span>}
                  </div>
                ))}
            </div>
          ))}
        </nav>
        <div className="sb-foot">
          <div className="sb-user">
            <div className="sb-avatar">{user.initials}</div>
            <div>
              <div className="sb-uname">{user.name}</div>
              <div className="sb-urole">{user.plan}</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
