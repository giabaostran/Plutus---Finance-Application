import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { getCurrentTimeString } from "@/utils/time";
import { ThemeContext } from "@/stores/ThemeContext";
import data from "@/config/topbar.json";
import "./Topbar.css";

const PAGE_TITLES = {
  "/": "Dashboard",
  "/transactions": "Transaction History",
  "/assets": "Asset Management",
  "/goals": "Financial Goals",
  "/intelligence": "Financial Intelligence",
};

export default function Topbar() {
  const [time, setTime] = useState(getCurrentTimeString());
  const { theme, setTheme } = useContext(ThemeContext);

  // 1. Get the current location object
  const location = useLocation();

  // 2. Determine the title based on the current path
  const pageTitle = PAGE_TITLES[location.pathname] || "My App";

  useEffect(() => {
    const id = setInterval(() => setTime(getCurrentTimeString()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="topbar">
      <div className="tb-hamburger" onClick={() => window.openSB?.()}>
        <span /> <span /> <span />
      </div>

      <div className="tb-title">{pageTitle}</div>

      <DigitalClock />
      
      <div className="tb-right">
        <ThemeSwitcher
          currentTheme={theme}
          onThemeChange={setTheme}
          options={data.themes}
        />

        <div className="tb-icon" title="Switch theme">
          {data.icons.themeCycle}
        </div>

        <div className="tb-icon">{data.icons.notification}</div>
      </div>
    </header>
  );
}

function ThemeSwitcher({ currentTheme, onThemeChange, options }) {
  return (
    <div className="theme-sw">
      {options.map((opt) => (
        <button
          key={opt.id}
          className={`t-btn ${currentTheme === opt.id ? "on" : ""}`}
          onClick={() => onThemeChange(opt.id)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function DigitalClock() {
  const [time, setTime] = useState(getCurrentTimeString());

  useEffect(() => {
    const id = setInterval(() => setTime(getCurrentTimeString()), 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="tb-time">{time}</span>;
}
