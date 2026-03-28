"use client";

import { motion } from "framer-motion";
import { APPLE_LOGO_PATH, DOWNLOAD_URL } from "@/lib/constants";

const ease = [0.16, 1, 0.3, 1] as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
};

const rise = {
  hidden: { opacity: 0, y: 64 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden px-6 pt-40 pb-36 sm:pt-48 sm:pb-40"
      aria-label="Hero"
    >
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.82, y: -60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.6, ease }}
      >
        <div className="h-[520px] w-[760px] rounded-full bg-primary/10 blur-[120px]" />
      </motion.div>

      <motion.div
        className="relative mx-auto max-w-4xl text-center"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={rise}
          className="mb-10 inline-flex rounded-full bg-primary px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground shadow-[0_2px_8px_rgba(61,50,41,0.06)]"
        >
          For couples
        </motion.p>

        <motion.h1
          variants={rise}
          className="text-5xl sm:text-6xl lg:text-7xl font-medium text-foreground leading-[1.1] tracking-tight text-balance"
        >
          One place for your home,{" "}
          <span className="text-primary">shared between two.</span>
        </motion.h1>

        <motion.p
          variants={rise}
          className="mt-8 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance"
        >
          Roost keeps your shopping, expenses, chores, and calendar in sync
          across both your devices. When you add something, they see it straight
          away.
        </motion.p>

        <motion.div className="mt-12 flex flex-col items-center gap-3" variants={rise}>
          <motion.a
            href={DOWNLOAD_URL}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-8 py-3.5 text-base font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{ boxShadow: "0 4px 20px rgba(212, 121, 94, 0.25)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d={APPLE_LOGO_PATH} />
            </svg>
            Download Roost
          </motion.a>

          <motion.button
            type="button"
            disabled
            aria-disabled="true"
            whileHover={{ y: -1 }}
            className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-card/60 px-8 py-3.5 text-base font-medium text-muted-foreground shadow-[0_2px_10px_rgba(61,50,41,0.05)]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d={APPLE_LOGO_PATH} />
            </svg>
            Download for iPhone
          </motion.button>

          <p className="text-sm text-muted-foreground/70">
            Available now during early access · iPhone version coming soon
          </p>
        </motion.div>

        <motion.div
          variants={rise}
          className="mx-auto mt-16 h-px w-full max-w-5xl bg-border"
        />
      </motion.div>
    </section>
  );
}
