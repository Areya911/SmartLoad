import { useEffect, useState } from "react";
import { runOptimizationWithExplain } from "../services/optimizationApi";
import ExplanationCard from "../components/ExplanationCard";

export default function OptimizationReport({ token }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    runOptimizationWithExplain(token).then(setData);
  }, []);

  if (!data) return <p>Running optimization...</p>;

  return (
    <div>
      <h2>Optimization Report</h2>

      {data.explanations.map((exp) => (
        <ExplanationCard
          key={exp.shipmentId}
          explanation={exp}
        />
      ))}
    </div>
  );
}
