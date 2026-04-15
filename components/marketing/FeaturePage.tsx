"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ProductSection } from "@/lib/product";
import { productSections } from "@/lib/product";
import MarketingShell from "@/components/marketing/MarketingShell";
import ProductVisual from "@/components/marketing/ProductVisual";

const ease = [0.16, 1, 0.3, 1] as const;

export default function FeaturePage({ section }: { section: ProductSection }) {
  const related = productSections.filter((item) => item.slug !== section.slug).slice(0, 3);

  return (
    <MarketingShell>
      <section className="relative overflow-hidden px-6 pt-32 pb-20 sm:pt-36">
        <div className="absolute inset-x-0 top-0 h-[560px] bg-[linear-gradient(180deg,rgba(212,121,94,0.16),rgba(255,255,255,0))]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
              {section.eyebrow}
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-medium leading-[1.04] tracking-tight text-foreground sm:text-6xl">
              {section.headline}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {section.summary}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/download"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Download Roost
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                See Roost Pro
              </Link>
            </div>
          </motion.div>
          <ProductVisual section={section} />
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
              What it changes
            </p>
            <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl">
              {section.primaryTakeaway}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {section.detail}
            </p>
          </div>
          <div className="space-y-4">
            {section.highlights.map((highlight, index) => (
              <motion.div
                key={highlight}
                className="flex gap-5 border-t border-border py-5"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, ease, delay: index * 0.04 }}
              >
                <span className="text-sm font-medium text-primary">{String(index + 1).padStart(2, "0")}</span>
                <p className="max-w-2xl text-xl leading-relaxed text-foreground">{highlight}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 md:grid-cols-3">
            {section.metrics.map((metric) => (
              <div key={metric.label} className="rounded-lg bg-background p-6">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="mt-3 text-3xl font-medium tracking-tight text-foreground">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">More of Roost</p>
              <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground">The rest of the home stays connected.</h2>
            </div>
            <Link href="/download" className="hidden text-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:text-primary sm:inline">
              Download Roost
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className="group rounded-lg border border-border bg-card p-5 transition-colors hover:bg-background"
              >
                <p className="text-sm font-medium text-primary">{item.eyebrow}</p>
                <h3 className="mt-3 text-xl font-medium text-foreground group-hover:text-primary">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.navSummary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
