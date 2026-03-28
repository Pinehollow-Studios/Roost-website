import type { Metadata } from "next";
import PricingPageContent from "@/components/marketing/PricingPageContent";

export const metadata: Metadata = {
  title: "Pricing — Roost",
  description:
    "Roost is free. Roost Nest unlocks the full experience for your household. 14-day free trial, no card needed.",
  openGraph: {
    title: "Pricing — Roost",
    description:
      "Roost is free. Roost Nest unlocks the full experience for your household. 14-day free trial, no card needed.",
    type: "website",
    siteName: "Roost",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Roost",
    description:
      "Roost is free. Roost Nest unlocks the full experience for your household. 14-day free trial, no card needed.",
  },
};

export default function PricingPage() {
  return <PricingPageContent />;
}