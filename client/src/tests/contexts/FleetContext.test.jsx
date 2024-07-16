import { render, waitFor } from "@testing-library/react";
import { fetchFleet } from "@/services/fleetService";
import { FleetProvider } from "@/contexts/FleetContext";
import { mockData } from "@/services/__mocks__/mockData";
import { MemoryRouter } from "react-router-dom";
import HomeRoute from "@/routes/HomeRoute";

describe("FleetProvider", () => {
  beforeEach(() => {
    fetchFleet.mockClear();
  });

  it("should set fleet data when fetchFleet resolves with result", async () => {
    fetchFleet.mockResolvedValue({ result: mockData, error: undefined });

    const { getByText } = render(
      <MemoryRouter>
        <FleetProvider>
          <HomeRoute />
        </FleetProvider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(getByText("Chevrolet")).toBeInTheDocument();
      expect(getByText("Silverado 2500HD")).toBeInTheDocument();
    });
  });

  it("should log error when fetchFleet resolves with error", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const mockError = "Fetch error";
    fetchFleet.mockResolvedValue({ result: null, error: mockError });

    render(<FleetProvider />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);
    });

    consoleErrorSpy.mockRestore();
  });
});
