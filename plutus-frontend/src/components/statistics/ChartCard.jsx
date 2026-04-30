import React from "react";
import chartData from "@/config/chart.json";
import "./ChartCard.css";

export default function ChartCard() {
  const { title, subtitle, labels, yAxis, datasets } = chartData;

  // Configuration for spacing
  const xOffset = 50;
  const xSpacing = 80;
  const chartHeight = 170; // Bottom line Y coordinate

  return (
    <div className="card">
      <div className="card-hd">
        <div>
          <div className="card-title">{title}</div>
          <div className="card-sub">{subtitle}</div>
        </div>
        <button
          className="card-act"
          onClick={() => console.log("Exporting...")}
        >
          Export ↗
        </button>
      </div>

      <div className="card-bd">
        <ChartLegend datasets={datasets} />

        <svg
          className="chart"
          viewBox="0 0 540 210"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background Grid Lines */}
          {[20, 60, 100, 140, 170].map((y, i) => (
            <line key={i} className="cg" x1="50" y1={y} x2="530" y2={y} />
          ))}

          {/* Y Axis Labels */}
          <g className="ct">
            {yAxis.map((val, i) => (
              <text key={i} x="42" y={24 + i * 40} textAnchor="end">
                {val}
              </text>
            ))}
          </g>

          {/* X Axis Labels */}
          <g className="ct">
            {labels.map((month, i) => (
              <text key={i} x={100 + i * xSpacing} y="194" textAnchor="middle">
                {month}
              </text>
            ))}
          </g>

          {/* Bars: Revenue */}
          {datasets[0].data.map((val, i) => (
            <rect
              key={i}
              className="br"
              x={68 + i * xSpacing}
              y={chartHeight - val}
              width="28"
              height={val}
              rx="3"
            />
          ))}

          {/* Bars: Expenses */}
          {datasets[1].data.map((val, i) => (
            <rect
              key={i}
              className="be"
              x={100 + i * xSpacing}
              y={chartHeight - val}
              width="28"
              height={val}
              rx="3"
            />
          ))}

          {/* Line & Dots: Net Profit */}
          <polyline
            className="lp"
            points={datasets[2].data
              .map((val, i) => `${100 + i * xSpacing},${val}`)
              .join(" ")}
          />
          {datasets[2].data.map((val, i) => (
            <circle
              key={i}
              className="dp"
              cx={100 + i * xSpacing}
              cy={val}
              r="4"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

function ChartLegend({ datasets }) {
  return (
    <div className="chart-legend">
      {datasets.map((ds) => (
        <div key={ds.key} className="legend-row">
          <div className="leg-dot" style={{ background: ds.color }}></div>
          {ds.label}
        </div>
      ))}
    </div>
  );
}
