"use client";

import { Icon } from "@banji/assets/icons";
import { Button } from "@banji/ui";
import { capitalize } from "@banji/utils";
import { useTranslations } from "next-intl";
import { useHomeStatus } from "../../hooks/use-home-status";
import { HomeHeader } from "../HomeHeader/HomeHeader";

export const HomeView = () => {
  const t = useTranslations("Home");
  const { value, toggle } = useHomeStatus();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6">
      <HomeHeader />
      <section className="flex flex-1 flex-col justify-center py-20">
        <p className="mb-4 inline-flex items-center gap-2 text-sm text-accent">
          <Icon className="h-4 w-4" />
          <span>{capitalize("go")}</span>
        </p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{t("title")}</h1>
        <p className="mt-4 max-w-md text-lg text-foreground/70">{t("subtitle")}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button onClick={toggle}>{t("cta")}</Button>
          <p className="text-sm text-foreground/60">
            {t("toggleLabel")}: {value ? t("statusOn") : t("statusOff")}
          </p>
        </div>
      </section>
    </main>
  );
};
