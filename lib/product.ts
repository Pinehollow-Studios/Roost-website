export type ProductSection = {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  summary: string;
  navSummary: string;
  primaryTakeaway: string;
  detail: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  visual: "money" | "shopping" | "chores" | "calendar" | "pinboard" | "home" | "hazel";
  color: string;
};

export const productSections: ProductSection[] = [
  {
    slug: "money",
    name: "Money",
    eyebrow: "Household budgeting",
    headline: "Plan the month before it plans you.",
    summary:
      "Roost turns shared spending into a monthly budget with income, fixed costs, lifestyle envelopes, goals, and settle-up in one place.",
    navSummary: "Budgeting, spending, goals, and settle-up.",
    primaryTakeaway:
      "Money is now the centre of Roost: a shared budget that stays tied to the way your household actually spends.",
    detail:
      "Set combined income, split fixed costs, create lifestyle budgets, spread annual costs monthly, roll unused allowance forward, and see where the month is heading before it gets away from you.",
    highlights: [
      "Monthly money overview with income, spent, remaining, and projected surplus",
      "Fixed costs, lifestyle budgets, annual costs, ownership, and split percentages",
      "Savings goals linked back into the household budget",
      "Spending categories come from your budget, not a detached list",
      "Privacy controls for individual income and household totals",
      "Settle-up balances for shared expenses",
    ],
    metrics: [
      { label: "Budget lines", value: "Fixed + lifestyle" },
      { label: "Planning", value: "Monthly + annual" },
      { label: "Privacy", value: "Personal income controls" },
    ],
    visual: "money",
    color: "#d4795e",
  },
  {
    slug: "shopping",
    name: "Shopping",
    eyebrow: "Shared lists",
    headline: "The list updates before anyone asks.",
    summary:
      "A live household shopping list with categories, progress, next-shop planning, and Hazel cleanup as you add items.",
    navSummary: "Live list, categories, and next-shop planning.",
    primaryTakeaway:
      "Both people see the same list, the same progress, and the same plan for the next shop.",
    detail:
      "Add items from either device, check them off in the aisle, clear completed items, and keep the next shop visible from the home dashboard.",
    highlights: [
      "Realtime list shared across Mac and iOS",
      "Grouped by category for faster shopping",
      "Next-shop date and progress view",
      "Hazel normalises item names and categories",
      "Activity feed keeps household changes visible",
    ],
    metrics: [
      { label: "Sync", value: "Realtime" },
      { label: "Planning", value: "Next shop" },
      { label: "Cleanup", value: "Hazel" },
    ],
    visual: "shopping",
    color: "#7fa087",
  },
  {
    slug: "chores",
    name: "Chores",
    eyebrow: "Household tasks",
    headline: "Clear ownership without the conversation.",
    summary:
      "Assign chores, set due dates, repeat the jobs that come back, and keep rooms, history, and streaks organised.",
    navSummary: "Assignments, rooms, recurrence, and history.",
    primaryTakeaway:
      "Roost makes household work visible without turning it into a negotiation.",
    detail:
      "Track what is yours, what is theirs, what is overdue, and what happens again next week or next month.",
    highlights: [
      "Assign chores to either person or leave them shared",
      "Due dates, rooms, filters, and grouped views",
      "Recurring chores with completion history and streaks",
      "Hazel can tidy titles and suggest household jobs",
      "Changes appear in the household activity feed",
    ],
    metrics: [
      { label: "Views", value: "Mine + shared" },
      { label: "Cadence", value: "One-off + recurring" },
      { label: "Context", value: "Rooms" },
    ],
    visual: "chores",
    color: "#e6a563",
  },
  {
    slug: "calendar",
    name: "Calendar",
    eyebrow: "Shared schedule",
    headline: "Bills, chores, and shopping dates in one household view.",
    summary:
      "Roost brings practical household dates together so the week is easier to scan and harder to miss.",
    navSummary: "Chores, bills, expenses, and shopping dates.",
    primaryTakeaway:
      "The calendar is for the dates that keep a home moving, not another place to duplicate your life.",
    detail:
      "See upcoming chores, bill dates, spending events, and the next shop alongside overdue items and what is coming next.",
    highlights: [
      "Upcoming chores and overdue work",
      "Bills and recurring household costs",
      "Next shopping date alongside the rest of the week",
      "Apple Calendar subscription support where available",
      "Realtime updates from household changes",
    ],
    metrics: [
      { label: "Events", value: "Chores + bills" },
      { label: "Window", value: "Month view" },
      { label: "Export", value: "Calendar sync" },
    ],
    visual: "calendar",
    color: "#7a9199",
  },
  {
    slug: "pinboard",
    name: "Pinboard",
    eyebrow: "Shared notes",
    headline: "A place for the things that should not vanish in chat.",
    summary:
      "Pin notes, reminders, links, and household messages with targeting, expiry, acknowledgements, and app context.",
    navSummary: "Notes, reminders, expiry, and acknowledgements.",
    primaryTakeaway:
      "Pinboard keeps small household details visible until both people have dealt with them.",
    detail:
      "Send a note to yourself, your partner, or everyone in the home, add an expiry date, and mark it noted when it has landed.",
    highlights: [
      "Target notes to yourself, your partner, or everyone",
      "Expiry dates for time-sensitive reminders",
      "Acknowledgements show what has been seen",
      "Link notes to rooms, chores, shopping, budgets, or calendar items",
      "Realtime unseen counts and activity",
    ],
    metrics: [
      { label: "Audience", value: "Self + partner" },
      { label: "State", value: "Seen + unseen" },
      { label: "Links", value: "App context" },
    ],
    visual: "pinboard",
    color: "#b88b7e",
  },
  {
    slug: "home",
    name: "Home",
    eyebrow: "Household briefing",
    headline: "Open Roost and know what needs attention.",
    summary:
      "The home view pulls money, shopping, chores, and activity into a focused briefing for the household.",
    navSummary: "Dashboard, activity, and household briefing.",
    primaryTakeaway:
      "Home gives both people the same read on the household without digging through every section.",
    detail:
      "See budget status, next actions, shopping progress, chore pressure, recent activity, and the practical next move.",
    highlights: [
      "Money status at a glance",
      "Next shopping and chore actions",
      "Shared household activity feed",
      "Realtime updates from both devices",
      "Designed for quick daily check-ins",
    ],
    metrics: [
      { label: "Briefing", value: "Daily" },
      { label: "Scope", value: "Whole home" },
      { label: "Sync", value: "Live" },
    ],
    visual: "home",
    color: "#9db19f",
  },
  {
    slug: "hazel",
    name: "Hazel",
    eyebrow: "Quiet AI help",
    headline: "AI that tidies the work, not the conversation.",
    summary:
      "Hazel helps clean up shopping items, chores, expense categories, and budget insights without becoming another chat window.",
    navSummary: "AI cleanup, categorisation, and insight.",
    primaryTakeaway:
      "Hazel sits in the background and improves the household data you already add to Roost.",
    detail:
      "Use Hazel to normalise shopping items, tidy chore titles, categorise expenses against your real budget, and surface money patterns for Roost Pro households.",
    highlights: [
      "Shopping item cleanup while you build the list",
      "Chore title cleanup and household suggestions",
      "Expense categorisation against your budget lines",
      "Budget insights for Roost Pro households",
      "Handled through Roost’s backend with clear privacy wording",
    ],
    metrics: [
      { label: "Mode", value: "Background" },
      { label: "Scope", value: "Money + home" },
      { label: "Plan", value: "Pro depth" },
    ],
    visual: "hazel",
    color: "#d4795e",
  },
];

export const sectionBySlug = Object.fromEntries(
  productSections.map((section) => [section.slug, section]),
) as Record<string, ProductSection>;

export const proFeatures = [
  "Full spending history and month-to-month budget trends",
  "Advanced budgeting with rollovers, annual costs, and planning depth",
  "Hazel expense categorisation and budget insight",
  "Recurring chore depth, streaks, and richer household history",
  "Apple Calendar sync where available",
  "One subscription for the household",
];

export const freeFeatures = [
  "Shared shopping, chores, calendar, pinboard, and activity",
  "Current budgeting and spending basics",
  "Realtime sync across the household",
  "Manual expense logging and settle-up",
  "Hazel cleanup for everyday household inputs",
];
