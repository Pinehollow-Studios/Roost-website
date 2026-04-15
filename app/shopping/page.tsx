import type { Metadata } from "next";
import FeaturePage from "@/components/marketing/FeaturePage";
import { sectionBySlug } from "@/lib/product";

export const metadata: Metadata = {
  title: "Shopping — Roost",
  description:
    "Keep a realtime shared shopping list with categories, next-shop planning, and Hazel cleanup.",
};

export default function ShoppingPage() {
  return <FeaturePage section={sectionBySlug.shopping} />;
}
