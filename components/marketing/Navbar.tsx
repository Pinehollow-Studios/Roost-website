"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { APP_NAME, DOWNLOAD_URL } from "@/lib/constants";
import { productSections } from "@/lib/product";
import ThemeToggle from "@/components/ThemeToggle";
import { ProInline } from "@/components/marketing/ProBrand";

const spring = { type: "spring" as const, stiffness: 380, damping: 28 };

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M1.5 3.5L5.5 7.5L9.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isProPage = pathname.startsWith("/roost-pro");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navLinks = [
    { href: "/money", label: "Money" },
    { href: "/roost-pro", label: <ProInline /> },
    { href: "/pricing", label: "Pricing" },
    { href: "/changelog", label: "Changelog" },
    { href: "/download", label: "Download" },
  ];

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isProPage
          ? scrolled
            ? "border-b border-[var(--pro-border)] bg-[var(--pro-bg)]/90 backdrop-blur-md"
            : "bg-[var(--pro-bg)]/55 backdrop-blur-sm"
          : scrolled
          ? "border-b border-border bg-background/88 backdrop-blur-md"
          : "bg-background/35 backdrop-blur-sm"
      }`}
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
        <div className="flex items-center gap-7">
          <Link
            href="/"
            className="flex select-none items-center gap-2.5"
            onClick={() => setMobileOpen(false)}
          >
            <Image src="/logo.png" alt="Roost logo" width={30} height={30} className="rounded-md" />
            <span className={`text-lg font-medium tracking-tight ${isProPage ? "text-[var(--pro-warm-white)]" : "text-foreground"}`}>
              {APP_NAME}
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <div
              className="relative"
              onMouseEnter={() => setProductOpen(true)}
              onMouseLeave={() => setProductOpen(false)}
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1.5 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isProPage ? "text-[var(--pro-body-text)]/70 hover:text-[var(--pro-warm-white)]" : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setProductOpen((v) => !v)}
                aria-expanded={productOpen}
              >
                Product
                <ChevronDown open={productOpen} />
              </button>

              <AnimatePresence>
                {productOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.16 }}
                    className={`absolute left-0 top-8 w-[520px] rounded-lg border p-3 shadow-[0_24px_70px_rgba(32,36,31,0.14)] ${
                      isProPage
                        ? "border-[var(--pro-border)] bg-[var(--pro-card)] shadow-[var(--pro-shadow)]"
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-1">
                      {productSections.map((section) => (
                        <Link
                          key={section.slug}
                          href={`/${section.slug}`}
                          onClick={() => setProductOpen(false)}
                          className={`rounded-md p-3 transition-colors ${isProPage ? "hover:bg-[var(--pro-bg)]" : "hover:bg-background"}`}
                        >
                          <p className={`text-sm font-medium ${isProPage ? "text-[var(--pro-warm-white)]" : "text-foreground"}`}>{section.name}</p>
                          <p className={`mt-1 text-xs leading-relaxed ${isProPage ? "text-[var(--pro-muted-text)]" : "text-muted-foreground"}`}>
                            {section.navSummary}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  isActive(href)
                    ? isProPage
                      ? "text-[var(--pro-warm-white)]"
                      : "text-foreground"
                    : isProPage
                      ? "text-[var(--pro-body-text)]/70 hover:text-[var(--pro-warm-white)]"
                      : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/account"
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              isActive("/account")
                ? isProPage
                  ? "text-[var(--pro-warm-white)]"
                  : "text-foreground"
                : isProPage
                  ? "text-[var(--pro-body-text)]/70 hover:text-[var(--pro-warm-white)]"
                  : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Account
          </Link>
          <ThemeToggle
            className={
              isProPage
                ? "border-[var(--pro-border)] bg-[var(--pro-card)] text-[var(--pro-body-text)] hover:text-[var(--pro-warm-white)]"
                : ""
            }
          />
          <motion.a
            href={DOWNLOAD_URL}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={spring}
            className={`inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
              isProPage
                ? "bg-[#E8924A] text-[#8B3A1E] focus-visible:ring-[#F5C472]/50"
                : "bg-primary text-primary-foreground"
            }`}
          >
            Download Roost
          </motion.a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle
            className={
              isProPage
                ? "border-[var(--pro-border)] bg-[var(--pro-card)] text-[var(--pro-body-text)] hover:text-[var(--pro-warm-white)]"
                : ""
            }
          />
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border ${
              isProPage
                ? "border-[var(--pro-border)] bg-[var(--pro-card)] text-[var(--pro-warm-white)]"
                : "border-border bg-card text-foreground"
            }`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="h-px w-5 bg-current shadow-[0_6px_0_currentColor,0_-6px_0_currentColor]" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={`fixed inset-0 z-50 overflow-y-auto px-6 py-5 md:hidden ${
              isProPage ? "bg-[var(--pro-bg)] text-[var(--pro-warm-white)]" : "bg-background"
            }`}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
          >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2.5"
                onClick={() => setMobileOpen(false)}
              >
                <Image src="/logo.png" alt="Roost logo" width={30} height={30} className="rounded-md" />
                <span className={`text-lg font-medium ${isProPage ? "text-[var(--pro-warm-white)]" : "text-foreground"}`}>{APP_NAME}</span>
              </Link>
              <button
                type="button"
                className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                  isProPage ? "border-[var(--pro-border)] text-[var(--pro-body-text)]" : "border-border"
                }`}
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
                  className={`block border-t py-4 ${isProPage ? "border-[var(--pro-border)]" : "border-border"}`}
                >
                  <p className={`text-xl font-medium ${isProPage ? "text-[var(--pro-warm-white)]" : "text-foreground"}`}>{section.name}</p>
                  <p className={`mt-1 text-sm ${isProPage ? "text-[var(--pro-muted-text)]" : "text-muted-foreground"}`}>{section.navSummary}</p>
                </Link>
              ))}
            </div>

            <div className="mt-8 grid gap-3">
              <Link
                href="/roost-pro"
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg border px-4 py-3 text-center font-medium ${
                  isProPage ? "border-[var(--pro-border)] text-[#E8924A]" : "border-border"
                }`}
              >
                <ProInline />
              </Link>
              <Link
                href="/pricing"
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg border px-4 py-3 text-center font-medium ${
                  isProPage ? "border-[var(--pro-border)]" : "border-border"
                }`}
              >
                Pricing
              </Link>
              <Link
                href="/changelog"
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg border px-4 py-3 text-center font-medium ${
                  isProPage ? "border-[var(--pro-border)]" : "border-border"
                }`}
              >
                Changelog
              </Link>
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg border px-4 py-3 text-center font-medium ${
                  isProPage ? "border-[var(--pro-border)]" : "border-border"
                }`}
              >
                Account
              </Link>
              <Link
                href="/download"
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-4 py-3 text-center font-medium ${
                  isProPage ? "bg-[#E8924A] text-[#8B3A1E]" : "bg-primary text-primary-foreground"
                }`}
              >
                Download Roost
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
