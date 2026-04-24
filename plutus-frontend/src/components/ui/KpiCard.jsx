import React from "react";
import kpis from "@/data/kpiData.json";
import {calculateMonthlyStats} from "@/utils/kpi";
import transactions from "@/data/transactionData.json"
/** -----------------------------
 * Sparkline Generator
 * ----------------------------- */
function getPoints(data) {
  const step = 120 / (data.length - 1);

  const line = data.map((val, i) => `${i * step},${val}`).join(" ");

  const area = `${line} 120,36 0,36`;

  return { line, area };
}

/** -----------------------------
 * KPI Card Component
 * ----------------------------- */
function KpiItem({ kpi }) {
  const { line, area } = getPoints(kpi.data);

  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <div className="kpi-label">{kpi.label}</div>
        <div className={`kpi-icon ${kpi.color}`}>{kpi.icon}</div>
      </div>

      <div className="kpi-value">{kpi.value}</div>

      <svg
        className="sparkline"
        viewBox="0 0 120 36"
        preserveAspectRatio="none"
      >
        <polygon className={`spark-area-${kpi.type}`} points={area} />
        <polyline className={`spark-path-${kpi.type}`} points={line} />
      </svg>

      <div className="kpi-footer">
        <span className={`kpi-delta ${kpi.trend}`}>
          {kpi.trend === "up" ? "▲" : "▼"} {kpi.delta}
        </span>
        <span className="kpi-sub">{kpi.sub}</span>
      </div>
    </div>
  );
}

/** -----------------------------
 * Main Component
 * ----------------------------- */
export default function KpiCard() {
  console.log(calculateMonthlyStats(transactions))
  return (
    <>
      {kpis.map((kpi) => (
        <KpiItem key={kpi.id} kpi={kpi} />
      ))}
    </>
  );
}
