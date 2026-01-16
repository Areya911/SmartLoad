import { useState, useRef, useEffect } from "react";

export default function ActionMenu({ onEdit, onDelete, disabled }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // close menu on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        disabled={disabled}
        style={{
          background: "none",
          border: "none",
          fontSize: "18px",
          cursor: disabled ? "not-allowed" : "pointer"
        }}
      >
        ⋮
      </button>

      {open && !disabled && (
        <div
          style={{
            position: "absolute",
            right: 0,
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "6px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 10
          }}
        >
          <div
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            style={menuItem}
          >
            Edit
          </div>

          <div
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
            style={{ ...menuItem, color: "red" }}
          >
            Delete
          </div>
        </div>
      )}
    </div>
  );
}

const menuItem = {
  padding: "8px 12px",
  cursor: "pointer",
  whiteSpace: "nowrap"
};
