export const formatAmount = (amount) => {
  return `${amount > 0 ? "+" : ""}$${Math.abs(amount).toLocaleString()}`;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
};

export const getAmountClass = (amount) => {
  if (amount > 0) return "amount-pos";
  if (amount < 0) return "amount-neg";
  return "amount-neu";
};
