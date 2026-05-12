// src/services/cost/demoCostService.js

import api from "@/lib/api";
import { normalizeCostResponse } from "./costNormalizer";

// =========================
// CONSTANTS
// =========================
const BASE_URL = "/api/cost/demo";
const TIMEOUT = 30000;
const MAX_RETRIES = 2;

// =========================
// LOGGER
// =========================
const log = {
  info: (...args) => console.log("[DEMO COST][INFO]", ...args),
  warn: (...args) => console.warn("[DEMO COST][WARN]", ...args),
  error: (...args) => console.error("[DEMO COST][ERROR]", ...args),
};

// =========================
// RETRY HELPER
// =========================
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const withRetry = async (fn) => {
  let attempt = 0;

  while (attempt <= MAX_RETRIES) {
    try {
      return await fn();
    } catch (err) {
      const isNetworkError = !err.response;

      if (!isNetworkError || attempt === MAX_RETRIES) {
        throw err;
      }

      log.warn(`Retrying... attempt ${attempt + 1}`);
      await sleep(2000 * (attempt + 1));
      attempt++;
    }
  }
};

// =========================
// MAIN API
// =========================
export const getDemoCost = async ({
  currency = "INR",
  days = 7,
}) => {

  if (!currency) {
    throw new Error("Currency is required");
  }

  if (!days || days <= 0) {
    throw new Error("Days must be greater than 0");
  }

  try {
    log.info("Fetching demo cost", { currency, days });

    const response = await withRetry(() =>
      api.get(BASE_URL, {
        params: { currency, days },
        timeout: TIMEOUT,
      })
    );

    const payload = response?.data?.data ?? response?.data;

    const normalized = normalizeCostResponse(payload);

    log.info("Demo cost fetched successfully");

    return normalized;

  } catch (error) {

    if (error.response) {
      const status = error.response.status;

      if (status >= 500) {
        log.error("Server error", error.response.data);
        throw new Error("Server error while fetching demo data.");
      }

      log.error("API error", error.response.data);
      throw new Error("Failed to fetch demo data.");
    }

    if (error.request) {
      log.error("Network error: no response");
      throw new Error("Network error. Please check your connection.");
    }

    log.error("Unexpected error", error.message);
    throw error;
  }
};