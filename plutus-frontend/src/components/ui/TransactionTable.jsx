import React from "react";
import transactions from "@/data/transactionData.json";
import {
  CATEGORY_ICON_CONFIG,
  TRANSACTION_STATUS_CONFIG,
} from "@/data/config.js";

/** -----------------------------
 * Main Table Component
 * ----------------------------- */
export default function TransactionTable() {
  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">Recent Transactions</div>
          <div className="card-sub">
            Last 7 days · {transactions.length} transactions
          </div>
        </div>
        <div className="card-action">View all →</div>
      </div>

      <div className="table-body">
        <table>
          <thead>
            <tr>
              <th>Merchant</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Amount</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx) => (
              <TransactionRow key={tx.id} tx={tx} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** -----------------------------
 * Row Component
 * ----------------------------- */
function TransactionRow({ tx }) {
  const icon = CATEGORY_ICON_CONFIG[tx.category] || "•";
  const status = TRANSACTION_STATUS_CONFIG[tx.status];

  return (
    <tr>
      <td>
        <div className="tx-cell">
          <div className="tx-icon">{icon}</div>
          <div>
            <div className="tx-name">{tx.name}</div>
            <div className="tx-sub">{tx.merchant}</div>
          </div>
        </div>
      </td>

      <td style={{ color: "var(--text-secondary)" }}>{tx.category}</td>

      <td
        style={{
          color: "var(--text-secondary)",
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
        }}
      >
        {new Date(tx.date).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        })}
      </td>

      <td>
        <span className={`status-pill ${status.class}`}>{status.label}</span>
      </td>

      <td style={{ textAlign: "right" }}>
        <span className={getAmountClass(tx.amount)}>
          {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toLocaleString()}
        </span>
      </td>
    </tr>
  );
}

const getAmountClass = (amount) => {
  if (amount > 0) return "amount-pos";
  if (amount < 0) return "amount-neg";
  return "amount-neu";
};
