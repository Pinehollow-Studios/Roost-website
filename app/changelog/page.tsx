import type { Metadata } from "next";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import { getPublicReleases } from "@/lib/github";

export const metadata: Metadata = {
  title: "Changelog — Roost",
  description: "Every update to Roost, as it happens.",
  openGraph: {
    title: "Changelog — Roost",
    description: "Every update to Roost, as it happens.",
    type: "website",
    siteName: "Roost",
  },
  twitter: {
    card: "summary_large_image",
    title: "Changelog — Roost",
    description: "Every update to Roost, as it happens.",
  },
};

export default async function ChangelogPage() {
  try {
    const releases = await getPublicReleases();

    return (
      <>
        <Navbar />
        <main>
          <section className="px-6 pt-32 pb-20 sm:pt-36 sm:pb-24" aria-labelledby="changelog-heading">
            <div className="max-w-4xl mx-auto text-center">
              <p className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-muted-foreground mb-8">
                <span className="w-6 h-px bg-primary/50 inline-block" />
                Changelog
                <span className="w-6 h-px bg-primary/50 inline-block" />
              </p>
              <h1
                id="changelog-heading"
                className="text-5xl sm:text-6xl lg:text-7xl font-medium text-foreground leading-[1.1] tracking-tight text-balance"
              >
                What&apos;s new
              </h1>
              <p className="mt-7 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
                Every update to Roost, as it happens.
              </p>
            </div>
          </section>

          <section className="px-6 pb-28" aria-label="Release history">
            <div className="max-w-6xl mx-auto">
              {releases.length === 0 ? (
                <div className="max-w-2xl py-10 text-lg text-muted-foreground leading-relaxed">
                  Nothing here yet. The first release is coming soon.
                </div>
              ) : (
                <div className="space-y-14">
                  {releases.map((release) => (
                    <article
                      key={release.tagName + release.publishedAt}
                      className="border-t border-border pt-10 first:border-t-0 first:pt-0"
                    >
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10">
                        <div className="space-y-2 md:pt-1">
                          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                            {release.tagName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {release.publishedLabel}
                          </p>
                        </div>

                        <div>
                          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                            {release.name}
                          </h2>

                          {release.bodyHtml.trim() ? (
                            <div
                              className="prose mt-6 max-w-none"
                              dangerouslySetInnerHTML={{ __html: release.bodyHtml }}
                            />
                          ) : null}

                          <a
                            href={release.htmlUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
                          >
                            View on GitHub
                            <span aria-hidden="true">→</span>
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  } catch {
    return (
      <>
        <Navbar />
        <main>
          <section className="px-6 pt-32 pb-20 sm:pt-36 sm:pb-24" aria-labelledby="changelog-heading">
            <div className="max-w-4xl mx-auto text-center">
              <p className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-muted-foreground mb-8">
                <span className="w-6 h-px bg-primary/50 inline-block" />
                Changelog
                <span className="w-6 h-px bg-primary/50 inline-block" />
              </p>
              <h1
                id="changelog-heading"
                className="text-5xl sm:text-6xl lg:text-7xl font-medium text-foreground leading-[1.1] tracking-tight text-balance"
              >
                What&apos;s new
              </h1>
              <p className="mt-7 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-balance">
                Every update to Roost, as it happens.
              </p>
            </div>
          </section>

          <section className="px-6 pb-28" aria-label="Changelog unavailable">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-lg text-muted-foreground leading-relaxed text-balance">
                We couldn&apos;t load the changelog just now. The updates are still on
                GitHub — this page should be back shortly.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}