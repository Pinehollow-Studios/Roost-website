"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Download Roost on both your devices",
    description:
      "Each of you installs Roost from the download page. It takes about a minute and there's nothing to configure.",
  },
  {
    number: "02",
    title: "Create a home and share your invite code",
    description:
      "One of you sets up the household and gives it a name. The other joins with a simple invite code — no complicated account linking.",
  },
  {
    number: "03",
    title: "Everything syncs instantly between you",
    description:
      "That's it. Add a shopping item, log an expense, tick a chore — your partner sees it the moment it happens.",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
};

const rise = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.95, ease } },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6 sm:py-36" aria-labelledby="how-heading">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-20 flex items-center gap-3"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease }}
        >
          <motion.div
            className="h-7 w-1.5 rounded-full bg-primary"
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            style={{ transformOrigin: "top" }}
          />
          <h2
            id="how-heading"
            className="text-3xl sm:text-4xl font-medium text-foreground tracking-tight"
          >
            Up and running in minutes.
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-12"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={rise}
              whileHover={{ y: -10, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="rounded-2xl border border-border bg-card/60 px-6 py-8 sm:px-8"
              style={{ borderTop: "2px solid rgba(212,121,94,0.35)" }}
            >
              <span
                aria-hidden="true"
                className="block text-[4rem] font-medium leading-none text-muted-foreground/40 sm:text-[4.5rem]"
              >
                {step.number}
              </span>

              <div className="mt-4 max-w-[16rem]">
                <h3 className="font-medium text-foreground text-lg leading-snug">
                  {step.title}
                </h3>
                <p className="mt-3 text-muted-foreground text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
