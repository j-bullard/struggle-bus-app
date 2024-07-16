import React, { createContext, useContext, useEffect, useState } from "react";

export const FleetContext = createContext();

export const FleetProvider = ({ children }) => {
  const [fleet, setFleet] = useState([]);

  useEffect(() => {
    const fetchFleet = async () => {
      let result, error;

      try {
        const response = await fetch("/api/fleet");
        if (!response.ok) {
          throw new Error("Failed to fetch fleet");
        }

        result = await response.json();
      } catch (err) {
        error = err instanceof Error ? err.message : "An error occurred";
      }

      return { result, error };
    };

    fetchFleet().then(({ result, error }) => {
      if (result) {
        setFleet(result);
      } else {
        console.error(error);
      }
    });
  }, []);

  const addToFleet = async (vehicle) => {
    let result, error;

    try {
      const response = await fetch("/api/fleet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicle),
      });

      if (!response.ok) {
        throw new Error("Failed to add vehicle to fleet");
      }

      const newVehicle = await response.json();
      setFleet((prevFleet) => [...prevFleet, newVehicle]);
      result = newVehicle;
    } catch (err) {
      error = err instanceof Error ? err.message : "An error occurred";
    }

    return { result, error };
  };

  const removeFromFleet = async (vin) => {
    let result, error;

    try {
      const response = await fetch(`/api/fleet/${vin}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove vehicle from fleet");
      }

      setFleet((prevFleet) => prevFleet.filter((v) => v.vin !== vin));
      result = vin;
    } catch (err) {
      error = err instanceof Error ? err.message : "An error occurred";
    }

    return { result, error };
  };

  return (
    <FleetContext.Provider value={{ fleet, addToFleet, removeFromFleet }}>
      {children}
    </FleetContext.Provider>
  );
};

export function useFleetContext() {
  const context = useContext(FleetContext);
  if (!context) {
    throw new Error("useFleetContext must be used within a FleetProvider");
  }
  return context;
}
