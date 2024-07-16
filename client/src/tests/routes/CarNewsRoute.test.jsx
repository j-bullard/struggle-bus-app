import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CarNewsRoute from "@/routes/CarNewsRoute";

const mockArticles = [
  {
    title: "Car News 1",
    description: "Description 1",
    url: "https://example.com/1",
  },
  {
    title: "Car News 2",
    description: "Description 2",
    url: "https://example.com/2",
  },
];

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ articles: mockArticles }),
    }),
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test("As a User, when I click on News, I should see a list of articles for me to click on", async () => {
  render(<CarNewsRoute />);

  await waitFor(() => {
    expect(screen.getByText("Car News 1")).toBeInTheDocument();
    expect(screen.getByText("Car News 2")).toBeInTheDocument();
  });

  const firstArticleLink = screen.getByText("Car News 1").closest("a");
  expect(firstArticleLink).toHaveAttribute("href", "https://example.com/1");

  userEvent.click(firstArticleLink);
});
