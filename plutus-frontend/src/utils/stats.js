export function buildDashboardPayload(transactions) {
  const now = Date.now();

  const monthlyStats = {
    net: [],
    income: [],
    expense: [],
    savingRate: [],
    netWorth: [],
  };

  let currentMonth = null;
  let net = 0;
  let inc = 0;
  let exp = 0;

  // ---- GROUP BY MONTH ----
  for (const tx of transactions) {
    if (tx.date > now) continue;
    if (tx.status !== "completed") continue;

    const d = new Date(tx.date);
    const monthKey = d.getFullYear() * 12 + d.getMonth();

    if (currentMonth !== null && monthKey !== currentMonth) {
      monthlyStats.net.push(net);
      monthlyStats.income.push(inc);
      monthlyStats.expense.push(exp);
      monthlyStats.savingRate.push(inc > 0 ? net / inc : 0);

      net = 0;
      inc = 0;
      exp = 0;
    }

    currentMonth = monthKey;

    net += tx.amount;
    if (tx.amount > 0) inc += tx.amount;
    else exp += tx.amount; // stays negative
  }

  // push last month
  if (currentMonth !== null) {
    monthlyStats.net.push(net);
    monthlyStats.income.push(inc);
    monthlyStats.expense.push(exp);
    monthlyStats.savingRate.push(inc > 0 ? net / inc : 0);
  }

  // ---- CUMULATIVE NET WORTH ----
  let running = 0;
  for (const n of monthlyStats.net) {
    running += n;
    monthlyStats.netWorth.push(running);
  }

  // ---- KPI HELPERS ----
  const last = (arr) => arr[arr.length - 1] ?? 0;
  const prev = (arr) => arr[arr.length - 2] ?? 0;

  const percentChange = (curr, prevVal) =>
    prevVal !== 0 ? (curr - prevVal) / Math.abs(prevVal) : 0;

  // ---- KPIs ----
  const kpis = {
    netWorth: {
      value: last(monthlyStats.netWorth),
      change: percentChange(
        last(monthlyStats.netWorth),
        prev(monthlyStats.netWorth),
      ),
    },
    income: {
      value: last(monthlyStats.income),
      change: percentChange(
        last(monthlyStats.income),
        prev(monthlyStats.income),
      ),
    },
    expense: {
      value: Math.abs(last(monthlyStats.expense)),
      change: percentChange(
        last(monthlyStats.expense),
        prev(monthlyStats.expense),
      ),
    },
    savingRate: {
      value: last(monthlyStats.savingRate),
      change: last(monthlyStats.savingRate) - prev(monthlyStats.savingRate), // percentage points
    },
  };

  return {
    transactions,
    monthlyStats,
    kpis,
  };
}
