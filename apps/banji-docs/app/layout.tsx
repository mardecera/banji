import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./global.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOCS_URL ?? "http://localhost:3003"),
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="es" suppressHydrationWarning>
    <body className="flex min-h-screen flex-col antialiased">
      <RootProvider>{children}</RootProvider>
    </body>
  </html>
);

export default RootLayout;
