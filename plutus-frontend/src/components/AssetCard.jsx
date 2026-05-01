import React from "react";

export default function AssetCard({ asset, onRemove }) {
  // Destructure for cleaner code
  const { name, type, value, since, icon, color, change, isPositive } = asset;

  // Determine the CSS class for performance
  const gainCls = isPositive ? "amt-pos" : "amt-neg";

  // Format the year from Unix timestamp
  const yearSince = new Date(since).getFullYear();

  return (
    <div className="asset-card">
      <div className="asset-top">
        {/* React uses {{ }} for inline style objects */}
        <div className="asset-icon" style={{ background: color }}>
          {icon}
        </div>

        <div style={{ flex: 1 }}>
          <div className="asset-name">{name}</div>
          <div className="asset-type">{type}</div>
        </div>

        <button
          className="btn btn-ghost btn-sm btn-icon"
          style={{ border: "none", background: "none", color: "var(--text-3)", fontSize: "16px" }}
          onClick={() => onRemove(asset.id)}
        >
          ×
        </button>
      </div>

      <div>
        <div className="asset-val">{value}</div>
        <div className="asset-change">
          <span className={gainCls} style={{ fontSize: "12px", fontFamily: "var(--fn-m)" }}>
            {change}
          </span>
        </div>
      </div>

      <div className="asset-foot">
        <span className="asset-meta">Since {yearSince}</span>
        <span className="cat-chip">{type}</span>
      </div>
    </div>
  );
}
