"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import MarketingShell from "@/components/marketing/MarketingShell";
import { fetchAccountData, type AccountData } from "@/lib/account";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser";

const accountLinks = [
  { href: "/account", label: "Overview" },
  { href: "/account/billing", label: "Billing" },
  { href: "/account/profile", label: "Profile" },
  { href: "/account/household", label: "Household" },
];

export default function AccountShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro: React.ReactNode;
  children: (data: AccountData, reload: () => Promise<void>) => React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [data, setData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const account = await fetchAccountData(supabase);
    if (!account) {
      router.replace(`/auth/login?next=${encodeURIComponent(pathname)}`);
      return;
    }
    setData(account);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <MarketingShell>
      <section className="px-6 pt-28 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Account</p>
              <h1 className="mt-4 text-4xl font-medium tracking-tight text-foreground sm:text-5xl">{title}</h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>
            </div>
            <button
              type="button"
              onClick={signOut}
              className="self-start rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted md:self-auto"
            >
              Sign out
            </button>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[220px_1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="grid gap-2">
                {accountLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </aside>

            <div>
              {loading || !data ? (
                <div className="rounded-lg border border-border bg-card p-6 text-muted-foreground">
                  Loading account...
                </div>
              ) : (
                children(data, load)
              )}
            </div>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
