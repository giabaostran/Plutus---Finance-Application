import React from "react";

/** -----------------------------
 * Sample Data (API-like JSON)
 * ----------------------------- */
const transactions = [
  {
    id: 1,
    name: "Mortgage Payment",
    merchant: "Chase Bank",
    category: "housing",
    date: "2026-04-15",
    status: "completed",
    amount: -2400,
  },
  {
    id: 2,
    name: "Freelance Project",
    merchant: "Stripe Inc.",
    category: "income",
    date: "2026-04-14",
    status: "completed",
    amount: 3500,
  },
  {
    id: 3,
    name: "Whole Foods",
    merchant: "Visa ···4821",
    category: "groceries",
    date: "2026-04-13",
    status: "completed",
    amount: -184,
  },
  {
    id: 4,
    name: "ETF Purchase",
    merchant: "Fidelity",
    category: "investment",
    date: "2026-04-12",
    status: "pending",
    amount: -1000,
  },
  {
    id: 5,
    name: "AWS Services",
    merchant: "Amazon",
    category: "software",
    date: "2026-04-11",
    status: "completed",
    amount: -340,
  },
  {
    id: 6,
    name: "Wire Transfer",
    merchant: "Bank of America",
    category: "transfer",
    date: "2026-04-10",
    status: "failed",
    amount: 5000,
  },
];

/** -----------------------------
 * UI Config (presentation layer)
 * ----------------------------- */
const categoryIcons = {
  housing: "🏠",
  income: "💼",
  groceries: "🛒",
  investment: "◈",
  software: "☁",
  transfer: "✖",
};

const statusConfig = {
  completed: { label: "✓ Completed", class: "completed" },
  pending: { label: "⏳ Pending", class: "pending" },
  failed: { label: "✖ Failed", class: "failed" },
};

const getAmountClass = (amount) => {
  if (amount > 0) return "amount-pos";
  if (amount < 0) return "amount-neg";
  return "amount-neu";
};

/** -----------------------------
 * Row Component
 * ----------------------------- */
function TransactionRow({ tx }) {
  const icon = categoryIcons[tx.category] || "•";
  const status = statusConfig[tx.status];

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

      <td style={{ color: "var(--text-secondary)" }}>
        {tx.category}
      </td>

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
        <span className={`status-pill ${status.class}`}>
          {status.label}
        </span>
      </td>

      <td style={{ textAlign: "right" }}>
        <span className={getAmountClass(tx.amount)}>
          {tx.amount > 0 ? "+" : ""}
          ${Math.abs(tx.amount).toLocaleString()}
        </span>
      </td>
    </tr>
  );
}

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