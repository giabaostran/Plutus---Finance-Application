import { useState, useEffect, useCallback } from "react";

import Sidebar from "@/layout/Sidebar";
import Topbar from "@/layout/Topbar";
import BottomNav from "@/layout/BottomNav";

import DashboardPage from "@/page/DashboardPage";
import TransactionsPage from "@/page/TransactionsPage";
import AssetsPage from "@/page/AssetsPage";
import GoalsPage from "@/page/GoalsPage";
import IntelligencePage from "@/page/IntelligencePage";
import LoginPage from "./page/LoginPage";

import { INITIAL_DATA } from "@/data/data";
import { NAV_ITEMS, PAGE_TITLES, APP_PAGES } from "@/data/configData";

import "./App.css";
import { login } from "./api/login";

export default function App() {
  // "login" | "dashboard" | "transactions" | "assets" | "goals" | "intelligence" | "404"
  const [route, setRoute] = useState("login");
  const [theme, setTheme] = useState(() => localStorage.getItem("data-theme") || "light");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const data = INITIAL_DATA;

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const navigate = useCallback((page) => {
    if (page === "login") {
      setToken();
      setRoute("login");
      return;
    }

    if (APP_PAGES.includes(page)) {
      setRoute(page);
      setSidebarOpen(false);
      return;
    }

    // Unknown route → 404
    setRoute("404");
    setSidebarOpen(false);
  }, []);

  const handleLogin = async ({ email, password }) => {
    const data = await login({ email, password });
    if (data.accessToken) {
      setToken(data.accessToken);
      setUser(data.user);
      setRoute("dashboard");
    }
    return data;
  };

  // ── Login ─────────────────────────────────
  if (!token || route === "login") {
    return <LoginPage onLogin={handleLogin} theme={theme} onThemeChange={setTheme} />;
  }

  // ── 404 ───────────────────────────────────
  if (route === "404") {
    return <NotFoundPage onNavigate={navigate} theme={theme} onThemeChange={setTheme} />;
  }

  // ── Main App ──────────────────────────────
  return (
    <>
      <Sidebar
        navItems={NAV_ITEMS}
        route={route}
        onNavigate={navigate}
        user={user}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="shell">
        <Topbar
          title={PAGE_TITLES[route]}
          theme={theme}
          onThemeChange={setTheme}
          onHamburger={() => setSidebarOpen(true)}
        />

        <div className="pages">
          <div className={`page ${route === "dashboard" ? "on" : ""}`}>
            <DashboardPage data={INITIAL_DATA} onNavigate={navigate} />
          </div>
          <div className={`page ${route === "transactions" ? "on" : ""}`}>
            <TransactionsPage transactions={INITIAL_DATA.transactions} txSummary={INITIAL_DATA.txSummary} />
          </div>
          <div className={`page ${route === "assets" ? "on" : ""}`}>
            <AssetsPage
              assets={INITIAL_DATA.assets}
              assetKpis={INITIAL_DATA.assetKpis}
              assetTypeOptions={INITIAL_DATA.assetTypeOptions}
            />
          </div>
          <div className={`page ${route === "goals" ? "on" : ""}`}>
            <GoalsPage
              goals={INITIAL_DATA.goals}
              completedGoals={INITIAL_DATA.completedGoals}
              goalCategoryOptions={INITIAL_DATA.goalCategoryOptions}
            />
          </div>
          <div className={`page ${route === "intelligence" ? "on" : ""}`}>
            <IntelligencePage insights={INITIAL_DATA.insights} aiResponses={INITIAL_DATA.aiResponses} />
          </div>
        </div>

        <BottomNav navItems={NAV_ITEMS} route={route} onNavigate={navigate} />
      </div>
    </>
  );
}
