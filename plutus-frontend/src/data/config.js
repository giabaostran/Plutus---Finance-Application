

export const THEMES = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "Retro", value: "retro" },
  { label: "Luxury", value: "luxury" },
  { label: "Sci-fi", value: "scifi" }
];

export const NAVIGATION = [
  {
    section: "Overview",
    items: [
      { title: "Dashboard", path: "/", icon: "dashboard" },
      { title: "Analytics", path: "/analytics", icon: "analytics" },
      { title: "Portfolio", path: "/portfolio", icon: "portfolio" }
    ]
  },
  {
    section: "Finance",
    items: [
      { title: "Transactions", path: "/transactions", icon: "transactions" },
      { title: "Budgets", path: "/budgets", icon: "budgets" },
      { title: "Investments", path: "/investments", icon: "investments" }
    ]
  },
  {
    section: "Account",
    items: [
      { title: "Reports", path: "/reports", icon: "reports" },
      { title: "Settings", path: "/settings", icon: "settings" }
    ]
  }
];