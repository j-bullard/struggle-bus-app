import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SingleVehicleDetailsRoute from "@/routes/SingleVehicleDetailsRoute";

function setup(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <SingleVehicleDetailsRoute />
    </MemoryRouter>,
  );
}

describe("<SingleVehicleDetailsRoute />", () => {
  test("As a fleet manager, when I click on a vehicle, I should see its detailed specifications including make, model, year and maintenance schedule", async () => {
    const vin = "1GNEL19X73B130926";

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockVehicle),
      }),
    );

    setup([`/vehicles/${vin}`]);

    await waitFor(() => {
      expect(screen.getByText("2017 Honda Civic")).toBeInTheDocument();
      expect(
        screen.getByText("Si 2dr Coupe (1.5L 4cyl Turbo 6M)"),
      ).toBeInTheDocument();
      expect(screen.getByText("Change Oil: 8000 miles"));
      expect(screen.getByText("Change Transmission Fluid: 10000"));
      expect(screen.getByText("Change Brake Fluid: 7000"));
    });
  });
});

const mockVehicle = {
  id: 16494,
  make_model_id: 216,
  year: 2017,
  name: "Si",
  description: "Si 2dr Coupe (1.5L 4cyl Turbo 6M)",
  msrp: 23900,
  invoice: 22202,
  created: "2023-06-29T21:03:31-04:00",
  modified: "2023-06-29T21:03:31-04:00",
  make_model_trim_mileage: {
    id: 16494,
    make_model_trim_id: 16494,
    fuel_tank_capacity: "12.4",
    combined_mpg: 32,
    epa_city_mpg: 28,
    epa_highway_mpg: 38,
    range_city: 3472,
    range_highway: 4712,
    battery_capacity_electric: null,
    epa_time_to_charge_hr_240v_electric: null,
    epa_kwh_100_mi_electric: null,
    range_electric: null,
    epa_highway_mpg_electric: null,
    epa_city_mpg_electric: null,
    epa_combined_mpg_electric: null,
  },
  make_model_trim_engine: {
    id: 16494,
    make_model_trim_id: 16494,
    engine_type: "gas",
    fuel_type: "premium unleaded (recommended)",
    cylinders: "I4",
    size: "1.5",
    horsepower_hp: 205,
    horsepower_rpm: 5700,
    torque_ft_lbs: 192,
    torque_rpm: 2100,
    valves: 16,
    valve_timing: null,
    cam_type: "Double overhead cam (DOHC)",
    drive_type: "front wheel drive",
    transmission: "6-speed manual",
  },
  make_model_trim_body: {
    id: 16494,
    make_model_trim_id: 16494,
    type: "Coupe",
    doors: 2,
    length: "177.3",
    width: "70.9",
    seats: 5,
    height: "54.7",
    wheel_base: "106.3",
    front_track: null,
    rear_track: null,
    ground_clearance: null,
    cargo_capacity: "11.9",
    max_cargo_capacity: null,
    curb_weight: 2889,
    gross_weight: null,
    max_payload: null,
    max_towing_capacity: null,
  },
  make_model: {
    id: 216,
    make_id: 9,
    name: "Civic",
    make: {
      id: 9,
      name: "Honda",
    },
  },
  vin: "1234asdf1234asdf",
  license_plate: "JUSTVIBN",
  purchase_date: "2024-07-15",
  purchase_price: "25000",
  purchase_mileage: "42000",
  notes: "",
  interior_color: {
    id: 60341,
    make_model_trim_id: 16494,
    name: "Black, cloth",
    rgb: "25,25,25",
  },
  exterior_color: {
    id: 168652,
    make_model_trim_id: 16494,
    name: "White Orchid Pearl",
    rgb: "251,251,240",
  },
  image:
    "https://www.townsendhonda.com/wp-content/plugins/di-honda-integration/assets/img/model-images/2017-civic-sedan/colors/model-color-2017-civic-sedan-white-orchid-pearl.png",
};
