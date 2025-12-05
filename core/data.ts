import { PilgrimType } from "./types";
import { Bell, Menu, Plus, CircleCheck, Wallet, Coins, Crown } from 'lucide-react';


export const years = [2025, 2026, 2027, 2028];

export const monthsByYear: Record<number, string[]> = {
  2025: ["Dec 2024", "Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025"],
  2026: ["Jan 2026", "Feb 2026", "Mar 2026"],
  2027: ["Jan 2027", "Feb 2027"],
  2028: ["Jan 2028"],
};

export const durations = [
  { days: 7, label: "7 Days", icon:'/assets/svgs/watch.svg' },
  { days: 14, label: "14 Days", popular: true, icon:'/assets/svgs/star.svg' },
  { days: 21, label: "21 Days", icon:'/assets/svgs/premium.svg' },
];
export const pilgrimTypes = [
  { label: 'Adults', sub: "12+ years", value: PilgrimType.ADULT },
  { label: 'Children', sub: "2-11 years", value: PilgrimType.CHILDREN },
  { label: 'Infant', sub: "Below 2 years", value: PilgrimType.INFANT },
];
// src/data/budget.ts

// ───────────────────────────────────────────
// PLAN TABS
// ───────────────────────────────────────────
export const PLAN_TABS = [
  { label: "Saver", icon: Wallet},
  { label: "Economy", icon: Coins, popular: true },
  { label: "Premium", icon: Crown }
];


// ───────────────────────────────────────────
// BUDGET SUMMARY DATA
// ───────────────────────────────────────────
export const BUDGET_SUMMARY = (budget: number) => [
  {
    heading: "Total Budget",
        value: `PKR ${budget.toLocaleString()}`,
    sup: `(Monthly 12mo)`,
    sub: `~ ${Math.round(budget / 12).toLocaleString()} `
  }
];


// ───────────────────────────────────────────
// PROGRESS BAR DATA
// ───────────────────────────────────────────
export const PROGRESS_DATA = (progress: number) => [
  {
    label: "Progress",
    value: progress
  }
];


// ───────────────────────────────────────────
// MIN / MAX RANGE
// ───────────────────────────────────────────
export const RANGE_LIMITS = [
  { label: "Min", value: "PKR 150K" },
  { label: "Max", value: "10 Lacs+" }
];


// ───────────────────────────────────────────
// NOTES
// ───────────────────────────────────────────
export const BUDGET_NOTES = [
  {
    text: "Note: Based on current market rates, packages for your criteria start from",
    highlight: "PKR 1,343,434"
  }
];

