import type { Metadata } from "next";
import FeaturePage from "@/components/marketing/FeaturePage";
import { sectionBySlug } from "@/lib/product";

export const metadata: Metadata = {
  title: "Hazel — Roost",
  description:
    "Use Hazel for quiet AI cleanup, categorisation, chore suggestions, and Roost Pro budget insight.",
};

export default function HazelPage() {
  return <FeaturePage section={sectionBySlug.hazel} />;
}
