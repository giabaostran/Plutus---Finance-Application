import React from "react";
import allocationData from "@/config/allocation.json";
import "./AllocationCard.css";

export default function AllocationCard() {
  const { title, subtitle, totalValue, items } = allocationData;
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

      <div
        className="card-bd"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <div className="donut-wrap">
          <svg viewBox="0 0 130 130" width="130" height="130">
            {/* Background Track */}
            <circle
              cx="65"
              cy="65"
              r={radius}
              fill="none"
              stroke="var(--border)"
              strokeWidth="16"
            />

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
                  style={{ transition: "stroke-dashoffset 0.5s ease" }}
                />
              );
            })}
          </svg>
          <div className="donut-center">
            <div className="donut-val">{totalValue}</div>
            <div className="donut-lbl">Total</div>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="legend-row">
                <div
                  className="leg-dot"
                  style={{ background: item.color }}
                ></div>
                {item.label}
              </div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  fontFamily: "var(--fn-m)",
                  color: "var(--text-1)",
                }}
              >
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
