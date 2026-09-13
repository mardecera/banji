import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import svgr from "@svgr/rollup";

const svgrOptions = {
  exportType: "default",
  svgo: false,
};

const bundleConfig = (input, outDir, preserveRoot) => ({
  input,
  output: {
    dir: outDir,
    format: "esm",
    preserveModules: true,
    preserveModulesRoot: preserveRoot,
  },
  external: ["react", "react/jsx-runtime"],
  plugins: [
    svgr({ ...svgrOptions, include: "**/*.svg" }),
    resolve(),
    typescript({
      tsconfig: "./tsconfig.json",
      outDir,
      include: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.d.ts"],
    }),
  ],
});

export default [
  bundleConfig("src/icons/index.ts", "dist/icons", "src/icons"),
  bundleConfig("src/illustrations/index.ts", "dist/illustrations", "src/illustrations"),
];
