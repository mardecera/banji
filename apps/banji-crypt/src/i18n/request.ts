import { isLocale, routing } from "@banji/i18n";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const candidate = locale ?? routing.defaultLocale;
  const resolved = isLocale(candidate) ? candidate : routing.defaultLocale;

  return {
    locale: resolved,
    messages: (await import(`../../messages/${resolved}.json`)).default,
  };
});
