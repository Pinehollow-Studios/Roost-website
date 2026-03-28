"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Philosophy() {
  return (
    <section id="philosophy" className="px-6 py-28 sm:py-32" aria-label="Our philosophy">
      <motion.div
        className="mx-auto max-w-5xl rounded-[2rem] border border-border bg-accent px-8 py-12 text-center shadow-[0_2px_8px_rgba(61,50,41,0.06)] sm:px-12 sm:py-16"
        style={{ borderTop: "2px solid rgba(212,121,94,0.35)" }}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.05, ease }}
      >
        <motion.div
          className="mx-auto mb-10 h-0.5 w-8 rounded-full bg-primary/60"
          aria-hidden="true"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 32, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        />

        <motion.p
          className="text-xl sm:text-[2rem] font-medium text-primary leading-[1.7] text-balance"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
        >
          Roost isn&apos;t a platform. It doesn&apos;t have a social feed, a
          subscription tier, or a team of engineers mining your grocery list for
          insights.
        </motion.p>

        <motion.p
          className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground text-balance sm:text-xl"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease, delay: 0.18 }}
        >
          It&apos;s a quiet, private space for two people to manage their home
          together. Your data lives in your own private database — no tracking,
          no ads, no third parties with a window into your life. We built this
          because we needed it. Maybe you do too.
        </motion.p>

        <motion.div
          className="mx-auto mt-10 h-0.5 w-8 rounded-full bg-primary/60"
          aria-hidden="true"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 32, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.22 }}
        />
      </motion.div>
    </section>
  );
}
