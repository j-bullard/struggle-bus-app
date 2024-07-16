import { useFleetContext } from "@/contexts/FleetContext";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

const AddVehicleDrawer = ({ trimData, open, onSuccess, onCancel }) => {
  const { addToFleet } = useFleetContext();
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsAdding(true);

    const formData = new FormData(e.currentTarget);
    const entries = Object.fromEntries(formData);

    const vehicle = {
      ...trimData,
      vin: entries.vin,
      license_plate: entries.license_plate,
      purchase_date: entries.purchase_date,
      purchase_price: entries.purchase_price,
      purchase_mileage: entries.purchase_mileage,
      notes: entries.notes,
      interior_color: JSON.parse(entries.interior_color),
      exterior_color: JSON.parse(entries.exterior_color),
    };

    delete vehicle.make_model_trim_interior_colors;
    delete vehicle.make_model_trim_exterior_colors;

    addToFleet(vehicle).then(() => {
      onSuccess();
      setIsAdding(false);
    });
  };

  return (
    <Drawer size="md" isOpen={open} placement="right" onClose={onCancel}>
      <DrawerOverlay />

      <form onSubmit={handleSubmit}>
        <DrawerContent>
          <DrawerHeader>Add Vehicle</DrawerHeader>

          <DrawerBody>
            <Stack gap="20px">
              <input
                type="hidden"
                name="trim"
                value={JSON.stringify(trimData)}
              />

              <FormControl>
                <FormLabel>Year</FormLabel>
                <Input
                  type="text"
                  readOnly
                  defaultValue={trimData.year}
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>Make</FormLabel>
                <Input
                  type="text"
                  readOnly
                  defaultValue={trimData.make_model.make.name}
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>Model</FormLabel>
                <Input
                  type="text"
                  readOnly
                  defaultValue={trimData.make_model.name}
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>VIN</FormLabel>
                <Input type="text" name="vin" autoComplete="off" required />
              </FormControl>

              <FormControl>
                <FormLabel>License Plate</FormLabel>
                <Input
                  type="text"
                  name="license_plate"
                  autoComplete="off"
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel>Purchase Date</FormLabel>
                <Input type="date" name="purchase_date" required />
              </FormControl>

              <FormControl>
                <FormLabel>Purchase Price</FormLabel>
                <Input type="number" name="purchase_price" required />
              </FormControl>

              <FormControl>
                <FormLabel>Purchase Mileage</FormLabel>
                <Input type="number" name="purchase_mileage" required />
              </FormControl>

              <FormControl>
                <FormLabel>Interior color</FormLabel>
                <RadioGroup
                  defaultValue={JSON.stringify(
                    trimData.make_model_trim_interior_colors[0],
                  )}
                  required
                >
                  <Stack direction="column">
                    {trimData.make_model_trim_interior_colors.map((color) => (
                      <Radio
                        key={color.id}
                        name="interior_color"
                        value={JSON.stringify(color)}
                      >
                        {color.name}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Exterior color</FormLabel>
                <RadioGroup
                  defaultValue={JSON.stringify(
                    trimData.make_model_trim_exterior_colors[0],
                  )}
                  required
                >
                  <Stack direction="column">
                    {trimData.make_model_trim_exterior_colors.map((color) => (
                      <Radio
                        key={color.id}
                        name="exterior_color"
                        value={JSON.stringify(color)}
                      >
                        {color.name}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Notes</FormLabel>
                <Textarea name="notes" />
              </FormControl>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={onCancel}
              disabled={isAdding}
            >
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit" isLoading={isAdding}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};

export { AddVehicleDrawer };
export default AddVehicleDrawer;
