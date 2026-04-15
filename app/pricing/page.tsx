import type { Metadata } from "next";
import PricingPageContent from "@/components/marketing/PricingPageContent";

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
