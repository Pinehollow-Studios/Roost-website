import { remark } from "remark";
import html from "remark-html";

const GITHUB_API_BASE = "https://api.github.com/repos/Pinehollow-Studios/Roost/releases";
const RELEASE_REVALIDATE_SECONDS = 3600;
const FALLBACK_DMG_URL =
  "/download";

type GitHubAsset = {
  name: string;
  size: number;
  browser_download_url: string;
};

type GitHubReleaseApi = {
  tag_name: string;
  name: string;
  body: string | null | undefined;
  published_at: string;
  html_url: string;
  draft: boolean;
  prerelease: boolean;
  assets?: GitHubAsset[];
};

export type ReleaseEntry = {
  tagName: string;
  name: string;
  body: string;
  bodyHtml: string;
  bodyRenderMode: "html" | "pre" | "empty";
  publishedAt: string;
  publishedLabel: string;
  htmlUrl: string;
  assets: GitHubAsset[];
};

export type LatestDownloadRelease = {
  tagName: string;
  publishedAt: string;
  publishedLabel: string;
  downloadUrl: string;
  fileSizeLabel: string | null;
};

function getGitHubHeaders() {
  const token = process.env.GITHUB_TOKEN;

  return {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function markdownToHtml(markdown: string) {
  const processed = await remark().use(html).process(markdown);
  return processed.toString();
}

function normaliseBody(body: string | null | undefined) {
  return typeof body === "string" ? body : "";
}

function formatPublishedDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatFileSize(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return null;
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

async function fetchGitHubJson<T>(url: string) {
  const response = await fetch(url, {
    headers: getGitHubHeaders(),
    next: { revalidate: RELEASE_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

function mapReleaseBase(release: GitHubReleaseApi) {
  const body = normaliseBody(release.body);

  return {
    tagName: release.tag_name,
    name: release.name,
    body,
    publishedAt: release.published_at,
    publishedLabel: formatPublishedDate(release.published_at),
    htmlUrl: release.html_url,
    assets: release.assets ?? [],
  };
}

export async function getPublicReleases(): Promise<ReleaseEntry[]> {
  const releases = await fetchGitHubJson<GitHubReleaseApi[]>(GITHUB_API_BASE);

  const published = releases.filter(
    (release) => !release.draft && !release.prerelease,
  );

  return Promise.all(
    published.map(async (release) => {
      const base = mapReleaseBase(release);

      if (process.env.NODE_ENV === "development") {
        console.log(
          `[changelog] ${release.tag_name} body type=${typeof release.body} preview=${JSON.stringify(
            base.body.slice(0, 100),
          )}`,
        );
      }

      if (base.body.trim() === "") {
        return {
          ...base,
          bodyHtml: "",
          bodyRenderMode: "empty" as const,
        };
      }

      try {
        const bodyHtml = await markdownToHtml(base.body);

        return {
          ...base,
          bodyHtml,
          bodyRenderMode: bodyHtml.trim() ? ("html" as const) : ("empty" as const),
        };
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.log(
            `[changelog] ${release.tag_name} markdown render failed, falling back to plain text`,
            error,
          );
        }

        return {
          ...base,
          bodyHtml: `<pre>${base.body
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")}</pre>`,
          bodyRenderMode: "pre" as const,
        };
      }
    }),
  );
}

export async function getLatestDownloadRelease(): Promise<LatestDownloadRelease> {
  const release = await fetchGitHubJson<GitHubReleaseApi>(
    `${GITHUB_API_BASE}/latest`,
  );

  const dmgAsset = (release.assets ?? []).find((asset) =>
    asset.name.endsWith(".dmg"),
  );

  return {
    tagName: release.tag_name,
    publishedAt: release.published_at,
    publishedLabel: formatPublishedDate(release.published_at),
    downloadUrl: dmgAsset?.browser_download_url ?? FALLBACK_DMG_URL,
    fileSizeLabel: dmgAsset ? formatFileSize(dmgAsset.size) : null,
  };
}

export { FALLBACK_DMG_URL, RELEASE_REVALIDATE_SECONDS };