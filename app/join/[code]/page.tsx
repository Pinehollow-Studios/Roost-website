import type { Metadata } from "next";
import InvitePage from "./InvitePage";

type Props = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  return {
    title: "You've been invited to Roost",
    description:
      "Your partner has invited you to join their Roost household — shared shopping, expenses, chores, and calendar, syncing in real time across both your devices.",
    openGraph: {
      title: "You've been invited to Roost",
      description:
        "Your partner has invited you to join their Roost household — shared shopping, expenses, chores, and calendar, syncing in real time.",
      type: "website",
      siteName: "Roost",
    },
    twitter: {
      card: "summary_large_image",
      title: "You've been invited to Roost",
      description:
        "Your partner has invited you to join their Roost household — shared shopping, expenses, chores, and calendar.",
    },
    robots: { index: false },
  };
}

export default async function JoinPage({ params }: Props) {
  const { code } = await params;
  // Sanitise: uppercase alphanumeric only, max 16 chars
  const safeCode = code.replace(/[^A-Z0-9]/gi, "").toUpperCase().slice(0, 16);

  return <InvitePage code={safeCode} />;
}
