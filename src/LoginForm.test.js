import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

test("login success", async () => {
  render(<LoginForm />);
  await userEvent.type(screen.getByLabelText(/email/i), "test@gmail.com");
  await userEvent.type(screen.getByLabelText(/password/i), "123456");
  await userEvent.click(screen.getByRole("button"));
  expect(await screen.findByText(/welcome back/i)).toBeInTheDocument();
});
