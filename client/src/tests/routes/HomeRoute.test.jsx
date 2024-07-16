import { render, screen, waitFor } from "@testing-library/react";
import { FleetProvider } from "@/contexts/FleetContext";
import { HomeRoute } from "@/routes/HomeRoute";

const mockFleet = [
  {
    year: "2020",
    make: "Nissan",
    model: "Sentra",
    trim: "FE + S",
  },
];

test("As a fleet manager, I should see a list of all the vehicles currently in my fleet.", async () => {
  render(
    <FleetProvider value={{ fleet: mockFleet }}>
      <HomeRoute />
    </FleetProvider>,
  );

  await waitFor(() => {
    expect(screen.getByText("2020")).toBeInTheDocument();
    expect(screen.getByText("Nissan")).toBeInTheDocument();
    expect(screen.getByText("Sentra")).toBeInTheDocument();
    expect(screen.getByText("FE + S")).toBeInTheDocument();
  });
});
