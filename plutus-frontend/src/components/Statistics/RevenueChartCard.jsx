import React from "react";

import data from "@/config/revenueAndExpense.json";

/** -----------------------------
 * Helpers (match old layout)
 * ----------------------------- */
const MAX = 20000;
const CHART_HEIGHT = 160;

const getY = (val) => 20 + (CHART_HEIGHT - (val / MAX) * CHART_HEIGHT);

export default function RevenueChart() {
  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">Revenue vs Expenses</div>
          <div className="card-sub">Monthly overview · Jan – Jun 2026</div>
        </div>
        <div className="card-action">Export ↗</div>
      </div>

      <div className="chart-body">
        {/* Legend (unchanged) */}
        <div className="chart-legend">
          <div className="legend-item">
            <div
              className="legend-dot"
              style={{ background: "var(--chart-1)" }}
            ></div>
            Revenue
          </div>
          <div className="legend-item">
            <div
              className="legend-dot"
              style={{ background: "var(--chart-2)" }}
            ></div>
            Expenses
          </div>
          <div className="legend-item">
            <div
              className="legend-dot"
              style={{ background: "var(--chart-3)" }}
            ></div>
            Net Profit
          </div>
        </div>

        <svg
          className="main-chart"
          viewBox="0 0 540 220"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines (unchanged) */}
          {[20, 60, 100, 140, 180].map((y) => (
            <line
              key={y}
              className="chart-grid"
              x1="50"
              y1={y}
              x2="530"
              y2={y}
            />
          ))}

          {/* Y axis labels */}
          {[20000, 16000, 12000, 8000, 4000].map((val, i) => (
            <g key={val} className="chart-axis">
              <text x="42" y={24 + i * 40} textAnchor="end">
                ${val / 1000}k
              </text>
            </g>
          ))}

          {/* X axis labels */}
          {data.map((d, i) => (
            <g key={d.month} className="chart-axis">
              <text x={100 + i * 80} y="208" textAnchor="middle">
                {d.month}
              </text>
            </g>
          ))}

          {/* Revenue bars */}
          {data.map((d, i) => {
            const x = 68 + i * 80;
            const y = getY(d.revenue);

            return (
              <rect
                key={`rev-${i}`}
                className="bar-revenue"
                x={x}
                y={y}
                width="28"
                height={180 - y}
                rx="3"
              />
            );
          })}

          {/* Expense bars */}
          {data.map((d, i) => {
            const x = 100 + i * 80;
            const y = getY(d.expenses);

            return (
              <rect
                key={`exp-${i}`}
                className="bar-expense"
                x={x}
                y={y}
                width="28"
                height={180 - y}
                rx="3"
              />
            );
          })}

          {/* Profit line */}
          <polyline
            className="line-profit"
            points={data
              .map((d, i) => {
                const x = 100 + i * 80;
                const y = getY(d.revenue - d.expenses);
                return `${x},${y}`;
              })
              .join(" ")}
          />

          {/* Profit dots */}
          {data.map((d, i) => {
            const x = 100 + i * 80;
            const y = getY(d.revenue - d.expenses);

            return (
              <circle
                key={`dot-${i}`}
                className="dot-profit"
                cx={x}
                cy={y}
                r="4"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
