import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BCSE Community Rights Registry",
  description:
    "Community-controlled organisation of governance records and supporting evidence.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
