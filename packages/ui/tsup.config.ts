import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/client.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "next-intl",
    "next-themes",
    "@banji/i18n",
    "@banji/assets",
    "@banji/assets/icons",
  ],
});
