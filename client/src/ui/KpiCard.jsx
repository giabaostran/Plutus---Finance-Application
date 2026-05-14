// ── KpiCard ────────────────────────────────
export default function KpiCard({ label, value, icon, delta, deltaDir, sub, sparkPoints, sparkAreaPoints, sparkColor }) {
  const lineClass = sparkColor === "red" ? "sp-line-r" : "sp-line-g";
  const areaClass = sparkColor === "red" ? "sp-area-r" : "sp-area-g";
  return (
    <div className="kpi">
      <div className="kpi-top">
        <div className="kpi-label">{label}</div>
        <div className="kpi-ico">{icon}</div>
      </div>
      <div className="kpi-val">{value}</div>
      {sparkPoints && (
        <svg className="spark" viewBox="0 0 120 32" preserveAspectRatio="none">
          <polygon className={areaClass} points={sparkAreaPoints} />
          <polyline className={lineClass} points={sparkPoints} />
        </svg>
      )}
      <div className="kpi-foot">
        {delta && <span className={`delta ${deltaDir}`}>{delta}</span>}
        {sub && <span className="kpi-sub">{sub}</span>}
      </div>
    </div>
  );
}