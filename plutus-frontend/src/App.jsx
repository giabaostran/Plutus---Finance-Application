import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";

import { ThemeContext } from "@/stores/ThemeContext";
import { AppContext } from "@/stores/AppContext";
import { getTransactions } from "@/utils/api";
import { buildDashboardPayload } from "@/utils/stats";
import Topbar from "@/components/Topbar";
import DashboardPage from "@/pages/DashboardPage";
export default function App() {
  /* ========== THEME ========== */
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* ========== DATA ========== */
  // const [appData, setAppData] = useState({
  //   transactions: [],
  //   monthlyStats: {
  //     netWorth: [],
  //     income: [],
  //     expense: [],
  //     savingRate: [],
  //   },
  //   kpis: {
  //     netWorth: { value: 0, change: 0 },
  //     income: { value: 0, change: 0 },
  //     expense: { value: 0, change: 0 },
  //     savingRate: { value: 0, change: 0 },
  //   },
  // });

  // useEffect(() => {
  //   const tx = getTransactions(); // sync for now
  //   const payload = buildDashboardPayload(tx);
  //   setAppData(payload);
  // }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {/* <AppContext.Provider value={appData}> */}
      {/* id app will act like the body tag itself  */}
      <div id="app" data-theme={theme}>
        {/* ======= <-- SIDEBAR --> =======*/}
        <Sidebar />

        <div className="shell">
          <Topbar />
          <div className="pages">
            <DashboardPage isActive="true" />
          </div>
        </div>
      </div>
      {/* </AppContext.Provider> */}
    </ThemeContext.Provider>
  );
}
