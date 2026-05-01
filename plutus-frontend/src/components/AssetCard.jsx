import React from "react";

export default function AssetCard({ assetName, assetType, assetValue }) {
  return (
    <div class="asset-card">
      <div class="asset-top">
        <div class="asset-icon" style="background:${a.bg}">
          ${a.ico}
        </div>
        <div style="flex:1">
          <div class="asset-name">${assetName}</div>
          <div class="asset-type">${assetType}</div>
        </div>
        <button
          class="btn btn-ghost btn-sm btn-icon"
          style="border:none;background:none;color:var(--text-3);font-size:16px"
          onclick="removeAsset(${i})"
        >
          ×
        </button>
      </div>
      <div>
        <div class="asset-val">$${assetValue}</div>
        <div class="asset-change">
          <span class="${gainCls}" style="font-size:12px;font-family:var(--fn-m)">
            ${gainStr}
          </span>
        </div>
      </div>
      <div class="asset-foot">
        <span class="asset-meta">Since ${a.date.slice(0, 4)}</span>
        <span class="cat-chip">${a.type}</span>
      </div>
    </div>
  );
}
