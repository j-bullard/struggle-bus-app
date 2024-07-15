import { render, fireEvent, screen } from "@testing-library/react";
import AddVehicleButton from "./AddVehicleButton";
import { FleetProvider } from "@/contexts/FleetContext";

describe("AddVehicleButton", () => {
  it("should open the drawer when the button is clicked", () => {
    render(
      <FleetProvider>
        <AddVehicleButton trimId="6292" />
      </FleetProvider>,
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByRole("dialog")).toBeInTheDocument(); // Assuming AddVehicleDrawer uses a role="dialog"
  });
});
