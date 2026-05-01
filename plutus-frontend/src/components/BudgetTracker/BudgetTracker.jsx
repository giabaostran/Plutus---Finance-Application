import React from "react";
import { categories } from "@/config/transactions.json"; // Reuse your category icons

export default function BudgetTracker({ data }) {
  const { title, period, daysLeft, budgets } = data;

  const getBarColor = (percent) => {
    if (percent >= 90) return "var(--red)";
    if (percent >= 70) return "var(--accent)"; // Yellow/Orange
    return "var(--green)";
  };

  return (
    <div className="card">
      <div className="card-hd">
        <div>
          <div className="card-title">{title}</div>
          <div className="card-sub">
            {period} · {daysLeft} days left
          </div>
        </div>
      </div>
      <div className="card-bd">
        <div className="spend-bar">
          {budgets.map((item, i) => {
            const percent = Math.min((item.spent / item.limit) * 100, 100);
            const icon = categories[item.category]?.icon || "•";

            return (
              <div key={i} className="spend-item">
                <div className="spend-row">
                  <span className="spend-label">
                    {icon} {item.label}
                  </span>
                  <span className="spend-val">
                    ${item.spent.toLocaleString()} / ${item.limit.toLocaleString()}
                  </span>
                </div>

                <div
                  className="prog-track"
                  style={{
                    height: "8px",
                    background: "var(--border)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="prog-fill"
                    style={{
                      width: `${percent}%`,
                      background: getBarColor(percent),
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
