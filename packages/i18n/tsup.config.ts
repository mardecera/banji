import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/middleware.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: [
    "next",
    "next-intl",
    "next-intl/middleware",
    "next-intl/navigation",
    "next-intl/routing",
  ],
});
