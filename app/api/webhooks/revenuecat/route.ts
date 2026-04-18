import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

// RevenueCat event type → Supabase subscription_status + subscription_tier
function mapEvent(eventType: string): { status: string; tier: string } | null {
  switch (eventType) {
    case "INITIAL_PURCHASE":
    case "RENEWAL":
    case "UNCANCELLATION":
      return { status: "active", tier: "nest" };
    case "TRIAL_STARTED":
      return { status: "trialing", tier: "nest" };
    case "BILLING_ISSUE":
      return { status: "past_due", tier: "nest" };
    case "CANCELLATION":
    case "EXPIRATION":
      return { status: "canceled", tier: "free" };
    default:
      return null; // no-op for unrecognised events
  }
}

export async function POST(request: NextRequest) {
  // Verify the RevenueCat webhook secret
  const authHeader = request.headers.get("authorization");
  const secret = process.env.REVENUECAT_WEBHOOK_SECRET;
  if (!secret || authHeader !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { event?: { type?: string; app_user_id?: string; expiration_at_ms?: number | null } };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event = body.event;
  if (!event?.type || !event?.app_user_id) {
    return NextResponse.json({ error: "Missing event fields" }, { status: 400 });
  }

  const mapping = mapEvent(event.type);
  if (!mapping) {
    // Unknown event type — acknowledge and ignore
    return NextResponse.json({ ok: true });
  }

  const supabase = getSupabaseAdminClient();

  // app_user_id is the Supabase user_id — find their home
  const { data: member, error: memberError } = await supabase
    .from("home_members")
    .select("home_id")
    .eq("user_id", event.app_user_id)
    .single();

  if (memberError || !member) {
    // User not found — could be a test event or a deleted account; return 200 to stop retries
    return NextResponse.json({ ok: true });
  }

  const currentPeriodEndsAt = event.expiration_at_ms
    ? new Date(event.expiration_at_ms).toISOString()
    : null;

  const updatePayload: Record<string, string | null> = {
    subscription_status: mapping.status,
    subscription_tier: mapping.tier,
  };
  if (currentPeriodEndsAt !== null) {
    updatePayload.current_period_ends_at = currentPeriodEndsAt;
  }

  const { error: updateError } = await supabase
    .from("homes")
    .update(updatePayload)
    .eq("id", member.home_id);

  if (updateError) {
    console.error("RevenueCat webhook: failed to update home", updateError);
    return NextResponse.json({ error: "Database update failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
