import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PricingPageContent = dynamic(
  () => import("@/components/marketing/PricingPageContent"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Roost Pro — Pricing",
  description:
    "Roost is free to start. Roost Pro unlocks deeper budgeting, full history, Hazel insight, and advanced household planning.",
  openGraph: {
    title: "Pricing — Roost",
    description:
      "Roost is free to start. Roost Pro unlocks deeper budgeting, full history, Hazel insight, and advanced household planning.",
    type: "website",
    siteName: "Roost",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Roost",
    description:
      "Roost is free to start. Roost Pro unlocks deeper budgeting, full history, Hazel insight, and advanced household planning.",
  },
};

export default function PricingPage() {
  return <PricingPageContent />;
}
