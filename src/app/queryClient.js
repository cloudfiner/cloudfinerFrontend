// src/app/queryClient.js

// src/app/queryClient.js

import { QueryClient } from "@tanstack/react-query";

// =========================
// QUERY CLIENT
// =========================
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {

      // =========================
      // CACHING STRATEGY
      // =========================
      staleTime: 2 * 60 * 1000,   // 2 min data fresh रहेगा
      gcTime: 5 * 60 * 1000,      // cache memory retention

      // =========================
      // NETWORK BEHAVIOR
      // =========================
      retry: 2,                   // network retry
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 5000),

      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: false,     // unnecessary reload avoid

      // =========================
      // UX BEHAVIOR
      // =========================
      networkMode: "online",     // default safe mode

      // =========================
      // ERROR HANDLING
      // =========================
      throwOnError: false,
    },

    mutations: {
      retry: 1,
      networkMode: "online",
    },
  },
});