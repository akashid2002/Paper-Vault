import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "sonner";

const _inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PaperVault - Exam Question Papers",
  description:
    "Find and share previous year exam question papers. Browse by course, semester and subject. A community-driven platform for students.",
};

export const viewport: Viewport = {
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1 animate-in fade-in duration-300">
            {children}
          </main>
          <SiteFooter />
          <Toaster richColors position="top-right" />
        </div>
      </body>
    </html>
  );
}
