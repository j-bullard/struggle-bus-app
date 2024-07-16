import { useFleetContext } from "@/contexts/FleetContext";
import { Box, Heading } from "@chakra-ui/react";
import Swal from "sweetalert2";
import FleetTable from "@/components/Home/FleetTable";

const HomeRoute = () => {
  const { fleet, removeFromFleet } = useFleetContext();

  const handleRemoveVehicle = (vin) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This vehicle will be removed from the fleet.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await removeFromFleet(vin);
      }
    });
  };

  return (
    <Box>
      <Box sx={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
        <Heading as="h2">Current Fleet</Heading>
      </Box>

      {fleet.length === 0 ? (
        <p>There are no vehicles currently in the fleet.</p>
      ) : (
        <FleetTable fleet={fleet} onRemoveVehicle={handleRemoveVehicle} />
      )}
    </Box>
  );
};

export { HomeRoute };
export default HomeRoute;
