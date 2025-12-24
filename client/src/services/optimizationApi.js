export const runOptimizationWithExplain = async (token) => {
  const res = await fetch(
    "http://localhost:5000/api/optimize/run-with-explain",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return res.json();
};
