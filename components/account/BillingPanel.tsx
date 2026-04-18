"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createCheckoutSession, createPortalSession, fallbackPrices, fetchStripePrices, type BillingPlan, type StripePrices } from "@/lib/billing";
import { isProHome, subscriptionLabel, type AccountData } from "@/lib/account";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import SetupRequired from "@/components/account/SetupRequired";
import { ProBadge, ProInline, proGradient } from "@/components/marketing/ProBrand";

function formatDate(value: string | null | undefined) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function BillingPanel({ data, reload }: { data: AccountData; reload: () => Promise<void> }) {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const searchParams = useSearchParams();
  const [prices, setPrices] = useState<StripePrices>(fallbackPrices);
  const [selected, setSelected] = useState<BillingPlan>("annual");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStripePrices().then(setPrices);
  }, []);

  if (!data.home) return <SetupRequired />;

  const home = data.home;
  const active = isProHome(home);
  const nextBilling = formatDate(home.current_period_ends_at);
  const notice = searchParams.get("checkout") || searchParams.get("portal");

  async function openBilling() {
    if (!home) return;
    setLoading(true);
    setError(null);
    try {
      const returnUrl = `${window.location.origin}/account/billing`;
      const url = active || home.stripe_customer_id
        ? await createPortalSession(supabase, { homeId: home.id, returnUrl: `${returnUrl}?portal=returned` })
        : await createCheckoutSession(supabase, {
            plan: selected,
            homeId: home.id,
            customerEmail: data.user.email ?? "",
            returnUrl: `${returnUrl}?checkout=success`,
          });
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not open Stripe billing.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {notice ? (
        <div className="rounded-lg bg-secondary/20 px-4 py-3 text-sm text-foreground">
          Billing returned from Stripe. Refreshing from Roost may take a moment after checkout.
        </div>
      ) : null}

      <section className="rounded-lg border border-border bg-card p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">Current plan</p>
            <h2 className="mt-3 text-3xl font-medium text-foreground">
              {subscriptionLabel(home).startsWith("Roost Pro") ? (
                <>
                  <ProInline />
                  {subscriptionLabel(home).replace("Roost Pro", "")}
                </>
              ) : (
                subscriptionLabel(home)
              )}
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              One <ProInline className="font-medium" /> subscription covers everyone in this household.
              Payments and invoices are managed securely in Stripe.
            </p>
            {nextBilling ? (
              <p className="mt-4 text-sm text-muted-foreground">Next billing date: {nextBilling}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={reload}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium"
          >
            Refresh
          </button>
        </div>
      </section>

      {!active && !home.stripe_customer_id ? (
        <section className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">Choose billing</p>
            <ProBadge />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {(["annual", "monthly"] as BillingPlan[]).map((plan) => {
              const price = prices[plan];
              return (
                <button
                  key={plan}
                  type="button"
                  onClick={() => setSelected(plan)}
                  className={`rounded-lg border p-5 text-left transition-colors ${
                    selected === plan ? "border-primary bg-primary/10" : "border-border bg-background"
                  }`}
                >
                  <p className="text-lg font-medium capitalize">{plan}</p>
                  <p className="mt-2 text-3xl font-medium">{price.formattedAmount}</p>
                  <p className="mt-1 text-sm text-muted-foreground">per {price.interval}</p>
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-xl font-medium text-foreground">Billing actions</h3>
        <p className="mt-2 text-muted-foreground">
          {active || home.stripe_customer_id
            ? "Open Stripe to update payment details, switch plan, view invoices, or cancel."
            : <>Start <ProInline className="font-medium" /> checkout for this household.</>}
        </p>
        {error ? <p className="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p> : null}
        <button
          type="button"
          onClick={openBilling}
          disabled={loading}
          className="pro-shimmer relative mt-6 overflow-hidden rounded-lg px-5 py-3 font-bold text-[#8B3A1E] disabled:opacity-60"
          style={{ backgroundImage: proGradient }}
        >
          <span className="relative z-10">
            {loading ? (
              "Opening Stripe..."
            ) : active || home.stripe_customer_id ? (
              "Manage subscription"
            ) : (
              <>
                Start Roost Pro
              </>
            )}
          </span>
        </button>
      </section>
    </div>
  );
}
