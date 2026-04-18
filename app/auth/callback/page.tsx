"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import MarketingShell from "@/components/marketing/MarketingShell";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function finishAuth() {
      const rawNext = searchParams.get("next");
      const next =
        rawNext && rawNext.startsWith("/") && !rawNext.startsWith("//")
          ? rawNext
          : "/account";
      const code = searchParams.get("code");

      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError && !cancelled) {
          setError(exchangeError.message);
          return;
        }
      }

      if (!cancelled) router.replace(next);
    }

    finishAuth();
    return () => {
      cancelled = true;
    };
  }, [router, searchParams, supabase]);

  return (
    <MarketingShell>
      <section className="px-6 pt-32 pb-24">
        <div className="mx-auto max-w-xl rounded-lg border border-border bg-card p-6">
          <h1 className="text-2xl font-medium text-foreground">Signing you in</h1>
          <p className="mt-3 text-muted-foreground">
            {error ?? "Roost is finishing the secure sign-in flow."}
          </p>
        </div>
      </section>
    </MarketingShell>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={null}>
      <AuthCallbackContent />
    </Suspense>
  );
}
