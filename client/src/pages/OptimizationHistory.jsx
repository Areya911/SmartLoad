import { useEffect, useState } from "react";
import { getOptimizationHistory } from "../services/optimizationApi";

export default function OptimizationHistory() {
  const token = localStorage.getItem("token");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await getOptimizationHistory(token);
      setHistory(res);
    }
    load();
  }, []);

  return (
    <div className="container">
      <h1>Optimization History</h1>

      {history.map(run => (
        <div className="card" key={run._id}>
          <p>
            <b>Run at:</b>{" "}
            {new Date(run.createdAt).toLocaleString()}
          </p>
          <p>
            Assignments: {run.assignments.length}
          </p>
        </div>
      ))}
    </div>
  );
}
