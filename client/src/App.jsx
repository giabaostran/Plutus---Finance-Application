import { useState, useEffect, useRef, useCallback } from "react";
import { Sidebar } from "@/layout/Sidebar";
import { Topbar } from "@/layout/Topbar";
import { BottomNav } from "@/layout/BottomNav";

import DashboardPage from "@/page/DashboardPage";
import TransactionsPage from "@/page/TransactionsPage";
import AssetsPage from "@/page/AssetsPage";
import GoalsPage from "@/page/GoalsPage";
import IntelligencePage from "@/page/IntelligencePage";

import { INITIAL_DATA } from "@/data/data";
import { NAV_ITEMS, PAGE_TITLES } from "@/data/configData";

import "./App.css";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("data-theme") || "light";
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Apply theme to <html> element for CSS variable inheritance
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("data-theme", theme);
  }, [theme]);

  const navigate = useCallback((page) => {
    setActivePage(page);
    setSidebarOpen(false);
  }, []);

  return (
    <>
      <Sidebar
        navItems={NAV_ITEMS}
        activePage={activePage}
        onNavigate={navigate}
        user={INITIAL_DATA.user}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="shell">
        <Topbar
          title={PAGE_TITLES[activePage]}
          theme={theme}
          onThemeChange={setTheme}
          onHamburger={() => setSidebarOpen(true)}
        />

        <div className="pages">
          <div className={`page ${activePage === "dashboard" ? "on" : ""}`}>
            <DashboardPage data={INITIAL_DATA} onNavigate={navigate} />
          </div>
          <div className={`page ${activePage === "transactions" ? "on" : ""}`}>
            <TransactionsPage
              // transactions={INITIAL_DATA.transactions}
              txSummary={INITIAL_DATA.txSummary}
            />
          </div>
          <div className={`page ${activePage === "assets" ? "on" : ""}`}>
            <AssetsPage
              assets={INITIAL_DATA.assets}
              assetKpis={INITIAL_DATA.assetKpis}
              assetTypeOptions={INITIAL_DATA.assetTypeOptions}
            />
          </div>
          <div className={`page ${activePage === "goals" ? "on" : ""}`}>
            <GoalsPage
              goals={INITIAL_DATA.goals}
              completedGoals={INITIAL_DATA.completedGoals}
              goalCategoryOptions={INITIAL_DATA.goalCategoryOptions}
            />
          </div>
          <div className={`page ${activePage === "intelligence" ? "on" : ""}`}>
            <IntelligencePage insights={INITIAL_DATA.insights} aiResponses={INITIAL_DATA.aiResponses} />
          </div>
        </div>

        <BottomNav navItems={NAV_ITEMS} activePage={activePage} onNavigate={navigate} />
      </div>
    </>
  );
}
