export default function Sidebar() {
  const user = { name: "Gia Tran", avatar: "ST" };

  return (
    <aside class="sidebar">
      <SidebarLogo />
      <NavSection user={user} />
      <SidebarFooter user={user} />
    </aside>
  );
}

function NavSection({ user }) {
  const sections = {
    Overview: [
      { icon: "▤", title: "Dashboard" },
      { icon: "◈", title: "Analytics" },
      { icon: "◎", title: "Portfolio" },
    ],
    Finance: [
      { icon: "⇄", title: "Transactions" },
      { icon: "◐", title: "Budgets" },
      { icon: "⬡", title: "Investments" },
    ],
    Account: [
      { icon: "◻", title: "Reports" },
      { icon: "⊙", title: "Settings" },
    ],
  };

  return (
    <nav className="nav-section">
      {Object.entries(sections).map(([sectionTitle, items]) => (
        <div key={sectionTitle}>
          <div className="nav-label">{sectionTitle}</div>

          {items.map((item, index) => (
            <div className="nav-item" key={index}>
              <span className="nav-icon">{item.icon}</span>
              {item.title}
            </div>
          ))}
        </div>
      ))}
    </nav>
  );
}

function SidebarFooter({ user }) {
  return (
    <div className="sidebar-footer">
      <div className="user-chip">
        <div className="user-avatar">{user.avatar}</div>
        <div>
          <div className="user-name">{user.name}</div>
        </div>
      </div>
    </div>
  );
}

function SidebarLogo() {
  return (
    <div className="sidebar-logo">
      <div className="logo-mark">P</div>
      PLUTUS
    </div>
  );
}
