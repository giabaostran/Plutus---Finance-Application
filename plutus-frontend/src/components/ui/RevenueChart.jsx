import React from "react";
import data from "../../data/revenueAndExpense.json";


export default function RevenueChart({ data, width = 540, height = 220 }) {
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };

  const maxValue = Math.max(...data.flatMap((d) => [d.revenue, d.expenses]));

  const xStep = (width - padding.left - padding.right) / data.length;

  const yScale = (val) =>
    height - padding.bottom - (val / maxValue) * (height - 60);

  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">Revenue vs Expenses</div>
          <div className="card-sub">Monthly overview</div>
        </div>
        <div className="card-action">Export ↗</div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="main-chart">
        {/* grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((g, i) => (
          <line
            key={i}
            x1={padding.left}
            x2={width - padding.right}
            y1={padding.top + g * (height - 60)}
            y2={padding.top + g * (height - 60)}
            className="chart-grid"
          />
        ))}

        {/* bars + line */}
        {data.map((d, i) => {
          const x = padding.left + i * xStep;

          return (
            <g key={i}>
              {/* revenue */}
              <rect
                x={x}
                y={yScale(d.revenue)}
                width={10}
                height={height - padding.bottom - yScale(d.revenue)}
                className="bar-revenue"
              />

              {/* expenses */}
              <rect
                x={x + 12}
                y={yScale(d.expenses)}
                width={10}
                height={height - padding.bottom - yScale(d.expenses)}
                className="bar-expense"
              />
            </g>
          );
        })}

        {/* profit line */}
        <polyline
          className="line-profit"
          points={data
            .map((d, i) => {
              const x = padding.left + i * xStep + 6;
              const y = yScale(d.revenue - d.expenses);
              return `${x},${y}`;
            })
            .join(" ")}
        />
      </svg>
    </div>
  );
}
