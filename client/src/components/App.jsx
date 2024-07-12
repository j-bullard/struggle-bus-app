import { Routes, Route } from "react-router-dom";
import { BrowseVehicles } from "@/components/BrowseVehicles";
import Layout from "@/components/Layout";
import { FleetProvider } from "@/contexts/FleetContext";
import SingleVehicleDetails from "@/components/SingleVehicleDetails";
import CarNews from "@/components/CarNews";
import CurrentFleet from "@/components/CurrentFleet";

const App = () => {
  return (
    <FleetProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CurrentFleet />} />
          <Route path="vehicles/:id" element={<SingleVehicleDetails />} />
          <Route path="browse" element={<BrowseVehicles />} />
          <Route path="news" element={<CarNews />} />
        </Route>
      </Routes>
    </FleetProvider>
  );
};

export { App };
export default App;
