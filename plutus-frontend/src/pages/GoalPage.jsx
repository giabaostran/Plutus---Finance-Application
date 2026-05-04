import React from "react";
import goalData from "@/config/goals.json";
import AssetHeader from "../components/AssetHeader";




function GoalPage({ isActive }) {
  const activeGoals = goalData.goals.filter((g) => g.status === "active");
  const completedGoals = goalData.goals.filter((g) => g.status === "completed");

  return (
    <div className={`page ${isActive ? "on" : ""}`} id="p-goals">
      <AssetHeader
        title="Financial Goals"
        subtitle={`${activeGoals.length} active · ${completedGoals.length} completed`}
        onAddClick={() => console.log("New Goal Modal")}
      />

      {/* Active Goals List */}
      <div className="goal-list">
        {activeGoals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>

      {/* Completed Section */}
      {completedGoals.length > 0 && (
        <div style={{ marginTop: "24px" }}>
          <div className="section-label">Completed</div>
          <div className="goal-list">
            {completedGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GoalPage;


function GoalCard({ goal }) {
  const { name, deadline, icon, color, progress, footerText, pillText, pillClass, status } = goal;

  const isCompleted = status === "completed";

  return (
    <div className="goal-card" style={{ opacity: isCompleted ? 0.6 : 1 }}>
      <div className="goal-top">
        <div className="goal-info">
          <div className="goal-icon" style={{ background: color }}>
            {icon}
          </div>
          <div>
            <div className="goal-name">{name}</div>
            <div className="goal-deadline">{deadline}</div>
          </div>
        </div>
        <span className={`pill ${pillClass}`}>{pillText}</span>
      </div>

      <div className="prog-track">
        <div
          className="prog-fill"
          style={{ 
            width: `${progress}%`, 
            background: isCompleted ? "var(--green)" : "var(--primary-color)" 
          }}
        ></div>
      </div>

      <div className="goal-foot">
        <span className="goal-rate">{footerText}</span>
        <span
          style={{
            fontSize: "12px",
            fontWeight: "600",
            fontFamily: "var(--fn-m)",
            color: isCompleted ? "var(--green)" : "var(--text-1)"
          }}
        >
          {progress}%
        </span>
      </div>
    </div>
  );
}
