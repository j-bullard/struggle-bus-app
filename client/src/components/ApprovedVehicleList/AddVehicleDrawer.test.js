import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useFleetContext } from "@/contexts/FleetContext";
import { AddVehicleDrawer } from "./AddVehicleDrawer";
import "@testing-library/jest-dom";

const mockVehicle = {
  id: 23156,
  make_model_id: 332,
  year: 2015,
  name: "FE+ S",
  description: "FE+ S 4dr Sedan (1.8L 4cyl CVT)",
  msrp: 17780,
  invoice: 17329,
  created: "2023-06-29T21:05:55-04:00",
  modified: "2023-06-29T21:05:55-04:00",
  make_model_trim_mileage: {
    id: 23156,
    make_model_trim_id: 23156,
    fuel_tank_capacity: "13.2",
    combined_mpg: 34,
    epa_city_mpg: 30,
    epa_highway_mpg: 40,
    range_city: 3960,
    range_highway: 5280,
    battery_capacity_electric: null,
    epa_time_to_charge_hr_240v_electric: null,
    epa_kwh_100_mi_electric: null,
    range_electric: null,
    epa_highway_mpg_electric: null,
    epa_city_mpg_electric: null,
    epa_combined_mpg_electric: null,
  },
  make_model_trim_engine: {
    id: 23156,
    make_model_trim_id: 23156,
    engine_type: "gas",
    fuel_type: "regular unleaded",
    cylinders: "I4",
    size: "1.8",
    horsepower_hp: 130,
    horsepower_rpm: 6000,
    torque_ft_lbs: 128,
    torque_rpm: 3600,
    valves: 16,
    valve_timing: "Variable",
    cam_type: "Double overhead cam (DOHC)",
    drive_type: "front wheel drive",
    transmission: "continuously variable-speed automatic",
  },
  make_model_trim_body: {
    id: 23156,
    make_model_trim_id: 23156,
    type: "Sedan",
    doors: 4,
    length: "182.1",
    width: "69.3",
    seats: 5,
    height: "58.9",
    wheel_base: "106.3",
    front_track: null,
    rear_track: null,
    ground_clearance: "6.4",
    cargo_capacity: "15.1",
    max_cargo_capacity: null,
    curb_weight: null,
    gross_weight: null,
    max_payload: null,
    max_towing_capacity: null,
  },
  make_model: {
    id: 332,
    make_id: 19,
    name: "Sentra",
    make: {
      id: 19,
      name: "Nissan",
    },
  },
  vin: "1",
  license_plate: "1",
  purchase_date: "2024-07-15",
  purchase_price: "1",
  purchase_mileage: "-5",
  notes: "",
  interior_color: {
    id: 85828,
    make_model_trim_id: 23156,
    name: "Charcoal, cloth",
    rgb: "68,70,69",
  },
  exterior_color: {
    id: 243698,
    make_model_trim_id: 23156,
    name: "Brilliant Silver",
    rgb: "205,204,209",
  },
  image:
    "https://www.groovecar.com/stock/images/color/2015/nissan/sentra/s-4dr-sedan-6m/2015-nissan-sentra-s-4dr-sedan-6m-brilliant-silver-composite-large.jpg",
};

jest.mock("@/contexts/FleetContext", () => ({
  useFleetContext: jest.fn(),
}));

describe("AddVehicleDrawer", () => {
  const mockAddToFleet = jest.fn();
  const mockOnSuccess = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    useFleetContext.mockReturnValue({
      addToFleet: mockAddToFleet,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the Add Vehicle drawer", () => {
    render(
      <AddVehicleDrawer
        trimId={mockVehicle.id}
        open={true}
        onSuccess={mockOnSuccess}
        onCancel={mockOnCancel}
      />,
    );

    expect(screen.getByText("Add Vehicle")).toBeInTheDocument();
  });

  test("calls addToFleet and onSuccess when the form is submitted", async () => {
    render(
      <AddVehicleDrawer
        trimId={mockVehicle.id}
        open={true}
        onSuccess={mockOnSuccess}
        onCancel={mockOnCancel}
      />,
    );

    await waitFor(() => {
      screen.getByText("Loading...").not.toBeInTheDocument();
    });

    const yearInput = screen.getByLabelText("Year");
    const makeInput = screen.getByLabelText("Make");
    const modelInput = screen.getByLabelText("Model");
    const vinInput = screen.getByLabelText("VIN");
    const licensePlateInput = screen.getByLabelText("License Plate");
    const purchaseDateInput = screen.getByLabelText("Purchase Date");
    const purchasePriceInput = screen.getByLabelText("Purchase Price");
    const purchaseMileageInput = screen.getByLabelText("Purchase Mileage");
    const saveButton = screen.getByText("Save");

    fireEvent.change(vinInput, { target: { value: "ABC123" } });
    fireEvent.change(licensePlateInput, { target: { value: "XYZ789" } });
    fireEvent.change(purchaseDateInput, { target: { value: "2022-01-01" } });
    fireEvent.change(purchasePriceInput, { target: { value: "10000" } });
    fireEvent.change(purchaseMileageInput, { target: { value: "5000" } });
    fireEvent.click(saveButton);

    console.log(yearInput, makeInput, modelInput);

    expect(mockAddToFleet).toHaveBeenCalledWith({
      trim: JSON.stringify(mockVehicle),
      vin: "ABC123",
      license_plate: "XYZ789",
      purchase_date: "2022-01-01",
      purchase_price: "10000",
      purchase_mileage: "5000",
      notes: "",
      interior_color: {},
      exterior_color: {},
    });

    expect(mockOnSuccess).toHaveBeenCalled();
  });

  test("calls onCancel when the Cancel button is clicked", () => {
    render(
      <AddVehicleDrawer
        trimId={mockVehicle.id}
        open={true}
        onSuccess={mockOnSuccess}
        onCancel={mockOnCancel}
      />,
    );

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });
});
