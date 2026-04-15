"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function PricingTeaser() {
  return (
    <section className="py-24 px-6 sm:py-28" aria-labelledby="pricing-teaser-heading">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="rounded-2xl border border-border bg-card px-6 py-12 text-center shadow-[0_2px_8px_rgba(61,50,41,0.06)] sm:px-10"
          style={{ borderTop: "2px solid rgba(212,121,94,0.35)" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.95, ease }}
        >
          <div className="mx-auto max-w-2xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Pricing
            </p>
            <h2
              id="pricing-teaser-heading"
              className="text-3xl sm:text-4xl font-medium text-foreground tracking-tight"
            >
              Free to start. Pro when you&apos;re ready.
            </h2>

            <p className="mt-5 text-lg text-muted-foreground leading-relaxed text-balance">
              Roost is free. Roost Pro unlocks the full experience — expense
              history, budget insights, Hazel, and more.
            </p>

            <div className="mt-7">
              <motion.div whileHover={{ x: 6 }} transition={{ duration: 0.35, ease }}>
                <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 text-base font-medium text-foreground underline decoration-border underline-offset-4 hover:text-primary"
                >
                  See what&apos;s included
                  <span aria-hidden="true">→</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
