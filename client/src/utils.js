// ─────────────────────────────────────────────
// 3. UTILITIES
// ─────────────────────────────────────────────

export function fmt(n) {
  return Math.abs(n).toLocaleString();
}
export function fmtAmt(n) {
  return n >= 0 ? `+$${fmt(n)}` : `-$${fmt(n)}`;
}
export function amtCls(n) {
  return n > 0 ? "amt-pos" : n < 0 ? "amt-neg" : "amt-neu";
}
export const statusLabel = { ok: "✓ Done", pend: "⏳ Pending", fail: "✖ Failed" };

export const nextId = (arr) => Math.max(0, ...arr.map((x) => x.id)) + 1;

export const transactionBgColor = {};
