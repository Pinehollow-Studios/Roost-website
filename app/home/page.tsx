import type { Metadata } from "next";
import FeaturePage from "@/components/marketing/FeaturePage";
import { sectionBySlug } from "@/lib/product";

export const metadata: Metadata = {
  title: "Home — Roost",
  description:
    "Start each day with a shared household briefing across money, shopping, chores, and activity.",
};

export default function HomeFeaturePage() {
  return <FeaturePage section={sectionBySlug.home} />;
}
