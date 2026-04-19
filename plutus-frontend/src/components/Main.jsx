import Topbar from "./Topbar";
export default function Main() {
  return (
    <div className="main">
      <Topbar />
      <main className="content">
        <div class="kpi-grid">

      <div class="kpi-card">
        <div class="kpi-header">
          <div class="kpi-label">Net Worth</div>
          <div class="kpi-icon blue">💼</div>
        </div>
        <div class="kpi-value">$248,540</div>
        <svg class="sparkline" viewBox="0 0 120 36" preserveAspectRatio="none">
          <polygon class="spark-area-green" points="0,30 15,25 30,22 45,18 60,20 75,14 90,10 105,8 120,4 120,36 0,36"/>
          <polyline class="spark-path-green" points="0,30 15,25 30,22 45,18 60,20 75,14 90,10 105,8 120,4"/>
        </svg>
        <div class="kpi-footer">
          <span class="kpi-delta up">▲ +8.4%</span>
          <span class="kpi-sub">vs last month</span>
        </div>
      </div>
        </div>
      </main>
    </div>
  );
}
