import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: [
    "@banji/ui",
    "@banji/i18n",
    "@banji/hooks",
    "@banji/contexts",
    "@banji/assets",
  ],
};

export default withMDX(config);
