import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HomeView } from "./HomeView";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@banji/assets/icons", () => ({
  Icon: () => <svg data-testid="icon" />,
}));

vi.mock("@banji/hooks", () => ({
  useToggle: () => ({ value: false, toggle: vi.fn() }),
}));

vi.mock("@banji/ui", () => ({
  Button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button type="button" {...props}>
      {children}
    </button>
  ),
}));

vi.mock("@banji/ui/client", () => ({
  LocaleSwitcher: () => <div data-testid="locale-switcher" />,
  ThemeToggle: () => <div data-testid="theme-toggle" />,
}));

describe("HomeView", () => {
  it("renders hero content and shared controls", () => {
    render(<HomeView />);

    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByTestId("locale-switcher")).toBeInTheDocument();
    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
