import { render, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { App } from "@/App";
import userEvent from "@testing-library/user-event";
import { FleetProvider } from "@/contexts/FleetContext";

function setup(initialEntries = ["/"]) {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>,
  );
}

describe("<App />", () => {
  it("should render the Home component by default", async () => {
    setup(["/"]);

    // wait for the home component to load
    await waitFor(() => {
      // check if the home component is rendered
      expect(global.window.document.title).toMatch(/home/i);
    });
  });

  // it("should navigate to the AVL route when the user clicks on the AVL link", async () => {
  //   setup(["/"]);

  //   // wait for the home component to load
  //   await waitFor(() => {
  //     // check if the home component is rendered
  //     expect(screen.getByText(/loading/i)).not.toBeInTheDocument();
  //   });

  //   // click on the AVL link
  //   userEvent.click(screen.getByText(/avl/i));

  //   // wait for the avl component o render
  //   await waitFor(() => {
  //     // check if the avl component is rendered
  //     expect(global.window.document.title).toMatch(/avl/i);
  //   });
  // });
});
