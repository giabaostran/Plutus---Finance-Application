export default function KpiCard(kpi) {
  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <div className="kpi-label">{kpi.title}</div>
        <div className="kpi-icon green">{kpi.beter ? "↑" : "↓"}</div>
      </div>
      <div className="kpi-value">${kpi.value ? kpi.value : 0}</div>
      <svg
        className="sparkline"
        viewBox="0 0 120 36"
        preserveAspectRatio="none"
      >
        <polygon
          className="spark-area-green"
          points="0,28 15,24 30,26 45,20 60,18 75,22 90,14 105,12 120,10 120,36 0,36"
        />
        <polyline
          className="spark-path-green"
          points="0,28 15,24 30,26 45,20 60,18 75,22 90,14 105,12 120,10"
        />
      </svg>
      <div className="kpi-footer">
        <span className="kpi-delta up">▲ +3.2%</span>
        <span className="kpi-sub">vs last month</span>
      </div>
    </div>
  );
}
