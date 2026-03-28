"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function PricingTeaser() {
  return (
    <section className="py-28 px-6" aria-labelledby="pricing-teaser-heading">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="rounded-xl border border-border bg-card px-6 py-10 sm:px-8 sm:py-12 shadow-[0_2px_8px_rgba(61,50,41,0.06)]"
          style={{ borderTop: "2px solid rgba(212,121,94,0.35)" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className="w-1.5 h-7 bg-primary rounded-full"
                aria-hidden="true"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: 0.2 }}
                style={{ transformOrigin: "top" }}
              />
              <h2
                id="pricing-teaser-heading"
                className="text-3xl sm:text-4xl font-medium text-foreground tracking-tight"
              >
                Free to start. Nest when you&apos;re ready.
              </h2>
            </div>

            <p className="pl-[calc(0.375rem+0.75rem)] text-lg text-muted-foreground leading-relaxed max-w-xl text-balance">
              Roost is free. Roost Nest unlocks the full experience — expense
              history, budget insights, Hazel, and more.
            </p>

            <div className="mt-6 pl-[calc(0.375rem+0.75rem)]">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 text-base font-medium text-foreground transition-colors hover:text-primary"
              >
                See what&apos;s included
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}