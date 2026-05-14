import KpiCard from "../ui/KpiCard";
import SummaryRow from "../ui/SummaryRow";
import Pagination from "../ui/Pagination";
import Pill from "../ui/Pill";
import Modal from "../ui/Modal";
import FormGroup from "../ui/FormGroup";

import { useState } from "react";
import { fmtAmt, amtCls } from "../utils";

// ── Assets ─────────────────────────────────
export default function AssetsPage({ assets: initAssets, assetKpis, assetTypeOptions }) {
  const [assets, setAssets] = useState(initAssets);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "🏠",
    typeLabel: "Real Estate",
    val: "",
    cost: "",
    date: "2024-01-01",
    note: "",
  });
  const setF = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const totalAssets = assets.reduce((s, a) => s + a.val, 0);
  const netValue = assets.reduce((s, a) => s + (a.val - a.cost), 0);

  const addAsset = () => {
    if (!form.name.trim()) return;
    setAssets((prev) => [
      ...prev,
      {
        id: nextId(prev),
        ico: form.type,
        bg: "rgba(91,78,232,0.08)",
        name: form.name,
        type: form.typeLabel,
        val: parseFloat(form.val) || 0,
        cost: parseFloat(form.cost) || parseFloat(form.val) || 0,
        date: form.date,
        note: form.note,
      },
    ]);
    setModalOpen(false);
    setForm({ name: "", type: "🏠", typeLabel: "Real Estate", val: "", cost: "", date: "2024-01-01", note: "" });
  };

  const removeAsset = (id) => setAssets((prev) => prev.filter((a) => a.id !== id));

  return (
    <>
      <div className="g4">
        {assetKpis.map((k) => (
          <KpiCard key={k.label} {...k} sparkPoints={null} sparkAreaPoints={null} />
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "var(--fn-d)", fontSize: 15, fontWeight: 700, color: "var(--text-1)" }}>
            My Assets
          </div>
          <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 2 }}>
            {assets.length} assets · Net gain ${netValue >= 0 ? "+" : ""}
            {netValue.toLocaleString()}
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          + Add Asset
        </button>
      </div>

      <div className="asset-grid">
        {assets.map((a) => {
          const gain = a.val - a.cost;
          const gainPct = a.cost > 0 ? ((gain / a.cost) * 100).toFixed(1) : "0.0";
          const gainCls = gain >= 0 ? "amt-pos" : "amt-neg";
          const gainStr =
            gain >= 0
              ? `+$${gain.toLocaleString()} (${gainPct}%)`
              : `-$${Math.abs(gain).toLocaleString()} (${gainPct}%)`;
          return (
            <div key={a.id} className="asset-card">
              <div className="asset-top">
                <div className="asset-icon" style={{ background: a.bg }}>
                  {a.ico}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="asset-name">{a.name}</div>
                  <div className="asset-type">{a.type}</div>
                </div>
                <button
                  style={{
                    border: "none",
                    background: "none",
                    color: "var(--text-3)",
                    fontSize: 18,
                    cursor: "pointer",
                    lineHeight: 1,
                  }}
                  onClick={() => removeAsset(a.id)}
                >
                  ×
                </button>
              </div>
              <div>
                <div className="asset-val">${a.val.toLocaleString()}</div>
                <div className="asset-change">
                  <span className={gainCls} style={{ fontSize: 12, fontFamily: "var(--fn-m)" }}>
                    {gainStr}
                  </span>
                </div>
              </div>
              <div className="asset-foot">
                <span className="asset-meta">Since {a.date.slice(0, 4)}</span>
                <span className="cat-chip">{a.type}</span>
              </div>
            </div>
          );
        })}
        <div className="asset-add" onClick={() => setModalOpen(true)}>
          <div className="asset-add-icon">+</div>
          <div className="asset-add-label">Add new asset</div>
        </div>
      </div>

      <Modal
        open={modalOpen}
        title="Add Asset"
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={addAsset}>
              Add Asset
            </button>
          </>
        }
      >
        <FormGroup label="Asset Name">
          <input
            className="f-input"
            type="text"
            placeholder="e.g. Primary Residence, Tesla…"
            value={form.name}
            onChange={(e) => setF("name", e.target.value)}
          />
        </FormGroup>
        <div className="f-row">
          <FormGroup label="Type">
            <select
              className="f-select"
              value={form.type}
              onChange={(e) => {
                const opt = assetTypeOptions.find((o) => o.value === e.target.value);
                setForm((f) => ({
                  ...f,
                  type: e.target.value,
                  typeLabel: opt ? opt.label.split(" ").slice(1).join(" ") : "",
                }));
              }}
            >
              {assetTypeOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup label="Current Value ($)">
            <input
              className="f-input"
              type="number"
              placeholder="0"
              value={form.val}
              onChange={(e) => setF("val", e.target.value)}
            />
          </FormGroup>
        </div>
        <div className="f-row">
          <FormGroup label="Purchase Price ($)">
            <input
              className="f-input"
              type="number"
              placeholder="0"
              value={form.cost}
              onChange={(e) => setF("cost", e.target.value)}
            />
          </FormGroup>
          <FormGroup label="Purchase Date">
            <input className="f-input" type="date" value={form.date} onChange={(e) => setF("date", e.target.value)} />
          </FormGroup>
        </div>
        <FormGroup label="Notes">
          <input
            className="f-input"
            type="text"
            placeholder="Any additional notes…"
            value={form.note}
            onChange={(e) => setF("note", e.target.value)}
          />
        </FormGroup>
      </Modal>
    </>
  );
}
