const BASE_URL = "http://localhost:5000/api";

// ---------------- AUTH ----------------

export async function loginUser(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
}

export async function signupUser(name, email, password) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  return res.json();
}

// ---------- TRUCKS ----------
export async function createTruck(data, token) {
  const res = await fetch("http://localhost:5000/api/trucks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

// ---------- SHIPMENTS ----------
export async function createShipment(data, token) {
  const res = await fetch("http://localhost:5000/api/shipments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function getAllTrucks(token) {
  const res = await fetch("http://localhost:5000/api/trucks", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
}

export async function getAllShipments(token) {
  const res = await fetch("http://localhost:5000/api/shipments", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
}

export async function markInTransit(shipmentId, token) {
  const res = await fetch(
    `http://localhost:5000/api/shipments/${shipmentId}/in-transit`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return res.json();
}

export async function markDelivered(shipmentId, token) {
  const res = await fetch(
    `http://localhost:5000/api/shipments/${shipmentId}/delivered`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return res.json();
}

export async function getDriverAssignments(token) {
  const res = await fetch("http://localhost:5000/api/bookings/my-assignments", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
}
