import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Roost — Budget and run your home together.",
  description:
    "Roost helps couples manage household money, shopping, chores, calendars, notes, and shared decisions across Mac and iOS.",
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
      "Roost helps couples manage household money, shopping, chores, calendars, notes, and shared decisions across Mac and iOS.",
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
      "Roost helps couples manage household money, shopping, chores, calendars, notes, and shared decisions across Mac and iOS.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var stored = window.localStorage.getItem("roost-theme");
                  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                  var theme = stored === "light" || stored === "dark" ? stored : (prefersDark ? "dark" : "light");
                  document.documentElement.classList.toggle("dark", theme === "dark");
                  document.documentElement.style.colorScheme = theme;
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
