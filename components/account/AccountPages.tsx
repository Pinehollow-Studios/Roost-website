"use client";

import Link from "next/link";
import AccountShell from "@/components/account/AccountShell";
import BillingPanel from "@/components/account/BillingPanel";
import SetupRequired from "@/components/account/SetupRequired";
import { isProHome, subscriptionLabel } from "@/lib/account";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-border py-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-medium text-foreground">{value}</p>
    </div>
  );
}

export function AccountOverviewPage() {
  return (
    <AccountShell
      title="Account overview"
      intro="Check your household, plan, and setup status. Editing still happens inside Roost."
    >
      {(data) => (
        <div className="space-y-6">
          {!data.home ? <SetupRequired /> : null}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-card p-5">
              <p className="text-sm text-muted-foreground">Signed in as</p>
              <p className="mt-2 text-xl font-medium text-foreground">{data.user.email ?? "Roost user"}</p>
            </div>
            <div className="rounded-lg bg-card p-5">
              <p className="text-sm text-muted-foreground">Household</p>
              <p className="mt-2 text-xl font-medium text-foreground">{data.home?.name ?? "Not set up"}</p>
            </div>
            <div className="rounded-lg bg-card p-5">
              <p className="text-sm text-muted-foreground">Plan</p>
              <p className="mt-2 text-xl font-medium text-foreground">{subscriptionLabel(data.home)}</p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-2xl font-medium text-foreground">Next actions</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link href="/account/billing" className="rounded-lg border border-border bg-background p-4 font-medium hover:bg-muted">
                Manage billing
              </Link>
              <Link href="/download" className="rounded-lg border border-border bg-background p-4 font-medium hover:bg-muted">
                Open app downloads
              </Link>
            </div>
          </div>
        </div>
      )}
    </AccountShell>
  );
}

export function AccountBillingPage() {
  return (
    <AccountShell
      title="Billing"
      intro="View your Roost Pro status and open Stripe for checkout, invoices, payment details, plan changes, or cancellation."
    >
      {(data, reload) => <BillingPanel data={data} reload={reload} />}
    </AccountShell>
  );
}

export function AccountProfilePage() {
  return (
    <AccountShell
      title="Profile"
      intro="Your website profile is read-only for v1. Change personal details from the Roost app."
    >
      {(data) => (
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-2xl font-medium text-foreground">Profile details</h2>
          <div className="mt-5">
            <InfoRow label="Email" value={data.user.email ?? "Unknown"} />
            <InfoRow label="User ID" value={data.user.id} />
            <InfoRow label="Provider" value={data.user.app_metadata?.provider ?? "email"} />
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Password, email, display name, and account deletion controls remain in the Roost app.
          </p>
        </div>
      )}
    </AccountShell>
  );
}

export function AccountHouseholdPage() {
  return (
    <AccountShell
      title="Household"
      intro="View the household attached to this account. Household edits and invite management stay in Roost."
    >
      {(data) => {
        if (!data.home) return <SetupRequired />;
        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-2xl font-medium text-foreground">{data.home.name ?? "Roost household"}</h2>
              <p className="mt-2 text-muted-foreground">
                {isProHome(data.home) ? "Roost Pro is active for this household." : "This household is on Roost Free."}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-xl font-medium text-foreground">Members</h3>
              <div className="mt-5 divide-y divide-border">
                {data.members.map((member) => (
                  <div key={member.id} className="py-4">
                    <p className="font-medium text-foreground">{member.display_name ?? "Roost member"}</p>
                    <p className="text-sm text-muted-foreground">{member.role ?? "Member"}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }}
    </AccountShell>
  );
}
