"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MarketingShell from "@/components/marketing/MarketingShell";
import { freeFeatures, proFeatures } from "@/lib/product";
import {
  createCheckoutSession,
  createPortalSession,
  fallbackPrices,
  fetchStripePrices,
  type BillingPlan,
  type StripePrices,
} from "@/lib/billing";
import { fetchAccountData, isProHome } from "@/lib/account";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import { ProBadge, ProInline, ProWordmark, proGradient } from "@/components/marketing/ProBrand";

const faqs: [string, React.ReactNode][] = [
  [
    "Does one subscription cover both people?",
    <>
      Yes. <ProInline /> is billed per household — one subscription covers everyone in the home.
    </>,
  ],
  [
    "Where do I manage payment details?",
    "Stripe handles payment details, invoices, plan changes, and cancellation. You can reach it from the account billing page.",
  ],
  [
    "What if I cancel?",
    <>
      Your data stays in Roost. <ProInline /> history and insight become available again if the
      household upgrades later.
    </>,
  ],
  [
    "Is iOS included?",
    "iOS is officially in beta and launching on the App Store in May. Mac is available now.",
  ],
  [
    "Is there a free trial?",
    "Yes — a 14-day trial is available where supported. No payment is required to start.",
  ],
];

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 5.5L8 10.5L13 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PricingPageContent() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [prices, setPrices] = useState<StripePrices>(fallbackPrices);
  const [plan, setPlan] = useState<BillingPlan>("annual");
  const [account, setAccount] = useState<Awaited<ReturnType<typeof fetchAccountData>>>(null);
  const [loadingBilling, setLoadingBilling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

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
      const url =
        isProHome(account.home) || account.home.stripe_customer_id
          ? await createPortalSession(supabase, {
              homeId: account.home.id,
              returnUrl: `${returnUrl}?portal=returned`,
            })
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

  // Calculate annual savings vs paying monthly
  const annualSavingsPct = Math.round(
    (1 - prices.annual.unitAmount / (prices.monthly.unitAmount * 12)) * 100,
  );

  return (
    <MarketingShell>
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <section className="px-6 pt-32 pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Pricing</p>
          <h1 className="mt-5 text-5xl font-medium leading-tight tracking-tight text-foreground sm:text-6xl">
            Free to start. <ProInline className="font-bold" /> when the household needs more.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            One <ProInline className="font-medium" /> subscription covers the household. Start with
            the shared basics, then unlock deeper budgeting, history, and Hazel insight.
          </p>
        </div>
      </section>

      {/* ── Plans ─────────────────────────────────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          {/* Free */}
          <article className="rounded-lg border border-border bg-card p-6">
            <p className="text-lg font-medium text-foreground">Roost Free</p>
            <p className="mt-5 text-5xl font-medium tracking-tight text-foreground">£0</p>
            <p className="mt-2 text-sm text-muted-foreground">For getting the household into one place.</p>
            <div className="my-6 h-px bg-border" />
            <ul className="space-y-3">
              {freeFeatures.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/download"
              className="mt-8 inline-flex w-full justify-center rounded-lg border border-border px-5 py-3 font-medium text-foreground hover:bg-muted"
            >
              Download free
            </Link>
          </article>

          {/* Pro */}
          <article className="relative overflow-hidden rounded-lg border border-[var(--pro-border)] bg-[var(--pro-card)] p-6 shadow-[var(--pro-shadow)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_78%_0%,rgba(232,146,74,0.18),transparent_48%)]" />
            <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <p className="text-lg font-bold tracking-tight">
                <ProWordmark />
              </p>
              <ProBadge className="h-6 px-3 text-xs" />
            </div>

            <div className="mt-5 flex items-end gap-2">
              <p className="text-5xl font-medium tracking-tight text-[var(--pro-warm-white)]">
                {selectedPrice.formattedAmount}
              </p>
              <p className="pb-1 text-sm text-[var(--pro-muted-text)]">/{selectedPrice.interval}</p>
            </div>
            <p className="mt-2 text-sm text-[var(--pro-body-text)] opacity-80">
              14-day trial where available. Managed securely in Stripe.
            </p>

            {/* Billing toggle */}
            <div className="mt-6 inline-flex items-center rounded-lg border border-[var(--pro-border)] bg-[var(--pro-bg)] p-1">
              {(["annual", "monthly"] as BillingPlan[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPlan(item)}
                  className={`relative rounded-md px-4 py-2 text-sm font-medium capitalize transition-colors ${
                    plan === item ? "bg-[var(--pro-card)] text-[var(--pro-warm-white)]" : "text-[var(--pro-muted-text)]"
                  }`}
                >
                  {item}
                  {item === "annual" && annualSavingsPct > 0 && (
                    <span className="ml-2 rounded-full bg-[#C4622A]/15 px-1.5 py-0.5 text-[10px] font-semibold text-[#C4622A] dark:text-[#E8924A]">
                      Save {annualSavingsPct}%
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="my-6 h-px bg-[var(--pro-border)]" />
            <ul className="space-y-3">
              {proFeatures.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm leading-relaxed text-[var(--pro-body-text)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E8924A]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {error ? (
              <p className="mt-5 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            ) : null}
            <button
              type="button"
              onClick={startBilling}
              disabled={loadingBilling}
              className="pro-shimmer relative mt-8 inline-flex w-full justify-center overflow-hidden rounded-lg px-5 py-3 font-bold text-[#8B3A1E] transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
              style={{ backgroundImage: proGradient }}
            >
              <span className="relative z-10">
              {loadingBilling
                ? "Opening Stripe..."
                : account?.home &&
                    (isProHome(account.home) || account.home.stripe_customer_id)
                  ? "Manage subscription"
                  : (
                    <>
                      Start Roost Pro
                    </>
                  )}
              </span>
            </button>
            </div>
          </article>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="bg-muted px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-medium tracking-tight text-foreground">
            Common questions
          </h2>
          <div className="mt-8 divide-y divide-border rounded-lg bg-background">
            {faqs.map(([question, answer]) => {
              const isOpen = openFaq === question;
              return (
                <div key={question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : question)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-medium text-foreground">{question}</span>
                    <span
                      className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-muted-foreground">{answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
