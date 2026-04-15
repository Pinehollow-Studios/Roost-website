import type { Metadata } from "next";
import FeaturePage from "@/components/marketing/FeaturePage";
import { sectionBySlug } from "@/lib/product";

export const metadata: Metadata = {
  title: "Chores — Roost",
  description:
    "Assign chores, set due dates, repeat household jobs, and track rooms, history, and streaks.",
};

export default function ChoresPage() {
  return <FeaturePage section={sectionBySlug.chores} />;
}
