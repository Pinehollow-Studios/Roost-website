import type { Metadata } from "next";
import { Suspense } from "react";
import { AccountBillingPage } from "@/components/account/AccountPages";

export const metadata: Metadata = {
  title: "Billing — Roost",
  description: "Manage your Roost Pro subscription through Stripe.",
};

export default function BillingPage() {
  return (
    <Suspense fallback={null}>
      <AccountBillingPage />
    </Suspense>
  );
}
