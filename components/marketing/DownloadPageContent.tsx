"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";

const installSteps = [
  {
    number: "01",
    title: "Open the downloaded file",
    description:
      "Find Roost.dmg in your Downloads folder — it should appear there automatically after the download completes. Double-click it to open the installer. A window appears with the Roost icon and an Applications folder shortcut beside it.",
  },
  {
    number: "02",
    title: "Drag to Applications",
    description:
      "Drag the Roost icon into the Applications folder shown in the window. macOS copies Roost to your Applications folder. This takes a few seconds. Once it finishes you can eject the installer window and delete the .dmg file from Downloads.",
  },
  {
    number: "03",
    title: "Open it safely",
    description:
      "The first time you open Roost, macOS will show a security warning because it was downloaded outside the App Store. This is normal. Right-click the Roost icon in your Applications folder, choose Open, then click Open again in the prompt that appears. You only need to do this once.",
  },
  {
    number: "04",
    title: "Create your home",
    description:
      "Open Roost from your Applications folder. Create an account with your email address and give your home a name — something like 'Our Place' or 'The Flat'. Roost generates an invite code. Share it with your partner and they join from their Mac using the same invite code. From that moment, everything you both do in the app syncs in real time.",
  },
] as const;

const requirements = [
  "macOS 13 Ventura or later",
  "Apple Silicon and Intel",
  "Free to download",
] as const;

const troubleItems = [
  {
    question:
      "macOS won't open Roost even after following the steps above.",
    answer:
      "Go to System Settings → Privacy & Security. Scroll down and you should see a message about Roost being blocked. Click 'Open Anyway'. This only appears after your first attempt to open the app.",
  },
  {
    question: "The download didn't start.",
  },
  {
    question: "Something else went wrong.",
    answer: "Reply to any Roost email and we'll help you get sorted.",
  },
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const rise = {
  hidden: { opacity: 0, y: 56 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease } },
};

function SectionHeading({ id, title }: { id: string; title: string }) {
  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease }}
    >
      <div className="mb-4 flex items-center gap-3">
        <motion.div
          className="h-9 w-[3px] rounded-full bg-primary"
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
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

export default function DownloadPageContent({
  versionLine,
  downloadUrl,
}: {
  versionLine: string | null;
  downloadUrl: string;
}) {
  return (
    <>
      <Navbar />
      <main>
        <section
          className="relative overflow-hidden bg-muted/40 px-6 pt-28 pb-14 sm:pt-32 sm:pb-16"
          aria-labelledby="download-heading"
        >
          <motion.div
            className="pointer-events-none absolute inset-0 flex items-start justify-center"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.88, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.6, ease }}
          >
            <div className="h-[440px] w-[720px] rounded-full bg-primary/10 blur-[110px]" />
          </motion.div>

          <motion.div
            className="relative mx-auto max-w-4xl text-center"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.h1
              id="download-heading"
              className="text-5xl sm:text-6xl lg:text-7xl font-medium text-foreground leading-[1.1] tracking-tight text-balance"
              variants={rise}
            >
              Download Roost
            </motion.h1>

            {versionLine ? (
              <motion.p
                className="mt-6 text-sm sm:text-base text-muted-foreground"
                variants={rise}
              >
                {versionLine}
              </motion.p>
            ) : null}

            <motion.div className="mt-10 flex flex-col items-center gap-4" variants={rise}>
              <motion.a
                href={downloadUrl}
                download
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-10 py-4 text-lg font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{ boxShadow: "0 4px 20px rgba(212, 121, 94, 0.25)" }}
              >
                Download for Mac
              </motion.a>

              <motion.div
                className="flex flex-wrap items-center justify-center gap-2.5"
                variants={stagger}
              >
                {requirements.map((requirement) => (
                  <motion.span
                    key={requirement}
                    variants={rise}
                    className="rounded-full bg-card px-3.5 py-1.5 text-sm text-muted-foreground shadow-[0_2px_8px_rgba(61,50,41,0.06)]"
                  >
                    {requirement}
                  </motion.span>
                ))}
              </motion.div>

              <motion.p
                variants={rise}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground text-balance shadow-[0_2px_8px_rgba(61,50,41,0.06)]"
              >
                Roost updates itself automatically after the first install.
              </motion.p>
            </motion.div>
          </motion.div>
        </section>

        <section className="bg-background px-6 py-24 sm:py-28" aria-labelledby="installing-heading">
          <div className="max-w-6xl mx-auto">
            <SectionHeading id="installing-heading" title="Installing Roost" />

            <motion.div
              className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              {installSteps.map((step) => (
                <motion.div
                  key={step.number}
                  variants={rise}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className={`rounded-2xl border border-border px-6 py-8 shadow-[0_2px_8px_rgba(61,50,41,0.06)] ${
                    step.number === "03" ? "bg-accent" : "bg-card"
                  }`}
                  style={{ borderTop: "2px solid rgba(212,121,94,0.35)" }}
                >
                  <span
                    aria-hidden="true"
                    className="block text-[4rem] font-medium leading-none text-muted-foreground/40 sm:text-[4.5rem]"
                  >
                    {step.number}
                  </span>

                  <div className="mt-4">
                    <h3 className="font-medium text-foreground text-lg leading-snug">
                      {step.title}
                    </h3>
                    {step.number === "03" ? (
                      <motion.div
                        className="mt-3 rounded-xl border border-border bg-accent px-4 py-4"
                        style={{ borderTop: "2px solid rgba(212,121,94,0.35)" }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease }}
                      >
                        <p className="text-base leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>
                      </motion.div>
                    ) : (
                      <p className="mt-3 text-muted-foreground text-base leading-relaxed">
                        {step.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="bg-muted/40 px-6 py-24 sm:py-28" aria-labelledby="trouble-heading">
          <div className="max-w-4xl mx-auto">
            <SectionHeading id="trouble-heading" title="Having trouble?" />

            <motion.div
              className="space-y-4"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              {troubleItems.map((item) => (
                <motion.article
                  key={item.question}
                  variants={rise}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 240, damping: 20 }}
                  className="rounded-xl border border-border border-l-4 border-l-primary bg-card p-6 shadow-[0_2px_8px_rgba(61,50,41,0.06)] sm:p-7"
                >
                  <h3 className="text-lg font-medium text-foreground leading-snug">
                    {item.question}
                  </h3>
                  {"answer" in item ? (
                    <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                      {item.answer}
                    </p>
                  ) : (
                    <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                      Try the download again using{" "}
                      <a
                        href={downloadUrl}
                        download
                        className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
                      >
                        Download Roost directly
                      </a>
                      .
                    </p>
                  )}
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <motion.section
          className="px-6 py-14"
          aria-label="Older versions"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-muted-foreground">
              Looking for release notes or an older version?{" "}
              <Link
                href="/changelog"
                className="underline decoration-border underline-offset-4 transition-colors hover:text-primary"
              >
                View the changelog →
              </Link>
            </p>
          </div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}