// ─────────────────────────────────────────────
// 3. UTILITIES
// ─────────────────────────────────────────────

export const fmt = (n) => Math.abs(n).toLocaleString();
export const fmtAmt = (n) => (n >= 0 ? `+$${fmt(n)}` : `-$${fmt(n)}`);
export const amtCls = (n) => (n > 0 ? "amt-pos" : n < 0 ? "amt-neg" : "amt-neu");

export const statusLabel = { ok: "✓ Done", pend: "⏳ Pending", fail: "✖ Failed" };

export const nextId = (arr) => Math.max(0, ...arr.map((x) => x.id)) + 1;
