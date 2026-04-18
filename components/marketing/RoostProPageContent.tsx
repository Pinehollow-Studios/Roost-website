"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import MarketingShell from "@/components/marketing/MarketingShell";
import { ProBadge, ProButton, ProInline, ProWordmark, proGradient } from "@/components/marketing/ProBrand";

const ease = [0.16, 1, 0.3, 1] as const;

const unlocks = [
  {
    title: "Hazel AI",
    short: "Always working. Never in the way.",
    body:
      "Auto-categorizes expenses as you log them, narrates your spending month in plain English, bulk-sorts uncategorized items, and suggests your monthly chore list.",
    icon: <SparklesIcon />,
  },
  {
    title: "Full Budget History",
    short: "Every month, forever.",
    body:
      "Navigate every past month and see exactly where your money went and why. Your financial story, never locked away.",
    icon: <CalendarIcon />,
  },
  {
    title: "Advanced Budgeting",
    short: "Set goals. Watch them happen.",
    body:
      "Unlock multiple savings goals, full month-by-month spending trends, and a detailed month comparison so you always see the bigger picture.",
    icon: <ChartIcon />,
  },
  {
    title: "Smart Notifications",
    short: "Never miss what matters.",
    body:
      "Get nudged when chores are overdue, bills are coming, or spending is running hot. The right alert, at the right moment.",
    icon: <BellIcon />,
  },
  {
    title: "Room Groups",
    short: "Tidy the house with one tap.",
    body:
      "Group rooms together and assign chores to all of them at once. Clean all bathrooms. Tidy the whole house. One action.",
    icon: <GridIcon />,
  },
];

const comparisonRows = [
  ["Budget & expenses", "Current month", "Full monthly history"],
  ["Hazel AI", "Everyday cleanup", "Categorisation, narration, and suggestions"],
  ["Spending trends", "Basic view", "Month-by-month movement"],
  ["Savings goals", "One active goal", "Multiple goals with progress"],
  ["Notifications", "Standard alerts", "Smart pressure alerts"],
  ["Room planning", "Individual rooms", "Room groups"],
];

function SparklesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l1.8 5.3L19 9l-5.2 1.7L12 16l-1.8-5.3L5 9l5.2-1.7L12 2Z" fill="currentColor" />
      <path d="M18.5 14l.9 2.6L22 17.5l-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6Z" fill="currentColor" opacity="0.72" />
      <path d="M5.5 13l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7.7-2.1Z" fill="currentColor" opacity="0.58" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3v3M17 3v3M4.5 9h15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6 5h12a2 2 0 0 1 2 2v11.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 13h2M12 13h2M16 13h1M8 17h2M12 17h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4a8 8 0 1 0 8 8h-8V4Z" fill="currentColor" opacity="0.76" />
      <path d="M14 2.5A8 8 0 0 1 21.5 10H14V2.5Z" fill="currentColor" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 10a5 5 0 0 1 10 0v3.8l2 2.7H5l2-2.7V10Z" fill="currentColor" />
      <path d="M10 19a2.2 2.2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="17.5" cy="6" r="2" fill="#F5C472" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 5.8c0-.7.6-1.3 1.3-1.3h3.4c.7 0 1.3.6 1.3 1.3v3.4c0 .7-.6 1.3-1.3 1.3H6.3C5.6 10.5 5 9.9 5 9.2V5.8ZM13 5.8c0-.7.6-1.3 1.3-1.3h3.4c.7 0 1.3.6 1.3 1.3v3.4c0 .7-.6 1.3-1.3 1.3h-3.4c-.7 0-1.3-.6-1.3-1.3V5.8ZM5 14.8c0-.7.6-1.3 1.3-1.3h3.4c.7 0 1.3.6 1.3 1.3v3.4c0 .7-.6 1.3-1.3 1.3H6.3c-.7 0-1.3-.6-1.3-1.3v-3.4ZM13 14.8c0-.7.6-1.3 1.3-1.3h3.4c.7 0 1.3.6 1.3 1.3v3.4c0 .7-.6 1.3-1.3 1.3h-3.4c-.7 0-1.3-.6-1.3-1.3v-3.4Z" fill="currentColor" />
    </svg>
  );
}

