"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import MarketingShell from "@/components/marketing/MarketingShell";
import ProductVisual from "@/components/marketing/ProductVisual";
import { productSections, sectionBySlug } from "@/lib/product";
import { ProBadge, ProButton, ProInline } from "@/components/marketing/ProBrand";

const ease = [0.16, 1, 0.3, 1] as const;

const testimonials = [
  {
    quote:
      "Finally a place where our money, chores, and shopping actually live together. We stopped having the 'did you buy milk?' conversation.",
    name: "Sarah & James",
    detail: "Using Pro",
  },
  {
    quote:
      "The budget section is genuinely useful. We can see exactly where we're at mid-month and it's changed how we talk about spending.",
    name: "Priya & Tom",
    detail: "2 months in",
  },
  {
    quote:
      "Setup took five minutes. It just works — shared lists, shared calendar, shared expenses. No fiddling required.",
    name: "Mia & Connor",
    detail: "Roost household",
  },
];

export default function HomePageContent() {
  const money = sectionBySlug.money;
  const supportSections = productSections.filter((section) => section.slug !== "money");

  return (
    <MarketingShell>
      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden px-6 pt-32 pb-16 sm:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(212,121,94,0.22),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.76),rgba(232,237,229,0.42))] dark:bg-[radial-gradient(circle_at_75%_20%,rgba(212,121,94,0.13),transparent_36%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Roost</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-medium leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Budget the home. Run the home. Together.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Roost helps couples manage money, shopping, chores, calendars, notes, and the small
              decisions that keep a household moving.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/download"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-7 py-3.5 font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Download for Mac
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-7 py-3.5 font-medium text-foreground transition-colors hover:bg-muted"
              >
                See pricing
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Mac available now. iOS launching on the App Store in May.
            </p>
          </motion.div>
          <ProductVisual section={money} />
        </div>
      </section>

      {/* ── Social proof ────────────────────────────────────────────────────── */}
      <section className="border-y border-border px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-10 text-center text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            What couples say
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={t.name}
                className="rounded-lg border border-border bg-card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease, delay: i * 0.07 }}
              >
                <p className="leading-relaxed text-foreground">"{t.quote}"</p>
                <footer className="mt-5 flex items-center gap-3">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-xs font-medium text-primary"
                    aria-hidden="true"
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.detail === "Using Pro" ? (
                        <>
                          Using <ProInline />
                        </>
                      ) : (
                        t.detail
                      )}
                    </p>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── Money section ───────────────────────────────────────────────────── */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Money first</p>
            <h2 className="mt-4 text-4xl font-medium leading-tight tracking-tight text-foreground">
              A shared budget that follows real household life.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Income, fixed costs, lifestyle budgets, savings goals, spending, and settle-up all live
              together. Roost turns everyday expenses into a plan for the month.
            </p>
            <Link
              href="/money"
              className="mt-7 inline-flex text-base font-medium text-foreground underline decoration-border underline-offset-4 hover:text-primary"
            >
              See the Money section
            </Link>
          </div>
          <div className="space-y-5">
            {money.highlights.slice(0, 5).map((item, index) => (
              <motion.div
                key={item}
                className="border-t border-border py-5"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, ease, delay: index * 0.04 }}
              >
                <p className="text-xl leading-relaxed text-foreground">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── One household system ────────────────────────────────────────────── */}
      <section className="bg-muted px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
              One household system
            </p>
            <h2 className="mt-4 text-4xl font-medium tracking-tight text-foreground">
              Everything else stays connected to the same home.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {supportSections.map((section) => (
              <Link
                key={section.slug}
                href={`/${section.slug}`}
                className="group rounded-lg border border-border bg-background p-6 transition-colors hover:bg-card"
              >
                <p className="text-sm font-medium text-primary">{section.eyebrow}</p>
                <h3 className="mt-4 text-2xl font-medium text-foreground group-hover:text-primary">
                  {section.name}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{section.summary}</p>
              </Link>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/download"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-7 py-3.5 font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Download Roost free
            </Link>
            <Link
              href="/roost-pro"
              className="text-sm font-medium text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground"
            >
              Compare free vs <ProInline />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Roost Pro ───────────────────────────────────────────────────────── */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
              <ProInline />
            </p>
            <h2 className="mt-4 text-4xl font-medium tracking-tight text-foreground">
              More history, more planning, more help from Hazel.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              <ProInline /> unlocks the deeper budgeting layer: spending history, trends, advanced
              planning, Hazel categorisation, and the insight needed to understand where the
              household is heading.
            </p>
          </div>
          <div className="rounded-lg bg-card p-6">
            <div className="grid gap-3">
              {[
                "Budget trends & spending history",
                "Hazel AI insights & categorisation",
                "Advanced planning tools",
                "Full transaction history",
                "Priority support",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b border-border py-3 last:border-b-0"
                >
                  <span className="font-medium text-foreground">{item}</span>
                  <ProBadge />
                </div>
              ))}
            </div>
            <ProButton
              href="/roost-pro"
              className="mt-6 w-full rounded-lg"
            >
              Explore Roost Pro
            </ProButton>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
