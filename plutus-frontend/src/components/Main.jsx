import Topbar from "./Topbar";
import KpiCard from "./ui/KpiCard";
export default function Main() {
  return (
    <div className="main">
      <Topbar />
      <main className="content">
        <div class="kpi-grid">
          <KpiCard />
        </div>
      </main>
    </div>
  );
}
