"use client";

import { ThemeProvider } from "@banji/contexts";
import type { ReactNode } from "react";

export const Preview = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>
    <div className="not-prose my-6 rounded-xl border border-border bg-background p-6">
      {children}
    </div>
  </ThemeProvider>
);
