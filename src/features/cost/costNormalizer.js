// src/services/cost/costNormalizer.js

// =========================
// SAFE NUMBER
// =========================
export const toNumber = (val) => {
  const num = Number(val);
  return isNaN(num) ? 0 : num;
};

// =========================
// DEFAULT INSIGHTS
// =========================
export const getDefaultInsights = () => [
  {
    title: "No Insights Available",
    description: "Connect your AWS account to view real cost insights.",
    severity: "info",
  },
];

// =========================
// NORMALIZE RESPONSE
// =========================
export const normalizeCostResponse = (payload) => {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid API payload");
  }

  return {
    totalCost: toNumber(payload.totalCost),
    percentageChange: toNumber(payload.percentageChange),
    potentialSavings: toNumber(payload.potentialSavings),
    monthlyBudget: toNumber(payload.monthlyBudget),

    dailyData: Array.isArray(payload.dailyData)
      ? payload.dailyData
      : [],

    insights: Array.isArray(payload.insights)
      ? payload.insights
      : getDefaultInsights(),
  };
};