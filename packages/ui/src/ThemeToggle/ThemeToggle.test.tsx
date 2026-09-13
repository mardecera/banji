import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "./ThemeToggle";

const setTheme = vi.fn();

vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark", setTheme }),
}));

vi.mock("@banji/assets/icons", () => ({
  Sun: () => <svg data-testid="sun" />,
  Moon: () => <svg data-testid="moon" />,
}));

describe("ThemeToggle", () => {
  it("switches to light mode when dark is active", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole("button", { name: "Switch to light mode" }));
    expect(setTheme).toHaveBeenCalledWith("light");
  });
});
