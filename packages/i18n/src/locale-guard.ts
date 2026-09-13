import { type Locale, locales } from "./routing";

export const isLocale = (value: string): value is Locale =>
  locales.some((locale) => locale === value);
