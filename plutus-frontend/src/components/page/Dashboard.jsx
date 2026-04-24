import React, { Fragment } from "react";
import KpiCard from "@/components/ui/KpiCard";
import RevenueChart from "@/components/ui/RevenueChartCard";
import data from "@/data/revenueAndExpense.json";
import AllocationChart from "@/components/ui/AllocationChartCard";
import TransactionTable from "@/components/ui/TransactionTable";
import BudgetCard from "@/components/ui/BudgetCard";
export default function Dashboard() {
  return (
    <Fragment>
      <div className="kpi-grid">
        <KpiCard />
      </div>
      <div className="row">
        <RevenueChart />
        <AllocationChart />
      </div>

      <div className="row">
        <TransactionTable />
        <BudgetCard />
      </div>

      
    </Fragment>
  );
}
