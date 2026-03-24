"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { DOWNLOAD_URL } from "@/lib/constants";

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 56 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Scroll-linked parallax — content drifts up and fades as you scroll away
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-28 overflow-hidden"
      aria-label="Hero"
    >
      {/* Warm terracotta glow */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="w-[700px] h-[500px] rounded-full bg-primary/[0.07] blur-[100px]" />
      </div>

      <motion.div
        className="relative max-w-3xl mx-auto text-center"
        style={{ y, opacity, willChange: "transform, opacity" }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Eyebrow */}
        <motion.p
          variants={item}
          className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-muted-foreground mb-8"
        >
          <span className="w-6 h-px bg-primary/50 inline-block" />
          For couples
          <span className="w-6 h-px bg-primary/50 inline-block" />
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="text-5xl sm:text-6xl lg:text-7xl font-medium text-foreground leading-[1.1] tracking-tight text-balance"
        >
          One place for your home,{" "}
          <span className="text-primary">shared between two.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={item}
          className="mt-7 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto text-balance"
        >
          Roost keeps your shopping, expenses, chores, and calendar in sync
          across both your Macs. When you add something, they see it straight
          away.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <motion.a
            href={DOWNLOAD_URL}
            whileHover={{
              scale: 1.06,
              boxShadow: "0 12px 40px rgba(212, 121, 94, 0.4)",
            }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl
                       bg-primary text-primary-foreground font-medium text-base
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{ boxShadow: "0 4px 20px rgba(212, 121, 94, 0.25)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 814 1000"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-42.3-150.3-109.2C79 740 40 610 40 480c0-178.1 116.2-272.6 230.4-272.6 61.2 0 112.3 40.8 149.8 40.8 35.8 0 92.1-43.1 160.3-43.1 24.4 0 108.2 2.6 168.6 81.3zm-87.4-227.9c28.3-35.2 48.5-84.1 48.5-133 0-6.4-.6-12.9-1.9-18.1-46.2 1.9-101.8 31.5-135.3 71.3-27 31.5-50.2 80.4-50.2 130 0 7.1 1.3 14.2 1.9 16.5 2.6.3 6.4.6 10.3.6 41.5 0 93.2-28.3 126.7-67.3z" />
            </svg>
            Download for Mac
          </motion.a>

          <p className="text-sm text-muted-foreground/70">
            macOS 13 and above · Free during early access
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
