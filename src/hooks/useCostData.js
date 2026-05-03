// src/hooks/useCostData.js

import { useQuery } from "@tanstack/react-query";
import { getDemoCost } from "@/features/cost/demoCostService";
import { getRealCost } from "@/features/cost/realCostService";
import { useAuth } from "@/context/AuthContext";

// =========================
// CONSTANTS
// =========================
const DEFAULT_CURRENCY = "INR";
const DEFAULT_DAYS = 30;

// =========================
// HOOK
// =========================
export const useCostData = (currency, days) => {

  const { token } = useAuth();
  const isDemo = !token;

  const safeCurrency = currency || DEFAULT_CURRENCY;
  const safeDays = days && days > 0 ? days : DEFAULT_DAYS;

  return useQuery({

    // =========================
    // QUERY KEY (stable & scalable)
    // =========================
    queryKey: ["cost", safeCurrency, safeDays, isDemo],

    // =========================
    // QUERY FUNCTION
    // =========================
    queryFn: async () => {
      if (isDemo) {
        return getDemoCost({
          currency: safeCurrency,
          days: safeDays,
        });
      }

      return getRealCost({
        token,
        currency: safeCurrency,
        days: safeDays,
      });
    },

    // =========================
    // EXECUTION CONTROL
    // =========================
    enabled: !!safeCurrency && !!safeDays,

    // =========================
    // UX OPTIMIZATION
    // =========================

    // previous data maintain
    keepPreviousData: true,

    // avoid blank screen (critical)
    placeholderData: (previousData) => previousData ?? {
      totalCost: 0,
      percentageChange: 0,
      potentialSavings: 0,
      monthlyBudget: 0,
      dailyData: [],
      insights: [],
    },

    // =========================
    // PERFORMANCE
    // =========================
    staleTime: 2 * 60 * 1000,   // 2 min fresh
    gcTime: 5 * 60 * 1000,      // cache retention

    // =========================
    // NETWORK BEHAVIOR
    // =========================
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,

    // =========================
    // OPTIONAL: LOGGING (debug)
    // =========================
    onError: (error) => {
      console.error("Cost query failed:", error.message);
    },
  });
};