import { getPathname } from "./navigation";
import { defaultLocale, type Locale, locales } from "./routing";

export const alternatesFor = (
  href: string,
  locale: Locale,
  siteUrl: string,
): { canonical: string; languages: Record<string, string> } => {
  const url = (target: Locale) => {
    const pathname = getPathname({ href, locale: target });
    return `${siteUrl.replace(/\/$/, "")}${pathname}`;
  };

  return {
    canonical: url(locale),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, url(l)])),
      "x-default": url(defaultLocale),
    },
  };
};
