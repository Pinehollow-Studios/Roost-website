import type { Metadata } from "next";
import { AccountHouseholdPage } from "@/components/account/AccountPages";

export const metadata: Metadata = {
  title: "Household — Roost",
  description: "View your Roost household and members.",
};

export default function HouseholdPage() {
  return <AccountHouseholdPage />;
}
