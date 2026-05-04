import { useState, useEffect, useRef, useCallback } from "react";

// ── DonutChart ─────────────────────────────
export default function DonutChart({ segments, centerLabel = "$248k", centerSub = "Total" }) {
  const [hovered, setHovered] = useState(null);
  const active = hovered !== null ? segments[hovered] : null;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <div className="donut-wrap">
        <svg viewBox="0 0 130 130" width="130" height="130">
          <circle cx="65" cy="65" r="50" fill="none" stroke="var(--border)" strokeWidth="16" />
          {segments.map((seg, i) => (
            <circle
              key={seg.label}
              cx="65"
              cy="65"
              r="50"
              fill="none"
              stroke={seg.colorVar}
              strokeWidth="16"
              strokeDasharray={seg.dashArray}
              strokeDashoffset={seg.dashOffset}
              strokeLinecap="butt"
              transform="rotate(-90 65 65)"
              style={{
                opacity: hovered === null || hovered === i ? 1 : 0.3,
                transition: "opacity 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
        </svg>
        <div className="donut-center">
          <div className="donut-val">{active ? `${active.pct}%` : centerLabel}</div>
          <div className="donut-lbl">{active ? active.label : centerSub}</div>
        </div>
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
        {segments.map((seg, i) => (
          <div
            key={seg.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              opacity: hovered === null || hovered === i ? 1 : 0.4,
              transition: "opacity 0.2s",
              cursor: "default",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="legend-row">
              <div className="leg-dot" style={{ background: seg.colorVar }} />
              {seg.label}
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, fontFamily: "var(--fn-m)", color: "var(--text-1)" }}>
              {seg.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
