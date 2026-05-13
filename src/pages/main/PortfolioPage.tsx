import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../../components";
import { PageSpinner, ErrorBox } from "../../components/LoadingStates";
import { coinRankingApi } from "../../data/api";
import { useFetch } from "../../hooks/useFetch";
import type { Coin } from "../../types/api";
import { DEMO_HOLDINGS } from "../../data/holdings";

function fmt(n: number) {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  return `$${n.toFixed(2)}`;
}

function PortfolioPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"holdings" | "performance">("holdings");

  const { data: coins, loading, error, refetch } = useFetch(
    () => coinRankingApi.getCoins({ limit: 50, orderBy: "marketCap" }),
    []
  );

  const holdings = DEMO_HOLDINGS.map((h) => {
    const coin = coins?.find((c: Coin) => c.uuid === h.uuid);
    const currentPrice = coin?.price ?? 0;
    const currentValue = currentPrice * h.amount;
    const costBasis = h.avgBuy * h.amount;
    const pnl = currentValue - costBasis;
    const pnlPct = costBasis > 0 ? (pnl / costBasis) * 100 : 0;
    return { ...h, coin, currentValue, costBasis, pnl, pnlPct };
  });

  const totalValue = holdings.reduce((s, h) => s + h.currentValue, 0);
  const totalCost = holdings.reduce((s, h) => s + h.costBasis, 0);
  const totalPnl = totalValue - totalCost;
  const totalPnlPct = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0;

  // Donut chart
  const donutSize = 180, r = 70, cx = 90, cy = 90;
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  const slices = holdings.map((h) => {
    const pct = totalValue > 0 ? h.currentValue / totalValue : 0;
    const slice = { offset, pct, color: h.coin?.color ?? "#10B981" };
    offset += pct * circumference;
    return slice;
  });

  return (
    <PageLayout title="My Portfolio" subtitle="Track your crypto holdings, performance, and allocation." badge="Portfolio Tracker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {error && <ErrorBox message={error} onRetry={refetch} />}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Value", value: loading ? "—" : fmt(totalValue), positive: undefined },
            { label: "Amount Invested", value: loading ? "—" : fmt(totalCost), positive: undefined },
            {
              label: "Total P&L", value: loading ? "—" : `${totalPnl >= 0 ? "+" : ""}${fmt(Math.abs(totalPnl))}`,
              sub: loading ? "" : `${totalPnlPct >= 0 ? "+" : ""}${totalPnlPct.toFixed(2)}% all time`,
              positive: totalPnl >= 0
            },
            { label: "Holdings", value: `${holdings.length} assets`, positive: undefined },
          ].map((c) => (
            <div key={c.label} className="bg-[#0D1424] border border-white/7 rounded-2xl p-5">
              <p className="text-slate-500 text-xs mb-2">{c.label}</p>
              <p className={`text-xl font-extrabold ${c.positive === undefined ? "text-white" : c.positive ? "text-emerald-400" : "text-red-400"
                }`}>
                {c.value}
              </p>
              {"sub" in c && c.sub && <p className="text-slate-600 text-xs mt-1">{c.sub}</p>}
            </div>
          ))}
        </div>
        {loading && !coins && <PageSpinner />}
        {coins && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#0D1424] border border-white/7 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-1 p-4 border-b border-white/5">
                {(["holdings", "performance"] as const).map((t) => (
                  <button key={t} onClick={() => setTab(t)}
                    className={`px-4 py-1.5 text-sm font-semibold rounded-lg capitalize transition-colors ${tab === t ? "bg-emerald-500/15 text-emerald-400" : "text-slate-500 hover:text-slate-300"
                      }`}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[540px]">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left px-5 py-3 text-slate-600 text-xs font-medium">Asset</th>
                      <th className="text-right px-5 py-3 text-slate-600 text-xs font-medium">Holdings</th>
                      <th className="text-right px-5 py-3 text-slate-600 text-xs font-medium">Avg. Buy</th>
                      <th className="text-right px-5 py-3 text-slate-600 text-xs font-medium">Value</th>
                      <th className="text-right px-5 py-3 text-slate-600 text-xs font-medium">P&L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdings.map((h) => h.coin && (
                      <tr key={h.uuid} onClick={() => navigate(`/crypto/${h.uuid}`)}
                        className="border-b border-white/4 hover:bg-white/3 transition-colors cursor-pointer">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <img src={h.coin.iconUrl} alt={h.coin.name}
                              className="w-8 h-8 rounded-full bg-white/5 shrink-0"
                              onError={(e) => { e.currentTarget.style.display = "none"; }}
                            />
                            <div>
                              <p className="text-white text-sm font-semibold">{h.coin.name}</p>
                              <p className="text-slate-600 text-xs">{h.coin.symbol}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <p className="text-white text-sm tabular-nums">{h.amount < 1 ? h.amount.toFixed(4) : h.amount.toLocaleString()}</p>
                          <p className="text-slate-600 text-xs">{h.coin.symbol}</p>
                        </td>
                        <td className="px-5 py-4 text-right text-slate-400 text-sm tabular-nums">
                          ${h.avgBuy < 1 ? h.avgBuy.toFixed(4) : h.avgBuy.toLocaleString()}
                        </td>
                        <td className="px-5 py-4 text-right text-white text-sm font-semibold tabular-nums">{fmt(h.currentValue)}</td>
                        <td className="px-5 py-4 text-right">
                          <p className={`text-sm font-bold tabular-nums ${h.pnl >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                            {h.pnl >= 0 ? "+" : ""}{fmt(Math.abs(h.pnl))}
                          </p>
                          <p className={`text-xs ${h.pnl >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                            {h.pnlPct >= 0 ? "+" : ""}{h.pnlPct.toFixed(2)}%
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-[#0D1424] border border-white/7 rounded-2xl p-5">
                <h3 className="text-white font-bold text-sm mb-5">Allocation</h3>
                <div className="flex justify-center mb-5">
                  <div className="relative">
                    <svg width={donutSize} height={donutSize} viewBox={`0 0 ${donutSize} ${donutSize}`}
                      style={{ transform: "rotate(-90deg)" }}>
                      {slices.map((s, i) => (
                        <circle key={i} cx={cx} cy={cy} r={r} fill="none"
                          stroke={s.color} strokeWidth="28"
                          strokeDasharray={`${s.pct * circumference} ${circumference}`}
                          strokeDashoffset={-s.offset}
                        />
                      ))}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-white font-extrabold text-base">{fmt(totalValue)}</p>
                      <p className="text-slate-500 text-xs">Total</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {holdings.map((h) => h.coin && (
                    <div key={h.uuid} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: h.coin.color }} />
                        <span className="text-slate-400 text-xs">{h.coin.symbol}</span>
                      </div>
                      <span className="text-white text-xs font-semibold tabular-nums">
                        {totalValue > 0 ? ((h.currentValue / totalValue) * 100).toFixed(1) : "0.0"}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500/8 to-cyan-500/8 border border-white/7 rounded-2xl p-5 text-center">
                <p className="text-white font-bold text-sm mb-1">Add more assets</p>
                <p className="text-slate-500 text-xs mb-4">Track 10,000+ coins in your portfolio</p>
                <button onClick={() => navigate("/markets")}
                  className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold transition-colors">
                  Browse Markets
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export default PortfolioPage