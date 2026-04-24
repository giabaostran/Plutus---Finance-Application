import Topbar from "./Topbar";
import KpiCard from "@/components/ui/KpiCard";
import Dashboard from "@/components/page/Dashboard";

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
