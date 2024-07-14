import Dialog from "@/components/ui/dialog";
import { useFleetContext } from "@/contexts/FleetContext";
import { useEffect, useState } from "react";

const AddVehicleDialog = ({ isOpen, trimId, onClose }) => {
  const { addToFleet } = useFleetContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trim, setTrim] = useState(null);

  useEffect(() => {
    if (!isOpen) {
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
  }, [trimId, isOpen]);

  const handleSubmit = (e) => {
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

    addToFleet(vehicle);
    onClose();
  };

  return (
    <Dialog isOpen={isOpen}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {!trim && !loading && !error && <p>No data</p>}
      {!loading && !error && trim ? (
        <div>
          <header>
            <h1>
              {trim.year} {trim.make_model.make.name} {trim.make_model.name}
            </h1>
          </header>

          <form onSubmit={handleSubmit}>
            <input type="hidden" name="trim" value={JSON.stringify(trim)} />

            <div>
              <label>
                VIN
                <input type="text" name="vin" />
              </label>
            </div>

            <div>
              <label>
                License Plate
                <input type="text" name="license_plate" />
              </label>
            </div>

            <div>
              <label>
                Purchase Date
                <input type="date" name="purchase_date" />
              </label>
            </div>

            <div>
              <label>
                Purchase Price
                <input type="number" name="purchase_price" />
              </label>
            </div>

            <div>
              <label>
                Purchase Mileage
                <input type="number" name="purchase_mileage" />
              </label>
            </div>

            <div>
              <label>
                Notes
                <textarea name="notes" />
              </label>
            </div>

            <fieldset>
              <legend>Interior color</legend>
              {trim.make_model_trim_interior_colors.map((color) => (
                <div key={color.id}>
                  <label>
                    <input
                      type="radio"
                      name="interior_color"
                      value={JSON.stringify(color)}
                    />
                    {color.name}
                  </label>
                </div>
              ))}
            </fieldset>

            <fieldset>
              <legend>Exterior color</legend>
              {trim.make_model_trim_exterior_colors.map((color) => (
                <div key={color.id}>
                  <label>
                    <input
                      type="radio"
                      name="exterior_color"
                      value={JSON.stringify(color)}
                    />
                    {color.name}
                  </label>
                </div>
              ))}
            </fieldset>

            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Add to fleet</button>
          </form>
        </div>
      ) : (
        <p>No data</p>
      )}
    </Dialog>
  );
};

export { AddVehicleDialog };
export default AddVehicleDialog;
