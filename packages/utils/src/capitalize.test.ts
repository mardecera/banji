import { describe, expect, it } from "vitest";
import { capitalize } from "./capitalize";

describe("capitalize", () => {
  it("capitalizes the first letter", () => {
    expect(capitalize("banji")).toBe("Banji");
  });

  it("returns empty string for empty input", () => {
    expect(capitalize("")).toBe("");
  });
});
