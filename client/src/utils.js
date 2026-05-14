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

export const getInitials = (name) => {
  if (!name) return "";

  return name
    .trim()
    .split(/\s+/) // Split by any whitespace
    .map((word) => word[0]) // Take the first character of each word
    .join("") // Combine them
    .toUpperCase(); // Ensure they are capitalized
};
