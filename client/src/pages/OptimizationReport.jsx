import { useEffect, useState } from "react";
import { runOptimizationWithExplain } from "../services/api";
import ExplanationCard from "../components/ExplanationCard";

export default function OptimizationReport({ token }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    runOptimizationWithExplain(token).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Running optimization…</p>;

  if (!data?.explanations?.length) {
    return <div className="card">
  <h3>No pending shipments</h3>
  <p>
    Create a shipment or mark an existing one as
    <b> pending</b> to run optimization.
  </p>
</div>

  }

  return (
    <div>
      <h2>Optimization Results</h2>

      {data.explanations.map((exp) => (
        <ExplanationCard
          key={exp.shipmentId}
          explanation={exp}
        />
      ))}
    </div>
  );
}
