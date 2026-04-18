import type { Metadata } from "next";
import DownloadPageContent from "@/components/marketing/DownloadPageContent";

export const metadata: Metadata = {
  title: "Download — Roost",
  description:
    "Download Roost for Mac. iOS is officially in beta and launching on the App Store in May.",
};

interface GitHubAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

interface GitHubRelease {
  tag_name: string;
  published_at: string;
  assets: GitHubAsset[];
}

const FALLBACK_DMG_URL =
  "https://github.com/tomslater1/Roost/releases/latest/download/Roost.dmg";

function formatPublishedDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function getLatestRelease() {
  try {
    const response = await fetch(
      "https://api.github.com/repos/tomslater1/Roost/releases/latest",
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      return {
        tagName: null,
        publishedAt: null,
        downloadUrl: FALLBACK_DMG_URL,
      };
    }

    const release = (await response.json()) as GitHubRelease;
    const dmgAsset = release.assets.find((asset) => asset.name.includes(".dmg"));

    return {
      tagName: release.tag_name || null,
      publishedAt: release.published_at || null,
      downloadUrl: dmgAsset?.browser_download_url ?? FALLBACK_DMG_URL,
    };
  } catch {
    return {
      tagName: null,
      publishedAt: null,
      downloadUrl: FALLBACK_DMG_URL,
    };
  }
}

export default async function DownloadPage() {
  const release = await getLatestRelease();
  const publishedLabel = release.publishedAt
    ? formatPublishedDate(release.publishedAt)
    : null;
  const versionLine =
    release.tagName && publishedLabel
      ? `Version ${release.tagName} · Released ${publishedLabel}`
      : null;
  const downloadUrl = release.downloadUrl;

  return <DownloadPageContent versionLine={versionLine} downloadUrl={downloadUrl} />;
}
