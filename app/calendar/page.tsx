import type { Metadata } from "next";
import FeaturePage from "@/components/marketing/FeaturePage";
import { sectionBySlug } from "@/lib/product";

export const metadata: Metadata = {
  title: "Calendar — Roost",
  description:
    "See household chores, bills, expenses, and shopping dates in one shared calendar view.",
};

export default function CalendarPage() {
  return <FeaturePage section={sectionBySlug.calendar} />;
}
