"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import { DOWNLOAD_URL } from "@/lib/constants";

const ease = [0.16, 1, 0.3, 1] as const;
const spring = { type: "spring" as const, stiffness: 320, damping: 24 };

const freeFeatures = [
  "Shopping list — unlimited, real-time",
  "Expenses — current month",
  "Chores — add, assign, complete",
  "Activity feed — always full",
  "Pinboard",
  "Budget — current month only",
  "Hazel — shopping and chore features",
  "Real-time sync — always on",
];

const nestFeatures = [
  "Everything in Roost, plus:",
  "Full expense history — all time",
  "Budget history and trends",
  "Hazel spending insights and forecasting",
  "Expense auto-categorisation",
  "Chore recurrence and streaks",
  "Apple Calendar sync",
  "iOS app — when it launches",
  "Early access to new features",
];

const faqs = [
  {
    question: "Does the free plan actually work, or is it a demo?",
    answer:
      "It’s a real, fully working app. Shopping list, expenses, chores, and more — all functional, all syncing between both your devices in real time. The free plan is how we started using Roost ourselves.",
  },
  {
    question: "What counts as one household?",
    answer:
      "You and your partner. One subscription covers both of you — there’s nothing extra to pay for the second person. Roost is built for exactly two people sharing a home.",
  },
  {
    question: "Do I need a credit card to start the free trial?",
    answer:
      "No. Your 14-day Nest trial starts automatically when you create a home. We only ask for payment details if you decide to keep Nest after the trial.",
  },
  {
    question: "What happens when my trial ends?",
    answer:
      "You move to the free plan automatically — no charge, no nasty surprise. You keep everything on the free plan and can upgrade any time from Settings inside the app.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "Your data stays safe. Expense history from before your subscription is preserved — it’s just not visible until you upgrade again. We never delete your data.",
  },
  {
    question: "Is Roost on iOS?",
    answer:
      "Not yet, but it’s coming. Roost Nest includes iOS access when it launches — so upgrading now means you’re covered when the iPhone app arrives.",
  },
  {
    question: "Can I pay annually and switch to monthly later?",
    answer:
      "Yes. You can manage your subscription any time from the Stripe customer portal, linked directly from Settings inside the app.",
  },
];

function SectionHeading({ id, title }: { id: string; title: string }) {
  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease }}
    >
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
          id={id}
          className="text-3xl sm:text-4xl font-medium text-foreground tracking-tight"
        >
          {title}
        </h2>
      </div>
    </motion.div>
  );
}

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.li
      className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.45, ease }}
    >
      <motion.span
        aria-hidden="true"
        className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"
        initial={{ scale: 0.7, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.35, ease, delay: 0.05 }}
      />
      <span>{children}</span>
    </motion.li>
  );
}

