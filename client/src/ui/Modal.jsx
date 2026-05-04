// ── Modal ──────────────────────────────────
export default function Modal({ open, title, onClose, children, footer }) {
  if (!open) return null;
  return (
    <div className={`modal-bg${open ? " on" : ""}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-hd">
          <div className="modal-title">{title}</div>
          <button className="modal-x" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-bd">{children}</div>
        {footer && <div className="modal-ft">{footer}</div>}
      </div>
    </div>
  );
}
