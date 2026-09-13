import { ThemeProvider } from "@banji/contexts";
import { getLocale } from "next-intl/server";
import type { ReactNode } from "react";
import "./globals.css";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const locale = await getLocale();

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
