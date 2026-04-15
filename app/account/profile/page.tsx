import type { Metadata } from "next";
import { AccountProfilePage } from "@/components/account/AccountPages";

export const metadata: Metadata = {
  title: "Profile — Roost",
  description: "View your Roost profile details.",
};

export default function ProfilePage() {
  return <AccountProfilePage />;
}
