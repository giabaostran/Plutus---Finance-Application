import Topbar from "./Topbar";
import KpiCard from "./ui/KpiCard";
import Dashboard from "./page/Dashboard";
export default function Main() {
  return (
    <div className="main">
      <Topbar />
      <main className="content">
        <Dashboard />
      </main>
    </div>
  );
}
