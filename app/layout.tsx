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
  title: "Roost — Your home, in sync.",
  description:
    "Roost is the shared life dashboard for couples. One place to manage shopping, expenses, chores, and your calendar — syncing in real time across both your devices.",
  openGraph: {
    title: "Roost — Your home, in sync.",
    description:
      "Roost is the shared life dashboard for couples. One place to manage shopping, expenses, chores, and your calendar — syncing in real time across both your devices.",
    type: "website",
    siteName: "Roost",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roost — Your home, in sync.",
    description:
      "Roost is the shared life dashboard for couples. One place to manage shopping, expenses, chores, and your calendar — syncing in real time across both your devices.",
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
