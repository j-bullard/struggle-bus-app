import { useLocalStorage } from "@/hooks/useLocalStorage";
import React, { createContext, useContext } from "react";

export const FleetContext = createContext();

export const FleetProvider = ({ children }) => {
  const [fleet, setFleet] = useLocalStorage("fleet", []);

  /* useEffect(() => {
    const fetchFleet = async () => {
      let result, error;

      try {
        const response = await fetch("/fleet");
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
  }, []); */

  const addToFleet = (vehicle) => {
    setFleet((prevFleet) => [...prevFleet, vehicle]);
  };

  const removeFromFleet = (vehicleId) => {
    setFleet((prevFleet) => prevFleet.filter((v) => v.id !== vehicleId));
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
