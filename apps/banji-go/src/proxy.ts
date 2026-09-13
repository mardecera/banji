import { createIntlMiddleware } from "@banji/i18n/middleware";

export default createIntlMiddleware();

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
