import { useState, useEffect, useRef, useCallback } from "react";
import SummaryRow from "@/ui/SummaryRow";
import Pagination from "@/ui/Pagination";
import Modal from "@/ui/Modal";
import FormGroup from "@/ui/FormGroup";
import Pill from "@/ui/Pill";
import { fmtAmt, amtCls } from "@/utils";

// ── Transactions ───────────────────────────
export default function TransactionsPage({ transactions: initTxns, txSummary }) {
  const [txns, setTxns] = useState(initTxns);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [cat, setCat] = useState("All Categories");
  const [acct, setAcct] = useState("All Accounts");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const PER_PAGE = 10;

  // Form state
  const [form, setForm] = useState({
    name: "",
    amt: "",
    type: "Expense",
    cat: "Groceries",
    date: "2026-04-24",
    acct: "Visa ···4821",
    note: "",
  });
  const setF = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const FILTERS = ["All", "Income", "Expenses", "Investments", "Pending"];
  const CATS = [
    "All Categories",
    "Income",
    "Housing",
    "Groceries",
    "Transport",
    "Software",
    "Investment",
    "Entertainment",
    "Health",
    "Transfer",
  ];
  const ACCTS = ["All Accounts", "Visa ···4821", "Chase Bank", "Fidelity", "Stripe"];

  const filtered = txns.filter((t) => {
    const q = search.toLowerCase();
    if (q && !t.name.toLowerCase().includes(q) && !t.cat.toLowerCase().includes(q)) return false;
    if (cat !== "All Categories" && t.cat !== cat) return false;
    if (acct !== "All Accounts" && t.acct !== acct) return false;
    if (filter === "Income" && t.amt <= 0) return false;
    if (filter === "Expenses" && t.amt >= 0) return false;
    if (filter === "Investments" && t.cat !== "Investment") return false;
    if (filter === "Pending" && t.status !== "pend") return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const addTx = () => {
    const amount = parseFloat(form.amt) || 0;
    const signedAmt = form.type === "Income" ? Math.abs(amount) : -Math.abs(amount);
    const icons = {
      Groceries: "🛒",
      Housing: "🏠",
      Transport: "🚗",
      Entertainment: "🎬",
      Software: "☁",
      Health: "🏋",
      Income: "💼",
      Investment: "◈",
      Transfer: "⇄",
      Other: "💳",
    };
    setTxns((prev) => [
      {
        id: nextId(prev),
        ico: icons[form.cat] || "💳",
        bg: "rgba(91,78,232,0.08)",
        name: form.name || "New Transaction",
        sub: form.acct,
        cat: form.cat,
        acct: form.acct,
        date: form.date,
        status: "ok",
        amt: signedAmt,
      },
      ...prev,
    ]);
    setModalOpen(false);
    setForm({
      name: "",
      amt: "",
      type: "Expense",
      cat: "Groceries",
      date: "2026-04-24",
      acct: "Visa ···4821",
      note: "",
    });
  };

  return (
    <>
      <SummaryRow items={txSummary} />

      <div className="card">
        <div className="card-hd">
          <div>
            <div className="card-title">All Transactions</div>
            <div className="card-sub">April 2026 · {txns.length} entries</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="card-act">Export CSV ↗</button>
            <button className="btn btn-primary btn-sm" onClick={() => setModalOpen(true)}>
              + Add
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="toolbar">
          <div className="tb-search">
            <span style={{ color: "var(--text-3)" }}>⌕</span>
            <input
              type="text"
              placeholder="Search merchant, category…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <select
            className="tb-sel"
            value={cat}
            onChange={(e) => {
              setCat(e.target.value);
              setPage(1);
            }}
          >
            {CATS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            className="tb-sel"
            value={acct}
            onChange={(e) => {
              setAcct(e.target.value);
              setPage(1);
            }}
          >
            {ACCTS.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>
        <div className="filter-row">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`f-chip${filter === f ? " on" : ""}`}
              onClick={() => {
                setFilter(f);
                setPage(1);
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="tbl-wrap">
          <table style={{ minWidth: 600 }}>
            <thead>
              <tr>
                <th style={{ width: 44 }}></th>
                <th className="sort">Merchant</th>
                <th className="sort">Category</th>
                <th className="sort">Account</th>
                <th className="sort">Date</th>
                <th>Status</th>
                <th className="sort" style={{ textAlign: "right" }}>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {paged.map((t) => (
                <tr key={t.id}>
                  <td style={{ paddingLeft: 20 }}>
                    <div className="tx-ico" style={{ background: t.bg }}>
                      {t.ico}
                    </div>
                  </td>
                  <td>
                    <div className="tx-name">{t.name}</div>
                    <div className="tx-sub">{t.sub}</div>
                  </td>
                  <td>
                    <span className="cat-chip">{t.cat}</span>
                  </td>
                  <td style={{ color: "var(--text-2)", fontSize: 12 }}>{t.acct}</td>
                  <td style={{ color: "var(--text-2)", fontSize: 12, fontFamily: "var(--fn-m)" }}>{t.date}</td>
                  <td>
                    <Pill status={t.status} />
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <span className={amtCls(t.amt)}>{fmtAmt(t.amt)}</span>
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", color: "var(--text-3)", padding: 32 }}>
                    No transactions match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} total={filtered.length} perPage={PER_PAGE} onChange={setPage} />
      </div>

      {/* Add Transaction Modal */}
      <Modal
        open={modalOpen}
        title="Add Transaction"
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={addTx}>
              Save Transaction
            </button>
          </>
        }
      >
        <div className="f-row">
          <FormGroup label="Merchant">
            <input
              className="f-input"
              type="text"
              placeholder="e.g. Whole Foods"
              value={form.name}
              onChange={(e) => setF("name", e.target.value)}
            />
          </FormGroup>
          <FormGroup label="Amount ($)">
            <input
              className="f-input"
              type="number"
              placeholder="0.00"
              value={form.amt}
              onChange={(e) => setF("amt", e.target.value)}
            />
          </FormGroup>
        </div>
        <div className="f-row">
          <FormGroup label="Type">
            <select className="f-select" value={form.type} onChange={(e) => setF("type", e.target.value)}>
              {["Expense", "Income", "Transfer", "Investment"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </FormGroup>
          <FormGroup label="Category">
            <select className="f-select" value={form.cat} onChange={(e) => setF("cat", e.target.value)}>
              {[
                "Groceries",
                "Housing",
                "Transport",
                "Entertainment",
                "Software",
                "Health",
                "Income",
                "Investment",
                "Transfer",
                "Other",
              ].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </FormGroup>
        </div>
        <div className="f-row">
          <FormGroup label="Date">
            <input className="f-input" type="date" value={form.date} onChange={(e) => setF("date", e.target.value)} />
          </FormGroup>
          <FormGroup label="Account">
            <select className="f-select" value={form.acct} onChange={(e) => setF("acct", e.target.value)}>
              {["Visa ···4821", "Chase Bank", "Fidelity", "Stripe"].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </FormGroup>
        </div>
        <FormGroup label="Notes">
          <input
            className="f-input"
            type="text"
            placeholder="Optional note…"
            value={form.note}
            onChange={(e) => setF("note", e.target.value)}
          />
        </FormGroup>
      </Modal>
    </>
  );
}
