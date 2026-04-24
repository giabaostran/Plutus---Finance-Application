import React from "react";
import { getPoints } from "@/utils/kpi";

/** -----------------------------
 * KPI Card Component
 * ----------------------------- */
export default function KpiItem({ kpi }) {
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
