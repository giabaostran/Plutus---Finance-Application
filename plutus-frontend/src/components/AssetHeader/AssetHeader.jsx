import React from "react";
import "./AssetHeader.css"
export default function AssetHeader({ title, subtitle, onAddClick }) {
  return (
    <div className="section-header">
      <div className="header-text">
        <h2 className="header-title">{title}</h2>
        <p className="header-subtitle">{subtitle}</p>
      </div>
      <button className="btn btn-primary" onClick={onAddClick}>
        + Add Asset
      </button>
    </div>
  );
}
