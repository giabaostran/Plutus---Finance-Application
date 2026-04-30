import React, { useContext } from "react";
import { AppContext } from "@/stores/AppContext";
import { formatKpi } from "@/utils/kpi";
import KpiItem from "./KPIItem";
import "./KPI.css"


export default function Kpi() {
  const { kpis, monthlyStats } = useContext(AppContext);
  const formattedKpis = formatKpi(kpis, monthlyStats);
  return (
    <div className="kpi-grid">
      {formattedKpis.map((kpi) => (
        <KpiItem key={kpi.id} kpi={kpi} />
      ))}
    </div>
  );
}
