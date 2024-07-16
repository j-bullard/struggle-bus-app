import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Layout from "@/components/Layout";

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    Outlet: () => <div data-testid="outlet" />,
  };
});

describe("Layout", () => {
  test("As a user, I should see all of the navigation buttons.", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>,
    );

    expect(screen.getByRole("button", { name: /Fleet/i })).toBeInTheDocument;
    expect(screen.getByRole("button", { name: /AVL/i })).toBeInTheDocument;
    expect(screen.getByRole("button", { name: /News/i })).toBeInTheDocument;

    expect(screen.getByRole("button", { name: /Fleet/i })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("button", { name: /AVL/i })).toHaveAttribute(
      "href",
      "/avl",
    );
    expect(screen.getByRole("button", { name: /News/i })).toHaveAttribute(
      "href",
      "/news",
    );

    expect(screen.getByTestId("outlet")).toBeInTheDocument();
  });
});
