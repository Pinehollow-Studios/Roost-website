"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const storageKey = "roost-theme";

function getCurrentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem(storageKey, theme);
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 3.6a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M8 1v1.2M8 13.8V15M15 8h-1.2M2.2 8H1M12.95 3.05l-.85.85M3.9 12.1l-.85.85M12.95 12.95l-.85-.85M3.9 3.9l-.85-.85"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M13.4 10.35A5.74 5.74 0 0 1 5.65 2.6a6.13 6.13 0 1 0 7.75 7.75Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getCurrentTheme());
    setMounted(true);
  }, []);

  const nextTheme: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${nextTheme} mode` : "Toggle theme"}
      title={mounted ? `Switch to ${nextTheme} mode` : "Toggle theme"}
      onClick={() => {
        applyTheme(nextTheme);
        setTheme(nextTheme);
      }}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${className}`}
    >
      <span className="sr-only">{mounted ? `Switch to ${nextTheme} mode` : "Toggle theme"}</span>
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
