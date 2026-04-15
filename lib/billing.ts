"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "@/lib/supabase/browser";

export type BillingPlan = "monthly" | "annual";

export type StripePrice = {
  id: string;
  unitAmount: number;
  currency: string;
  interval: string;
  formattedAmount: string;
  trialDays: number;
};

export type StripePrices = {
  monthly: StripePrice;
  annual: StripePrice;
};

export const fallbackPrices: StripePrices = {
  monthly: {
    id: "monthly",
    unitAmount: 499,
    currency: "GBP",
    interval: "month",
    formattedAmount: "£4.99",
    trialDays: 14,
  },
  annual: {
    id: "annual",
    unitAmount: 3999,
    currency: "GBP",
    interval: "year",
    formattedAmount: "£39.99",
    trialDays: 14,
  },
};

async function getAccessToken(supabase: SupabaseClient) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.access_token ?? null;
}

export async function fetchStripePrices(): Promise<StripePrices> {
  try {
    const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();
    const response = await fetch(`${supabaseUrl}/functions/v1/stripe-prices`, {
      headers: { apikey: supabaseAnonKey },
    });
    if (!response.ok) return fallbackPrices;
    const data = (await response.json()) as Partial<StripePrices>;
    return {
      monthly: { ...fallbackPrices.monthly, ...data.monthly },
      annual: { ...fallbackPrices.annual, ...data.annual },
    };
  } catch {
    return fallbackPrices;
  }
}

async function callBillingFunction(
  supabase: SupabaseClient,
  name: "stripe-checkout" | "stripe-portal",
  body: Record<string, unknown>,
) {
  const token = await getAccessToken(supabase);
  if (!token) throw new Error("You need to sign in before managing billing.");

  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();
  const response = await fetch(`${supabaseUrl}/functions/v1/${name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      apikey: supabaseAnonKey,
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
  if (!response.ok || !data.url) {
    throw new Error(data.error ?? "Stripe did not return a billing URL.");
  }

  return data.url;
}

export async function createCheckoutSession(
  supabase: SupabaseClient,
  payload: { plan: BillingPlan; homeId: string; customerEmail: string; returnUrl: string },
) {
  return callBillingFunction(supabase, "stripe-checkout", {
    plan: payload.plan,
    homeId: payload.homeId,
    customerEmail: payload.customerEmail,
    returnUrl: payload.returnUrl,
  });
}

export async function createPortalSession(
  supabase: SupabaseClient,
  payload: { homeId: string; returnUrl: string },
) {
  return callBillingFunction(supabase, "stripe-portal", {
    homeId: payload.homeId,
    returnUrl: payload.returnUrl,
  });
}
