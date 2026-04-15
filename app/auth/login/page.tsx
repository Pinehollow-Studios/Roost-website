import type { Metadata } from "next";
import { Suspense } from "react";
import AuthForm from "@/components/account/AuthForm";

export const metadata: Metadata = {
  title: "Sign in — Roost",
  description: "Sign in to manage your Roost account and subscription.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <AuthForm mode="login" />
    </Suspense>
  );
}
