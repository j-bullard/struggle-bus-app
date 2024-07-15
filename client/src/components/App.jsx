import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import { FleetProvider } from "@/contexts/FleetContext";
import SingleVehicleDetails from "@/components/SingleVehicleDetails";
import CarNews from "@/components/CarNews";
import CurrentFleet from "@/components/CurrentFleet";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import ApprovedVehicleList from "@/components/ApprovedVehicleList";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <FleetProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CurrentFleet />} />
            <Route path="vehicles/:vin" element={<SingleVehicleDetails />} />
            <Route path="avl" element={<ApprovedVehicleList />} />
            <Route path="news" element={<CarNews />} />
          </Route>
        </Routes>
      </FleetProvider>
    </ChakraProvider>
  );
};

export { App };
export default App;
