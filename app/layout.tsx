// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import NextAuthProvider from "@/components/providers/NextAuthProvider"; // <-- Import

export const metadata: Metadata = {
  title: "ViraCard",
  description: "Your professional influencer profile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider> {/* <-- Wrap your app */}
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
