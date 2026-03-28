"use client";

import { motion } from "framer-motion";

const features = [
  {
    name: "Shopping list",
    description:
      "Add items from anywhere. Check them off as you shop and they update on both screens instantly — no refresh, no lag.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    name: "Expenses",
    description:
      "Log what you spend, split it down the middle, and see the running balance at a glance. Settle up in one tap.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    name: "Budget",
    description:
      "Set monthly limits by category. Traffic-light progress bars show exactly where you stand before you overspend.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
  {
    name: "Chores",
    description:
      "Assign tasks by room, set how often they repeat, and finally stop wondering whose turn it is to clean the bathroom.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    name: "Calendar",
    description:
      "A shared view of everything coming up for both of you — events, chores, and reminders in one calm place.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    name: "Pinboard",
    description:
      "A shared space for notes, links, and anything worth remembering together. Coming soon.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const rise = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export default function Features() {
  return (
    <section
      id="features"
      className="bg-muted/40 py-32 px-6 sm:py-36"
      aria-labelledby="features-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-7 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            <h2
              id="features-heading"
              className="text-3xl sm:text-4xl font-medium text-foreground tracking-tight"
            >
              Everything your home needs.
            </h2>
          </div>
          <p className="mt-3 text-muted-foreground text-lg max-w-md pl-[calc(0.375rem+0.75rem)]">
            All the moving parts of a shared home, in one place. Finally.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          {features.map((feature) => (
            <motion.article
              key={feature.name}
              variants={rise}
              whileHover={{ y: -10, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="relative flex h-full flex-col gap-5 rounded-xl border border-border bg-card p-6 shadow-[0_2px_8px_rgba(61,50,41,0.06)] sm:p-7"
              style={{ borderTop: "2px solid rgba(212,121,94,0.35)" }}
            >
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium leading-snug text-foreground">
                  {feature.name}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
