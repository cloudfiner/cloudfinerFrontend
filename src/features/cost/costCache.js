// src/services/cost/costCache.js

const cache = new Map();

const CACHE_TTL = 2 * 60 * 1000; // 2 min

export const getCache = (key) => {
  const item = cache.get(key);

  if (!item) return null;

  if (Date.now() - item.time > CACHE_TTL) {
    cache.delete(key);
    return null;
  }

  return item.data;
};

export const setCache = (key, data) => {
  cache.set(key, {
    data,
    time: Date.now(),
  });
};