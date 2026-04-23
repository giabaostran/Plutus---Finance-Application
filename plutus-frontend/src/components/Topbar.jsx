import { useEffect, useState } from "react";
import { getCurrentTimeString } from "../utils/time";
import { ThemeContext } from "../hooks/ThemeContext";
import { useContext } from "react";
import themes from "../data/themes.json";

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
          {Object.entries(themes).map(([themeName, themeValue]) => (
            <button
              key={themeValue.class}
              // IMPORTANT: Use an arrow function here to prevent immediate execution
              onClick={() => setTheme(themeValue.class)}
              className={`theme-btn ${theme === themeValue.class ? "active" : ""}`}
            >
              {themeName}
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
