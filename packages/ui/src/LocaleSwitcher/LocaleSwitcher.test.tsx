import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LocaleSwitcher } from "./LocaleSwitcher";

vi.mock("next-intl", () => ({
  useLocale: () => "es",
}));

vi.mock("@banji/i18n", () => ({
  locales: ["es", "en"],
  usePathname: () => "/",
  Link: ({
    children,
    locale,
    href,
  }: {
    children: React.ReactNode;
    locale: string;
    href: string;
  }) => (
    <a href={`/${locale}${href === "/" ? "" : href}`} data-locale={locale}>
      {children}
    </a>
  ),
}));

describe("LocaleSwitcher", () => {
  it("links to the other locale path", () => {
    render(<LocaleSwitcher />);

    expect(screen.getByRole("link", { name: "en" })).toHaveAttribute("href", "/en");
    expect(screen.getByRole("link", { name: "es" })).toHaveAttribute("href", "/es");
  });
});
