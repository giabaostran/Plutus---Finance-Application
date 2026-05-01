import React, { Fragment } from "react";

import kpiData from "@/config/kpis.json";
import Kpis from "@/components/Kpis/Kpis";

import ChartCard from "@/components/ChartCard/ChartCard";
import revenueSpendingData from "@/config/chart.json";

import AllocationCard from "@/components/AllocationCard/AllocationCard";
import allocationData from "@/config/allocation.json";

import RecentTransactions from "@/components/RecentTransactions/RecentTransactions";
import transactionData from "@/config/transactions.json";

import BudgetTracker from "@/components/BudgetTracker/BudgetTracker";
import budgetData from "@/config/budget.json";

import "./Page.css";

export default function DashboardPage({ isActive }) {
  return (
    <div className={`page ${isActive ? "on" : ""}`} id="p-dashboard">
      {/* <!-- KPI row --> */}
      <div className="g4">
        <Kpis data={kpiData} />
      </div>

      {/* <!-- Chart + Donut --> */}
      <div className="g-main">
        <ChartCard data={revenueSpendingData} />
        <AllocationCard data={allocationData} />
      </div>

      <div className="g-main">
        <RecentTransactions data={transactionData} />
        <BudgetTracker data={budgetData} />
      </div>
    </div>
  );
}
