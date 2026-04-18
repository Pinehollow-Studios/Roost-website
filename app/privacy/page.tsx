import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy — Roost",
    description:
        "Privacy policy for the Roost website, macOS app, and mobile app.",
    openGraph: {
        title: "Privacy Policy — Roost",
        description:
            "Privacy policy for the Roost website, macOS app, and mobile app.",
        type: "website",
        siteName: "Roost",
    },
    twitter: {
        card: "summary_large_image",
        title: "Privacy Policy — Roost",
        description:
            "Privacy policy for the Roost website, macOS app, and mobile app.",
    },
};

const thirdParties = [
    {
        party: "Supabase",
        purpose: "Database and authentication",
        location: "US (EU/UK data stored under SCCs)",
        href: "https://supabase.com/privacy",
        label: "supabase.com/privacy",
    },
    {
        party: "Anthropic",
        purpose: "AI text processing (Hazel)",
        location: "US",
        href: "https://www.anthropic.com/privacy",
        label: "anthropic.com/privacy",
    },
    {
        party: "Google",
        purpose: "Sign in with Google (if used)",
        location: "US / EU",
        href: "https://policies.google.com/privacy",
        label: "policies.google.com/privacy",
    },
];

const retentionRows = [
    ["Account and household data", "For as long as your account is active"],
    ["Activity feed entries", "Rolling 90 days"],
    ["Preferences and settings", "For as long as your account is active"],
    [
        "Data sent to Anthropic (Hazel)",
        "Not retained by Anthropic beyond the API request",
    ],
];

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="border-t border-border pt-8 first:border-t-0 first:pt-0">
            <h2 className="text-2xl font-medium tracking-tight text-foreground">{title}</h2>
            <div className="mt-4 space-y-4 text-[15px] leading-7 text-muted-foreground">
                {children}
            </div>
        </section>
    );
}

function DataBlock({
    heading,
    what,
    why,
    basis,
}: {
    heading: string;
    what: React.ReactNode;
    why: React.ReactNode;
    basis: React.ReactNode;
}) {
    return (
        <div className="rounded-xl border border-border bg-card px-5 py-4">
            <h3 className="text-base font-medium text-foreground">{heading}</h3>
            <div className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                <p>
                    <strong className="text-foreground">What:</strong> {what}
                </p>
                <p>
                    <strong className="text-foreground">Why:</strong> {why}
                </p>
                <p>
                    <strong className="text-foreground">Legal basis:</strong> {basis}
                </p>
            </div>
        </div>
    );
}

