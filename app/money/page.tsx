import type { Metadata } from "next";
import FeaturePage from "@/components/marketing/FeaturePage";
import { sectionBySlug } from "@/lib/product";

export const metadata: Metadata = {
  title: "Money — Roost",
  description:
    "Plan household income, fixed costs, lifestyle budgets, goals, spending, and settle-up in Roost.",
};

export default function MoneyPage() {
  return <FeaturePage section={sectionBySlug.money} />;
}
