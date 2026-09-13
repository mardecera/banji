import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  transpilePackages: [
    "@banji/ui",
    "@banji/i18n",
    "@banji/hooks",
    "@banji/contexts",
    "@banji/assets",
  ],
};

export default withNextIntl(nextConfig);
