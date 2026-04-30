import React from "react";
import data from "@/config/kpis.json";
import "./Kpis.css";

export default function Kpis() {
  return (
    <>
      {data.kpis.map((kpi) => (
        <KpiCard key={kpi.id} {...kpi} />
      ))}
    </>
  );
}
function KpiCard({ label, icon, value, trend, delta, status, color }) {
  // Logic to convert trend array [28, 22...] to SVG points "0,28 20,22..."
  const generatePoints = (data) =>
    data.map((y, i) => `${i * 20},${y}`).join(" ");

  const linePoints = generatePoints(trend);
  const areaPoints = `${linePoints} 120,32 0,32`;
  const colorClass = color === "green" ? "g" : "r";

  return (
    <div className="kpi">
      <div className="kpi-top">
        <div className="kpi-label">{label}</div>
        <div className="kpi-ico">{icon}</div>
      </div>

      <div className="kpi-val">{value}</div>

      <svg className="spark" viewBox="0 0 120 32" preserveAspectRatio="none">
        <polygon className={`sp-area-${colorClass}`} points={areaPoints} />
        <polyline className={`sp-line-${colorClass}`} points={linePoints} />
      </svg>

      <div className="kpi-foot">
        <span className={`delta ${status}`}>{delta}</span>
        <span className="kpi-sub">vs last month</span>
      </div>
    </div>
  );
}
