import React from "react";
import goals from "@/config/budgetTrackData.json"


// ---- COMPONENTS ----

function MiniStat({ label, spent, total }) {
  const percent = Math.min((spent / total) * 100, 100);

  // simple logic for color
  let bg = "";
  if (spent > total) bg = "var(--negative)";
  else if (percent < 50) bg = "var(--positive)";

  return (
    <div>
      <div className="mini-stat">
        <div className="mini-stat-label">{label}</div>
        <div className="mini-stat-val">
          ${spent} / ${total}
        </div>
      </div>

      <div className="mini-stat-bar-track">
        <div
          className="mini-stat-bar-fill"
          style={{ width: `${percent}%`, background: bg }}
        />
      </div>
    </div>
  );
}

export default function BudgetCard() {
  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">Budget Tracker</div>
          <div className="card-sub">April 2026 · 18 days remaining</div>
        </div>
      </div>

      <div className="mini-stats">
        {goals.map((c, i) => (
          <MiniStat key={i} {...c} />
        ))}
      </div>
    </div>
  );
}