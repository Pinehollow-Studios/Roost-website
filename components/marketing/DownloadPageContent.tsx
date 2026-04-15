"use client";

import Link from "next/link";
import MarketingShell from "@/components/marketing/MarketingShell";

const installSteps = [
  ["01", "Download the Mac app", "Open the latest Roost.dmg from your Downloads folder."],
  ["02", "Move Roost to Applications", "Drag Roost into Applications so it is installed like the rest of your Mac apps."],
  ["03", "Open Roost", "If macOS asks, right-click Roost and choose Open the first time."],
  ["04", "Create or join your home", "Set up your household or join with an invite code. Your data syncs with iOS beta."],
] as const;

export default function DownloadPageContent({
  versionLine,
  downloadUrl,
}: {
  versionLine: string | null;
  downloadUrl: string;
}) {
  return (
    <MarketingShell>
      <section className="px-6 pt-32 pb-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Download</p>
            <h1 className="mt-5 text-5xl font-medium leading-tight tracking-tight text-foreground sm:text-6xl">
              Start Roost on your Mac.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              The Mac app is available now. iOS is in beta for Roost households using the same shared home and budget.
            </p>
            {versionLine ? <p className="mt-4 text-sm text-muted-foreground">{versionLine}</p> : null}
            <a
              href={downloadUrl}
              download
              className="mt-8 inline-flex rounded-lg bg-primary px-7 py-3.5 font-medium text-primary-foreground"
            >
              Download for Mac
            </a>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">Requirements</p>
            <div className="mt-5 divide-y divide-border">
              {["macOS 13 Ventura or later", "Apple Silicon and Intel", "Free to download", "Automatic updates after install"].map((item) => (
                <p key={item} className="py-4 text-lg font-medium text-foreground">{item}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="ios-beta" className="bg-muted px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">iOS beta</p>
            <h2 className="mt-4 text-4xl font-medium tracking-tight text-foreground">Roost is also on iPhone in beta.</h2>
          </div>
          <div className="rounded-lg bg-background p-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              iOS uses the same Roost household as the Mac app: Money, shopping, chores, calendar, pinboard, Hazel, and account settings all work against the same shared data. Public App Store distribution is not presented here yet.
            </p>
            <p className="mt-5 text-sm text-muted-foreground">
              For beta access, use the invite route shared with your household or contact Roost support from the app.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-medium tracking-tight text-foreground">Install Roost</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {installSteps.map(([number, title, copy]) => (
              <div key={number} className="rounded-lg border border-border bg-card p-5">
                <span className="text-sm font-medium text-primary">{number}</span>
                <h3 className="mt-4 text-xl font-medium text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            Looking for release notes?{" "}
            <Link href="/changelog" className="font-medium text-foreground underline decoration-border underline-offset-4 hover:text-primary">
              View the changelog
            </Link>
            .
          </p>
        </div>
      </section>
    </MarketingShell>
  );
}
