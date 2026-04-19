"use client";

import type { SupabaseClient, User } from "@supabase/supabase-js";

export type AccountHome = {
  id: string;
  name: string | null;
  subscription_status: string | null;
  subscription_tier: string | null;
  trial_ends_at: string | null;
  current_period_ends_at: string | null;
  stripe_customer_id: string | null;
  stripe_price_id: string | null;
};

export type AccountMember = {
  id: string;
  user_id: string | null;
  display_name: string | null;
  role: string | null;
  joined_at: string | null;
};

export type AccountData = {
  user: User;
  home: AccountHome | null;
  members: AccountMember[];
};

export function isProHome(home: AccountHome | null) {
  if (!home) return false;
  const status = (home.subscription_status ?? "free").toLowerCase();
  const tier = (home.subscription_tier ?? "free").toLowerCase();
  return tier === "nest" && ["active", "trialing", "lifetime"].includes(status);
}

export function subscriptionLabel(home: AccountHome | null) {
  if (!home) return "Setup required";
  const status = (home.subscription_status ?? "free").toLowerCase();
  if (status === "trialing") return "Roost Pro trial";
  if (status === "active") return "Roost Pro";
  if (status === "lifetime") return "Roost Pro lifetime";
  if (status === "past_due") return "Billing attention needed";
  if (status === "canceled" || status === "cancelled") return "Roost Free";
  if (status === "incomplete") return "Subscription incomplete";
  return "Roost Free";
}

export async function fetchAccountData(supabase: SupabaseClient): Promise<AccountData | null> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return null;

  const { data: membership } = await supabase
    .from("home_members")
    .select("home_id")
    .eq("user_id", user.id)
    .maybeSingle();

  const homeId = (membership as { home_id?: string } | null)?.home_id;
  if (!homeId) return { user, home: null, members: [] };

  const [{ data: home }, membersRes] = await Promise.all([
    supabase
      .from("homes")
      .select(
        "id,name,subscription_status,subscription_tier,trial_ends_at,current_period_ends_at,stripe_customer_id,stripe_price_id",
      )
      .eq("id", homeId)
      .maybeSingle(),
    fetch("/api/account/members").then((r) => r.json()).catch(() => ({ members: [] })),
  ]);

  return {
    user,
    home: (home as AccountHome | null) ?? null,
    members: (membersRes.members as AccountMember[] | null) ?? [],
  };
}
