import { useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { coinRankingApi } from "../data/api";
import { useFetch } from "../hooks/useFetch";
import { PageSpinner, ErrorBox, Skeleton } from "./LoadingStates";
import type { TimePeriod } from "../data/api";

function fmt(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (n < 1) return `$${n.toFixed(6)}`;
  return `$${n.toFixed(2)}`;
}
function fmtSupply(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  return n.toLocaleString();
}
function fmtDate(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}
function fmtDateShort(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const PERIODS: { label: string; value: TimePeriod }[] = [
  { label: "24H", value: "24h" },
  { label: "7D", value: "7d" },
  { label: "30D", value: "30d" },
  { label: "3M", value: "3m" },
  { label: "1Y", value: "1y" },
];

// SVG Line Chart
interface ChartProps {
  data: { price: number; timestamp: number }[];
  positive: boolean;
}


function LineChart({ data, positive }: ChartProps) {
  const [hover, setHover] = useState<{ x: number; y: number; price: number; ts: number } | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);

  if (!data.length) {
    return <div className="h-64 flex items-center justify-center text-slate-600 text-sm">No chart data available</div>;
  }

  const W = 1000, H = 320, padL = 60, padR = 20, padT = 20, padB = 40;

  const chartW = W - padL - padR, chartH = H - padT - padB;

  const prices = data.map((d) => d.price);

  const minP = Math.min(...prices), maxP = Math.max(...prices), rangeP = maxP - minP || 1;

  const toX = (i: number) => padL + (i / (data.length - 1)) * chartW;

  const toY = (p: number) => padT + chartH - ((p - minP) / rangeP) * chartH;

  const polyPoints = data.map((d, i) => `${toX(i).toFixed(1)},${toY(d.price).toFixed(1)}`).join(" ");

  const fillPath = `M${padL},${padT + chartH} ` + data.map((d, i) => `L${toX(i).toFixed(1)},${toY(d.price).toFixed(1)}`).join(" ") + ` L${toX(data.length - 1)},${padT + chartH} Z`;

  const yTicks = Array.from({ length: 5 }, (_, i) => minP + (rangeP / 4) * i);

  const xTickIdxs = Array.from({ length: 6 }, (_, i) => Math.round((i / 5) * (data.length - 1)));

  const lineColor = positive ? "#10B981" : "#F87171";

  const gradId = `grad-${positive ? "pos" : "neg"}`;

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {

    if (!svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();

    const svgX = ((e.clientX - rect.left) / rect.width) * W;

    const idx = Math.max(0, Math.min(data.length - 1, Math.round(((svgX - padL) / chartW) * (data.length - 1))));

    setHover({ x: toX(idx), y: toY(data[idx].price), price: data[idx].price, ts: data[idx].timestamp });
  }

  return (
    <div className="relative w-full select-none">
      {hover && (
        <div className="absolute top-4 pointer-events-none z-10 bg-[#0D1424] border border-white/10 rounded-xl px-3 py-2 text-xs shadow-xl"
          style={{ left: `${Math.min(hover.x / W * 100, 72)}%` }}>
          <p className="text-slate-400">{fmtDate(hover.ts)}</p>
          <p className="text-white font-bold text-sm mt-0.5">{fmt(hover.price)}</p>
        </div>
      )}
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 280 }}
        onMouseMove={handleMouseMove} onMouseLeave={() => setHover(null)}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0.01" />
          </linearGradient>
          <clipPath id="chart-clip">
            <rect x={padL} y={padT} width={chartW} height={chartH} />
          </clipPath>
        </defs>
        {yTicks.map((v, i) => (
          <g key={i}>
            <line x1={padL} x2={padL + chartW} y1={toY(v)} y2={toY(v)} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <text x={padL - 8} y={toY(v) + 4} textAnchor="end" fontSize="10" fill="#475569">
              {v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : v < 1 ? `$${v.toFixed(4)}` : `$${v.toFixed(0)}`}
            </text>
          </g>
        ))}
        {xTickIdxs.map((idx) => (
          <text key={idx} x={toX(idx)} y={H - 8} textAnchor="middle" fontSize="10" fill="#475569">
            {fmtDateShort(data[idx].timestamp)}
          </text>
        ))}
        <path d={fillPath} fill={`url(#${gradId})`} clipPath="url(#chart-clip)" />
        <polyline points={polyPoints} fill="none" stroke={lineColor} strokeWidth="2"
          strokeLinejoin="round" strokeLinecap="round" clipPath="url(#chart-clip)" />
        {hover && (
          <>
            <line x1={hover.x} x2={hover.x} y1={padT} y2={padT + chartH}
              stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx={hover.x} cy={hover.y} r="5" fill={lineColor} stroke="#0D1424" strokeWidth="2" />
          </>
        )}
      </svg>
    </div>
  );
}

