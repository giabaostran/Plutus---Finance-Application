import React from "react";

/** -----------------------------
 * Data (API-ready)
 * ----------------------------- */
const kpis = [
  {
    id: 1,
    label: "Net Worth",
    value: "$248,540",
    icon: "💼",
    color: "blue",
    trend: "up",
    delta: "+8.4%",
    sub: "vs last month",
    data: [30, 25, 22, 18, 20, 14, 10, 8, 4],
    type: "green",
  },
  {
    id: 2,
    label: "Monthly Income",
    value: "$14,280",
    icon: "↑",
    color: "green",
    trend: "up",
    delta: "+3.2%",
    sub: "vs last month",
    data: [28, 24, 26, 20, 18, 22, 14, 12, 10],
    type: "green",
  },
  {
    id: 3,
    label: "Total Expenses",
    value: "$6,842",
    icon: "↓",
    color: "orange",
    trend: "down",
    delta: "+5.1%",
    sub: "vs last month",
    data: [12, 16, 14, 20, 16, 22, 18, 24, 28],
    type: "red",
  },
  {
    id: 4,
    label: "Savings Rate",
    value: "52.1%",
    icon: "◈",
    color: "purple",
    trend: "up",
    delta: "+2.8pp",
    sub: "vs last month",
    data: [22, 20, 24, 16, 18, 12, 14, 10, 8],
    type: "green",
  },
];

/** -----------------------------
 * Sparkline Generator
 * ----------------------------- */
function getPoints(data) {
  const step = 120 / (data.length - 1);

  const line = data
    .map((val, i) => `${i * step},${val}`)
    .join(" ");

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
        <polygon
          className={`spark-area-${kpi.type}`}
          points={area}
        />
        <polyline
          className={`spark-path-${kpi.type}`}
          points={line}
        />
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
  return (
    <>
      {kpis.map((kpi) => (
        <KpiItem key={kpi.id} kpi={kpi} />
      ))}
    </>
  );
}