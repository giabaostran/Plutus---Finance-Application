import React from "react";
import "./AllocationCard.css";

export default function AllocationCard({ data }) {
  const { title, subtitle, totalValue, items } = data;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;

  return (
    <div className="card">
      <div className="card-hd">
        <div>
          <div className="card-title">{title}</div>
          <div className="card-sub">{subtitle}</div>
        </div>
      </div>

      <div className="card-bd allocation-card-bd">
        <div className="donut-wrap">
          <svg viewBox="0 0 130 130" width="130" height="130">
            {/* Background Track */}
            <circle cx="65" cy="65" r={radius} fill="none" stroke="var(--border)" strokeWidth="16" />

            {/* Dynamic Segments */}
            {items.map((item, i) => {
              const strokeDash = (item.value / 100) * circumference;
              const offset = (cumulativeOffset / 100) * circumference;
              cumulativeOffset += item.value;

              return (
                <circle
                  key={i}
                  cx="65"
                  cy="65"
                  r={radius}
                  fill="none"
                  stroke={item.color}
                  strokeWidth="16"
                  strokeDasharray={`${strokeDash} ${circumference}`}
                  strokeDashoffset={-offset}
                  transform="rotate(-90 65 65)"
                />
              );
            })}
          </svg>
          <div className="donut-center">
            <div className="donut-val">{totalValue}</div>
            <div className="donut-lbl">Total</div>
          </div>
        </div>

        <div className="allocation-chart-legends">
          {items.map((item, i) => (
            <div className="allocation-chart-legend" key={i}>
              <div className="legend-row">
                <div className="leg-dot" style={{ background: item.color }}></div>
                {item.label}
              </div>
              <span className="allocation-chart-percent">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
