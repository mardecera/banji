"use client";

import { LocaleSwitcher, ThemeToggle } from "@banji/ui/client";

export const HomeHeader = () => (
  <header className="flex items-center justify-between gap-4 border-b border-border py-5">
    <p className="text-sm font-medium">banji go</p>
    <div className="flex items-center gap-2">
      <LocaleSwitcher />
      <ThemeToggle />
    </div>
  </header>
);
