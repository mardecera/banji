import { describe, expect, it, vi } from "vitest";

vi.mock("./navigation", () => ({
  getPathname: ({ href, locale }: { href: string; locale: string }) =>
    href === "/" ? `/${locale}` : `/${locale}${href}`,
}));

import { alternatesFor } from "./alternates";

describe("alternatesFor", () => {
  it("builds canonical and language alternates", () => {
    const result = alternatesFor("/", "es", "https://banji.dev");

    expect(result.canonical).toBe("https://banji.dev/es");
    expect(result.languages.es).toBe("https://banji.dev/es");
    expect(result.languages.en).toBe("https://banji.dev/en");
    expect(result.languages["x-default"]).toBe("https://banji.dev/es");
  });
});
