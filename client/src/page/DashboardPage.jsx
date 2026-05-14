import KpiCard from "../ui/KpiCard";
import DonutChart from "../chart/DonutChart";
import BarChart from "../chart/BarChart";
import Pill from "../ui/Pill";
import ProgressBar from "../ui/ProgressBar";
import { useState } from "react";
import { fmtAmt, amtCls } from "../utils";

// ── Dashboard ──────────────────────────────
export default function DashboardPage({ data, onNavigate }) {
  const { kpis, revenueChart, allocation, budget, transactions } = data;
  const recentTx = transactions.slice(0, 5);

  return (
    <>
      {/* KPI row */}
      <div className="g4">
        {kpis.map((k) => (
          <KpiCard key={k.id} {...k} />
        ))}
      </div>

      {/* Chart + Donut */}
      <div className="g-main">
        <div className="card">
          <div className="card-hd">
            <div>
              <div className="card-title">Revenue vs Expenses</div>
              <div className="card-sub">Jan – Jun 2026 · Monthly</div>
            </div>
            <button className="card-act">Export ↗</button>
          </div>
          <div className="card-bd">
            <BarChart data={revenueChart} />
          </div>
        </div>
        <div className="card">
          <div className="card-hd">
            <div>
              <div className="card-title">Allocation</div>
              <div className="card-sub">Portfolio breakdown</div>
            </div>
          </div>
          <div className="card-bd">
            <DonutChart segments={allocation} />
          </div>
        </div>
      </div>

      {/* Recent Tx + Budget */}
      <div className="g-main">
        <div className="card">
          <div className="card-hd">
            <div>
              <div className="card-title">Recent Transactions</div>
              <div className="card-sub">Last 7 days</div>
            </div>
            <button className="card-act" onClick={() => onNavigate("transactions")}>
              View all →
            </button>
          </div>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Merchant</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentTx.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <div className="tx-ico" style={{ background: t.bg }}>
                        {t.ico}
                      </div>
                    </td>
                    <td>
                      <div className="tx-name">{t.name}</div>
                      <div className="tx-sub">{t.sub}</div>
                    </td>
                    <td style={{ color: "var(--text-2)", fontSize: 12, fontFamily: "var(--fn-m)" }}>{t.date}</td>
                    <td>
                      <Pill status={t.status} />
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <span className={amtCls(t.amt)}>{fmtAmt(t.amt)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-hd">
            <div>
              <div className="card-title">Budget Tracker</div>
              <div className="card-sub">April 2026 · 7 days left</div>
            </div>
          </div>
          <div className="card-bd">
            <div className="spend-bar">
              {budget.map((b) => (
                <div key={b.label} className="spend-item">
                  <div className="spend-row">
                    <span className="spend-label">{b.label}</span>
                    <span className="spend-val">
                      ${b.spent.toLocaleString()} / ${b.total.toLocaleString()}
                    </span>
                  </div>
                  <ProgressBar pct={(b.spent / b.total) * 100} color={b.color} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
