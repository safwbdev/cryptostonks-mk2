import {
  type ApiCoin,
  type ApiCoinDetail,
  type ApiHistoryPoint,
  type ApiStats,
  type Coin,
  type CoinDetail,
  type HistoryPoint,
  type GlobalStats,
  normaliseCoin,
  normaliseCoinDetail,
  normaliseHistory,
} from "../types/api";

// Config
const BASE_URL = import.meta.env.VITE_BASE_URL as string | undefined;
const API_HOST = import.meta.env.VITE_API_HOST as string | undefined;
const API_KEY = import.meta.env.VITE_COINRANKING_KEY as string | undefined;

// In-memory cache
// Keyed by URL string → { data, expiresAt }
// Prevents duplicate requests when multiple components mount simultaneously.

interface CacheEntry<T> {
  data: T;
  expiresAt: number; // Date.now() + ttl
}

const cache = new Map<string, CacheEntry<unknown>>();

// In-flight request deduplication — if two components call the same URL
// at the same time, they share a single fetch promise instead of firing two.
const inFlight = new Map<string, Promise<unknown>>();

function getCached<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) { cache.delete(key); return null; }
  return entry.data;
}

function setCached<T>(key: string, data: T, ttlMs: number) {
  cache.set(key, { data, expiresAt: Date.now() + ttlMs });
}

// Retry with exponential backoff
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxAttempts = 3
): Promise<Response> {
  let attempt = 0;
  while (true) {
    const res = await fetch(url, options);

    // Success
    if (res.ok) return res;

    // 429 Too Many Requests — respect Retry-After or back off exponentially
    if (res.status === 429) {
      attempt++;
      if (attempt >= maxAttempts) {
        throw new Error(
          "Rate limit exceeded (429). Please add a CoinRanking API key in your .env file " +
          "or wait a moment before refreshing."
        );
      }
      const retryAfter = res.headers.get("Retry-After");
      const waitMs = retryAfter
        ? parseInt(retryAfter) * 1000
        : Math.min(1000 * 2 ** attempt, 30_000); // 2s, 4s, 8s … max 30s
      console.warn(`[API] 429 rate limit — retrying in ${waitMs / 1000}s (attempt ${attempt}/${maxAttempts})`);
      await new Promise((r) => setTimeout(r, waitMs));
      continue;
    }

    // Other HTTP error — don't retry
    const text = await res.text().catch(() => "");
    throw new Error(`CoinRanking API ${res.status}: ${text || res.statusText}`);
  }
}

// Core request (with cache + dedup + retry)

async function request<T>(
  path: string,
  params?: Record<string, string | number>,
  ttlMs = 60_000   // default: cache for 60 seconds
): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) =>
      url.searchParams.set(k, String(v))
    );
  }
  const urlStr = url.toString();

  // 1. Return from cache if still fresh
  const hit = getCached<T>(urlStr);
  if (hit !== null) return hit;

  // 2. Deduplicate in-flight requests for the same URL
  if (inFlight.has(urlStr)) {
    return inFlight.get(urlStr) as Promise<T>;
  }

  // 3. Fire the actual request
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (API_KEY && API_HOST) {
    headers["x-rapidapi-host"] = API_HOST;
    headers["x-rapidapi-key"] = API_KEY;
  }

  const promise = fetchWithRetry(urlStr, { headers })
    .then(async (res) => {
      const json = await res.json();
      if (json.status !== "success") {
        throw new Error(json.message ?? "API returned non-success status");
      }
      const data = json.data as T;
      setCached(urlStr, data, ttlMs);
      return data;
    })
    .finally(() => {
      inFlight.delete(urlStr);
    });

  inFlight.set(urlStr, promise);
  return promise;
}

// Public API

export type TimePeriod = "1h" | "3h" | "12h" | "24h" | "7d" | "30d" | "3m" | "6m" | "1y" | "3y" | "5y";
export type OrderBy = "marketCap" | "price" | "24hVolume" | "change" | "listedAt";

export interface GetCoinsOptions {
  limit?: number;
  offset?: number;
  orderBy?: OrderBy;
  timePeriod?: TimePeriod;
}

// Cache TTLs — how long each response type stays fresh before re-fetching
const TTL = {
  coins: 120_000,  // 2 minutes  (prices change often but not every second)
  coin: 90_000,  // 90 seconds
  history: 300_000,  // 5 minutes  (historical data changes slowly)
  stats: 180_000,  // 3 minutes
} as const;

export const coinRankingApi = {
  // List coins with prices + sparklines
  getCoins: async (opts: GetCoinsOptions = {}): Promise<Coin[]> => {
    const params: Record<string, string | number> = {
      limit: opts.limit ?? 50,
      offset: opts.offset ?? 0,
      orderBy: opts.orderBy ?? "marketCap",
      timePeriod: opts.timePeriod ?? "24h",
    };
    const data = await request<{ coins: ApiCoin[] }>("/coins", params, TTL.coins);
    return data.coins.map(normaliseCoin);
  },

  // Full detail for a single coin
  getCoin: async (uuid: string, timePeriod: TimePeriod = "24h"): Promise<CoinDetail> => {
    const data = await request<{ coin: ApiCoinDetail }>(
      `/coin/${uuid}`,
      { timePeriod },
      TTL.coin
    );
    return normaliseCoinDetail(data.coin);
  },

  // Price history for chart
  getCoinHistory: async (
    uuid: string,
    timePeriod: TimePeriod = "30d"
  ): Promise<{ history: HistoryPoint[]; change: number }> => {
    const data = await request<{ history: ApiHistoryPoint[]; change: string }>(
      `/coin/${uuid}/history`,
      { timePeriod },
      TTL.history
    );
    return {
      history: normaliseHistory(data.history),
      change: parseFloat(data.change) || 0,
    };
  },

  // Global market stats 
  getStats: async (): Promise<GlobalStats> => {
    const data = await request<ApiStats>("/stats", undefined, TTL.stats);
    return {
      totalCoins: data.totalCoins,
      totalMarkets: data.totalMarkets,
      totalExchanges: data.totalExchanges,
      totalMarketCap: parseFloat(data.totalMarketCap) || 0,
      total24hVolume: parseFloat(data.total24hVolume) || 0,
      btcDominance: data.btcDominance,
    };
  },

  // Manually clear the entire cache (useful after a 429 cool-down)
  clearCache: () => cache.clear(),
};
