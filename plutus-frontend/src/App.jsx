import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { useState, useEffect } from "react";
import "./App.css";
import { ThemeContext } from "@/stores/ThemeContext";
import { AppContext } from "@/stores/AppContext";
import { getTransactions } from "@/utils/api";
import { buildDashboardPayload } from "@/utils/stats";

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

  /* ========== STATE MANAGER FOR EVERYTHING ========== */
  const transactions = getTransactions();
  const userPayload = buildDashboardPayload(transactions);
  console.log(userPayload);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <AppContext.Provider value={{ ...userPayload }}>
        <div id="app" data-theme={theme}>
          <Sidebar />
          <Main />
        </div>
      </AppContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
