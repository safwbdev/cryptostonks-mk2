import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { coinRankingApi } from "../data/api";
import { usePolling } from "../hooks/useFetch";
import { TableSkeleton, ErrorBox, LiveIndicator } from "./LoadingStates";
import Sparkline from "./Sparkline";
import type { Coin } from "../types/api";

function fmt(n: number, prefix = "$"): string {
  if (n >= 1e12) return `${prefix}${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `${prefix}${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${prefix}${(n / 1e6).toFixed(2)}M`;
  if (n < 1) return `${prefix}${n.toFixed(4)}`;
  return `${prefix}${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function MarketsTable() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Top 10 coins, refresh every 30s
  const { data: coins, loading, error, refetch } = usePolling(
    () => coinRankingApi.getCoins({ limit: 10, orderBy: "marketCap" })
      .then((c) => { setLastUpdated(new Date()); return c; }),
    120_000
  );

  const filtered = (coins ?? []).filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="markets" className="py-20 bg-[#070B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Live Markets</h2>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-slate-500 text-sm">Top assets by market cap</p>
              <LiveIndicator lastUpdated={lastUpdated} />
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assets..."
              className="bg-white/5 border border-white/10 text-white placeholder:text-slate-600 rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-none focus:border-emerald-500/50 w-full sm:w-64"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div className="flex gap-1 mb-6 border-b border-white/5 pb-4">
          {["All", "Watchlist", "DeFi", "Layer 1", "Memes"].map((tab, i) => (
            <button
              key={tab}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${i === 0
                ? "bg-emerald-500/10 text-emerald-400"
                : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto rounded-2xl border border-white/5">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-white/3 border-b border-white/5">
                <th className="text-left px-4 py-3.5 text-slate-500 text-xs font-medium w-8">#</th>
                <th className="text-left px-4 py-3.5 text-slate-500 text-xs font-medium">Asset</th>
                <th className="text-right px-4 py-3.5 text-slate-500 text-xs font-medium">Price</th>
                <th className="text-right px-4 py-3.5 text-slate-500 text-xs font-medium">24h %</th>
                <th className="text-right px-4 py-3.5 text-slate-500 text-xs font-medium hidden md:table-cell">Market Cap</th>
                <th className="text-right px-4 py-3.5 text-slate-500 text-xs font-medium hidden lg:table-cell">Volume (24h)</th>
                <th className="text-center px-4 py-3.5 text-slate-500 text-xs font-medium hidden sm:table-cell">7d Chart</th>
                <th className="text-center px-4 py-3.5 text-slate-500 text-xs font-medium w-10" />
              </tr>
            </thead>
            <tbody>
              {loading && !coins && <TableSkeleton rows={10} cols={8} />}

              {error && (
                <tr>
                  <td colSpan={8}>
                    <ErrorBox message={error} onRetry={refetch} />
                  </td>
                </tr>
              )}

              {filtered.map((coin: Coin, idx: number) => {
                const pos = coin.change24h >= 0;
                const isWatched = watchlist.has(coin.uuid);
                return (
                  <tr
                    key={coin.uuid}
                    onClick={() => navigate(`/crypto/${coin.uuid}`)}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group"
                  >
                    <td className="px-4 py-4 text-slate-600 text-sm">{idx + 1}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={coin.iconUrl}
                          alt={coin.name}
                          className="w-9 h-9 rounded-full shrink-0"
                          onError={(e) => {
                            // fallback to colored initial if icon fails
                            const el = e.currentTarget;
                            el.style.display = "none";
                            el.nextElementSibling?.classList.remove("hidden");
                          }}
                        />
                        <div
                          className="w-9 h-9 rounded-full hidden flex items-center justify-center text-xs font-bold text-black shrink-0"
                          style={{ backgroundColor: coin.color }}
                        >
                          {coin.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm group-hover:text-emerald-300 transition-colors">{coin.name}</p>
                          <p className="text-slate-500 text-xs">{coin.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right text-white font-medium text-sm tabular-nums">
                      {fmt(coin.price)}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className={`inline-flex items-center justify-end gap-1 px-2 py-0.5 rounded-md text-xs font-semibold ${pos ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10"
                        }`}>
                        {pos ? "▲" : "▼"} {Math.abs(coin.change24h).toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right text-slate-400 text-sm tabular-nums hidden md:table-cell">
                      {fmt(coin.marketCap)}
                    </td>
                    <td className="px-4 py-4 text-right text-slate-400 text-sm tabular-nums hidden lg:table-cell">
                      {fmt(coin.volume24h)}
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      {coin.sparkline.length > 1 && (
                        <Sparkline data={coin.sparkline} positive={pos} />
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setWatchlist((prev) => {
                            const next = new Set(prev);
                            isWatched ? next.delete(coin.uuid) : next.add(coin.uuid);
                            return next;
                          });
                        }}
                        className={`transition-colors ${isWatched ? "text-yellow-400" : "text-slate-700 hover:text-slate-400"}`}
                      >
                        ★
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/markets")}
            className="text-sm text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 hover:border-emerald-500/40 px-6 py-2.5 rounded-xl transition-all"
          >
            View all assets →
          </button>
        </div>
      </div>
    </section>
  );
}

export default MarketsTable