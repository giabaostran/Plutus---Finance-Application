import React from "react";
import "./TransactionSummary.css";
export default function TransactionSummary({ data }) {
  return (
    <>
      {data.map((item, index) => (
        <div key={index} className="sum-cell">
          <div className="sum-label">{item.label}</div>
          <div className={`sum-val ${item.type}`}>{item.val}</div>
          <div className="sum-sub">{item.sub}</div>
        </div>
      ))}
    </>
  );
}
