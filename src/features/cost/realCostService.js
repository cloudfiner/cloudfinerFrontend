// src/services/cost/realCostService.js

import api from "@/lib/api";
import { normalizeCostResponse } from "./costNormalizer";

// =========================
// CONSTANTS
// =========================
const BASE_URL = "/api/cost/real";
const TIMEOUT = 30000;
const MAX_RETRIES = 2;

// =========================
// LOGGER
// =========================
const log = {
  info: (...args) => console.log("[REAL COST][INFO]", ...args),
  warn: (...args) => console.warn("[REAL COST][WARN]", ...args),
  error: (...args) => console.error("[REAL COST][ERROR]", ...args),
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
export const getRealCost = async ({
  token,
  currency = "INR",
  days = 7,
}) => {
  if (!token) {
    throw new Error("Unauthorized: Token missing");
  }

  if (!currency) {
    throw new Error("Currency is required");
  }

  if (!days || days <= 0) {
    throw new Error("Days must be greater than 0");
  }

  try {
    log.info("Fetching real cost", { currency, days });

    const response = await withRetry(() =>
      api.get(BASE_URL, {
        params: { currency, days },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: TIMEOUT,
      })
    );

    const payload = response?.data?.data ?? response?.data;

    const normalized = normalizeCostResponse(payload);

    log.info("Real cost fetched successfully");

    return normalized;

  } catch (error) {

    if (error.response) {
      const status = error.response.status;

      if (status === 401 || status === 403) {
        log.error("Unauthorized or session expired");
        throw new Error("Session expired. Please login again.");
      }

      if (status >= 500) {
        log.error("Server error", error.response.data);
        throw new Error("Server error while fetching cost data.");
      }

      log.error("API error", error.response.data);
      throw new Error("Failed to fetch cost data.");
    }

    if (error.request) {
      log.error("Network error: no response");
      throw new Error("Network error. Please check your connection.");
    }

    log.error("Unexpected error", error.message);
    throw error;
  }
};