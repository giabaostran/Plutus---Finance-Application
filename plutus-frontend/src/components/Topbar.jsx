import React, { useEffect, useState, useContext } from "react";
import { getCurrentTimeString } from "@/utils/time";
import { ThemeContext } from "@/stores/ThemeContext";
import data from "@/config/topbar.json";
import "./Topbar.css";

export default function Topbar({ pageTitle = "Dashboard" }) {
  const [time, setTime] = useState(getCurrentTimeString());
  const { theme, setTheme } = useContext(ThemeContext);

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

      <span className="tb-time">{time}</span>

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
