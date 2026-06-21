import type { Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { cn } from "@/lib/cn";
import { rootLayoutMetadata } from "@/lib/seo/metadata";
import "./globals.css";

export const metadata = rootLayoutMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-js-bg text-js-text min-h-screen antialiased",
          "px-5 py-5 leading-relaxed",
        )}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
