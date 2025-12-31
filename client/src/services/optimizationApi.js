const API_BASE = "http://localhost:5000/api";

/**
 * Run shipment optimization with explainability
 * Requires admin JWT token
 */
export async function runOptimizationWithExplain(token) {
  const res = await fetch(
    `${API_BASE}/optimize/run-with-explain`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.json();
}
