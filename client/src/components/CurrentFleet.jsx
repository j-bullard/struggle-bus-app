import { useFleetContext } from "@/contexts/FleetContext";
import { useNavigate } from "react-router-dom";

const CurrentFleet = () => {
  const navigate = useNavigate();
  const { fleet, removeFromFleet } = useFleetContext();

  return (
    <div className="currentFleetView">
      <h1>Current Fleet</h1>
      {fleet.length === 0 ? (
        <p>There are no vehciels currently in the fleet.</p>
      ) : (
        <div className="table-contain">
          <table className="striped-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Make</th>
                <th>Model</th>
                <th>Trim</th>
                <th>Exterior Color</th>
                <th>Interior Color</th>
                <th>Purchase Mileage</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fleet.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.year}</td>
                  <td>{vehicle.make_model.make.name}</td>
                  <td>{vehicle.make_model.name}</td>
                  <td>{vehicle.name}</td>
                  <td>{vehicle.exterior_color.name}</td>
                  <td>{vehicle.interior_color.name}</td>
                  <td>{vehicle.purchase_mileage}</td>
                  <td>{vehicle.notes}</td>
                  <td className="text-right">
                    <button
                      className="muted-button"
                      onClick={() => navigate(`/vehicles/${vehicle.id}`)}
                    >
                      <span className="material-symbols-outlined">info</span>
                    </button>{" "}
                    <button
                      className="danger-button"
                      onClick={() => removeFromFleet(vehicle.id)}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CurrentFleet;
