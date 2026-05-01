import React, { useState } from "react";
import kpiData from "@/config/assetKpis.json";
import assetDataRaw from "@/config/assets.json"; // Assuming your JSON is here
import Kpis from "@/components/Kpis";
import AssetHeader from "@/components/AssetHeader";
import AssetCard from "@/components/AssetCard";
import "./Page.css";

function AssetPage({ isActive }) {
  // Use state so the UI updates when you remove an asset
  const [assets, setAssets] = useState(assetDataRaw.assets);

  const handleRemoveAsset = (id) => {
    setAssets((prev) => prev.filter((asset) => asset.id !== id));
  };

  const handleOpenModal = () => {
    console.log("Opening Add Asset Modal...");
    // Your logic to open the modal goes here
  };

  return (
    <div className={`page ${isActive ? "on" : ""}`} id="p-assets">
      {/* KPI row */}
      <div className="g4">
        <Kpis data={kpiData} />
      </div>

      <AssetHeader title="My Assets" subtitle="Track everything you own" onAddClick={handleOpenModal} />

      <div className="asset-grid" id="asset-grid">
        {assets.map((asset) => (
          <AssetCard key={asset.id} asset={asset} onRemove={handleRemoveAsset} />
        ))}
        {assets.slice(0,3).map((asset) => (
          <AssetCard key={asset.id} asset={asset} onRemove={handleRemoveAsset} />
        ))}

        {/* Add Asset Empty State Card */}
        <div className="asset-add" onClick={handleOpenModal}>
          <div className="asset-add-icon">+</div>
          <div className="asset-add-label">Add new asset</div>
        </div>
      </div>
    </div>
  );
}

export default AssetPage;
