import React, { Fragment } from "react";
import KpiCard from "../ui/KpiCard";
import RevenueChart from "../ui/RevenueChart";
import data from "../../data/revenueAndExpense.json";
import AllocationChart from "../ui/AllocationChart";
import TransactionTable from "../ui/TransactionTable";
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
      </div>
    </Fragment>
  );
}
