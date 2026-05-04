// ── FormGroup ──────────────────────────────
export default function FormGroup({ label, children }) {
  return (
    <div className="f-group">
      <label className="f-label">{label}</label>
      {children}
    </div>
  );
}
