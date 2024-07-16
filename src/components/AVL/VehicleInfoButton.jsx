import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  IconButton,
  ListItem,
  Stack,
  Tag,
  Tooltip,
  UnorderedList,
} from "@chakra-ui/react";
import { useState } from "react";
import { RxInfoCircled } from "react-icons/rx";

const VehicleInfoButton = ({ trimId }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState();

  const handleClick = async (trimId) => {
    setLoading(true);

    const response = await fetch(`/api/trims/${trimId}`);
    const data = await response.json();

    setVehicleDetails(data);
    setOpen(true);
    setLoading(false);
  };

  return (
    <>
      <IconButton
        variant="ghost"
        size="sm"
        data-testid="vehicle-info-button"
        isLoading={loading}
        onClick={() => handleClick(trimId)}
      >
        <RxInfoCircled fontSize={18} />
      </IconButton>

      <Drawer size="sm" isOpen={open} placement="right" onClose={() => null}>
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton onClick={() => setOpen(false)} />

          <>
            <DrawerHeader>
              <Heading as="h3" size="md" marginBottom={2}>
                {vehicleDetails?.year} {vehicleDetails?.make_model.make.name}{" "}
                {vehicleDetails?.make_model.name}
              </Heading>
              <Heading as="h4" size="sm" marginBottom={4} color="gray.600">
                {vehicleDetails?.description}
              </Heading>
            </DrawerHeader>
            <DrawerBody data-testid="vehicle-info-details">
              <Stack gap={4}>
                <div>
                  <Heading as="h4" size="sm" marginBottom={2}>
                    Interior Colors
                  </Heading>

                  <Stack direction="row" marginBottom={4} wrap="wrap">
                    {vehicleDetails?.make_model_trim_interior_colors.map(
                      (color) => (
                        <Tooltip key={color.id} label={color.name}>
                          <Box
                            rounded="full"
                            sx={{
                              border: "1px solid #dbdbdb",
                            }}
                          >
                            <Tag
                              sx={{ backgroundColor: `rgb(${color.rgb})` }}
                              size="md"
                              rounded="full"
                              border="2px solid #fff"
                            />
                          </Box>
                        </Tooltip>
                      ),
                    )}
                  </Stack>
                </div>

                <div>
                  <Heading as="h4" size="sm" marginBottom={2}>
                    Exterior Colors
                  </Heading>

                  <Stack direction="row" marginBottom={4} wrap="wrap">
                    {vehicleDetails?.make_model_trim_exterior_colors.map(
                      (color) => (
                        <Tooltip key={color.id} label={color.name}>
                          <Box
                            rounded="full"
                            sx={{
                              border: "1px solid #dbdbdb",
                            }}
                          >
                            <Tag
                              sx={{ backgroundColor: `rgb(${color.rgb})` }}
                              size="md"
                              rounded="full"
                              border="2px solid #fff"
                            />
                          </Box>
                        </Tooltip>
                      ),
                    )}
                  </Stack>
                </div>

                <div>
                  <Heading as="h4" size="sm" marginBottom={2}>
                    Body
                  </Heading>

                  <UnorderedList>
                    {Object.entries(
                      vehicleDetails?.make_model_trim_body ?? {},
                    ).map(([key, value]) => {
                      if (value === null || key.includes("id")) {
                        return null;
                      }

                      return (
                        <ListItem key={key}>
                          <span>{key.replace(/_/g, " ")}</span>:{" "}
                          <span>{value}</span>
                        </ListItem>
                      );
                    })}
                  </UnorderedList>
                </div>

                <div>
                  <Heading as="h4" size="sm" marginBottom={2}>
                    Mileage
                  </Heading>

                  <UnorderedList>
                    {Object.entries(
                      vehicleDetails?.make_model_trim_mileage ?? {},
                    ).map(([key, value]) => {
                      if (value === null || key.includes("id")) {
                        return null;
                      }

                      return (
                        <ListItem key={key}>
                          <span>{key.replace(/_/g, " ")}</span>:{" "}
                          <span>{value}</span>
                        </ListItem>
                      );
                    })}
                  </UnorderedList>
                </div>

                <div>
                  <Heading as="h4" size="sm" marginBottom={2}>
                    Engine
                  </Heading>

                  <UnorderedList>
                    {Object.entries(
                      vehicleDetails?.make_model_trim_engine ?? {},
                    ).map(([key, value]) => {
                      if (value === null || key.includes("id")) {
                        return null;
                      }

                      return (
                        <ListItem key={key}>
                          <span>{key.replace(/_/g, " ")}</span>:{" "}
                          <span>{value}</span>
                        </ListItem>
                      );
                    })}
                  </UnorderedList>
                </div>
              </Stack>
            </DrawerBody>
          </>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { VehicleInfoButton };
export default VehicleInfoButton;
