import Link from "next/link";

export default function SetupRequired() {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">Setup required</p>
      <h2 className="mt-3 text-2xl font-medium text-foreground">Finish your household setup in Roost.</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        Your website account exists, but it is not connected to a Roost household yet. Create or join a home in the app, then come back here to manage billing.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href="/download" className="rounded-lg bg-primary px-5 py-3 text-center font-medium text-primary-foreground">
          Download for Mac
        </Link>
        <Link href="/download#ios" className="rounded-lg border border-border px-5 py-3 text-center font-medium text-foreground">
          iOS — Coming May
        </Link>
      </div>
    </div>
  );
}
