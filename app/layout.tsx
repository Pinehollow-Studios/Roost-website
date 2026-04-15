import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Roost — Budget and run your home together.",
  description:
    "Roost helps couples manage household money, shopping, chores, calendars, notes, and shared decisions across Mac and iOS beta.",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/logo.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Roost — Budget and run your home together.",
    description:
      "Roost helps couples manage household money, shopping, chores, calendars, notes, and shared decisions across Mac and iOS beta.",
    type: "website",
    siteName: "Roost",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Roost — Budget and run your home together.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roost — Budget and run your home together.",
    description:
      "Roost helps couples manage household money, shopping, chores, calendars, notes, and shared decisions across Mac and iOS beta.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
