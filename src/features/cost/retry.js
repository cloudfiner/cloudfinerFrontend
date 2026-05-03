// src/services/utils/retry.js

export const withRetry = async (fn, retries = 2) => {
  let attempt = 0;

  while (attempt <= retries) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((res) => setTimeout(res, 500 * (attempt + 1)));
      attempt++;
    }
  }
};