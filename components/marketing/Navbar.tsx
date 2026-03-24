"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { APP_NAME, DOWNLOAD_URL } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-background/85 border-b border-border"
          : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-lg font-medium text-foreground tracking-tight select-none">
          {APP_NAME}
        </span>

        <motion.a
          href={DOWNLOAD_URL}
          whileHover={{
            scale: 1.06,
            boxShadow: "0 8px 28px rgba(212, 121, 94, 0.35)",
          }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                     bg-primary text-primary-foreground text-sm font-medium
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download
        </motion.a>
      </div>
    </nav>
  );
}
