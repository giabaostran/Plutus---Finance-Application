import React from "react";
import "./Kpis.css";

export default function Kpis({ data }) {
  // Defensive check to ensure data exists before mapping
  if (!data || !data.kpis) return null;

  return (
    <>
      {data.kpis.map((kpi) => (
        <KpiCard key={kpi.id} {...kpi} />
      ))}
    </>
  );
}

function KpiCard({ label, icon, value, trend, delta }) {
  // 1. Improved Logic: Handle 'blue' or other colors gracefully

  const colorClass = delta > 0 ? "g" : "r";
  const trendIcon = delta > 0 ? "+" : "-";
  const trendStatus = delta > 0 ? "up" : "dn";

  // 2. Dynamic Point Generation: Ensures points fit the 120px width regardless of array length
  const generatePoints = (data) => {
    if (!data || data.length < 2) return "";
    const xStep = 120 / (data.length - 1);
    return data.map((y, i) => `${i * xStep},${y}`).join(" ");
  };

  const linePoints = generatePoints(trend);
  // 3. Area points: Close the polygon at the bottom-right (120,32) and bottom-left (0,32)
  const areaPoints = linePoints ? `${linePoints} 120,32 0,32` : "";

  return (
    <div className="kpi">
      <div className="kpi-top">
        <div className="kpi-label">{label}</div>
        <div className="kpi-ico">{icon}</div>
      </div>

      <div className="kpi-val">{value}</div>

      {trend && trend.length > 0 && (
        <svg className="spark" viewBox="0 0 120 32" preserveAspectRatio="none">
          <polygon className={`sp-area-${colorClass}`} points={areaPoints} />
          <polyline className={`sp-line-${colorClass}`} points={linePoints} />
        </svg>
      )}

      <div className="kpi-foot">
        {/* 4. Use 'status' directly for class handling (up/dn/stable) */}
        <span className={`delta ${trendStatus}`}>
          {trendIcon}
          {Math.abs(delta)}
        </span>
        <span className="kpi-sub">vs last month (in %)</span>
      </div>
    </div>
  );
}
