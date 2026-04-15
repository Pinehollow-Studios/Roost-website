"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import MarketingShell from "@/components/marketing/MarketingShell";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/account";
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
          },
        });
        if (signUpError) throw signUpError;
        setMessage("Check your email to confirm your account, then come back to sign in.");
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
        router.push(next);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function continueWithGoogle() {
    setLoading(true);
    setError(null);
    const { error: googleError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (googleError) {
      setError(googleError.message);
      setLoading(false);
    }
  }

  const isSignup = mode === "signup";

  return (
    <MarketingShell>
      <section className="px-6 pt-32 pb-24">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
              {isSignup ? "Create account" : "Account"}
            </p>
            <h1 className="mt-4 text-5xl font-medium tracking-tight text-foreground">
              {isSignup ? "Start with Roost." : "Sign in to Roost."}
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
              {isSignup
                ? "Create your website account, then finish household setup in the Roost app."
                : "Manage your household subscription and check your Roost account status."}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <form onSubmit={submit} className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-foreground">Email</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-ring"
                  autoComplete="email"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-foreground">Password</span>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-ring"
                  autoComplete={isSignup ? "new-password" : "current-password"}
                />
              </label>

              {error ? <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p> : null}
              {message ? <p className="rounded-lg bg-secondary/20 px-4 py-3 text-sm text-foreground">{message}</p> : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground disabled:opacity-60"
              >
                {loading ? "Working..." : isSignup ? "Create account" : "Sign in"}
              </button>
            </form>

            <div className="my-6 h-px bg-border" />

            <button
              type="button"
              onClick={continueWithGoogle}
              disabled={loading}
              className="w-full rounded-lg border border-border bg-background px-5 py-3 font-medium text-foreground disabled:opacity-60"
            >
              Continue with Google
            </button>

            <p className="mt-6 text-sm text-muted-foreground">
              {isSignup ? "Already have an account?" : "New to Roost?"}{" "}
              <Link
                href={`${isSignup ? "/auth/login" : "/auth/signup"}?next=${encodeURIComponent(next)}`}
                className="font-medium text-foreground underline decoration-border underline-offset-4 hover:text-primary"
              >
                {isSignup ? "Sign in" : "Create an account"}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
