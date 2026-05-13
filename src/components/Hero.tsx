import { useNavigate } from "react-router-dom";
import { coinRankingApi } from "../data/api";
import { usePolling } from "../hooks/useFetch";
import { Skeleton } from "./LoadingStates";

function fmtLarge(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  return `$${n.toLocaleString()}`;
}

function Hero() {
  const navigate = useNavigate();

  // Global stats — refresh every 60s
  const { data: stats } = usePolling(
    () => coinRankingApi.getStats(),
    180_000
  );

  // Top 2 coins for floating badges — refresh every 30s
  const { data: coins } = usePolling(
    () => coinRankingApi.getCoins({ limit: 2, orderBy: "marketCap" }),
    120_000
  );

  const btc = coins?.[0];
  const eth = coins?.[1];

  const statCards = [
    {
      label: "Total Market Cap",
      value: stats ? fmtLarge(stats.totalMarketCap) : null,
      change: null,
      positive: true,
    },
    {
      label: "24h Volume",
      value: stats ? fmtLarge(stats.total24hVolume) : null,
      change: null,
      positive: true,
    },
    {
      label: "BTC Dominance",
      value: stats ? `${stats.btcDominance.toFixed(1)}%` : null,
      change: null,
      positive: false,
    },
    {
      label: "Active Coins",
      value: stats ? stats.totalCoins.toLocaleString() : null,
      change: null,
      positive: true,
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-[#070B14]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live market data · {stats ? `${stats.totalCoins.toLocaleString()}+` : "10,000+"} assets
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
              Crypto data,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                anytime
              </span>{" "}
              you need it.
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl">
              Track every coin, analyze trends, and manage your portfolio with real-time
              data from {stats ? `${stats.totalExchanges}+` : "200+"} exchanges. Professional-grade tools for every investor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/get-started")}
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-6 py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Start for free
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => navigate("/markets")}
                className="inline-flex items-center justify-center gap-2 text-slate-300 hover:text-white border border-white/10 hover:border-white/20 px-6 py-3.5 rounded-xl transition-all"
              >
                View live markets
              </button>
            </div>

            <div className="flex items-center gap-6 mt-10 pt-10 border-t border-white/5">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">2M+</p>
                <p className="text-xs text-slate-500 mt-0.5">Users</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {stats ? `${stats.totalExchanges}+` : "200+"}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Exchanges</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {stats ? fmtLarge(stats.totalMarketCap) : "$2.4T"}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Market cap tracked</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-[#0D1424] border border-white/8 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Global Market Cap</p>
                  {stats ? (
                    <p className="text-3xl font-bold text-white">{fmtLarge(stats.totalMarketCap)}</p>
                  ) : (
                    <Skeleton className="h-9 w-48 mt-1" />
                  )}
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2 text-center">
                  {stats ? (
                    <>
                      <p className="text-emerald-400 font-bold text-lg">{stats.btcDominance.toFixed(1)}%</p>
                      <p className="text-slate-500 text-[10px]">BTC dominance</p>
                    </>
                  ) : (
                    <Skeleton className="h-10 w-16" />
                  )}
                </div>
              </div>
              <div className="relative h-32 mb-6">
                <svg viewBox="0 0 400 120" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 90 C40 80 60 95 80 85 S120 60 140 55 S180 45 200 40 S240 30 260 25 S300 20 320 18 S360 15 400 10"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                  />
                  <path
                    d="M0 90 C40 80 60 95 80 85 S120 60 140 55 S180 45 200 40 S240 30 260 25 S300 20 320 18 S360 15 400 10 L400 120 L0 120 Z"
                    fill="url(#heroGradient)"
                  />
                </svg>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {statCards.map((stat) => (
                  <div key={stat.label} className="bg-white/3 rounded-xl p-3">
                    <p className="text-slate-500 text-[11px] mb-1">{stat.label}</p>
                    {stat.value ? (
                      <p className="text-white font-semibold text-sm">{stat.value}</p>
                    ) : (
                      <Skeleton className="h-5 w-20 mt-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-[#0D1424] border border-cyan-500/30 rounded-xl px-3 py-2 text-xs shadow-xl">
              {btc ? (
                <>
                  <span className="text-cyan-400 font-semibold">{btc.symbol}</span>
                  <span className="text-white font-bold ml-2">
                    ${btc.price < 1000 ? btc.price.toFixed(2) : btc.price.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </span>
                  <span className={`ml-2 font-semibold ${btc.change24h >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {btc.change24h >= 0 ? "▲" : "▼"} {Math.abs(btc.change24h).toFixed(2)}%
                  </span>
                </>
              ) : (
                <Skeleton className="h-4 w-32" />
              )}
            </div>

            <div className="absolute -bottom-4 -left-4 bg-[#0D1424] border border-purple-500/30 rounded-xl px-3 py-2 text-xs shadow-xl">
              {eth ? (
                <>
                  <span className="text-purple-400 font-semibold">{eth.symbol}</span>
                  <span className="text-white font-bold ml-2">
                    ${eth.price < 1000 ? eth.price.toFixed(2) : eth.price.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </span>
                  <span className={`ml-2 font-semibold ${eth.change24h >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {eth.change24h >= 0 ? "▲" : "▼"} {Math.abs(eth.change24h).toFixed(2)}%
                  </span>
                </>
              ) : (
                <Skeleton className="h-4 w-32" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero