import type { Metadata } from "next";
import RoostProPageContent from "@/components/marketing/RoostProPageContent";

export const metadata: Metadata = {
  title: "Roost Pro — Your home, elevated.",
  description:
    "Roost Pro unlocks the full household dashboard with Hazel AI, full budget history, advanced budgeting, smart notifications, and room groups.",
  openGraph: {
    title: "Roost Pro — Your home, elevated.",
    description:
      "The full household dashboard with history, intelligence, and everything that matters.",
    type: "website",
    siteName: "Roost",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roost Pro — Your home, elevated.",
    description:
      "The full household dashboard with history, intelligence, and everything that matters.",
  },
};

export default function RoostProPage() {
  return <RoostProPageContent />;
}
