import App from "./App";
import apiService from "./services/api_service.js";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { FleetProvider } from "@/contexts/FleetContext";
import { MemoryRouter } from "react-router-dom";

test("As a fleet manager, when I click on a vehicle, I should see its detailed specifications including make, model, year and maintenance schedule", async () => {
  const vin = "1GNEL19X73B130926";

  render(
    <MemoryRouter initialEntries={[`/vehicles/${vin}`]}>
      <FleetProvider value={{ fleet: mockCarData }}>
        <SingleVehicleDetails />
      </FleetProvider>
    </MemoryRouter>,
  );

  const brandName = screen.getByText("Chevrolet");
  const modelName = screen.getByText("Silverado 2500HD");
  const year = screen.getByText("2020");
  const image = screen.getByRole("img");
  const name = screen.getByText("Custom");
  const description = screen.getByText(
    "Custom 4dr Crew Cab 4WD LB (6.6L 8cyl 6A)",
  );
  const msrp = screen.getByText("43800");

  await waitFor(() => {
    expect(brandName).toBeInTheDocument();
    expect(modelName).toBeInTheDocument();
    expect(year).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(msrp).toBeInTheDocument();
  });
});

test("As a fleet manager, when I have clicked on a vehicle, I should also see a series of maintenance requirements for that vehicle.", async () => {
  render(
    <MemoryRouter initialEntries={[`/vehicles/${vin}`]}>
      <FleetProvider value={{ fleet: mockCarData }}>
        <SingleVehicleDetails />
      </FleetProvider>
    </MemoryRouter>,
  );
  const oilChange = screen.getByText("8000 miles");
  const tireChange = screen.getByText("10000");
  const brakeChange = screen.getByText("60000");

  await waitFor(() => {
    expect(oilChange).totoBeInTheDocument();
    expect(tireChange).totoBeInTheDocument();
    expect(brakeChange).totoBeInTheDocument();
  });
});

test("As a fleet manager, when I have clicked on a vehicle, I still see my series of tabs to other options on the application.", async () => {
  renderMatches(<App />);
  await waitFor(() => {
    expect("Fleet", "AVL", "News").totoBeInTheDocument();
  });
});
