import { vehicleData } from "./mockData";

// export const fetchFleet = async () => {
//   return { result: vehicleData, error: undefined };
// };

export const fetchFleet = async () =>
  Promise.resolve({
    result: vehicleData,
    error: undefined,
  });
