import type { Metadata } from "next";
import FeaturePage from "@/components/marketing/FeaturePage";
import { sectionBySlug } from "@/lib/product";

export const metadata: Metadata = {
  title: "Pinboard — Roost",
  description:
    "Pin household notes, reminders, links, and messages with expiry and acknowledgements.",
};

export default function PinboardPage() {
  return <FeaturePage section={sectionBySlug.pinboard} />;
}
