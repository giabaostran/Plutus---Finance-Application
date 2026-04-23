import { Fragment } from "react";

export default function KpiCard() {
  return (
    <Fragment>
      <div className="kpi-card">
        <div className="kpi-header">
          <div className="kpi-label">Net Worth</div>
          <div className="kpi-icon blue">💼</div>
        </div>
        <div className="kpi-value">$248,540</div>
        <svg
          className="sparkline"
          viewBox="0 0 120 36"
          preserveAspectRatio="none"
        >
          <polygon
            className="spark-area-green"
            points="0,30 15,25 30,22 45,18 60,20 75,14 90,10 105,8 120,4 120,36 0,36"
          />
          <polyline
            className="spark-path-green"
            points="0,30 15,25 30,22 45,18 60,20 75,14 90,10 105,8 120,4"
          />
        </svg>
        <div className="kpi-footer">
          <span className="kpi-delta up">▲ +8.4%</span>
          <span className="kpi-sub">vs last month</span>
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-header">
          <div className="kpi-label">Monthly Income</div>
          <div className="kpi-icon green">↑</div>
        </div>
        <div className="kpi-value">$14,280</div>
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

      <div className="kpi-card">
        <div className="kpi-header">
          <div className="kpi-label">Total Expenses</div>
          <div className="kpi-icon orange">↓</div>
        </div>
        <div className="kpi-value">$6,842</div>
        <svg
          className="sparkline"
          viewBox="0 0 120 36"
          preserveAspectRatio="none"
        >
          <polygon
            className="spark-area-red"
            points="0,12 15,16 30,14 45,20 60,16 75,22 90,18 105,24 120,28 120,36 0,36"
          />
          <polyline
            className="spark-path-red"
            points="0,12 15,16 30,14 45,20 60,16 75,22 90,18 105,24 120,28"
          />
        </svg>
        <div className="kpi-footer">
          <span className="kpi-delta down">▼ +5.1%</span>
          <span className="kpi-sub">vs last month</span>
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-header">
          <div className="kpi-label">Savings Rate</div>
          <div className="kpi-icon purple">◈</div>
        </div>
        <div className="kpi-value">52.1%</div>
        <svg
          className="sparkline"
          viewBox="0 0 120 36"
          preserveAspectRatio="none"
        >
          <polygon
            className="spark-area-green"
            points="0,22 15,20 30,24 45,16 60,18 75,12 90,14 105,10 120,8 120,36 0,36"
          />
          <polyline
            className="spark-path-green"
            points="0,22 15,20 30,24 45,16 60,18 75,12 90,14 105,10 120,8"
          />
        </svg>
        <div className="kpi-footer">
          <span className="kpi-delta up">▲ +2.8pp</span>
          <span className="kpi-sub">vs last month</span>
        </div>
      </div>
    </Fragment>
  );
}
