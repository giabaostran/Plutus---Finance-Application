import React, { Fragment } from "react";
import TransactionSummary from "@/components/TransactionSummary/TransactionSummary";
import TransactionTable from "@/components/TransactionTable/TransactionTable";
import "./Page.css";

export default function TransactionPage({ isActive }) {
  return (
    <div className={`page ${isActive ? "on" : ""}`} id="p-transactions">
      <div class="sum-row">
        <TransactionSummary />
      </div>
      <TransactionTable />
    </div>
  );
}
