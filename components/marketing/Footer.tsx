import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";

const productLinks = [
  { href: "/money", label: "Money" },
  { href: "/shopping", label: "Shopping" },
  { href: "/chores", label: "Chores" },
  { href: "/calendar", label: "Calendar" },
  { href: "/pinboard", label: "Pinboard" },
  { href: "/hazel", label: "Hazel" },
];

const companyLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/download", label: "Download" },
  { href: "/account", label: "Account" },
  { href: "/privacy", label: "Privacy Policy" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-16" role="contentinfo">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="Roost logo" width={28} height={28} className="rounded-md" />
              <span className="text-base font-medium tracking-tight text-foreground">{APP_NAME}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              One shared app for couples. Money, shopping, chores, calendars, and notes — all in
              sync across both devices.
            </p>
            <p className="mt-6 text-xs text-muted-foreground">
              Household data, billing, and AI are handled by Roost's trusted service providers.
            </p>
          </div>

          {/* Product */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Product
            </p>
            <ul className="space-y-3">
              {productLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Company
            </p>
            <ul className="space-y-3">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {year} {APP_NAME} · Pinehollow Studios
          </p>
          <p className="text-xs text-muted-foreground">Built for couples. Made with care.</p>
        </div>
      </div>
    </footer>
  );
}
