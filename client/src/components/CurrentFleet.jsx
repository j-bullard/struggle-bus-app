import { useFleetContext } from "@/contexts/FleetContext";

const CurrentFleet = () => {
  const { fleet, removeFromFleet } = useFleetContext();

  return (
    <div className="currentFleetView">
      <h1>Current Fleet</h1>
      {fleet.length === 0 ? (
        <p>There are no vehciels currently in the fleet.</p>
      ) : (
        <ul>
          {fleet.map((vehicle) => (
            <li key={vehicle.id}>
              {/* how to put in vehicle card display item ?? */}
              <button
                className="removeButton"
                onClick={() => removeFromFleet(vehicle.id)}
              >
                Remove from Fleet
              </button>
              {/* how to combine vehicle card with button so that clicking on vehicle image still navigates to details ?? */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrentFleet;
