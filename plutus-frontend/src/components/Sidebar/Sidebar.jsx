import React, { useState } from "react";
import data from "@/config/sidebar.json";
import { useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  // Empty stands for the default dashboard
  let initialPath =
    useLocation().pathname === "/" ? "" : useLocation().pathname.substring(1);
  const [activeTab, setActiveTab] = useState(initialPath);

  return (
    <aside className="sidebar" id="sb">
      <NavLogo />
      <nav className="sb-nav">
        {data.navigation.map((section) => (
          <NavSection
            key={section.section}
            section={section}
            activeTab={activeTab}
            onItemClick={setActiveTab}
          />
        ))}
      </nav>
      <SidebarFooter user={data.user} />
    </aside>
  );
}
// 0. Handles the Section Logo
function NavLogo() {
  return (
    <div className="sb-logo">
      <div className="sb-mark">P</div>
      <div className="sb-name">lutus</div>
    </div>
  );
}

// 1. Handles the Section grouping
function NavSection({ section, activeTab, onItemClick }) {
  return (
    <>
      <div className="sb-section">{section.section}</div>
      {section.items.map((item) => (
        <NavItem
          key={item.id}
          item={item}
          isActive={activeTab === item.id}
          onClick={() => onItemClick(item.id)}
        />
      ))}
    </>
  );
}

// 2. Pure UI for a single Nav Link
function NavItem({ item, isActive, onClick }) {
  return (
    <a href={`/${item.id}`}>
      <div className={`sb-item ${isActive ? "on" : ""}`} onClick={onClick}>
        <div className="sb-active-bar"></div>
        <span className="sb-item-icon">{item.icon}</span>
        {item.label}
        {item.badge && <span className="sb-badge">{item.badge}</span>}
      </div>
    </a>
  );
}

// 3. User Profile / Bottom Section
function SidebarFooter({ user }) {
  return (
    <div className="sb-foot">
      <div className="sb-user">
        <div className="sb-avatar">{user.initials}</div>
        <div>
          <div className="sb-uname">{user.name}</div>
          <div className="sb-urole">{user.plan}</div>
        </div>
      </div>
    </div>
  );
}
