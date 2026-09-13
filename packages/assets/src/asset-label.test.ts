import { describe, expect, it } from "vitest";
import { assetLabel } from "./asset-label";

describe("assetLabel", () => {
  it("strips svg extension and normalizes separators", () => {
    expect(assetLabel("hero-icon.svg")).toBe("hero icon");
  });
});
