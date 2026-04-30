import React, { Fragment } from "react";
import Kpis from "@/components/kpi/Kpis";
import "./Page.css";
import ChartCard from "@/components/Statistics/ChartCard";
import AllocationCard from "@/components/Statistics/AllocationCard";
import RecentTransactions from "@/components/RecentTransactions";
import BudgetTracker from "@/components/BudgetTracker";

export default function DashboardPage({ isActive }) {
  return (
    <div className={`page ${isActive ? "on" : ""}`} id="p-dashboard">
      {/* <!-- KPI row --> */}
      <div className="g4">
        <Kpis />
      </div>

      {/* <!-- Chart + Donut --> */}
      <div className="g-main">
        <ChartCard />
        <AllocationCard />
      </div>

      <div className="g-main">
        <RecentTransactions />
        <BudgetTracker />
      </div>
    </div>
  );
}
