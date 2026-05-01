import React, { Fragment } from "react";

import TransactionSummary from "@/components/TransactionSummary/TransactionSummary";
import transactionSummaryData from "@/config/transactionSummary.json";

import TransactionTable from "@/components/TransactionTable/TransactionTable";
import transactionData from "@/config/transactions.json";

import "./Page.css";

export default function TransactionPage({ isActive }) {
  return (
    <div className={`page ${isActive ? "on" : ""}`} id="p-transactions">
      <div className="sum-row">
        <TransactionSummary data={transactionSummaryData} />
      </div>
      <TransactionTable data={transactionData}/>
    </div>
  );
}
