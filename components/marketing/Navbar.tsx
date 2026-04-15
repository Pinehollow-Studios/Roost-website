"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { APP_NAME, DOWNLOAD_URL } from "@/lib/constants";
import { productSections } from "@/lib/product";

const spring = { type: "spring" as const, stiffness: 380, damping: 28 };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-border bg-background/88 backdrop-blur-md" : "bg-background/35 backdrop-blur-sm"
      }`}
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
        <div className="flex items-center gap-7">
          <Link href="/" className="flex items-center gap-2.5 select-none" onClick={() => setMobileOpen(false)}>
            <Image src="/logo.png" alt="Roost logo" width={30} height={30} className="rounded-md" />
            <span className="text-lg font-medium tracking-tight text-foreground">{APP_NAME}</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <div
              className="relative"
              onMouseEnter={() => setProductOpen(true)}
              onMouseLeave={() => setProductOpen(false)}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => setProductOpen((value) => !value)}
                aria-expanded={productOpen}
              >
                Product
                <span aria-hidden="true">⌄</span>
              </button>
              <AnimatePresence>
                {productOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-8 w-[520px] rounded-lg border border-border bg-card p-3 shadow-[0_24px_70px_rgba(32,36,31,0.14)]"
                  >
                    <div className="grid grid-cols-2 gap-1">
                      {productSections.map((section) => (
                        <Link
                          key={section.slug}
                          href={`/${section.slug}`}
                          className="rounded-md p-3 transition-colors hover:bg-background"
                        >
                          <p className="text-sm font-medium text-foreground">{section.name}</p>
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{section.navSummary}</p>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <Link href="/money" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Money
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </Link>
            <Link href="/download" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Download
            </Link>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/account"
            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Account
          </Link>
          <motion.a
            href={DOWNLOAD_URL}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={spring}
            className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Download Roost
          </motion.a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground md:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <span className="h-px w-5 bg-current shadow-[0_6px_0_currentColor,0_-6px_0_currentColor]" />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-0 z-50 bg-background px-6 py-5 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
                <Image src="/logo.png" alt="Roost logo" width={30} height={30} className="rounded-md" />
                <span className="text-lg font-medium text-foreground">{APP_NAME}</span>
              </Link>
              <button
                type="button"
                className="rounded-lg border border-border px-3 py-2 text-sm font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="mt-10 space-y-1">
              {productSections.map((section) => (
                <Link
                  key={section.slug}
                  href={`/${section.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block border-t border-border py-4"
                >
                  <p className="text-xl font-medium text-foreground">{section.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{section.navSummary}</p>
                </Link>
              ))}
            </div>
            <div className="mt-8 grid gap-3">
              <Link href="/pricing" onClick={() => setMobileOpen(false)} className="rounded-lg border border-border px-4 py-3 text-center font-medium">
                Pricing
              </Link>
              <Link href="/account" onClick={() => setMobileOpen(false)} className="rounded-lg border border-border px-4 py-3 text-center font-medium">
                Account
              </Link>
              <Link href="/download" onClick={() => setMobileOpen(false)} className="rounded-lg bg-primary px-4 py-3 text-center font-medium text-primary-foreground">
                Download Roost
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
