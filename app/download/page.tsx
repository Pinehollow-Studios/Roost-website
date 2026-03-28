import type { Metadata } from "next";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import { getLatestDownloadRelease, FALLBACK_DMG_URL } from "@/lib/github";

export const metadata: Metadata = {
  title: "Download — Roost",
  description: "Download Roost for Mac. Free, and always up to date.",
  openGraph: {
    title: "Download — Roost",
    description: "Download Roost for Mac. Free, and always up to date.",
    type: "website",
    siteName: "Roost",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download — Roost",
    description: "Download Roost for Mac. Free, and always up to date.",
  },
};

const installSteps = [
  {
    number: "01",
    title: "Open the downloaded file",
    description:
      "Double-click Roost.dmg to open the installer. Drag Roost to your Applications folder.",
  },
  {
    number: "02",
    title: "Allow it to open",
    description:
      "On first launch macOS may ask you to confirm you want to open Roost. Click Open. This is a standard macOS security check for apps downloaded outside the App Store.",
  },
  {
    number: "03",
    title: "Create your home",
    description:
      "Sign up, give your home a name, and you’ll get an invite code to share with your partner.",
  },
  {
    number: "04",
    title: "Invite your partner",
    description:
      "Your partner downloads Roost on their Mac and joins with your invite code. Everything syncs from that moment on.",
  },
];

export default async function DownloadPage() {
  let release: Awaited<ReturnType<typeof getLatestDownloadRelease>> | null = null;

  try {
    release = await getLatestDownloadRelease();
  } catch {
    release = null;
  }

  const versionLabel = release?.tagName ?? "latest";
  const dateLabel = release?.publishedLabel ?? "recently";
  const downloadUrl = release?.downloadUrl ?? FALLBACK_DMG_URL;
  const fileMeta = release?.fileSizeLabel
    ? `macOS 13 Ventura and above · Apple Silicon and Intel · ${release.fileSizeLabel}`
    : "macOS 13 Ventura and above · Apple Silicon and Intel";

  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden px-6 pt-32 pb-20 sm:pt-36 sm:pb-24" aria-labelledby="download-heading">
          <div
            className="pointer-events-none absolute inset-0 flex items-start justify-center"
            aria-hidden="true"
          >
            <div className="h-[420px] w-[680px] rounded-full bg-primary/[0.07] blur-[100px]" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            <p className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-muted-foreground mb-8">
              <span className="w-6 h-px bg-primary/50 inline-block" />
              Download
              <span className="w-6 h-px bg-primary/50 inline-block" />
            </p>

            <h1
              id="download-heading"
              className="text-5xl sm:text-6xl lg:text-7xl font-medium text-foreground leading-[1.1] tracking-tight text-balance"
            >
              Download Roost
            </h1>

            <p className="mt-6 text-sm sm:text-base text-muted-foreground">
              Version {versionLabel} · Released {dateLabel}
            </p>

            <div className="mt-10 flex flex-col items-center gap-4">
              <a
                href={downloadUrl}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{ boxShadow: "0 4px 20px rgba(212, 121, 94, 0.25)" }}
              >
                Download for Mac
              </a>

              <p className="text-sm text-muted-foreground/80">{fileMeta}</p>
              <p className="text-sm text-muted-foreground text-balance">
                Roost updates itself automatically after the first install.
              </p>
            </div>
          </div>
        </section>

        <section className="py-28 px-6" aria-labelledby="getting-started-heading">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-16">
              <div className="w-1.5 h-7 bg-primary rounded-full" aria-hidden="true" />
              <h2
                id="getting-started-heading"
                className="text-3xl sm:text-4xl font-medium text-foreground tracking-tight"
              >
                Getting started
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 lg:gap-12">
              {installSteps.map((step) => (
                <div key={step.number} className="relative flex flex-col gap-5">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-medium text-primary tabular-nums">
                      {step.number}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground text-lg leading-snug">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-28 px-6" aria-labelledby="requirements-heading">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-1.5 h-7 bg-primary rounded-full" aria-hidden="true" />
              <h2
                id="requirements-heading"
                className="text-3xl sm:text-4xl font-medium text-foreground tracking-tight"
              >
                System requirements
              </h2>
            </div>

            <ul className="space-y-3 text-lg text-muted-foreground leading-relaxed">
              <li>macOS 13 Ventura or later</li>
              <li>Apple Silicon or Intel Mac</li>
              <li>An internet connection for real-time sync</li>
            </ul>
          </div>
        </section>

        <section className="px-6 pb-20" aria-label="Older versions">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm text-muted-foreground">
              Looking for an older version?{" "}
              <a
                href="/changelog"
                className="underline decoration-border underline-offset-4 transition-colors hover:text-primary"
              >
                All releases →
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}