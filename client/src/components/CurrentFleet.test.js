import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { FleetProvider } from "@/contexts/FleetContext";

const mockFleet = [
  {
    year: "2020",
    make: "Nissan",
    model: "Sentra",
    trim: "FE + S",
  },
];

test("As a fleet manager, I should see a list of all the vehicles currently in my fleet.", async () => {
  renderMatches(
    <FleetProvider value={{ fleet: mockFleet }}>
      <CurrentFleet />
    </FleetProvider>,
  );

  await waitFor(() => {
    expect(screen.getByText("2020")).toBeInTheDocument();
    expect(screen.getByText("Nissan")).toBeInTheDocument();
    expect(screen.getByText("Sentra")).toBeInTheDocument();
    expect(screen.getByText("FE + S")).toBeInTheDocument();
  });
});

// test('As a fleet manager, when I click on the information button for a car, I expect to see the single vehicle details page', async

// //test icon button that takes to vehicle by vin
