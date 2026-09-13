import { describe, expect, it } from "vitest";
import { isLocale } from "./locale-guard";

describe("isLocale", () => {
  it("accepts configured locales", () => {
    expect(isLocale("es")).toBe(true);
    expect(isLocale("en")).toBe(true);
  });

  it("rejects unknown locales", () => {
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("")).toBe(false);
  });
});
