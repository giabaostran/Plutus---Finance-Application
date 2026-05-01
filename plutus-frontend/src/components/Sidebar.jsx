import React, { useState } from "react";
import data from "@/config/sidebar.json";
import { Link, useLocation } from "react-router-dom";


export default function Sidebar() {
  // Empty stands for the default dashboard
  const location = useLocation();
  const activeTab = location.pathname === "/" ? "" : location.pathname.substring(1);

  return (
    <aside className="sidebar" id="sb">
      <NavLogo />
      <nav className="sb-nav">
        {data.navigation.map((section) => (
          <NavSection key={section.section} section={section} activeTab={activeTab} />
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
        <NavItem key={item.id} item={item} isActive={activeTab === item.id} onClick={() => onItemClick(item.id)} />
      ))}
    </>
  );
}

// 2. Pure UI for a single Nav Link
function NavItem({ item, isActive }) {
  return (
    <Link to={`/${item.id}`}>
      <div className={`sb-item ${isActive ? "active" : ""}`}>
        <div className="sb-active-bar"></div>
        <span className="sb-item-icon">{item.icon}</span>
        {item.label}
        {item.badge && <span className="sb-badge">{item.badge}</span>}
      </div>
    </Link>
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
