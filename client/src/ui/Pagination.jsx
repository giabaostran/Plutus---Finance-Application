// ── Pagination ─────────────────────────────
export default function Pagination({ page, totalPages, total, perPage, onChange }) {
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);
  return (
    <div className="pager">
      <div className="pager-info">
        Showing {start}–{end} of {total}
      </div>
      <div className="pager-btns">
        <button className="pg" disabled={page === 1} onClick={() => onChange(page - 1)}>
          ←
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button key={p} className={`pg${p === page ? " on" : ""}`} onClick={() => onChange(p)}>
            {p}
          </button>
        ))}
        <button className="pg" disabled={page === totalPages} onClick={() => onChange(page + 1)}>
          →
        </button>
      </div>
    </div>
  );
}
