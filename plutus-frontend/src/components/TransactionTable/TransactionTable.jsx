import React from "react";
import { formatTimeString } from "../../utils/time";

export default function TransactionsTable({ data }) {
  const { categories, transactions } = data;
  // Visual limit for the "look" (top 10 entries)
  const displayData = transactions.slice(0, 10);

  return (
    <div className="card">
      {/* Header Section */}
      <div className="card-hd">
        <div>
          <div className="card-title">All Transactions</div>
          <div className="card-sub">April 2026 · {transactions.length} entries</div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="card-act">Export CSV ↗</button>
          <button className="btn btn-primary btn-sm">+ Add</button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="tb-search">
          <span style={{ color: "var(--text-3)" }}>⌕</span>
          <input type="text" placeholder="Search merchant, note…" readOnly />
        </div>
        <select className="tb-sel" disabled>
          <option>All Categories</option>
        </select>
        <select className="tb-sel" disabled>
          <option>All Accounts</option>
        </select>
      </div>

      {/* Filter Chips */}
      <div className="filter-row">
        <button className="f-chip on">All</button>
        <button className="f-chip">Income</button>
        <button className="f-chip">Expenses</button>
        <button className="f-chip">Investments</button>
        <button className="f-chip">Pending</button>
      </div>

      {/* Table Section */}
      <div className="tbl-wrap">
        <table style={{ minWidth: "600px" }}>
          <thead>
            <tr>
              <th style={{ width: "44px" }}></th>
              <th className="sort">Merchant ↓</th>
              <th className="sort">Category</th>
              <th className="sort">Date</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }} className="sort">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((tx) => {
              const isIncome = tx.amount > 0;

              return (
                <tr key={tx.id}>
                  <td>
                    <div className={`tx-ico tx-ico-${tx.category}`}>{categories[tx.category].icon}</div>
                  </td>
                  <td>
                    <div className="tx-name">{tx.name}</div>
                    <div className="tx-sub">{tx.merchant}</div>
                  </td>
                  <td>
                    <div className="tx-sub">{tx.category}</div>
                  </td>
                  <td className="tx-date">{formatTimeString(tx.date)}</td>

                  <td>
                    <span
                      className={`pill ${tx.status === "completed" ? "ok" : tx.status === "pending" ? "pend" : "failed"}`}
                    >
                      {tx.status === "completed" ? "✓ Done" : tx.status === "pending" ? "⏳ Pending" : "✕ Failed"}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span
                      className={isIncome ? "amt-pos" : "amt-neg"}
                      style={{ fontWeight: "600", fontFamily: "var(--fn-m)" }}
                    >
                      {isIncome ? "+" : "-"}${Math.abs(tx.amount).toLocaleString()}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pager Footer */}
      <div className="pager">
        <div className="pager-info">Showing 1–10 of {transactions.length}</div>
        <div className="pager-btns">
          <button className="pg" disabled>
            ←
          </button>
          <button className="pg on">1</button>
          <button className="pg">2</button>
          <button className="pg">3</button>
          <button className="pg">→</button>
        </div>
      </div>
    </div>
  );
}
