import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserProfile from "./UserProfile";

// Mock fetch
global.fetch = jest.fn();

describe("UserProfile Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("displays loading state initially", () => {
    fetch.mockImplementation(() => new Promise(() => {})); // Never resolves
    render(<UserProfile userId={1} />);
    expect(screen.getByRole("article", { busy: true })).toBeInTheDocument();
  });

  test("displays user data on successful fetch", async () => {
    const mockUser = {
      name: "John Doe",
      email: "john@example.com",
      username: "johndoe",
      phone: "123-456-7890",
      website: "johndoe.com",
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    render(<UserProfile userId={1} />);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    expect(screen.getByText(/john@example.com/)).toBeInTheDocument();
    expect(screen.getByText(/johndoe/)).toBeInTheDocument();
  });

  test("displays error message on fetch failure", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    render(<UserProfile userId={1} />);

    await waitFor(() => {
      expect(screen.getByText(/Error/)).toBeInTheDocument();
    });

    expect(screen.getByText(/Network error/)).toBeInTheDocument();
  });

  test("retry button refetches data", async () => {
    const user = userEvent.setup();

    fetch.mockRejectedValueOnce(new Error("Network error"));

    render(<UserProfile userId={1} />);

    await waitFor(() => {
      expect(screen.getByText(/Error/)).toBeInTheDocument();
    });

    const mockUser = {
      name: "Jane Doe",
      email: "jane@example.com",
      username: "janedoe",
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    const retryButton = screen.getByRole("button", { name: /try again/i });
    await user.click(retryButton);

    await waitFor(() => {
      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    });
  });
});
