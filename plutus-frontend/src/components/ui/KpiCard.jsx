import React, { useContext } from "react";
import { AppContext } from "@/stores/AppContext";


/** -----------------------------
 * Sparkline Generator
 * ----------------------------- */
function getPoints(data) {
  if (!data.length) return { line: "", area: "" };

  const max = Math.max(...data);
  const min = Math.min(...data);

  const normalize = (val) => {
    if (max === min) return 18;
    return 36 - ((val - min) / (max - min)) * 36;
  };

  const step = 120 / (data.length - 1 || 1);

  const line = data.map((val, i) => `${i * step},${normalize(val)}`).join(" ");
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

      <svg className="sparkline" viewBox="0 0 120 36" preserveAspectRatio="none">
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
  const { kpis, monthlyStats } = useContext(AppContext);

  if (!kpis || !monthlyStats) return null;

  const formattedKpis = [
    {
      id: 1,
      label: "Net Worth",
      value: `$${kpis.netWorth.value.toLocaleString()}`,
      delta: `${(kpis.netWorth.change * 100).toFixed(1)}%`,
      trend: kpis.netWorth.change >= 0 ? "up" : "down",
      sub: "vs last month",
      data: monthlyStats.netWorth,
      icon: "💼",
      color: "blue",
      type: "green",
    },
    {
      id: 2,
      label: "Monthly Income",
      value: `$${kpis.income.value.toLocaleString()}`,
      delta: `${(kpis.income.change * 100).toFixed(1)}%`,
      trend: kpis.income.change >= 0 ? "up" : "down",
      sub: "vs last month",
      data: monthlyStats.income,
      icon: "↑",
      color: "green",
      type: "green",
    },
    {
      id: 3,
      label: "Total Expenses",
      value: `$${kpis.expense.value.toLocaleString()}`,
      delta: `${(kpis.expense.change * 100).toFixed(1)}%`,
      trend: kpis.expense.change >= 0 ? "down" : "up",
      sub: "vs last month",
      data: monthlyStats.expense.map(Math.abs),
      icon: "↓",
      color: "red",
      type: "red",
    },
    {
      id: 4,
      label: "Savings Rate",
      value: `${(kpis.savingRate.value * 100).toFixed(1)}%`,
      delta: `${(kpis.savingRate.change * 100).toFixed(1)}pp`,
      trend: kpis.savingRate.change >= 0 ? "up" : "down",
      sub: "vs last month",
      data: monthlyStats.savingRate,
      icon: "◈",
      color: "purple",
      type: "green",
    },
  ];

  return (
    <>
      {formattedKpis.map((kpi) => (
        <KpiItem key={kpi.id} kpi={kpi} />
      ))}
    </>
  );
}