"use client";

import { Link, type Locale, locales, usePathname } from "@banji/i18n";
import { useLocale } from "next-intl";

const baseClass =
  "inline-flex min-w-10 items-center justify-center rounded-md px-2 py-1 text-xs font-medium uppercase transition";

export const LocaleSwitcher = () => {
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  return (
    <div className="inline-flex gap-1 rounded-lg border border-border p-1">
      {locales.map((target) => {
        const active = locale === target;
        return (
          <Link
            key={target}
            href={pathname}
            locale={target}
            className={`${baseClass} ${
              active ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-border/20"
            }`}
            aria-current={active ? "true" : undefined}
          >
            {target}
          </Link>
        );
      })}
    </div>
  );
};
