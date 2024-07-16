import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { FleetProvider } from "@/contexts/FleetContext";
import { HomeRoute } from "@/routes/HomeRoute";

function setup(initialEntries = ["/"]) {
  return render(
    <FleetProvider>
      <MemoryRouter initialEntries={initialEntries}>
        <HomeRoute />
      </MemoryRouter>
    </FleetProvider>,
  );
}

describe("<HomeRoute />", () => {
  it("should render a message if there are no vehicles in the fleet", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      }),
    );

    setup(["/"]);

    await waitFor(() => {
      expect(screen.getByText("No vehicles in the fleet")).toBeInTheDocument();
    });
  });

  it("should render a list of all the vehicles currently in the fleet", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockFleet),
      }),
    );

    setup(["/"]);

    await waitFor(() => {
      expect(screen.getAllByRole("row")).toHaveLength(4);
    });

    mockFleet.forEach((vehicle) => {
      expect(screen.getByText(vehicle.year)).toBeInTheDocument();
      expect(
        screen.getByText(vehicle.make_model.make.name),
      ).toBeInTheDocument();
      expect(screen.getByText(vehicle.make_model.name)).toBeInTheDocument();
    });
  });
});

const mockFleet = [
  {
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
  },
  {
    id: 8894,
    make_model_id: 368,
    year: 2020,
    name: "Launch Edition",
    description: "Launch Edition 2dr Coupe (3.0L 6cyl Turbo 8A)",
    msrp: 55250,
    invoice: 50278,
    created: "2023-06-29T21:00:02-04:00",
    modified: "2023-06-29T21:00:02-04:00",
    make_model_trim_mileage: {
      id: 8894,
      make_model_trim_id: 8894,
      fuel_tank_capacity: "13.7",
      combined_mpg: 26,
      epa_city_mpg: 24,
      epa_highway_mpg: 31,
      range_city: 3288,
      range_highway: 4247,
      battery_capacity_electric: null,
      epa_time_to_charge_hr_240v_electric: null,
      epa_kwh_100_mi_electric: null,
      range_electric: null,
      epa_highway_mpg_electric: null,
      epa_city_mpg_electric: null,
      epa_combined_mpg_electric: null,
    },
    make_model_trim_engine: {
      id: 8894,
      make_model_trim_id: 8894,
      engine_type: "gas",
      fuel_type: "premium unleaded (required)",
      cylinders: "I6",
      size: "3.0",
      horsepower_hp: 335,
      horsepower_rpm: 5000,
      torque_ft_lbs: 365,
      torque_rpm: 1600,
      valves: 24,
      valve_timing: "Variable",
      cam_type: "Double overhead cam (DOHC)",
      drive_type: "rear wheel drive",
      transmission: "8-speed shiftable automatic",
    },
    make_model_trim_body: {
      id: 8894,
      make_model_trim_id: 8894,
      type: "Coupe",
      doors: 2,
      length: "172.5",
      width: "73.0",
      seats: 2,
      height: "50.9",
      wheel_base: "97.2",
      front_track: null,
      rear_track: null,
      ground_clearance: "4.5",
      cargo_capacity: "10.2",
      max_cargo_capacity: "10.2",
      curb_weight: 3397,
      gross_weight: 4001,
      max_payload: 604,
      max_towing_capacity: null,
    },
    make_model: {
      id: 368,
      make_id: 22,
      name: "GR Supra",
      make: {
        id: 22,
        name: "Toyota",
      },
    },
    vin: "f45t4ndfur10u5",
    license_plate: "2Fast4U",
    purchase_date: "2024-07-15",
    purchase_price: "55555",
    purchase_mileage: "0",
    notes: "",
    interior_color: {
      id: 32238,
      make_model_trim_id: 8894,
      name: "Black, leather",
      rgb: "29,29,29",
    },
    exterior_color: {
      id: 89368,
      make_model_trim_id: 8894,
      name: "Absolute Zero",
      rgb: "240,240,240",
    },
    image: "https://i.ytimg.com/vi/qhP5rckjRPA/maxresdefault.jpg",
  },
  {
    id: 21930,
    make_model_id: 186,
    year: 2015,
    name: "XLT",
    description: "XLT 2dr Regular Cab 4WD 6.5 ft. SB (3.5L 6cyl 6A)",
    msrp: 34745,
    invoice: 31530,
    created: "2023-06-29T21:05:53-04:00",
    modified: "2023-06-29T21:05:53-04:00",
    make_model_trim_mileage: {
      id: 21930,
      make_model_trim_id: 21930,
      fuel_tank_capacity: "26.0",
      combined_mpg: 19,
      epa_city_mpg: 17,
      epa_highway_mpg: 23,
      range_city: 4420,
      range_highway: 5980,
      battery_capacity_electric: null,
      epa_time_to_charge_hr_240v_electric: null,
      epa_kwh_100_mi_electric: null,
      range_electric: null,
      epa_highway_mpg_electric: null,
      epa_city_mpg_electric: null,
      epa_combined_mpg_electric: null,
    },
    make_model_trim_engine: {
      id: 21930,
      make_model_trim_id: 21930,
      engine_type: "flex-fuel (FFV)",
      fuel_type: "flex-fuel (unleaded/E85)",
      cylinders: "V6",
      size: "3.5",
      horsepower_hp: 282,
      horsepower_rpm: 6250,
      torque_ft_lbs: 253,
      torque_rpm: 4250,
      valves: 24,
      valve_timing: "Variable",
      cam_type: "Double overhead cam (DOHC)",
      drive_type: "four wheel drive",
      transmission: "6-speed shiftable automatic",
    },
    make_model_trim_body: {
      id: 21930,
      make_model_trim_id: 21930,
      type: "Truck (Regular Cab)",
      doors: 2,
      length: "209.3",
      width: "79.9",
      seats: 3,
      height: "76.7",
      wheel_base: "122.4",
      front_track: null,
      rear_track: null,
      ground_clearance: null,
      cargo_capacity: null,
      max_cargo_capacity: null,
      curb_weight: null,
      gross_weight: null,
      max_payload: null,
      max_towing_capacity: null,
    },
    make_model: {
      id: 186,
      make_id: 29,
      name: "F-150",
      make: {
        id: 29,
        name: "Ford",
      },
    },
    vin: "3FDXF75843MB07800",
    license_plate: "4RT543",
    purchase_date: "2024-07-15",
    purchase_price: "23000",
    purchase_mileage: "12",
    notes: "",
    interior_color: {
      id: 81356,
      make_model_trim_id: 21930,
      name: "Medium Earth Gray, cloth",
      rgb: "133,134,137",
    },
    exterior_color: {
      id: 232961,
      make_model_trim_id: 21930,
      name: "Blue Flame Metallic",
      rgb: "38,89,165",
    },
    image:
      "https://cars.usnews.com/static/images/Auto/izmo/Colors/ford_15f150xltsupercab12a_blueflame.jpg",
  },
];
