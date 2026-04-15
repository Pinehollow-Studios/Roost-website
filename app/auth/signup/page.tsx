import type { Metadata } from "next";
import { Suspense } from "react";
import AuthForm from "@/components/account/AuthForm";

export const metadata: Metadata = {
  title: "Create account — Roost",
  description: "Create a Roost account, then finish household setup in the app.",
};

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <AuthForm mode="signup" />
    </Suspense>
  );
}
