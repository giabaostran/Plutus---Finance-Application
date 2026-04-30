import React, { Fragment } from "react";
import KPI from "@/components/kpi/KPI";
import RevenueChart from "@/components/Statistics/RevenueChartCard";
import data from "@/config/revenueAndExpense.json";
import AllocationChart from "@/components/Statistics/AllocationChartCard";
import TransactionTableUpdate from "@/components/Statistics/TransactionTableUpdate";
import BudgetCard from "@/components/Statistics/BudgetCard";

export default function DashboardPage() {
  return (
    <Fragment>

      <KPI />

      <div className="row">
        <RevenueChart />
        <AllocationChart />
      </div>

      <div className="row">
        <TransactionTableUpdate />
        <BudgetCard />
      </div>
    </Fragment>

  );
}
