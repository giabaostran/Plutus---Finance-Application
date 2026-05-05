export const NAV_ITEMS = [
  { id: "dashboard", icon: "⬛", label: "Dashboard", section: "Overview" },
  { id: "transactions", icon: "⇄", label: "Transactions", section: "Finance", badge: "24" },
  { id: "assets", icon: "◈", label: "Assets", section: "Finance" },
  { id: "goals", icon: "◎", label: "Goals", section: "Finance" },
  { id: "intelligence", icon: "✦", label: "Intelligence", section: "Insights" },
];

export const PAGE_TITLES = {
  dashboard: "Dashboard",
  transactions: "Transactions",
  assets: "Assets",
  goals: "Goals",
  intelligence: "Intelligence",
};

export const CATEGORY_STYLES = {
  housing: { ico: "🏠", bg: "rgba(100,130,255,0.12)" },
  income: { ico: "💼", bg: "rgba(34,160,107,0.12)" },
  groceries: { ico: "🛒", bg: "rgba(232,84,26,0.12)" },
  investment: { ico: "◈", bg: "rgba(196,125,26,0.12)" },
  software: { ico: "☁", bg: "rgba(160,100,255,0.12)" },
  transfer: { ico: "✖", bg: "rgba(209,64,64,0.12)" },
  transport: { ico: "🚗", bg: "rgba(100,130,255,0.12)" },
  entertainment: { ico: "🎬", bg: "rgba(232,84,26,0.12)" },
  health: { ico: "🏋", bg: "rgba(160,100,255,0.12)" },
  default: { ico: "💰", bg: "rgba(150,150,150,0.12)" },
};

export const BUDGET_CATEGORY_STYLES = {
  housing: { bg: "var(--red)" },
  groceries: { bg: "var(--accent)" },
  transport: { bg: "var(--green)" },
  entertainment: { bg: "var(--red)" },
  software: { bg: "var(--accent)" },
  health: { bg: "var(--green)" },
};
