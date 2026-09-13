import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "./ThemeProvider";

vi.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

describe("ThemeProvider", () => {
  it("renders children", () => {
    render(
      <ThemeProvider>
        <span>child</span>
      </ThemeProvider>,
    );

    expect(screen.getByTestId("theme-provider")).toBeTruthy();
    expect(screen.getByText("child")).toBeTruthy();
  });
});
