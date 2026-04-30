import React from "react";
import budgetData from "@/config/budget.json";
import { categories } from "@/config/transactions.json"; // Reuse your category icons

export default function BudgetTracker() {
  const { title, period, daysLeft, budgets } = budgetData;

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
          <div className="card-sub">{period} · {daysLeft} days left</div>
        </div>
      </div>
      <div className="card-bd">
        <div className="spend-bar" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {budgets.map((item, i) => {
            const percent = Math.min((item.spent / item.limit) * 100, 100);
            const icon = categories[item.category]?.icon || "•";

            return (
              <div key={i} className="spend-item">
                <div className="spend-row" style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  marginBottom: "8px",
                  fontSize: "13px"
                }}>
                  <span className="spend-label">
                    {icon} {item.label}
                  </span>
                  <span className="spend-val" style={{ 
                    fontFamily: "var(--fn-m)", 
                    fontWeight: "600",
                    color: "var(--text-1)"
                  }}>
                    ${item.spent.toLocaleString()} / ${item.limit.toLocaleString()}
                  </span>
                </div>
                
                <div className="prog-track" style={{ 
                  height: "8px", 
                  background: "var(--border)", 
                  borderRadius: "4px",
                  overflow: "hidden" 
                }}>
                  <div
                    className="prog-fill"
                    style={{
                      width: `${percent}%`,
                      height: "100%",
                      background: getBarColor(percent),
                      transition: "width 0.6s ease, background 0.3s ease"
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