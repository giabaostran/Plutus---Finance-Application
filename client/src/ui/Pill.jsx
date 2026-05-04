import {statusLabel} from '@/utils'
// ── Pill ───────────────────────────────────
export default function Pill({ status }) {
  return <span className={`pill ${status}`}>{statusLabel[status]}</span>;
}
