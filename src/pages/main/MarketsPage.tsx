import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout, Sparkline } from "../../components";
import { TableSkeleton, ErrorBox, LiveIndicator } from "../../components/LoadingStates";
import { coinRankingApi } from "../../data/api";
import { usePolling } from "../../hooks/useFetch";
import type { Coin } from "../../types/api";
import type { OrderBy } from "../../data/api";

function fmt(n: number, prefix = "$"): string {
  if (n >= 1e12) return `${prefix}${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `${prefix}${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${prefix}${(n / 1e6).toFixed(2)}M`;
  if (n < 1) return `${prefix}${n.toFixed(4)}`;
  return `${prefix}${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const TABS = ["All", "Gainers", "Losers", "Watchlist"] as const;
type Tab = (typeof TABS)[number];

const ORDER_OPTIONS: { label: string; value: OrderBy }[] = [
  { label: "Market Cap", value: "marketCap" },
  { label: "Price", value: "price" },
  { label: "24h Volume", value: "24hVolume" },
  { label: "24h Change", value: "change" },
  { label: "Newest", value: "listedAt" },
];

function MarketsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<Tab>("All");
  const [orderBy, setOrderBy] = useState<OrderBy>("marketCap");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [watchlist, setWatchlist] = useState<Set<string>>(new Set());
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch coins, re-poll every 30s
  const { data: coins, loading, error, refetch } = usePolling(
    () => coinRankingApi.getCoins({ limit: 50, orderBy, timePeriod: "24h" })
      .then((c) => { setLastUpdated(new Date()); return c; }),
    120_000,
    [orderBy]
  );

  // Fetch global stats
  const { data: stats } = usePolling(
    () => coinRankingApi.getStats(),
    180_000
  );

  const filtered = (coins ?? []).filter((c) => {
    const q = search.toLowerCase();
    const matchSearch = c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q);
    const matchTab =
      tab === "All" ? true :
        tab === "Gainers" ? c.change24h > 0 :
          tab === "Losers" ? c.change24h < 0 :
            tab === "Watchlist" ? watchlist.has(c.uuid) : true;
    return matchSearch && matchTab;
  });

  function toggleWatch(e: React.MouseEvent, uuid: string) {
    e.stopPropagation();
    setWatchlist((prev) => {
      const next = new Set(prev);
      prev.has(uuid) ? next.delete(uuid) : next.add(uuid);
      return next;
    });
  }

  const statCards = [
    { label: "Total Market Cap", value: stats ? fmt(stats.totalMarketCap) : "—" },
    { label: "24h Volume", value: stats ? fmt(stats.total24hVolume) : "—" },
    { label: "BTC Dominance", value: stats ? `${stats.btcDominance.toFixed(1)}%` : "—" },
    { label: "Active Coins", value: stats ? stats.totalCoins.toLocaleString() : "—" },
  ];

  return (
    <PageLayout
      title="Live Crypto Markets"
      subtitle="Real-time prices, market caps, and 24-hour changes across 200+ exchanges."
      badge="Live Data"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {statCards.map((s) => (
            <div key={s.label} className="bg-[#0D1424] border border-white/7 rounded-xl px-4 py-3">
              <p className="text-slate-500 text-[11px] mb-0.5">{s.label}</p>
              <p className="text-white font-bold text-sm">{s.value}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex gap-1 flex-wrap">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${tab === t
                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                  : "text-slate-500 border-white/5 hover:text-slate-300 hover:border-white/12"
                  }`}
              >
                {t}
                {t === "Watchlist" && watchlist.size > 0 && (
                  <span className="ml-1.5 text-[10px] bg-white/8 px-1.5 py-0.5 rounded-full text-slate-500">
                    {watchlist.size}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value as OrderBy)}
              className="bg-white/5 border border-white/10 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500/40 cursor-pointer"
            >
              {ORDER_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} style={{ background: "#0D1424" }}>
                  Sort: {o.label}
                </option>
              ))}
            </select>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                className="bg-white/5 border border-white/10 text-white placeholder:text-slate-600 rounded-xl px-4 py-2 pl-8 text-xs focus:outline-none focus:border-emerald-500/40 w-40"
              />
              <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-600" width="13" height="13" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex bg-white/4 border border-white/6 rounded-lg p-1 gap-1">
              {(["table", "grid"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setViewMode(v)}
                  className={`p-1.5 rounded transition-colors ${viewMode === v ? "bg-white/10 text-white" : "text-slate-600 hover:text-slate-400"}`}
                >
                  {v === "table" ? (
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="1" y="2" width="12" height="2" rx="0.5" fill="currentColor" /><rect x="1" y="6" width="12" height="2" rx="0.5" fill="currentColor" /><rect x="1" y="10" width="12" height="2" rx="0.5" fill="currentColor" /></svg>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" /><rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor" /><rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor" /><rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor" /></svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        {error && <ErrorBox message={error} onRetry={refetch} />}
        {viewMode === "table" && !error && (
          <div className="rounded-2xl border border-white/6 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px]">
                <thead>
                  <tr className="bg-white/2 border-b border-white/6">
                    <th className="text-left px-4 py-3.5 text-slate-600 text-xs font-medium w-10">#</th>
                    <th className="text-left px-4 py-3.5 text-slate-600 text-xs font-medium">Asset</th>
                    <th className="text-right px-4 py-3.5 text-slate-600 text-xs font-medium">Price</th>
                    <th className="text-right px-4 py-3.5 text-slate-600 text-xs font-medium">24h %</th>
                    <th className="text-right px-4 py-3.5 text-slate-600 text-xs font-medium hidden md:table-cell">Market Cap</th>
                    <th className="text-right px-4 py-3.5 text-slate-600 text-xs font-medium hidden lg:table-cell">Volume (24h)</th>
                    <th className="text-center px-4 py-3.5 text-slate-600 text-xs font-medium hidden sm:table-cell">Sparkline</th>
                    <th className="w-10" />
                  </tr>
                </thead>
                <tbody>
                  {loading && !coins && <TableSkeleton rows={10} cols={8} />}
                  {filtered.length === 0 && !loading && (
                    <tr><td colSpan={8} className="text-center py-16 text-slate-600 text-sm">No assets match your search.</td></tr>
                  )}
                  {filtered.map((coin: Coin, idx: number) => {
                    const pos = coin.change24h >= 0;
                    const isWatched = watchlist.has(coin.uuid);
                    return (
                      <tr
                        key={coin.uuid}
                        onClick={() => navigate(`/crypto/${coin.uuid}`)}
                        className="border-b border-white/4 hover:bg-white/4 transition-colors cursor-pointer group"
                      >
                        <td className="px-4 py-4 text-slate-600 text-sm">{idx + 1}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <img src={coin.iconUrl} alt={coin.name}
                              className="w-9 h-9 rounded-full shrink-0 bg-white/5"
                              onError={(e) => { e.currentTarget.style.display = "none"; }}
                            />
                            <div>
                              <p className="text-white font-semibold text-sm group-hover:text-emerald-300 transition-colors">{coin.name}</p>
                              <p className="text-slate-600 text-xs">{coin.symbol}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right text-white font-medium text-sm tabular-nums">{fmt(coin.price)}</td>
                        <td className="px-4 py-4 text-right">
                          <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-xs font-bold ${pos ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10"}`}>
                            {pos ? "▲" : "▼"} {Math.abs(coin.change24h).toFixed(2)}%
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right text-slate-400 text-sm tabular-nums hidden md:table-cell">{fmt(coin.marketCap)}</td>
                        <td className="px-4 py-4 text-right text-slate-400 text-sm tabular-nums hidden lg:table-cell">{fmt(coin.volume24h)}</td>
                        <td className="px-4 py-4 hidden sm:table-cell">
                          {coin.sparkline.length > 1 && <Sparkline data={coin.sparkline} positive={pos} />}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button onClick={(e) => toggleWatch(e, coin.uuid)}
                            className={`text-lg transition-colors ${isWatched ? "text-yellow-400" : "text-slate-700 hover:text-slate-400"}`}>★</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {viewMode === "grid" && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {loading && !coins && Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-[#0D1424] border border-white/7 rounded-2xl p-5 animate-pulse space-y-3">
                <div className="h-10 w-10 rounded-full bg-white/5" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
                <div className="h-8 bg-white/5 rounded" />
                <div className="h-6 bg-white/5 rounded w-1/2" />
              </div>
            ))}
            {filtered.map((coin: Coin) => {
              const pos = coin.change24h >= 0;
              const isWatched = watchlist.has(coin.uuid);
              return (
                <div
                  key={coin.uuid}
                  onClick={() => navigate(`/crypto/${coin.uuid}`)}
                  className="bg-[#0D1424] border border-white/7 hover:border-white/16 rounded-2xl p-5 cursor-pointer transition-all hover:bg-white/3 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img src={coin.iconUrl} alt={coin.name}
                        className="w-10 h-10 rounded-full bg-white/5 shrink-0"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                      <div>
                        <p className="text-white font-semibold text-sm group-hover:text-emerald-300 transition-colors">{coin.name}</p>
                        <p className="text-slate-600 text-xs">#{coin.rank} · {coin.symbol}</p>
                      </div>
                    </div>
                    <button onClick={(e) => toggleWatch(e, coin.uuid)}
                      className={`text-base transition-colors ${isWatched ? "text-yellow-400" : "text-slate-700 hover:text-slate-400"}`}>★</button>
                  </div>
                  {coin.sparkline.length > 1 && (
                    <div className="mb-3">
                      <Sparkline data={coin.sparkline} positive={pos} width={180} height={48} />
                    </div>
                  )}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-lg font-extrabold text-white tabular-nums">{fmt(coin.price)}</p>
                      <p className="text-slate-600 text-xs mt-0.5">{fmt(coin.marketCap)} cap</p>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${pos ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10"}`}>
                      {pos ? "▲" : "▼"} {Math.abs(coin.change24h).toFixed(2)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="flex items-center justify-between text-xs text-slate-700 pt-2">
          <span>{filtered.length} assets shown</span>
          <LiveIndicator lastUpdated={lastUpdated} />
        </div>
      </div>
    </PageLayout>
  );
}

export default MarketsPage