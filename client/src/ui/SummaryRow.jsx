// ── SummaryRow ─────────────────────────────
export default function SummaryRow({ items }) {
  return (
    <div className="sum-row">
      {items.map((item) => (
        <div key={item.label} className="sum-cell">
          <div className="sum-label">{item.label}</div>
          <div className={`sum-val ${item.cls}`}>{item.value}</div>
          {item.sub && <div className="sum-sub">{item.sub}</div>}
        </div>
      ))}
    </div>
  );
}
