import React from "react";

export default function TransactionsCard({ transactions = [] }) {
  return (
    <div className="card">
      {/* Header */}
      <div className="card-head">
        <div>
          <div className="card-title">All Transactions</div>
          <div className="card-sub">April 2026 · Sorted by date</div>
        </div>
        <div className="card-action">Export CSV ↗</div>
      </div>

      {/* Toolbar */}
      <div
        style={{
          padding: "16px 22px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div className="tx-toolbar">
          <div className="tx-search">
            <span>⌕</span>
            <input type="text" placeholder="Search merchant, category…" />
          </div>

          <select className="tx-select">
            <option>All Categories</option>
            <option>Income</option>
            <option>Housing</option>
            <option>Groceries</option>
            <option>Transport</option>
            <option>Software</option>
            <option>Investment</option>
            <option>Entertainment</option>
          </select>

          <select className="tx-select">
            <option>All Accounts</option>
            <option>Visa ···4821</option>
            <option>Chase Bank</option>
            <option>Stripe Inc.</option>
            <option>Fidelity</option>
          </select>
        </div>

        <div className="filter-group">
          {[
            "All",
            "Income",
            "Expenses",
            "Investments",
            "Pending",
            "Failed",
          ].map((label) => (
            <button
              key={label}
              className={`filter-btn ${label === "All" ? "active" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="tx-table-wrap">
        <table className="tx-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}></th>
              <th className="sortable">
                Merchant <span className="sort-arrow active">↓</span>
              </th>
              <th className="sortable">Category</th>
              <th className="sortable">Account</th>
              <th className="sortable">
                Date <span className="sort-arrow">↑</span>
              </th>
              <th className="sortable">Status</th>
              <th className="sortable" style={{ textAlign: "right" }}>
                Amount <span className="sort-arrow">↑</span>
              </th>
              <th style={{ width: 40 }}></th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td></td>

                <td>
                  <div style={{ fontWeight: 500 }}>{tx.name}</div>
                  <div style={{ fontSize: 12, opacity: 0.6 }}>
                    {tx.merchant}
                  </div>
                </td>

                <td style={{ textTransform: "capitalize" }}>{tx.category}</td>

                <td>{tx.merchant}</td>

                <td>{tx.date}</td>

                <td>
                  <span
                    className={`status ${
                      tx.status === "completed"
                        ? "success"
                        : tx.status === "pending"
                          ? "warning"
                          : "error"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>

                <td
                  style={{
                    textAlign: "right",
                    color: tx.amount < 0 ? "#e74c3c" : "#2ecc71",
                    fontWeight: 600,
                  }}
                >
                  {tx.amount < 0 ? "-" : "+"}$
                  {Math.abs(tx.amount).toLocaleString()}
                </td>

                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <div className="pagination-info">
          Showing 1–10 of {transactions.length} transactions
        </div>

        <div className="pagination-btns">
          <button className="pg-btn" disabled>
            ←
          </button>
          <button className="pg-btn active">1</button>
          <button className="pg-btn">2</button>
          <button className="pg-btn">3</button>
          <button className="pg-btn">→</button>
        </div>
      </div>
    </div>
  );
}
