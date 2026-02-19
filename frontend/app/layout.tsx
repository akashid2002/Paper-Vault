import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const _inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "PYQ Papers - Previous Year Question Papers",
    template: "%s | PYQ Papers",
  },
  description:
    "Download previous year question papers (PYQs) for Indian universities. Filter by course, semester and subject. Free and community-driven.",
  keywords: [
    "previous year question papers",
    "PYQ papers",
    "exam papers pdf",
    "semester question papers",
    "Indian university papers",
  ],
  authors: [{ name: "PYQ Papers Team" }],
  creator: "PYQ Papers",
  openGraph: {
    title: "PYQ Papers - Previous Year Question Papers",
    description:
      "Find and download previous year question papers for Indian universities.",
    url: "https://pyq-paper.vercel.app",
    siteName: "PYQ Papers",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PYQ Papers",
    description:
      "Download previous year question papers for Indian universities.",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
