import type { Metadata } from "next";
import { AccountOverviewPage } from "@/components/account/AccountPages";

export const metadata: Metadata = {
  title: "Account — Roost",
  description: "View your Roost household, setup status, and subscription.",
};

export default function AccountPage() {
  return <AccountOverviewPage />;
}