export default function PricingPageContent() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

  const isAnnual = billing === "annual";
  const nestHref = isAnnual ? "#checkout-annual" : "#checkout-monthly";

  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden px-6 pt-32 pb-20 sm:pt-36 sm:pb-24" aria-labelledby="pricing-heading">
          <div
            className="pointer-events-none absolute inset-0 flex items-start justify-center"
            aria-hidden="true"
          >
            <motion.div
              className="h-[420px] w-[680px] rounded-full bg-primary/[0.07] blur-[100px]"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease }}
            />
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              <p className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-muted-foreground mb-8">
                <span className="w-6 h-px bg-primary/50 inline-block" />
                Pricing
                <span className="w-6 h-px bg-primary/50 inline-block" />
              </p>

              <h1
                id="pricing-heading"
                className="text-5xl sm:text-6xl lg:text-7xl font-medium text-foreground leading-[1.1] tracking-tight text-balance"
              >
                Simple pricing for two.
              </h1>

              <p className="mt-7 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
                One subscription covers your whole household. Try everything
                free for 14 days — no card needed.
              </p>

              <div className="mt-10 flex justify-center">
                <motion.div
                  className="inline-flex items-center gap-1 rounded-xl border border-border bg-card p-1 shadow-[0_2px_8px_rgba(61,50,41,0.06)]"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease, delay: 0.15 }}
                >
                  <motion.button
                    type="button"
                    onClick={() => setBilling("monthly")}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      billing === "monthly"
                        ? "bg-background text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-pressed={billing === "monthly"}
                  >
                    Monthly
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setBilling("annual")}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      billing === "annual"
                        ? "bg-background text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-pressed={billing === "annual"}
                  >
                    Annual
                    {billing === "annual" ? (
                      <motion.span
                        className="rounded-full bg-primary/12 px-2 py-0.5 text-[11px] font-medium text-primary"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35, ease }}
                      >
                        2 months free
                      </motion.span>
                    ) : null}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 pb-28" aria-label="Plans">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            <motion.article
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease }}
              whileHover={{ y: -8, transition: spring }}
              className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-[0_2px_8px_rgba(61,50,41,0.06)]"
              style={{ borderTop: "2px solid rgba(212,121,94,0.35)" }}
            >
              <div>
                <p className="text-base font-medium text-foreground">Roost</p>
                <div className="mt-5">
                  <p className="text-4xl sm:text-5xl font-medium tracking-tight text-foreground">
                    Free
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">Always</p>
                </div>
              </div>

              <div className="my-6 h-px bg-border" />

              <ul className="space-y-3">
                {freeFeatures.map((feature) => (
                  <FeatureItem key={feature}>{feature}</FeatureItem>
                ))}
              </ul>

              <div className="mt-8 pt-2">
                <motion.a
                  href={DOWNLOAD_URL}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={spring}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-background px-6 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Download free
                </motion.a>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease, delay: 0.08 }}
              whileHover={{ y: -10, transition: spring }}
              className="flex flex-col rounded-xl border border-primary/30 bg-[rgba(242,235,224,0.72)] p-6 shadow-[0_2px_8px_rgba(61,50,41,0.06)]"
              style={{ borderTop: "2px solid rgba(212,121,94,0.7)" }}
            >
              <div>
                <div className="flex items-center gap-2.5">
                  <p className="text-base font-medium text-foreground">Roost Nest</p>
                  <span className="rounded-full bg-primary/12 px-2.5 py-1 text-[11px] font-medium text-primary">
                    Most popular
                  </span>
                </div>

                <div className="mt-5">
                  <motion.div
                    key={billing}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease }}
                    className="flex items-end gap-2"
                  >
                    <p className="text-4xl sm:text-5xl font-medium tracking-tight text-foreground">
                      {isAnnual ? "£39.99" : "£4.99"}
                    </p>
                    <p className="pb-1 text-sm text-muted-foreground">
                      {isAnnual ? "/year" : "/month"}
                    </p>
                  </motion.div>

                  {isAnnual ? (
                    <motion.p
                      className="mt-2 text-sm text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.35, ease }}
                    >
                      <span className="line-through">£59.88 if billed monthly</span>
                    </motion.p>
                  ) : null}

                  <p className="mt-2 text-sm text-muted-foreground">
                    Per household — both of you.
                  </p>
                </div>
              </div>

              <div className="my-6 h-px bg-border" />

              <ul className="space-y-3">
                {nestFeatures.map((feature) => (
                  <FeatureItem key={feature}>{feature}</FeatureItem>
                ))}
              </ul>

              <div className="mt-8 pt-2">
                <motion.a
                  href={nestHref}
                  whileHover={{
                    y: -2,
                    boxShadow: "0 12px 32px rgba(212, 121, 94, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={spring}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 text-base font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={{ boxShadow: "0 4px 20px rgba(212, 121, 94, 0.25)" }}
                >
                  Start 14 days free
                </motion.a>
                <p className="mt-3 text-center text-sm text-muted-foreground">
                  No credit card required to start. Cancel any time.
                </p>
              </div>
            </motion.article>
          </div>
        </section>

        <section className="py-28 px-6" aria-labelledby="hazel-heading">
          <div className="max-w-6xl mx-auto">
            <SectionHeading id="hazel-heading" title="Meet Hazel" />

            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease }}
            >
              <p className="text-xl sm:text-2xl font-medium text-primary leading-[1.6] text-balance">
                Hazel is Roost&apos;s built-in AI layer. Not a chatbot. Not a chat
                window. Just a quiet hand in the background.
              </p>

              <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-balance">
                She helps as you go — tidying up your shopping list while you
                type, sorting expenses when you save them, and nudging you about
                chores that might have slipped by.
              </p>

              <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-balance">
                With Roost Nest, she goes a little further. She spots spending
                patterns, gives you a clearer read on the month ahead, and pulls
                forward the bits of your household finances worth knowing.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-28 px-6" aria-labelledby="questions-heading">
          <div className="max-w-6xl mx-auto">
            <SectionHeading id="questions-heading" title="Questions" />

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.article
                  key={faq.question}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease, delay: index * 0.03 }}
                  className="rounded-xl border border-border bg-card p-6 shadow-[0_2px_8px_rgba(61,50,41,0.06)]"
                  style={{ borderTop: "2px solid rgba(212,121,94,0.35)" }}
                >
                  <h3 className="text-lg font-medium text-foreground leading-snug">
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-3xl">
                    {faq.answer}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}