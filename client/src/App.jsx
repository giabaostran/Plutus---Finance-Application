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

import "./App.css";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [theme, setTheme] = useState("light");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const data = INITIAL_DATA;

  // Apply theme to <html> element for CSS variable inheritance
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const PAGE_TITLES = {
    dashboard: "Dashboard",
    transactions: "Transactions",
    assets: "Assets",
    goals: "Goals",
    intelligence: "Intelligence",
  };

  const navigate = useCallback((page) => {
    setActivePage(page);
    setSidebarOpen(false);
  }, []);

  return (
    <>
      <Sidebar
        navItems={data.navItems}
        activePage={activePage}
        onNavigate={navigate}
        user={data.user}
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
            <DashboardPage data={data} onNavigate={navigate} />
          </div>
          <div className={`page ${activePage === "transactions" ? "on" : ""}`}>
            <TransactionsPage transactions={data.transactions} txSummary={data.txSummary} />
          </div>
          <div className={`page ${activePage === "assets" ? "on" : ""}`}>
            <AssetsPage assets={data.assets} assetKpis={data.assetKpis} assetTypeOptions={data.assetTypeOptions} />
          </div>
          <div className={`page ${activePage === "goals" ? "on" : ""}`}>
            <GoalsPage
              goals={data.goals}
              completedGoals={data.completedGoals}
              goalCategoryOptions={data.goalCategoryOptions}
            />
          </div>
          <div className={`page ${activePage === "intelligence" ? "on" : ""}`}>
            <IntelligencePage insights={data.insights} aiResponses={data.aiResponses} />
          </div>
        </div>

        <BottomNav navItems={data.navItems} activePage={activePage} onNavigate={navigate} />
      </div>
    </>
  );
}
