import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs } from "./Tabs";

describe("Tabs Component", () => {
  test("renders tabs and panels", () => {
    render(
      <Tabs defaultIndex={0}>
        <Tabs.List>
          <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
          <Tabs.Tab index={1}>Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel index={0}>Panel 1</Tabs.Panel>
        <Tabs.Panel index={1}>Panel 2</Tabs.Panel>
      </Tabs>
    );

    expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Tab 2" })).toBeInTheDocument();
    expect(screen.getByText("Panel 1")).toBeVisible();
  });

  test("switches tabs on click", async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultIndex={0}>
        <Tabs.List>
          <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
          <Tabs.Tab index={1}>Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel index={0}>Panel 1</Tabs.Panel>
        <Tabs.Panel index={1}>Panel 2</Tabs.Panel>
      </Tabs>
    );

    const tab2 = screen.getByRole("tab", { name: "Tab 2" });
    await user.click(tab2);

    expect(screen.getByText("Panel 2")).toBeVisible();
    expect(screen.queryByText("Panel 1")).not.toBeInTheDocument();
  });

  test("calls onChange when tab is clicked", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(
      <Tabs defaultIndex={0} onChange={onChange}>
        <Tabs.List>
          <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
          <Tabs.Tab index={1}>Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel index={0}>Panel 1</Tabs.Panel>
        <Tabs.Panel index={1}>Panel 2</Tabs.Panel>
      </Tabs>
    );

    const tab2 = screen.getByRole("tab", { name: "Tab 2" });
    await user.click(tab2);

    expect(onChange).toHaveBeenCalledWith(1);
  });

  test("disabled tab cannot be clicked", async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultIndex={0}>
        <Tabs.List>
          <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
          <Tabs.Tab index={1} disabled>Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel index={0}>Panel 1</Tabs.Panel>
        <Tabs.Panel index={1}>Panel 2</Tabs.Panel>
      </Tabs>
    );

    const tab2 = screen.getByRole("tab", { name: "Tab 2" });
    await user.click(tab2);

    expect(screen.getByText("Panel 1")).toBeVisible();
    expect(screen.queryByText("Panel 2")).not.toBeInTheDocument();
  });

  test("has proper ARIA attributes", () => {
    render(
      <Tabs defaultIndex={0}>
        <Tabs.List>
          <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel index={0}>Panel 1</Tabs.Panel>
      </Tabs>
    );

    const tablist = screen.getByRole("tablist");
    expect(tablist).toBeInTheDocument();

    const tab = screen.getByRole("tab", { name: "Tab 1" });
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(tab).toHaveAttribute("aria-controls");
  });
});
