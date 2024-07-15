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
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const AddVehicleDrawer = ({ trimId, open, onSuccess, onCancel }) => {
  const { addToFleet } = useFleetContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trim, setTrim] = useState(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    setLoading(true);

    const fetchTrimDetails = async () => {
      let result, error;

      try {
        const response = await fetch(`/api/trims/${trimId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch trim details");
        }

        result = await response.json();
      } catch (err) {
        error = err instanceof Error ? err.message : "An error occurred";
      }

      return { result, error };
    };

    fetchTrimDetails().then(({ result, error }) => {
      if (result) {
        setTrim(result);
      } else {
        setError(error);
      }

      setLoading(false);
    });
  }, [trimId, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const entries = Object.fromEntries(formData);

    const vehicle = {
      ...JSON.parse(entries.trim),
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

    addToFleet(vehicle).then(() => onSuccess());
  };

  return (
    <Drawer size="md" isOpen={open} placement="right" onClose={onCancel}>
      <DrawerOverlay />

      <form onSubmit={handleSubmit}>
        <DrawerContent>
          <DrawerHeader>Add Vehicle</DrawerHeader>

          <DrawerBody>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {trim && !loading && !error && (
              <Stack gap="20px">
                <input type="hidden" name="trim" value={JSON.stringify(trim)} />

                <FormControl>
                  <FormLabel>Year</FormLabel>
                  <Input
                    type="text"
                    readOnly
                    defaultValue={trim.year}
                    required
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Make</FormLabel>
                  <Input
                    type="text"
                    readOnly
                    defaultValue={trim.make_model.make.name}
                    required
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Model</FormLabel>
                  <Input
                    type="text"
                    readOnly
                    defaultValue={trim.make_model.name}
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
                      trim.make_model_trim_interior_colors[0],
                    )}
                    required
                  >
                    <Stack direction="column">
                      {trim.make_model_trim_interior_colors.map((color) => (
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
                      trim.make_model_trim_exterior_colors[0],
                    )}
                    required
                  >
                    <Stack direction="column">
                      {trim.make_model_trim_exterior_colors.map((color) => (
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
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onCancel}>
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit">
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
