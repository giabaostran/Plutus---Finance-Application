import React from "react";
import { formatTimeString } from "../utils/time";
import { Link } from "react-router-dom";

export default function RecentTransactions({ data }) {
  const { categories, transactions } = data;
  const displayData = transactions.slice(0, 7);

  return (
    <div className="card">
      <div className="card-hd">
        <div>
          <div className="card-title">Recent Transactions</div>
          <div className="card-sub">Last 7 days</div>
        </div>
        {/* Use 'as={Link}' or style the Link directly to avoid nested button issues */}
        <Link to="/transactions" className="card-act">
          View all →
        </Link>
      </div>

      <div className="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th />
              <th>Merchant</th>
              <th>Date</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((tx) => (
              /* Pass categories explicitly as a prop */
              <TransactionRow key={tx.id} {...tx} categories={categories} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const config = {
    completed: { cls: "ok", txt: "✓ Done" },
    pending: { cls: "pend", txt: "⏳ Pending" },
    failed: { cls: "failed", txt: "✕ Failed" },
  }[status] || { cls: "pend", txt: status };

  return <span className={`pill ${config.cls}`}>{config.txt}</span>;
}

function TransactionRow({ category, name, merchant, date, status, amount, categories }) {
  const isIncome = amount > 0;

  // Safely access the icon in case category doesn't exist in the map
  const icon = categories[category]?.icon || "💰";

  return (
    <tr>
      <td>
        <div className={`tx-ico tx-ico-${category}`}>{icon}</div>
      </td>
      <td>
        <div className="tx-name">{name}</div>
        <div className="tx-sub">{merchant}</div>
      </td>
      <td className="tx-date">{formatTimeString(date)}</td>
      <td>
        <StatusPill status={status} />
      </td>
      <td style={{ textAlign: "right" }}>
        <span className={isIncome ? "amt-pos" : "amt-neg"} style={{ fontWeight: "600", fontFamily: "var(--fn-m)" }}>
          {isIncome ? "+" : "-"}${Math.abs(amount).toLocaleString()}
        </span>
      </td>
    </tr>
  );
}
