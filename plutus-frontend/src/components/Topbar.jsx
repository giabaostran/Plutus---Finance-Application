import { useEffect, useState } from "react";
import { getCurrentTimeString } from "@/utils/time";
import { ThemeContext } from "@/stores/ThemeContext";
import { useContext } from "react";
import { THEMES } from "@/data/config";

export default function Topbar() {
  const [time, setTime] = useState(getCurrentTimeString());
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getCurrentTimeString());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1>Dashboard</h1>
        <span>{time}</span>
      </div>

      <div className="topbar-right">
        <div className="theme-switcher">
          {THEMES.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => {
                setTheme(value);
              }}
              className={`theme-btn ${theme === value ? "active" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="topbar-search">⌕ Search…</div>
        <div className="icon-btn">🔔</div>
        <div className="icon-btn">⚙</div>
      </div>
    </header>
  );
}
