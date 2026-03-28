import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "https://api.github.com/repos/tomslater1/Roost/releases",
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 0 },
    },
  );

  const data = await response.json();

  const simplified = data.map((r: any) => ({
    tag: r.tag_name,
    draft: r.draft,
    prerelease: r.prerelease,
    bodyType: typeof r.body,
    bodyLength: r.body?.length ?? 0,
    bodyPreview: r.body?.slice(0, 200) ?? null,
  }));

  return NextResponse.json(simplified);
}