export default function ConfidenceBadge({ confidence }) {
  let color = "gray";
  let label = "Low";

  if (confidence >= 0.75) {
    color = "green";
    label = "High";
  } else if (confidence >= 0.5) {
    color = "orange";
    label = "Medium";
  }

  return (
    <span
      style={{
        padding: "6px 10px",
        borderRadius: "8px",
        background: color,
        color: "white",
        fontWeight: "bold"
      }}
    >
      {Math.round(confidence * 100)}% · {label}
    </span>
  );
}

