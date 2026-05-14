import KpiCard from "../ui/KpiCard";
import SummaryRow from "../ui/SummaryRow";
import Pagination from "../ui/Pagination";
import Pill from "../ui/Pill";
import Modal from "../ui/Modal";
import FormGroup from "../ui/FormGroup";
import ProgressBar from "../ui/ProgressBar";
import { useState } from "react";

// ── Goals ──────────────────────────────────
export default function GoalsPage({ goals: initGoals, completedGoals, goalCategoryOptions }) {
  const [goals, setGoals] = useState(initGoals);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", target: "", current: "", contrib: "", cat: "🏠", date: "2027-01-01" });
  const setF = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const addGoal = () => {
    if (!form.name.trim()) return;
    const deadline = new Date(form.date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
    setGoals((prev) => [
      ...prev,
      {
        id: nextId(prev),
        ico: form.cat,
        bg: "rgba(91,78,232,0.08)",
        name: form.name,
        deadline,
        target: parseFloat(form.target) || 0,
        current: parseFloat(form.current) || 0,
        contrib: parseFloat(form.contrib) || 0,
        colorVar: "var(--accent)",
      },
    ]);
    setModalOpen(false);
    setForm({ name: "", target: "", current: "", contrib: "", cat: "🏠", date: "2027-01-01" });
  };

  const removeGoal = (id) => setGoals((prev) => prev.filter((g) => g.id !== id));

  const GoalCard = ({ goal, completed = false }) => {
    const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
    const remaining = goal.target - goal.current;
    const months = goal.contrib > 0 ? Math.ceil(remaining / goal.contrib) : "—";
    return (
      <div className="goal-card" style={{ opacity: completed ? 0.6 : 1 }}>
        <div className="goal-top">
          <div className="goal-info">
            <div className="goal-icon" style={{ background: goal.bg }}>
              {goal.ico}
            </div>
            <div>
              <div className="goal-name">{goal.name}</div>
              <div className="goal-deadline">
                {completed
                  ? `Completed ${goal.deadline}`
                  : `Target: ${goal.deadline} · ~${months} months at $${goal.contrib.toLocaleString()}/mo`}
              </div>
            </div>
          </div>
          {completed ? (
            <span className="pill ok">Achieved</span>
          ) : (
            <button
              style={{ border: "none", background: "none", color: "var(--text-3)", fontSize: 18, cursor: "pointer" }}
              onClick={() => removeGoal(goal.id)}
            >
              ×
            </button>
          )}
        </div>
        <div className="goal-amounts">
          <div className="goal-current">${goal.current.toLocaleString()}</div>
          <div className="goal-target">of ${goal.target.toLocaleString()}</div>
        </div>
        <ProgressBar pct={pct} color={goal.colorVar} height={8} />
        <div className="goal-foot">
          <span className="goal-rate">
            {completed ? goal.note || "Goal complete!" : `$${remaining.toLocaleString()} remaining`}
          </span>
          <span className="goal-pct" style={{ color: goal.colorVar }}>
            {pct}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "var(--fn-d)", fontSize: 15, fontWeight: 700, color: "var(--text-1)" }}>
            Financial Goals
          </div>
          <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: 2 }}>
            {goals.length} active · {completedGoals.length} completed
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          + New Goal
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {goals.map((g) => (
          <GoalCard key={g.id} goal={g} />
        ))}
        {goals.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: "var(--text-3)", fontSize: 14 }}>
            No active goals. Create one to get started!
          </div>
        )}
      </div>

      {completedGoals.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1,
              color: "var(--text-2)",
              marginBottom: 12,
            }}
          >
            Completed
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {completedGoals.map((g) => (
              <GoalCard key={g.id} goal={g} completed />
            ))}
          </div>
        </div>
      )}

      <Modal
        open={modalOpen}
        title="Create Goal"
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={addGoal}>
              Create Goal
            </button>
          </>
        }
      >
        <FormGroup label="Goal Name">
          <input
            className="f-input"
            type="text"
            placeholder="e.g. Down Payment, Japan Trip…"
            value={form.name}
            onChange={(e) => setF("name", e.target.value)}
          />
        </FormGroup>
        <div className="f-row">
          <FormGroup label="Target Amount ($)">
            <input
              className="f-input"
              type="number"
              placeholder="0"
              value={form.target}
              onChange={(e) => setF("target", e.target.value)}
            />
          </FormGroup>
          <FormGroup label="Already Saved ($)">
            <input
              className="f-input"
              type="number"
              placeholder="0"
              value={form.current}
              onChange={(e) => setF("current", e.target.value)}
            />
          </FormGroup>
        </div>
        <div className="f-row">
          <FormGroup label="Category">
            <select className="f-select" value={form.cat} onChange={(e) => setF("cat", e.target.value)}>
              {goalCategoryOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup label="Target Date">
            <input className="f-input" type="date" value={form.date} onChange={(e) => setF("date", e.target.value)} />
          </FormGroup>
        </div>
        <FormGroup label="Monthly Contribution ($)">
          <input
            className="f-input"
            type="number"
            placeholder="e.g. 500"
            value={form.contrib}
            onChange={(e) => setF("contrib", e.target.value)}
          />
        </FormGroup>
      </Modal>
    </>
  );
}