// Card
function StatCard({ label, value, sub }: { label: string; value?: string; sub?: string }) {
  return (
    <div className="bg-white/3 border border-white/5 rounded-xl p-4">
      <p className="text-slate-500 text-xs mb-1.5">{label}</p>
      {value ? <p className="text-white font-bold text-base">{value}</p> : <Skeleton className="h-5 w-24 mt-1" />}
      {sub && <p className="text-slate-500 text-xs mt-0.5">{sub}</p>}
    </div>
  );
}

// Main
export default function CoinDetail() {
  const { uuid } = useParams<{ uuid: string }>();
  const navigate = useNavigate();
  const [period, setPeriod] = useState<{ label: string; value: TimePeriod }>(PERIODS[2]);

  // Coin detail
  const { data: coin, loading: coinLoading, error: coinError, refetch: refetchCoin } =
    useFetch(() => coinRankingApi.getCoin(uuid!, period.value), [uuid, period.value]);

  // Price history — re-fetch when period changes
  const { data: histData, loading: histLoading } =
    useFetch(() => coinRankingApi.getCoinHistory(uuid!, period.value), [uuid, period.value]);

  // Top 5 other coins for sidebar
  const { data: otherCoins } =
    useFetch(() => coinRankingApi.getCoins({ limit: 6, orderBy: "marketCap" }), []);

  if (coinLoading && !coin) return <div className="min-h-screen bg-[#070B14] pt-16"><PageSpinner /></div>;
  if (coinError) return (
    <div className="min-h-screen bg-[#070B14] pt-16 flex items-center justify-center">
      <ErrorBox message={coinError} onRetry={refetchCoin} />
    </div>
  );
  if (!coin) return null;

  const positive = coin.change24h >= 0;
  const athDiff = coin.allTimeHigh.price ? ((coin.price - coin.allTimeHigh.price) / coin.allTimeHigh.price) * 100 : 0;
  const supplyPct = coin.supply.max ? (coin.supply.circulating / coin.supply.max) * 100 : null;
  const sidebar = (otherCoins ?? []).filter((c) => c.uuid !== uuid).slice(0, 5);

  return (
    <div className="min-h-screen bg-[#070B14] pt-16">
      <div className="border-b border-white/5 bg-[#0A0F1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm">
          <Link to="/" className="text-slate-500 hover:text-slate-300 transition-colors">Home</Link>
          <span className="text-slate-700">/</span>
          <Link to="/markets" className="text-slate-500 hover:text-slate-300 transition-colors">Markets</Link>
          <span className="text-slate-700">/</span>
          <span className="text-white font-medium">{coin.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <img src={coin.iconUrl} alt={coin.name}
              className="w-14 h-14 rounded-2xl shrink-0 shadow-lg bg-white/5"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-extrabold text-white tracking-tight">{coin.name}</h1>
                <span className="text-sm font-semibold text-slate-500 bg-white/5 px-2.5 py-0.5 rounded-lg">{coin.symbol}</span>
                <span className="text-xs font-semibold text-slate-500 bg-white/5 px-2.5 py-0.5 rounded-lg">Rank #{coin.rank}</span>
              </div>
              {coin.websiteUrl && (
                <a href={coin.websiteUrl} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:text-emerald-300 mt-1.5 inline-flex items-center gap-1 transition-colors">
                  {coin.websiteUrl.replace("https://", "")}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                </a>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-extrabold text-white tracking-tight tabular-nums">{fmt(coin.price)}</p>
            <div className={`inline-flex items-center gap-1.5 mt-1.5 px-3 py-1 rounded-lg text-sm font-bold ${positive ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
              }`}>
              {positive ? "▲" : "▼"} {Math.abs(coin.change24h).toFixed(2)}% (24h)
            </div>
            <p className="text-slate-500 text-xs mt-1.5">
              ₿ {coin.btcPrice.toFixed(8)}
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0D1424] border border-white/7 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                <p className="text-slate-400 text-sm font-medium">Price Chart ({coin.symbol}/USD)</p>
                <div className="flex gap-1 bg-white/3 rounded-xl p-1">
                  {PERIODS.map((p) => (
                    <button key={p.value} onClick={() => setPeriod(p)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${period.value === p.value
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "text-slate-500 hover:text-slate-300"
                        }`}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
              {histLoading && !histData ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-white/10 border-t-emerald-400 rounded-full animate-spin" />
                </div>
              ) : (
                <LineChart data={histData?.history ?? []} positive={positive} />
              )}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5 text-xs text-slate-600">
                <span>Showing {period.label} price history</span>
                <span>Hover chart for exact price</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <StatCard label="Market Cap" value={fmt(coin.marketCap)}
                sub={`Rank #${coin.rank}`} />
              <StatCard label="24h Volume" value={fmt(coin.volume24h)}
                sub={`${coin.marketCap > 0 ? ((coin.volume24h / coin.marketCap) * 100).toFixed(1) : "—"}% of market cap`} />
              <StatCard label="Fully Diluted M. Cap"
                value={coin.supply.max ? fmt(coin.price * coin.supply.max) : "∞"} />
              <StatCard label="All-Time High" value={fmt(coin.allTimeHigh.price)}
                sub={`${athDiff.toFixed(1)}% from ATH · ${coin.allTimeHigh.timestamp ? new Date(coin.allTimeHigh.timestamp * 1000).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "—"}`} />
              <StatCard label="Markets" value={coin.numberOfMarkets.toLocaleString()}
                sub={`${coin.numberOfExchanges} exchanges`} />
              <StatCard label="BTC Price" value={`₿ ${coin.btcPrice.toFixed(8)}`} />
            </div>
            {coin.description && (
              <div className="bg-[#0D1424] border border-white/7 rounded-2xl p-5">
                <h2 className="text-white font-bold text-base mb-3">About {coin.name}</h2>
                <p className="text-slate-400 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: coin.description.replace(/<[^>]*>/g, "").slice(0, 600) + (coin.description.length > 600 ? "…" : "") }}
                />
                {coin.links?.slice(0, 4).map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 mr-2 text-xs text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 hover:border-emerald-500/40 px-3 py-1.5 rounded-lg transition-all capitalize">
                    {link.type} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="bg-[#0D1424] border border-white/7 rounded-2xl p-5">
              <h2 className="text-white font-bold text-sm mb-4">Price Performance</h2>
              {[
                { label: "24h", value: coin.change24h },
                { label: "Period", value: histData?.change ?? null },
              ].filter((r) => r.value !== null).map(({ label, value }) => {
                const v = value as number;
                return (
                  <div key={label} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                    <span className="text-slate-500 text-sm">{label}</span>
                    <span className={`text-sm font-bold tabular-nums ${v >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {v >= 0 ? "+" : ""}{v.toFixed(2)}%
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="bg-[#0D1424] border border-white/7 rounded-2xl p-5">
              <h2 className="text-white font-bold text-sm mb-4">Supply</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Circulating</span>
                  <span className="text-white font-semibold tabular-nums">{fmtSupply(coin.supply.circulating)} {coin.symbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Total</span>
                  <span className="text-white font-semibold tabular-nums">{fmtSupply(coin.supply.total)} {coin.symbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Max Supply</span>
                  <span className="text-white font-semibold tabular-nums">
                    {coin.supply.max ? `${fmtSupply(coin.supply.max)} ${coin.symbol}` : "∞ Unlimited"}
                  </span>
                </div>
                {supplyPct !== null && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                      <span>Circulating supply</span>
                      <span>{supplyPct.toFixed(1)}% of max</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                        style={{ width: `${Math.min(supplyPct, 100)}%` }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-[#0D1424] border border-white/7 rounded-2xl p-5">
              <h2 className="text-white font-bold text-sm mb-4">Other Top Assets</h2>
              <div className="space-y-1">
                {sidebar.map((c) => {
                  const pos = c.change24h >= 0;
                  return (
                    <button key={c.uuid} onClick={() => navigate(`/crypto/${c.uuid}`)}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors text-left">
                      <img src={c.iconUrl} alt={c.name}
                        className="w-8 h-8 rounded-full bg-white/5 shrink-0"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">{c.name}</p>
                        <p className="text-slate-600 text-xs">{c.symbol}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-white text-xs font-semibold tabular-nums">{fmt(c.price)}</p>
                        <p className={`text-xs font-bold ${pos ? "text-emerald-400" : "text-red-400"}`}>
                          {pos ? "+" : ""}{c.change24h.toFixed(2)}%
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
