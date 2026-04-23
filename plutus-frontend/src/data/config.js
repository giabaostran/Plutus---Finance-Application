export const THEMES = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "Retro", value: "retro" },
  { label: "Luxury", value: "luxury" },
  { label: "Sci-fi", value: "scifi" },
];

export const NAVIGATION = [
  {
    section: "Overview",
    items: [
      { title: "Dashboard", path: "/", icon: "▤" },
      { title: "Analytics", path: "/analytics", icon: "◈" },
      { title: "Portfolio", path: "/portfolio", icon: "◎" },
    ],
  },
  {
    section: "Finance",
    items: [
      { title: "Transactions", path: "/transactions", icon: "⇄" },
      { title: "Budgets", path: "/budgets", icon: "◐" },
      { title: "Investments", path: "/investments", icon: "⬡" },
    ],
  },
  {
    section: "Account",
    items: [
      { title: "Reports", path: "/reports", icon: "◻" },
      { title: "Settings", path: "/settings", icon: "⊙" },
    ],
  },
];
