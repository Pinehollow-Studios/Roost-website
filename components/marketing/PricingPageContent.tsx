"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import MarketingShell from "@/components/marketing/MarketingShell";
import { freeFeatures, proFeatures } from "@/lib/product";
import { createCheckoutSession, createPortalSession, fallbackPrices, fetchStripePrices, type BillingPlan, type StripePrices } from "@/lib/billing";
import { fetchAccountData, isProHome } from "@/lib/account";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function PricingPageContent() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [prices, setPrices] = useState<StripePrices>(fallbackPrices);
  const [plan, setPlan] = useState<BillingPlan>("annual");
  const [account, setAccount] = useState<Awaited<ReturnType<typeof fetchAccountData>>>(null);
  const [loadingBilling, setLoadingBilling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStripePrices().then(setPrices);
    fetchAccountData(supabase).then(setAccount);
  }, [supabase]);

  async function startBilling() {
    setError(null);
    if (!account) {
      window.location.href = `/auth/signup?next=${encodeURIComponent("/pricing")}`;
      return;
    }
    if (!account.home) {
      window.location.href = "/account";
      return;
    }

    setLoadingBilling(true);
    try {
      const returnUrl = `${window.location.origin}/account/billing`;
      const url = isProHome(account.home) || account.home.stripe_customer_id
        ? await createPortalSession(supabase, { homeId: account.home.id, returnUrl: `${returnUrl}?portal=returned` })
        : await createCheckoutSession(supabase, {
            plan,
            homeId: account.home.id,
            customerEmail: account.user.email ?? "",
            returnUrl: `${returnUrl}?checkout=success`,
          });
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not open Stripe billing.");
      setLoadingBilling(false);
    }
  }

  const selectedPrice = prices[plan];

  return (
    <MarketingShell>
      <section className="px-6 pt-32 pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Pricing</p>
          <h1 className="mt-5 text-5xl font-medium leading-tight tracking-tight text-foreground sm:text-6xl">
            Free to start. Pro when the household needs more.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            One Roost Pro subscription covers the household. Start with the shared basics, then unlock deeper budgeting, history, and Hazel insight.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          <article className="rounded-lg border border-border bg-card p-6">
            <p className="text-lg font-medium text-foreground">Roost Free</p>
            <p className="mt-5 text-5xl font-medium tracking-tight text-foreground">£0</p>
            <p className="mt-2 text-sm text-muted-foreground">For getting the household into one place.</p>
            <div className="my-6 h-px bg-border" />
            <ul className="space-y-3">
              {freeFeatures.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link href="/download" className="mt-8 inline-flex w-full justify-center rounded-lg border border-border px-5 py-3 font-medium text-foreground hover:bg-muted">
              Download free
            </Link>
          </article>

          <article className="rounded-lg border border-primary/45 bg-card p-6 shadow-[0_18px_70px_rgba(212,121,94,0.14)]">
            <div className="flex items-center justify-between gap-4">
              <p className="text-lg font-medium text-foreground">Roost Pro</p>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Household plan</span>
            </div>

            <div className="mt-5 flex items-end gap-2">
              <p className="text-5xl font-medium tracking-tight text-foreground">{selectedPrice.formattedAmount}</p>
              <p className="pb-1 text-sm text-muted-foreground">/{selectedPrice.interval}</p>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">14-day trial where available. Managed securely in Stripe.</p>

            <div className="mt-6 inline-flex rounded-lg border border-border bg-background p-1">
              {(["annual", "monthly"] as BillingPlan[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPlan(item)}
                  className={`rounded-md px-4 py-2 text-sm font-medium capitalize ${
                    plan === item ? "bg-card text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="my-6 h-px bg-border" />
            <ul className="space-y-3">
              {proFeatures.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {error ? <p className="mt-5 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p> : null}
            <button
              type="button"
              onClick={startBilling}
              disabled={loadingBilling}
              className="mt-8 inline-flex w-full justify-center rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground disabled:opacity-60"
            >
              {loadingBilling ? "Opening Stripe..." : account?.home && (isProHome(account.home) || account.home.stripe_customer_id) ? "Manage subscription" : "Start Roost Pro"}
            </button>
          </article>
        </div>
      </section>

      <section className="bg-muted px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-medium tracking-tight text-foreground">Questions</h2>
          <div className="mt-8 divide-y divide-border rounded-lg bg-background px-6">
            {[
              ["Does one subscription cover both people?", "Yes. Roost Pro is billed per household."],
              ["Where do I manage payment details?", "Stripe handles payment details, invoices, plan changes, and cancellation from the account billing page."],
              ["What if I cancel?", "Your data stays in Roost. Pro-only history and insight become available again if the household upgrades later."],
              ["Is iOS included?", "iOS is currently presented as beta access for Roost households."],
            ].map(([question, answer]) => (
              <div key={question} className="py-6">
                <h3 className="text-lg font-medium text-foreground">{question}</h3>
                <p className="mt-2 text-muted-foreground">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
