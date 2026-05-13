import { useState, useEffect, useCallback, useRef } from "react";

export interface FetchState<T> {
  data:    T | null;
  loading: boolean;
  error:   string | null;
  refetch: () => void;
}

/**
 * Generic fetch hook with:
 * - Cancellation on unmount / dep change
 * - Keeps stale data visible during background refresh
 * - Only surfaces errors when there is no data to show
 */
export function useFetch<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = []
): FetchState<T> {
  const [data,    setData]    = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);
  const [tick,    setTick]    = useState(0);

  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    let cancelled = false;

    // Only show spinner on first load, not background refreshes
    setLoading((prev) => prev || data === null);
    // Don't clear previous error until a successful response
    // (but do clear it once we get data)

    fetcherRef.current()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setError(null);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          // If we have stale data, keep showing it — just log the error
          // Only show the error UI if we have nothing to display
          if (data === null) {
            setError(err.message ?? "Something went wrong");
          } else {
            console.warn("[useFetch] Background refresh failed:", err.message);
          }
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);

  const refetch = useCallback(() => {
    setTick((t) => t + 1);
  }, []);

  return { data, loading, error, refetch };
}

/**
 * Polling variant — re-fetches on the given interval.
 * Polling is paused when the tab is hidden to avoid wasted requests.
 */
export function usePolling<T>(
  fetcher: () => Promise<T>,
  intervalMs: number,
  deps: unknown[] = []
): FetchState<T> {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const tick = () => {
      // Don't poll when the user has switched away from the tab
      if (document.visibilityState === "hidden") return;
      setTick((t) => t + 1);
    };

    const id = setInterval(tick, intervalMs);
    // Also re-fetch when user returns to the tab after being away
    document.addEventListener("visibilitychange", tick);

    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [intervalMs]);

  return useFetch(fetcher, [...deps, tick]);
}
