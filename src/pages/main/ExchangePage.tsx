import { useState, useEffect } from "react";
import { PageLayout } from "../../components";
import { PageSpinner, ErrorBox, LiveIndicator } from "../../components/LoadingStates";
import { coinRankingApi } from "../../data/api";
import { usePolling } from "../../hooks/useFetch";
import type { Coin } from "../../types/api";
import { RECENT_TRADES } from "../../data/trades";

function fmt(n: number, dp = 2) {
  if (n === 0) return "0.00";
  if (n < 0.0001) return n.toFixed(8);
  if (n < 1) return n.toFixed(6);
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(2)}M`;
  return n.toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: dp });
}

function ExchangePage() {
  const [fromUuid, setFromUuid] = useState("Qwsogvtv82FCd"); // BTC
  const [toUuid, setToUuid] = useState("razxDUgYGNAdQ"); // ETH
  const [fromAmt, setFromAmt] = useState("0.1");
  const [slippage, setSlippage] = useState("0.5");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch top 20 coins for the swap selectors — refresh every 30s
  const { data: coins, loading, error, refetch } = usePolling(
    () => coinRankingApi.getCoins({ limit: 20, orderBy: "marketCap" })
      .then((c) => { setLastUpdated(new Date()); return c; }),
    120_000
  );

  const fromCoin = coins?.find((c: Coin) => c.uuid === fromUuid);
  const toCoin = coins?.find((c: Coin) => c.uuid === toUuid);

  // Derive swap values from live prices
  const fromPrice = fromCoin?.price ?? 0;
  const toPrice = toCoin?.price ?? 0;
  const rate = toPrice > 0 ? fromPrice / toPrice : 0;
  const fromAmtNum = parseFloat(fromAmt) || 0;
  const toAmt = fromAmtNum * rate;
  const feeUsd = fromAmtNum * fromPrice * 0.003;
  const minReceived = toAmt * (1 - parseFloat(slippage) / 100);

  function flip() {
    setFromUuid(toUuid);
    setToUuid(fromUuid);
    setFromAmt(toAmt > 0 ? toAmt.toFixed(6) : "0");
  }

  // Reset fromAmt when coins change to avoid stale calculations
  useEffect(() => {
    if (!fromCoin && coins?.length) setFromUuid(coins[0].uuid);
    if (!toCoin && coins?.length) setToUuid(coins[1]?.uuid ?? coins[0].uuid);
  }, [coins]);

  return (
    <PageLayout
      title="Exchange"
      subtitle="Swap any crypto asset instantly at live market rates across 200+ exchanges."
      badge="Instant Swap"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading && !coins && <PageSpinner />}
        {error && <ErrorBox message={error} onRetry={refetch} />}

        {coins && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-[#0D1424] border border-white/7 rounded-2xl p-6 space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white font-bold text-base">Swap Tokens</h2>
                  <LiveIndicator lastUpdated={lastUpdated} />
                </div>
                <div className="bg-white/3 border border-white/6 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-500 text-xs">From</span>
                    <span className="text-slate-600 text-xs">
                      Balance: 1.2840 {fromCoin?.symbol ?? "—"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <select value={fromUuid} onChange={(e) => setFromUuid(e.target.value)}
                      className="bg-white/5 border border-white/10 text-white text-sm font-bold rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500/50 cursor-pointer">
                      {coins.map((c: Coin) => (
                        <option key={c.uuid} value={c.uuid} style={{ background: "#0D1424" }}>
                          {c.symbol}
                        </option>
                      ))}
                    </select>
                    <input type="number" value={fromAmt} onChange={(e) => setFromAmt(e.target.value)}
                      className="flex-1 bg-transparent text-white text-xl font-bold text-right focus:outline-none placeholder:text-slate-700 min-w-0"
                      placeholder="0.00" step="any" min="0" />
                  </div>
                  <p className="text-slate-600 text-xs text-right mt-1">
                    ≈ ${(fromAmtNum * fromPrice).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="flex justify-center">
                  <button onClick={flip}
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2v12M3 9l5 5 5-5M13 7L8 2 3 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className="bg-white/3 border border-white/6 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-500 text-xs">To (estimated)</span>
                    <span className="text-slate-600 text-xs">
                      Balance: 0.0000 {toCoin?.symbol ?? "—"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <select value={toUuid} onChange={(e) => setToUuid(e.target.value)}
                      className="bg-white/5 border border-white/10 text-white text-sm font-bold rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500/50 cursor-pointer">
                      {coins.map((c: Coin) => (
                        <option key={c.uuid} value={c.uuid} style={{ background: "#0D1424" }}>
                          {c.symbol}
                        </option>
                      ))}
                    </select>
                    <p className="flex-1 text-right text-xl font-bold text-emerald-400 tabular-nums truncate">
                      {toAmt > 0 ? fmt(toAmt, 6) : "—"}
                    </p>
                  </div>
                  <p className="text-slate-600 text-xs text-right mt-1">
                    ≈ ${(toAmt * toPrice).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="bg-white/2 border border-white/5 rounded-xl p-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Live rate</span>
                    <span className="text-slate-300 tabular-nums">
                      1 {fromCoin?.symbol} = {rate > 0 ? fmt(rate, 6) : "—"} {toCoin?.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Fee (0.3%)</span>
                    <span className="text-slate-300">${feeUsd.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Slippage tolerance</span>
                    <div className="flex gap-1">
                      {["0.1", "0.5", "1.0"].map((s) => (
                        <button key={s} onClick={() => setSlippage(s)}
                          className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${slippage === s ? "bg-emerald-500/20 text-emerald-400" : "text-slate-500 hover:text-slate-300"
                            }`}>
                          {s}%
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Min. received</span>
                    <span className="text-slate-300 tabular-nums">
                      {minReceived > 0 ? fmt(minReceived, 6) : "—"} {toCoin?.symbol}
                    </span>
                  </div>
                </div>

                <button className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99]">
                  Connect Wallet to Swap
                </button>
                <p className="text-center text-slate-700 text-xs">Prices are indicative. Not financial advice.</p>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#0D1424] border border-white/7 rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-white font-bold text-sm">Live Exchange Rates</h3>
                  <LiveIndicator lastUpdated={lastUpdated} />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[480px]">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left px-5 py-3 text-slate-600 text-xs font-medium">Pair</th>
                        <th className="text-right px-5 py-3 text-slate-600 text-xs font-medium">Price (USD)</th>
                        <th className="text-right px-5 py-3 text-slate-600 text-xs font-medium">24h Change</th>
                        <th className="text-right px-5 py-3 text-slate-600 text-xs font-medium">24h Volume</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coins.slice(0, 8).map((c: Coin) => {
                        const pos = c.change24h >= 0;
                        return (
                          <tr key={c.uuid} className="border-b border-white/4 hover:bg-white/3 transition-colors">
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-2">
                                <img src={c.iconUrl} alt={c.name}
                                  className="w-7 h-7 rounded-full bg-white/5"
                                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                                />
                                <span className="text-white text-sm font-semibold">{c.symbol}/USD</span>
                              </div>
                            </td>
                            <td className="px-5 py-3 text-right text-white text-sm tabular-nums font-medium">
                              ${c.price < 1 ? c.price.toFixed(4) : c.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                            </td>
                            <td className="px-5 py-3 text-right">
                              <span className={`text-sm font-bold ${pos ? "text-emerald-400" : "text-red-400"}`}>
                                {pos ? "+" : ""}{c.change24h.toFixed(2)}%
                              </span>
                            </td>
                            <td className="px-5 py-3 text-right text-slate-400 text-sm">
                              ${c.volume24h >= 1e9
                                ? `${(c.volume24h / 1e9).toFixed(2)}B`
                                : `${(c.volume24h / 1e6).toFixed(0)}M`}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-[#0D1424] border border-white/7 rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-white font-bold text-sm">Recent Trades</h3>
                  <span className="text-xs text-slate-600">Demo data</span>
                </div>
                <div className="divide-y divide-white/4">
                  {RECENT_TRADES.map((t, i) => (
                    <div key={i} className="px-5 py-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 7h10M9 4l3 3-3 3" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white text-sm font-semibold">{t.from} → {t.to}</p>
                          <p className="text-slate-600 text-xs">{t.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-sm tabular-nums">{t.amount} {t.from}</p>
                        <p className="text-emerald-400 text-xs tabular-nums">+{t.received} {t.to}</p>
                      </div>
                      <span className="ml-4 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-semibold hidden sm:block">
                        completed
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export default ExchangePage