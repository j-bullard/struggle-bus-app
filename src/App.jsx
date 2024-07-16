import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import { FleetProvider } from "@/contexts/FleetContext";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import HomeRoute from "@/routes/HomeRoute";
import CarNewsRoute from "@/routes/CarNewsRoute";
import AVLRoute from "@/routes/AVLRoute";
import SingleVehicleDetailsRoute from "@/routes/SingleVehicleDetailsRoute";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <FleetProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeRoute />} />
            <Route
              path="vehicles/:vin"
              element={<SingleVehicleDetailsRoute />}
            />
            <Route path="avl" element={<AVLRoute />} />
            <Route path="news" element={<CarNewsRoute />} />
          </Route>
        </Routes>
      </FleetProvider>
    </ChakraProvider>
  );
};

export { App };
export default App;
