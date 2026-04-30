/** -----------------------------
 * Sparkline Generator
 * ----------------------------- */
export function getPoints(data) {
  if (!data.length) return { line: "", area: "" };

  const max = Math.max(...data);
  const min = Math.min(...data);

  const normalize = (val) => {
    if (max === min) return 18;
    return 36 - ((val - min) / (max - min)) * 36;
  };

  const step = 120 / (data.length - 1 || 1);

  const line = data.map((val, i) => `${i * step},${normalize(val)}`).join(" ");
  const area = `${line} 120,36 0,36`;

  return { line, area };
}

export function formatKpi(kpis, monthlyStats) {
  return [
    {
      label: "Net Worth",
      value: `$${kpis.netWorth.value.toLocaleString()}`,
      delta: `${(kpis.netWorth.change * 100).toFixed(1)}%`,
      trend: kpis.netWorth.change >= 0 ? "up" : "down",
      type: kpis.netWorth.change >= 0 ? "green" : "red",
      data: monthlyStats.netWorth,
      icon: "💼",
      color: "blue",
    },
    {
      label: "Monthly Income",
      value: `$${kpis.income.value.toLocaleString()}`,
      delta: `${(kpis.income.change * 100).toFixed(1)}%`,
      trend: kpis.income.change >= 0 ? "up" : "down",
      type: kpis.income.change >= 0 ? "green" : "red",
      data: monthlyStats.income,
      icon: "↑",
      color: "green",
    },
    {
      label: "Total Expenses",
      value: `$${kpis.expense.value.toLocaleString()}`,
      delta: `${(kpis.expense.change * 100).toFixed(1)}%`,
      trend: kpis.expense.change >= 0 ? "down" : "up", // real direction
      type: kpis.expense.change < 0 ? "green" : "red", // GOOD when decreasing
      data: monthlyStats.expense.map(Math.abs),
      icon: "↓",
      color: "orange",
    },
    {
      label: "Savings Rate",
      value: `${(kpis.savingRate.value * 100).toFixed(1)}%`,
      delta: `${(kpis.savingRate.change * 100).toFixed(1)}pp`,
      trend: kpis.savingRate.change >= 0 ? "up" : "down",
      type: kpis.savingRate.change >= 0 ? "green" : "red",
      data: monthlyStats.savingRate,
      icon: "◈",
      color: "purple",
    },
  ];
}