function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="pro-aurora-a absolute left-[8%] top-[12%] h-[220px] w-[220px] rounded-full bg-[#8B3A1E]/30 blur-[80px]" />
      <div className="pro-aurora-b absolute right-[8%] top-[5%] h-[180px] w-[320px] rounded-full bg-[#E8924A]/20 blur-[100px]" />
      <div className="pro-aurora-c absolute bottom-[14%] left-[42%] h-[190px] w-[190px] rounded-full bg-[#F5C472]/15 blur-[64px]" />
    </div>
  );
}

function PhonePreview() {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[382px]"
      initial={{ opacity: 0, y: 38, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.95, ease, delay: 0.12 }}
    >
      <div className="absolute -inset-8 rounded-[58px] bg-[#E8924A]/12 blur-3xl" />
      <div className="relative rounded-[54px] border border-[var(--pro-border)] bg-[var(--pro-card)] p-2 shadow-[var(--pro-shadow)]">
        <div className="relative h-[760px] overflow-hidden rounded-[46px] border border-[var(--pro-border)] bg-[var(--pro-bg)]">
          <div className="absolute left-1/2 top-3 z-20 h-7 w-28 -translate-x-1/2 rounded-full bg-black/90 dark:bg-black" />
          <div className="relative z-10 flex h-14 items-end justify-between px-7 pb-2 text-[12px] font-bold text-[var(--pro-warm-white)]">
            <span>6:38</span>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-4 rounded-sm border border-current" />
              <span className="h-3 w-4 rounded-sm border border-current bg-current" />
              <span className="rounded-full bg-[var(--pro-warm-white)] px-2 py-0.5 text-[10px] text-[var(--pro-bg)]">
                57
              </span>
            </div>
          </div>

          <div className="h-[calc(100%-104px)] overflow-hidden px-5 pb-5 pt-4">
            <div className="relative overflow-hidden rounded-[26px] border border-[var(--pro-border)] bg-[var(--pro-card-strong)] px-5 py-6">
              <Aurora />
              <div className="relative">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#C4622A]/15 text-[#E8924A]">
                  <span className="pro-sparkle h-7 w-7">
                    <SparklesIcon />
                  </span>
                </div>
                <p className="mt-4 text-center text-2xl font-bold tracking-tight">
                  <ProWordmark />
                </p>
                <p className="mt-2 text-center text-sm text-[var(--pro-body-text)]">
                  Your home, elevated.
                </p>
                <div
                  className="pro-shimmer relative mt-5 flex h-11 items-center justify-center overflow-hidden rounded-full text-sm font-bold text-[#8B3A1E]"
                  style={{ backgroundImage: proGradient }}
                >
                  Start Your Free Trial
                </div>
                <p className="mt-3 text-center text-[11px] text-[var(--pro-muted-text)]">
                  14 days free, then £4.99/mo
                </p>
              </div>
            </div>

            <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--pro-muted-text)]">
              Everything you unlock
            </p>
            <div className="mt-3 space-y-3">
              {unlocks.slice(0, 3).map((item, index) => (
                <motion.div
                  key={item.title}
                  className="relative overflow-hidden rounded-[16px] border border-[var(--pro-border)] bg-[var(--pro-card)] p-4 pl-5"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease, delay: 0.34 + index * 0.065 }}
                >
                  <span className="absolute inset-y-0 left-0 w-[3px]" style={{ backgroundImage: proGradient }} />
                  <div className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C4622A]/15 text-[#E8924A]">
                      <span className="h-5 w-5">{item.icon}</span>
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-[var(--pro-warm-white)]">{item.title}</span>
                      <span className="mt-0.5 block text-[11px] leading-relaxed text-[var(--pro-muted-text)]">
                        {item.short}
                      </span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-[16px] border border-[var(--pro-border)] bg-[var(--pro-card)]">
              <div className="grid grid-cols-[1fr_0.65fr_0.65fr] text-[11px] font-medium">
                <div className="px-3 py-3 text-[var(--pro-muted-text)]">Feature</div>
                <div className="bg-[var(--pro-muted-surface)] px-3 py-3 text-[var(--pro-muted-text)]">
                  Free
                </div>
                <div className="px-3 py-3 text-[#FFF8F2]" style={{ backgroundImage: proGradient }}>
                  Pro
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-20 border-t border-[var(--pro-border)] bg-[var(--pro-card)]/92 px-5 pb-4 pt-3 backdrop-blur-md">
            <div className="grid grid-cols-5 text-center text-[10px] font-medium text-[var(--pro-muted-text)]">
              {["Home", "Money", "Shop", "Chores", "More"].map((item) => (
                <div key={item} className={item === "More" ? "text-[#E8924A]" : ""}>
                  <div className="mx-auto mb-1 h-5 w-5 rounded-md border border-current opacity-70" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function RoostProPageContent() {
  const { scrollYProgress } = useScroll();
  const lift = useTransform(scrollYProgress, [0, 0.55], [0, -70]);

  return (
    <MarketingShell>
      <div className="bg-[var(--pro-bg)] text-[var(--pro-body-text)]">
        <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden border-b border-[var(--pro-border)] px-6 pt-28 pb-14 sm:pt-32">
          <Aurora />
          <div className="absolute inset-0 bg-[var(--pro-hero-overlay)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, y: 42 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease }}
              className="max-w-3xl"
            >
              <div className="mb-8 flex items-center gap-3">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#C4622A]/15 text-[#E8924A]">
                  <span className="pro-glow absolute inset-0 rounded-full" />
                  <span className="pro-sparkle relative h-8 w-8">
                    <SparklesIcon />
                  </span>
                </div>
                <Image src="/logo.png" alt="Roost" width={34} height={34} className="rounded-lg opacity-85" />
              </div>
              <h1 className="text-6xl font-bold leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">
                <ProWordmark />
              </h1>
              <p className="mt-6 text-[15px] leading-relaxed tracking-[0.03em] text-[var(--pro-body-text)] sm:text-lg">
                Your home, elevated.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--pro-body-text)] opacity-80 sm:text-lg">
                The full household dashboard with history, intelligence, and everything that matters.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ProButton href="/pricing">Start Your Free Trial</ProButton>
                <Link
                  href="#unlock"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-[#C4622A]/25 bg-[#C4622A]/10 px-7 text-sm font-medium text-[#C4622A] transition-colors hover:bg-[#C4622A]/15 dark:text-[#E8924A]"
                >
                  See what&nbsp;<ProInline /> unlocks
                </Link>
              </div>
              <p className="mt-4 text-sm text-[var(--pro-muted-text)]">
                14 days free, then £4.99/mo. Cancel anytime.
              </p>
            </motion.div>
            <motion.div style={{ y: lift }}>
              <PhonePreview />
            </motion.div>
          </div>
        </section>

        <section id="unlock" className="px-6 py-24">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--pro-muted-text)]">
                What You Unlock
              </p>
              <h2 className="mt-4 max-w-md text-4xl font-medium leading-tight tracking-tight text-[var(--pro-warm-white)] sm:text-5xl">
                Roost in its best light.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--pro-body-text)] opacity-80">
                <ProInline /> deepens the same home you already run together: more history, smarter planning,
                and Hazel working quietly in the background.
              </p>
            </div>
            <div className="grid gap-4">
              {unlocks.map((feature, index) => (
                <motion.article
                  key={feature.title}
                  className="relative overflow-hidden rounded-[14px] border border-[var(--pro-border)] bg-[var(--pro-card)] p-5 pl-6 sm:p-6 sm:pl-7"
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.48, ease, delay: index * 0.065 }}
                >
                  <span className="absolute inset-y-0 left-0 w-[3px]" style={{ backgroundImage: proGradient }} />
                  <div className="grid gap-4 sm:grid-cols-[44px_1fr]">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C4622A]/15 text-[#E8924A]">
                      <span className="h-5 w-5">{feature.icon}</span>
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-medium tracking-tight text-[var(--pro-warm-white)]">{feature.title}</h3>
                        <ProBadge />
                      </div>
                      <p className="mt-2 text-sm font-medium text-[#E8924A]">{feature.short}</p>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--pro-muted-text)] sm:text-base">
                        {feature.body}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--pro-border)] bg-[var(--pro-bg-soft)] px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--pro-muted-text)]">
                Free vs <ProInline />
              </p>
              <h2 className="mt-4 text-4xl font-medium tracking-tight text-[var(--pro-warm-white)]">
                Start with Roost. Grow into <ProInline />.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[var(--pro-body-text)] opacity-80">
                Free keeps the household connected. <ProInline /> opens the deeper layer when you want the
                full month-by-month picture.
              </p>
            </div>
            <div className="mt-12 overflow-hidden rounded-[14px] border border-[var(--pro-border)] bg-[var(--pro-bg)]">
              <div className="grid grid-cols-[1.15fr_0.85fr_0.85fr] border-b border-[var(--pro-border)] text-sm font-medium">
                <div className="px-4 py-4 text-[var(--pro-muted-text)] sm:px-6">Feature</div>
                <div className="bg-[var(--pro-muted-surface)] px-4 py-4 text-[var(--pro-muted-text)] sm:px-6">Free</div>
                <div className="px-4 py-4 font-bold text-[#FFF8F2] sm:px-6" style={{ backgroundImage: proGradient }}>
                  Pro
                </div>
              </div>
              {comparisonRows.map(([feature, free, pro]) => (
                <div
                  key={feature}
                  className="grid grid-cols-[1.15fr_0.85fr_0.85fr] border-b border-[var(--pro-border)] last:border-b-0"
                >
                  <div className="px-4 py-4 text-sm text-[var(--pro-body-text)] sm:px-6">{feature}</div>
                  <div className="px-4 py-4 text-sm text-[var(--pro-muted-text)] sm:px-6">{free}</div>
                  <div className="px-4 py-4 text-sm text-[var(--pro-body-text)] sm:px-6">
                    <span className="mr-2 text-[#E8924A]">✓</span>
                    {pro}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-24">
          <Aurora />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--pro-muted-text)]">
                Hazel Inside
              </p>
              <h2 className="mt-4 max-w-2xl text-4xl font-medium leading-tight tracking-tight text-[var(--pro-warm-white)] sm:text-5xl">
                The intelligence layer that makes the dashboard feel alive.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--pro-body-text)] opacity-80">
                Hazel reads the practical household data you already add to Roost and turns it into
                cleaner categories, plain-English insight, and suggested next steps.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Categorise the grocery run before the month gets messy.",
                "Explain where the spending moved in plain English.",
                "Suggest chores from the rhythm of the home.",
              ].map((line, index) => (
                <motion.div
                  key={line}
                  className="border-t border-[var(--pro-border)] pt-5"
                  initial={false}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.5, ease, delay: index * 0.08 }}
                >
                  <p className="text-xl leading-relaxed text-[var(--pro-warm-white)]">{line}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--pro-border)] px-6 py-20">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <div>
              <p className="text-4xl font-bold tracking-tight sm:text-5xl">
                <ProWordmark />
              </p>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--pro-body-text)] opacity-80">
                The full household dashboard, ready when the app launches.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:min-w-[260px]">
              <ProButton href="/pricing">Upgrade to Roost Pro</ProButton>
              <Link
                href="/download"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#C4622A]/25 bg-[#C4622A]/10 px-6 text-sm font-medium text-[#C4622A] hover:bg-[#C4622A]/15 dark:text-[#E8924A]"
              >
                Download Roost
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MarketingShell>
  );
}
