import React from "react";
import stats from "@/config/transactionSummary.json";
import "./TransactionSummary.css"
export default function TransactionSummary() {
  return (
    <>
      {stats.map((item, index) => (
        <div key={index} className="sum-cell">
          <div className="sum-label">{item.label}</div>
          <div className={`sum-val ${item.type}`}>{item.val}</div>
          <div className="sum-sub">{item.sub}</div>
        </div>
      ))}
    </>
  );
}
