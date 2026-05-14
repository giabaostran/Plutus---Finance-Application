import { Routes, Route, useLocation } from "react-router-dom";
import { PAGE_TITLES } from "../data/configData";

function MainLayout({ theme }) {
  const location = useLocation();
  const currentRoute = location.pathname.substring(1) || "dashboard";

  return (
    <>
      <Sidebar route={currentRoute} />
      <div className="shell">
        <Topbar title={PAGE_TITLES[currentRoute]} theme={theme} />

        <main className="pages">
          <Routes>
            <Route path="/" element={<DashboardPage data={INITIAL_DATA} />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/assets" element={<AssetsPage />} />
            <Route path="/goals" element={<GoalsPage />} />
            <Route path="/intelligence" element={<IntelligencePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <BottomNav route={currentRoute} />
      </div>
    </>
  );
}
