import React, { createContext, useContext, useState } from "react";

export const FleetContext = createContext();

export const FleetProvider = ({ children }) => {
  const [fleet, setFleet] = useState([]);

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
