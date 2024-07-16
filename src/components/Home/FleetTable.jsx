import {
  ButtonGroup,
  Table,
  TableContainer,
  Td,
  Th,
  Tr,
  Thead,
  Tbody,
  Tooltip,
  Tag,
  Stack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { RxTrash, RxInfoCircled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const FleetTable = ({ fleet, onRemoveVehicle }) => {
  const navigate = useNavigate();

  return (
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
                    className="vicDeets"
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/vehicles/${vehicle.vin}`)}
                  >
                    <RxInfoCircled fontSize={18} />
                  </IconButton>
                  <IconButton
                    size="sm"
                    colorScheme="red"
                    onClick={() => onRemoveVehicle(vehicle.vin)}
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
  );
};

export { FleetTable };
export default FleetTable;
