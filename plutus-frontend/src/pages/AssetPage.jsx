import React from "react";
import kpiData from "@/config/assetKpis.json";
import Kpis from "@/components/Kpis/Kpis";
import AssetHeader from "../components/AssetHeader/AssetHeader";

function AssetPage({ isActive }) {
  return (
    <div className={`page ${isActive ? "on" : ""}`} id="p-assets">
      {/* <!-- KPI row -->  */}
      <div className="g4">
        <Kpis data={kpiData} />
      </div>

      <AssetHeader title="My Assets" subtitle="Track everything you own" />

      <div className="asset-grid" id="asset-grid"></div>
    </div>
  );
}

export default AssetPage;
