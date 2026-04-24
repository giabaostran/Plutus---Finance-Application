import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { useState, useEffect } from "react";
import "./App.css";
import { ThemeContext } from "@/stores/ThemeContext";

function App() {
  /* ========== STATE MANAGER FOR THE THEME SELECTOR ========== */
  const currentChosenTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(() => {
    //If none was stored before then use light as default
    return localStorage.getItem("theme") || "light";
  });
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* ========== STATE MANAGER FOR THE THEME SELECTOR ========== */

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div id="app" data-theme={theme}>
        <Sidebar />
        <Main />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
