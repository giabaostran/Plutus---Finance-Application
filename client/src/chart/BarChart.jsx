// ── BarChart ───────────────────────────────
export default function BarChart({ data }) {
  const { months, revenueBars, expenseBars, profitLine, profitDots, xCenters } = data;
  return (
    <div>
      <div className="chart-legend">
        <div className="legend-row">
          <div className="leg-dot" style={{ background: "var(--c1)" }} />
          Revenue
        </div>
        <div className="legend-row">
          <div className="leg-dot" style={{ background: "var(--c2)" }} />
          Expenses
        </div>
        <div className="legend-row">
          <div className="leg-dot" style={{ background: "var(--c3)" }} />
          Net Profit
        </div>
      </div>
      <svg className="chart" viewBox="0 0 540 210" preserveAspectRatio="xMidYMid meet">
        {[20, 60, 100, 140, 170].map((y) => (
          <line key={y} className="cg" x1="50" y1={y} x2="530" y2={y} />
        ))}
        <g className="ct">
          {[
            ["$20k", 24],
            ["$16k", 64],
            ["$12k", 104],
            ["$8k", 144],
            ["$4k", 174],
          ].map(([txt, y]) => (
            <text key={y} x="42" y={y} textAnchor="end">
              {txt}
            </text>
          ))}
        </g>
        <g className="ct">
          {months.map((m, i) => (
            <text key={m} x={xCenters[i]} y="194" textAnchor="middle">
              {m}
            </text>
          ))}
        </g>
        {revenueBars.map((b, i) => (
          <rect key={i} className="br" x={b.x} y={b.y} width="28" height={b.h} rx="3" />
        ))}
        {expenseBars.map((b, i) => (
          <rect key={i} className="be" x={b.x} y={b.y} width="28" height={b.h} rx="3" />
        ))}
        <polyline className="lp" points={profitLine} />
        {profitDots.map((d, i) => (
          <circle key={i} className="dp" cx={d.cx} cy={d.cy} r="4" />
        ))}
      </svg>
    </div>
  );
}
