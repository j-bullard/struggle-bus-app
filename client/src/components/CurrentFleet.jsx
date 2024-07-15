import { useFleetContext } from "@/contexts/FleetContext";
import {
  ButtonGroup,
  Table,
  TableContainer,
  Td,
  Th,
  Tr,
  Thead,
  Tbody,
  Box,
  Tooltip,
  Heading,
  Tag,
  Stack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { RxTrash, RxInfoCircled } from "react-icons/rx";

const CurrentFleet = () => {
  const navigate = useNavigate();
  const { fleet, removeFromFleet } = useFleetContext();

  const handleRemove = (id) => {
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
        await removeFromFleet(id);
      }
    });
  };

  return (
    <Box>
      <Box sx={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
        <Heading as="h2">Current Fleet</Heading>
      </Box>

      {fleet.length === 0 ? (
        <p>There are no vehciels currently in the fleet.</p>
      ) : (
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Year</Th>
                <Th>Make</Th>
                <Th>Model</Th>
                <Th>Trim</Th>
                <Th>Colors</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {fleet.map((vehicle) => (
                <Tr key={vehicle.id}>
                  <Td>{vehicle.year}</Td>
                  <Td>{vehicle.make_model.make.name}</Td>
                  <Td>{vehicle.make_model.name}</Td>
                  <Td>{vehicle.name}</Td>
                  <Td>
                    <Stack>
                      <Tooltip label={vehicle.exterior_color.name}>
                        <HStack>
                          <Tag
                            sx={{
                              backgroundColor: `rgb(${vehicle.exterior_color.rgb})`,
                              border: "1px solid #ccc",
                              userSelect: "none",
                            }}
                          />
                          <span>Exterior</span>
                        </HStack>
                      </Tooltip>

                      <Tooltip label={vehicle.interior_color.name}>
                        <HStack>
                          <Tag
                            sx={{
                              backgroundColor: `rgb(${vehicle.interior_color.rgb})`,
                              border: "1px solid #ccc",
                            }}
                          />
                          <span>Interior</span>
                        </HStack>
                      </Tooltip>
                    </Stack>
                  </Td>
                  <Td>
                    <ButtonGroup gap="2">
                      <IconButton
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/vehicles/${vehicle.id}`)}
                      >
                        <RxInfoCircled fontSize={18} />
                      </IconButton>
                      <IconButton
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleRemove(vehicle.vin)}
                      >
                        <RxTrash fontSize={18} />
                      </IconButton>
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default CurrentFleet;
