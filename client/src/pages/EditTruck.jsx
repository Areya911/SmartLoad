<Route path="/trucks/edit/:id" element={<EditTruck />} />
import { useParams } from "react-router-dom";

export default function EditTruck() {
  const { id } = useParams();

  return (
    <div className="container">
      <h1>Edit Truck</h1>
      <p>Editing truck with ID: {id}</p>
    </div>
  );
}
