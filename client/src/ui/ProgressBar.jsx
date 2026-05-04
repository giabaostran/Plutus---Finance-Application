// ── ProgressBar ────────────────────────────
export default function ProgressBar({ pct, color = "var(--accent)", height = 6 }) {
  return (
    <div className="prog-track" style={{ height }}>
      <div className="prog-fill" style={{ width: `${Math.min(100, pct)}%`, background: color }} />
    </div>
  );
}
