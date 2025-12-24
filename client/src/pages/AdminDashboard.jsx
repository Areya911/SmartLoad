import OptimizationReport from "./OptimizationReport";

export default function AdminDashboard({ token }) {
  return (
    <div>
      <h1>SmartLoad Admin Dashboard</h1>

      <section>
        <h3>Run Optimization</h3>
        <OptimizationReport token={token} />
      </section>
    </div>
  );
}
