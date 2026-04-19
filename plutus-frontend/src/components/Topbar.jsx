import { useEffect, useState } from "react";
import { getCurrentTimeString } from "../utils/time";

export default function Topbar() {
  const [time, setTime] = useState(getCurrentTimeString());

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
          <button className="theme-btn active">Light</button>
          <button className="theme-btn">Dark</button>
          <button className="theme-btn">Retro</button>
        </div>

        <div className="topbar-search">⌕ Search…</div>
        <div className="icon-btn">🔔</div>
        <div className="icon-btn">⚙</div>
      </div>
    </header>
  );
}
