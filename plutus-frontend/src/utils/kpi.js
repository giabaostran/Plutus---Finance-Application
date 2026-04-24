export function getPoints(data) {
  const step = 120 / (data.length - 1);

  const line = data.map((val, i) => `${i * step},${val}`).join(" ");

  const area = `${line} 120,36 0,36`;

  return { line, area };
}

export function calculateMonthlyStats(transactions) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const monthlyData = {};

  for (const transaction of transactions) {
    const date = new Date(transaction.date * 1000);
    const monthIndex = date.getMonth(); // 0-11
    const year = date.getFullYear();
    const monthLabel = `${monthNames[monthIndex]} ${year}`;

    // Initialize the month object if it doesn't exist
    if (!monthlyData[monthLabel]) {
      monthlyData[monthLabel] = { income: 0, expense: 0 };
    }

    if (transaction.amount > 0) {
      monthlyData[monthLabel].income += transaction.amount;
    } else {
      // Use Math.abs to keep expenses as positive numbers for easier UI display
      monthlyData[monthLabel].expense += Math.abs(transaction.amount);
    }
  }

  return monthlyData;
}