export default function PrivacyPage() {
    return (
        <main className="px-6 py-20 sm:py-24">
            <div className="mx-auto max-w-4xl">
                <div className="mb-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <span aria-hidden="true">←</span>
                        Back to Roost
                    </Link>
                </div>

                <header className="mb-12 space-y-4">
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                        Legal
                    </p>
                    <h1 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
                        Privacy Policy
                    </h1>
                    <div className="space-y-2 text-base text-muted-foreground">
                        <p>
                            <strong className="text-foreground">Roost</strong> is developed and
                            operated by <strong className="text-foreground">Pinehollow Studios</strong>.
                        </p>
                        <p>
                            This policy applies to the <strong className="text-foreground">Roost website</strong>,
                            the <strong className="text-foreground">Roost macOS app</strong>, and the
                            <strong className="text-foreground"> Roost mobile app</strong>.
                        </p>
                        <p>
                            <strong className="text-foreground">Last updated:</strong> 26 March 2026
                        </p>
                        <p>
                            <strong className="text-foreground">Contact:</strong>{" "}
                            <a
                                className="text-primary underline decoration-primary/30 underline-offset-4"
                                href="mailto:support@pinehollow.studio"
                            >
                                support@pinehollow.studio
                            </a>
                        </p>
                    </div>
                </header>

                <div className="space-y-10">
                    <Section title="Who we are">
                        <p>
                            Roost is a shared household app for couples, built by Pinehollow Studios. For
                            the purposes of UK and EU data protection law, Pinehollow Studios is the
                            <strong className="text-foreground"> data controller</strong> — meaning we decide
                            what personal data is collected and why.
                        </p>
                        <p>
                            If you have any questions about this policy or how we handle your data,
                            email us at{" "}
                            <a
                                className="text-primary underline decoration-primary/30 underline-offset-4"
                                href="mailto:support@pinehollow.studio"
                            >
                                support@pinehollow.studio
                            </a>
                            .
                        </p>
                    </Section>

                    <Section title="What data we collect and why">
                        <div className="space-y-4">
                            <DataBlock
                                heading="Account information"
                                what="Your email address, name, and, if you sign in with Google, your Google profile name and profile picture URL."
                                why="To create and identify your account, and to let your partner see who you are in the app."
                                basis="Performance of contract — this data is necessary to provide the service."
                            />
                            <DataBlock
                                heading="Profile data"
                                what="The display name and avatar (colour and icon) you choose within the app."
                                why="To personalise your experience and help your partner identify you throughout the app."
                                basis="Performance of contract."
                            />
                            <DataBlock
                                heading="Household content"
                                what="Everything you and your partner create inside the app — shopping list items, expense records and amounts, chore names and descriptions, budget limits, calendar events, activity feed entries, and notes."
                                why="To provide the core features of Roost: a shared, real-time view of your household."
                                basis="Performance of contract."
                            />
                            <DataBlock
                                heading="Preferences and settings"
                                what="Your notification preferences, display preferences (week start day, time format, date format, currency), and theme choice."
                                why="To remember your settings between sessions."
                                basis="Performance of contract."
                            />
                            <DataBlock
                                heading="Technical data"
                                what="Basic information about how you use the app and website, for example when you log in, when a sync event occurs, or when you open Roost invite links. We do not use analytics tools, advertising trackers, or crash reporting services."
                                why="To keep the service working correctly and deliver website functionality such as invite links and downloads."
                                basis="Legitimate interests — maintaining a functioning service."
                            />
                        </div>
                    </Section>

                    <Section title="How we use AI (Hazel)">
                        <p>
                            Roost includes an AI assistant called <strong className="text-foreground">Hazel</strong>
                            that silently tidies up text you enter — for example, normalising a
                            shopping item name or categorising an expense. To do this, short text
                            snippets are sent to <strong className="text-foreground">Anthropic&apos;s Claude API</strong>.
                        </p>
                        <ul className="list-disc space-y-2 pl-5">
                            <li>
                                <strong className="text-foreground">What is sent:</strong> Only the text of the
                                specific item being processed, for example “2x oat milk” or “Uber to airport”.
                                No account information, names, or other personal details are attached.
                            </li>
                            <li>
                                <strong className="text-foreground">Who receives it:</strong> Anthropic, PBC — a US
                                company. See “International transfers” below.
                            </li>
                            <li>
                                <strong className="text-foreground">Anthropic&apos;s data use:</strong> Anthropic does not
                                use API inputs to train its models.
                            </li>
                            <li>
                                <strong className="text-foreground">Legal basis:</strong> Legitimate interests — Hazel
                                provides a meaningful improvement to the experience and processes only the
                                minimum text necessary.
                            </li>
                        </ul>
                        <p>
                            You can read Anthropic&apos;s privacy policy at{" "}
                            <a
                                className="text-primary underline decoration-primary/30 underline-offset-4"
                                href="https://www.anthropic.com/privacy"
                                target="_blank"
                                rel="noreferrer"
                            >
                                anthropic.com/privacy
                            </a>
                            .
                        </p>
                    </Section>

                    <Section title="Third parties we work with">
                        <div className="overflow-x-auto rounded-xl border border-border bg-card">
                            <table className="min-w-full border-collapse text-left text-sm">
                                <thead className="bg-muted/50 text-foreground">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Party</th>
                                        <th className="px-4 py-3 font-medium">Purpose</th>
                                        <th className="px-4 py-3 font-medium">Location</th>
                                        <th className="px-4 py-3 font-medium">Privacy policy</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {thirdParties.map((row) => (
                                        <tr key={row.party} className="border-t border-border align-top">
                                            <td className="px-4 py-3 text-foreground">{row.party}</td>
                                            <td className="px-4 py-3">{row.purpose}</td>
                                            <td className="px-4 py-3">{row.location}</td>
                                            <td className="px-4 py-3">
                                                <a
                                                    className="text-primary underline decoration-primary/30 underline-offset-4"
                                                    href={row.href}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {row.label}
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p>
                            We do not sell your data to anyone. We do not share your data with
                            advertisers. The parties listed above are <strong className="text-foreground">processors</strong>
                            — they handle data only as instructed by us to provide their specific service.
                        </p>
                    </Section>

                    <Section title="International transfers">
                        <p>
                            Supabase and Anthropic are based in the United States. Transferring
                            personal data from the UK or EU to the US requires appropriate safeguards
                            under UK GDPR and EU GDPR. Both Supabase and Anthropic operate under
                            <strong className="text-foreground"> Standard Contractual Clauses (SCCs)</strong>,
                            which are the approved legal mechanism for these transfers.
                        </p>
                    </Section>

                    <Section title="How long we keep your data">
                        <div className="overflow-x-auto rounded-xl border border-border bg-card">
                            <table className="min-w-full border-collapse text-left text-sm">
                                <thead className="bg-muted/50 text-foreground">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Data</th>
                                        <th className="px-4 py-3 font-medium">Retention</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {retentionRows.map(([data, retention]) => (
                                        <tr key={data} className="border-t border-border align-top">
                                            <td className="px-4 py-3 text-foreground">{data}</td>
                                            <td className="px-4 py-3">{retention}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p>
                            If you delete your account, all of your personal data is permanently
                            deleted from our database within 30 days, except where we are required
                            by law to retain it.
                        </p>
                    </Section>

                    <Section title="Your rights">
                        <p>Under UK GDPR and EU GDPR, you have the following rights:</p>
                        <ul className="list-disc space-y-2 pl-5">
                            <li>
                                <strong className="text-foreground">Access</strong> — request a copy of the
                                personal data we hold about you
                            </li>
                            <li>
                                <strong className="text-foreground">Rectification</strong> — ask us to correct
                                inaccurate data
                            </li>
                            <li>
                                <strong className="text-foreground">Erasure</strong> — ask us to delete your data
                                (“right to be forgotten”)
                            </li>
                            <li>
                                <strong className="text-foreground">Portability</strong> — receive your data in a
                                structured, machine-readable format
                            </li>
                            <li>
                                <strong className="text-foreground">Restriction</strong> — ask us to pause
                                processing of your data in certain circumstances
                            </li>
                            <li>
                                <strong className="text-foreground">Objection</strong> — object to processing based
                                on legitimate interests
                            </li>
                        </ul>
                        <p>
                            Most of these rights can be exercised directly within the app
                            (Settings → Account). For anything else, email us at{" "}
                            <a
                                className="text-primary underline decoration-primary/30 underline-offset-4"
                                href="mailto:support@pinehollow.studio"
                            >
                                support@pinehollow.studio
                            </a>
                            , and we will respond within 30 days.
                        </p>
                        <p>
                            <strong className="text-foreground">UK residents:</strong> You also have the right to
                            lodge a complaint with the <strong className="text-foreground">Information Commissioner&apos;s Office (ICO)</strong>
                            at{" "}
                            <a
                                className="text-primary underline decoration-primary/30 underline-offset-4"
                                href="https://ico.org.uk"
                                target="_blank"
                                rel="noreferrer"
                            >
                                ico.org.uk
                            </a>
                            .
                        </p>
                        <p>
                            <strong className="text-foreground">EU residents:</strong> You may lodge a complaint
                            with the data protection authority in your country of residence.
                        </p>
                    </Section>

                    <Section title="Children">
                        <p>
                            Roost is not directed at children under 16. We do not knowingly collect
                            personal data from anyone under 16. If you believe a child has provided
                            us with personal data, please contact us and we will delete it.
                        </p>
                    </Section>

                    <Section title="Changes to this policy">
                        <p>
                            If we make material changes to this policy, we will update the “Last
                            updated” date above and notify users via the app or website where
                            appropriate. Continued use of Roost after a change constitutes acceptance
                            of the updated policy.
                        </p>
                    </Section>

                    <Section title="Website-specific notes">
                        <p>
                            The Roost website is mainly a marketing site and invite-link landing
                            experience. Based on the current codebase, it does not include analytics,
                            advertising trackers, cookies for profiling, or embedded third-party ad
                            tools.
                        </p>
                        <p>
                            The website can process limited technical data necessary to serve pages,
                            handle downloads, and open invite links into the app. If you add cookies,
                            analytics, contact forms, newsletters, or additional third-party embeds in
                            future, this policy should be updated to reflect that.
                        </p>
                    </Section>

                    <Section title="Contact">
                        <p className="text-foreground">
                            <strong>Pinehollow Studios</strong>
                            <br />
                            <a
                                className="text-primary underline decoration-primary/30 underline-offset-4"
                                href="mailto:support@pinehollow.studio"
                            >
                                support@pinehollow.studio
                            </a>
                        </p>
                    </Section>
                </div>
            </div>
        </main>
    );
}