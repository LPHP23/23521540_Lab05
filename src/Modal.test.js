import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

describe("Modal Component", () => {
  test("renders modal when isOpen is true", () => {
    render(
      <Modal isOpen={true}>
        <h2>Test Modal</h2>
      </Modal>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  test("does not render when isOpen is false", () => {
    render(
      <Modal isOpen={false}>
        <h2>Test Modal</h2>
      </Modal>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Modal isOpen={true} onClose={onClose}>
        <h2>Test Modal</h2>
      </Modal>
    );

    const closeButton = screen.getByRole("button", { name: /close modal/i });
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("calls onClose when Escape key is pressed", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    render(
      <Modal isOpen={true} onClose={onClose}>
        <h2>Test Modal</h2>
      </Modal>
    );

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("has proper ARIA attributes", () => {
    render(
      <Modal isOpen={true}>
        <div id="modal-title">Title</div>
      </Modal>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
  });
});
