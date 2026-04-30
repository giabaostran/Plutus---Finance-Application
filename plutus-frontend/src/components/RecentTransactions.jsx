import React from "react";
import db from "@/config/transactions.json";

export default function RecentTransactions() {
  // Use the categories map and data array from JSON
  const { categories, data } = db;
  const displayData = data.slice(0, 5);

  return (
    <div className="card">
      <div className="card-hd">
        <div>
          <div className="card-title">Recent Transactions</div>
          <div className="card-sub">Last 7 days</div>
        </div>
        <button
          className="card-act"
          onClick={() => window.nav?.("transactions")}
        >
          View all →
        </button>
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
            {displayData.map((tx) => {
              const cat = categories[tx.category] || {
                icon: "•",
                rgb: "150, 150, 150",
              };
              const isIncome = tx.amount > 0;

              return (
                <tr key={tx.id}>
                  <td>
                    <div
                      className="tx-ico"
                      style={{ background: `rgba(${cat.rgb}, 0.12)` }}
                    >
                      {cat.icon}
                    </div>
                  </td>
                  <td>
                    <div className="tx-name">{tx.name}</div>
                    <div className="tx-sub">{tx.merchant}</div>
                  </td>
                  <td
                    style={{
                      color: "var(--text-2)",
                      fontSize: "12px",
                      fontFamily: "var(--fn-m)",
                    }}
                  >
                    {new Date(tx.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td>
                    <StatusPill status={tx.status} />
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span
                      className={isIncome ? "amt-pos" : "amt-neg"}
                      style={{ fontWeight: "600", fontFamily: "var(--fn-m)" }}
                    >
                      {isIncome ? "+" : "-"}$
                      {Math.abs(tx.amount).toLocaleString()}
                    </span>
                  </td>
                </tr>
              );
            })}
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
