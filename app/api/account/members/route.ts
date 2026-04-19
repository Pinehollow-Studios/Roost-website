import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  // Verify the user is authenticated via their session cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll() {
          // Read-only — no need to propagate cookie updates here
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Use the admin client to bypass RLS and read all members in the user's home
  const admin = getSupabaseAdminClient();

  const { data: membership } = await admin
    .from("home_members")
    .select("home_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!membership?.home_id) {
    return NextResponse.json({ members: [] });
  }

  const { data: members } = await admin
    .from("home_members")
    .select("id,user_id,display_name,role,created_at")
    .eq("home_id", membership.home_id)
    .order("created_at", { ascending: true });

  return NextResponse.json({ members: members ?? [] });
}
