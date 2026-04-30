import { useState } from "react";

// Donut geometry copied exactly from the HTML:
// cx=70, cy=70, r=54, strokeWidth=18, circumference=339.3
// Each segment: stroke-dasharray and stroke-dashoffset taken verbatim
// transform="rotate(-90 70 70)" on all segments (same as original)

const SEGMENTS = [
  {
    label: "Equities",
    pct: 45,
    color: "var(--chart-1)",
    // stroke-dasharray="152.7 186.6" stroke-dashoffset="84.8"
    dashArray: "152.7 186.6",
    dashOffset: "84.8",
  },
  {
    label: "Bonds",
    pct: 25,
    color: "var(--chart-2)",
    // stroke-dasharray="84.8 254.5" stroke-dashoffset="-67.9"
    dashArray: "84.8 254.5",
    dashOffset: "-67.9",
  },
  {
    label: "Real Estate",
    pct: 18,
    color: "var(--chart-3)",
    // stroke-dasharray="61.1 278.2" stroke-dashoffset="-152.7"
    dashArray: "61.1 278.2",
    dashOffset: "-152.7",
  },
  {
    label: "Cash",
    pct: 12,
    color: "var(--chart-4)",
    // stroke-dasharray="40.7 298.6" stroke-dashoffset="-213.8"
    dashArray: "40.7 298.6",
    dashOffset: "-213.8",
  },
];

export default function AllocationChart() {
  const [hovered, setHovered] = useState(null);

  const active = hovered !== null ? SEGMENTS[hovered] : null;

  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">Allocation</div>
          <div className="card-sub">Portfolio breakdown</div>
        </div>
      </div>
      <div className="donut-body">
        {/* Donut — same viewBox, cx, cy, r, strokeWidth as original */}
        <div className="donut-wrap">
          <svg viewBox="0 0 140 140" style={{ width: 140, height: 140 }}>
            {/* Background track — copied exactly */}
            <circle
              cx="70"
              cy="70"
              r="54"
              fill="none"
              stroke="var(--border)"
              strokeWidth="18"
            />

            {/* Segments — all coords verbatim from HTML */}
            {SEGMENTS.map((seg, i) => (
              <circle
                key={seg.label}
                cx="70"
                cy="70"
                r="54"
                fill="none"
                stroke={seg.color}
                strokeWidth="18"
                strokeDasharray={seg.dashArray}
                strokeDashoffset={seg.dashOffset}
                strokeLinecap="butt"
                transform="rotate(-90 70 70)"
                opacity={hovered === null || hovered === i ? 1 : 0.3}
                style={{
                  transition: "opacity 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}
          </svg>

          {/* Center label — swaps to hovered segment on hover */}
          <div className="donut-center">
            <div className="donut-center-val">
              {active ? `${active.pct}%` : "$248k"}
            </div>
            <div className="donut-center-label">
              {active ? active.label : "Total"}
            </div>
          </div>
        </div>

        {/* Row items — same classes as original */}
        <div className="donut-items">
          {SEGMENTS.map((seg, i) => (
            <div
              key={seg.label}
              className="donut-item"
              style={{
                opacity: hovered === null || hovered === i ? 1 : 0.4,
                transition: "opacity 0.2s",
                cursor: "default",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="donut-item-left">
                <div className="legend-dot" style={{ background: seg.color }} />
                {seg.label}
              </div>
              <div className="donut-item-bar-bg">
                <div
                  className="donut-item-bar"
                  style={{ width: `${seg.pct}%`, background: seg.color }}
                />
              </div>
              <div className="donut-item-pct">{seg.pct}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
