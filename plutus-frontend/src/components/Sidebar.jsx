import users from "@/config/users.json";
import "./Sidebar.css";
import { NAVIGATION } from "@/config/config";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <SidebarLogo />
      <NavSection />
      <SidebarFooter user={users} />
    </aside>
  );
}

function NavSection() {
  return (
    <nav className="nav-section">
      {NAVIGATION.map(({ section, items }) => (
        <div key={section}>
          <div className="nav-label">{section}</div>
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
          <div className="user-role">{user.motto}</div>
        </div>
      </div>
    </div>
  );
}

function SidebarLogo() {
  return (
    <div className="sidebar-logo">
      {/* <img src="" alt="" /> */}
      {/* <div className="logo-mark">P</div> */}
      PLUTUS
    </div>
  );
}
