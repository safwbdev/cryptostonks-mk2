import { useState } from "react";
import { PageLayout } from "../../components";
import { PageSpinner, ErrorBox, LiveIndicator } from "../../components/LoadingStates";
import { Icon, faBell, faArrowUp, faArrowDown, faXmark, faCheck } from "../../components/Icon";
import { coinRankingApi } from "../../data/api";
import { usePolling } from "../../hooks/useFetch";
import type { Coin } from "../../types/api";

interface Alert {
  id: number; uuid: string; condition: "above" | "below";
  price: number; active: boolean; triggered?: boolean; createdAt: Date;
}

const INITIAL_ALERTS: Alert[] = [
  { id: 1, uuid: "Qwsogvtv82FCd", condition: "above", price: 75000, active: true, createdAt: new Date() },
  { id: 2, uuid: "Qwsogvtv82FCd", condition: "below", price: 60000, active: true, createdAt: new Date() },
  { id: 3, uuid: "razxDUgYGNAdQ", condition: "above", price: 4000, active: true, createdAt: new Date() },
  { id: 4, uuid: "zNZHO_Sjf", condition: "above", price: 200, active: false, triggered: true, createdAt: new Date() },
];

function fmtP(n: number) {
  if (n < 1) return `$${n.toFixed(6)}`;
  if (n < 100) return `$${n.toFixed(2)}`;
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function PriceAlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [selUuid, setSelUuid] = useState("Qwsogvtv82FCd");
  const [condition, setCondition] = useState<"above" | "below">("above");
  const [alertPrice, setAlertPrice] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const { data: coins, loading, error, refetch } = usePolling(
    () => coinRankingApi.getCoins({ limit: 20, orderBy: "marketCap" })
      .then((c) => { setLastUpdated(new Date()); return c; }),
    120_000
  );

  const selectedCoin = coins?.find((c: Coin) => c.uuid === selUuid);

  const enrichedAlerts = alerts.map((alert) => {
    const coin = coins?.find((c: Coin) => c.uuid === alert.uuid);
    if (!coin || alert.triggered || !alert.active) return { ...alert, coin };
    const nowTriggered =
      (alert.condition === "above" && coin.price >= alert.price) ||
      (alert.condition === "below" && coin.price <= alert.price);
    return { ...alert, coin, triggered: nowTriggered };
  });

  function addAlert(e: React.FormEvent) {
    e.preventDefault();
    if (!alertPrice) return;
    setAlerts((prev) => [
      { id: Date.now(), uuid: selUuid, condition, price: parseFloat(alertPrice), active: true, createdAt: new Date() },
      ...prev,
    ]);
    setAlertPrice("");
  }

  return (
    <PageLayout title="Price Alerts" subtitle="Get notified the moment any asset crosses your target price." badge="Smart Alerts">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {loading && !coins && <PageSpinner />}
        {error && <ErrorBox message={error} onRetry={refetch} />}

        {coins && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-[#0D1424] border border-white/7 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-white font-bold text-base">Create New Alert</h2>
                  <LiveIndicator lastUpdated={lastUpdated} />
                </div>
                <form onSubmit={addAlert} className="space-y-4">
                  <div>
                    <label className="text-slate-500 text-xs font-medium block mb-1.5">Asset</label>
                    <select value={selUuid} onChange={(e) => setSelUuid(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/50 text-white rounded-xl px-4 py-3 text-sm focus:outline-none cursor-pointer">
                      {coins.map((c: Coin) => (
                        <option key={c.uuid} value={c.uuid} style={{ background: "#0D1424" }}>
                          {c.name} ({c.symbol})
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedCoin && (
                    <div className="bg-white/3 rounded-xl px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={selectedCoin.iconUrl} alt={selectedCoin.name}
                          className="w-6 h-6 rounded-full bg-white/5"
                          onError={(e) => { e.currentTarget.style.display = "none"; }} />
                        <span className="text-slate-400 text-xs">{selectedCoin.symbol} live price</span>
                      </div>
                      <div className="text-right">
                        <span className="text-white font-bold text-sm tabular-nums">{fmtP(selectedCoin.price)}</span>
                        <span className={`ml-2 text-xs font-semibold ${selectedCoin.change24h >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                          <Icon icon={selectedCoin.change24h >= 0 ? faArrowUp : faArrowDown} className="text-[10px] mr-0.5" />
                          {Math.abs(selectedCoin.change24h).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-slate-500 text-xs font-medium block mb-1.5">Condition</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["above", "below"] as const).map((c) => (
                        <button key={c} type="button" onClick={() => setCondition(c)}
                          className={`py-2.5 rounded-xl text-sm font-semibold transition-all border flex items-center justify-center gap-2 ${condition === c
                            ? c === "above"
                              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40"
                              : "bg-red-500/15 text-red-400 border-red-500/40"
                            : "text-slate-500 border-white/8 hover:border-white/16"
                            }`}>
                          <Icon icon={c === "above" ? faArrowUp : faArrowDown} className="text-xs" />
                          Price {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-500 text-xs font-medium block mb-1.5">Target Price</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                      <input type="number" value={alertPrice} onChange={(e) => setAlertPrice(e.target.value)}
                        required placeholder="0.00" step="any" min="0"
                        className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/50 text-white placeholder:text-slate-700 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none transition-colors" />
                    </div>
                    {selectedCoin && alertPrice && (
                      <p className="text-slate-600 text-xs mt-1.5">
                        {(((parseFloat(alertPrice) - selectedCoin.price) / selectedCoin.price) * 100) >= 0 ? "+" : ""}
                        {(((parseFloat(alertPrice) - selectedCoin.price) / selectedCoin.price) * 100).toFixed(2)}% from current price
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-slate-500 text-xs font-medium block mb-1.5">Notify via</label>
                    <div className="flex gap-4 flex-wrap">
                      {["Email", "Push", "SMS"].map((m) => (
                        <label key={m} className="flex items-center gap-1.5 cursor-pointer">
                          <input type="checkbox" defaultChecked={m === "Email"} className="accent-emerald-400" />
                          <span className="text-slate-400 text-xs">{m}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button type="submit"
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm rounded-xl transition-all hover:scale-[1.01] flex items-center justify-center gap-2">
                    <Icon icon={faBell} className="text-xs" />
                    Create Alert
                  </button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-bold text-base">
                  Your Alerts <span className="ml-2 text-xs font-normal text-slate-600">({alerts.length} total)</span>
                </h2>
                <div className="flex gap-2 text-xs">
                  <span className="text-emerald-400 font-semibold">{enrichedAlerts.filter((a) => a.active && !a.triggered).length} active</span>
                  <span className="text-slate-700">·</span>
                  <span className="text-yellow-400 font-semibold">{enrichedAlerts.filter((a) => a.triggered).length} triggered</span>
                </div>
              </div>
              {enrichedAlerts.length === 0 && (
                <div className="bg-[#0D1424] border border-white/7 rounded-2xl p-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/8 flex items-center justify-center mx-auto mb-4">
                    <Icon icon={faBell} className="text-slate-600 text-2xl" />
                  </div>
                  <p className="text-white font-semibold mb-1">No alerts yet</p>
                  <p className="text-slate-600 text-sm">Create your first price alert using the form</p>
                </div>
              )}
              <div className="space-y-3">
                {enrichedAlerts.map((alert) => {
                  if (!alert.coin) return null;
                  const isAbove = alert.condition === "above";
                  const pctAway = ((alert.price - alert.coin.price) / alert.coin.price) * 100;
                  return (
                    <div key={alert.id}
                      className={`bg-[#0D1424] border rounded-2xl p-5 transition-all ${alert.triggered ? "border-yellow-500/25 opacity-75" :
                        alert.active ? "border-white/8" : "border-white/4 opacity-50"
                        }`}>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <img src={alert.coin.iconUrl} alt={alert.coin.name}
                            className="w-10 h-10 rounded-full bg-white/5 shrink-0"
                            onError={(e) => { e.currentTarget.style.display = "none"; }} />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-white font-semibold text-sm">{alert.coin.name}</p>
                              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2 py-0.5 rounded-full ${alert.triggered ? "text-yellow-400 bg-yellow-500/10" :
                                isAbove ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10"
                                }`}>
                                {alert.triggered
                                  ? <><Icon icon={faCheck} className="text-[10px]" /> Triggered</>
                                  : <><Icon icon={isAbove ? faArrowUp : faArrowDown} className="text-[10px]" /> {isAbove ? "Above" : "Below"}</>
                                }
                                {" "}{fmtP(alert.price)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-600">
                              <span>Current: <span className="text-slate-400 font-medium">{fmtP(alert.coin.price)}</span></span>
                              <span>·</span>
                              <span className={`font-medium ${pctAway >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                                {pctAway >= 0 ? "+" : ""}{pctAway.toFixed(2)}% {alert.price > alert.coin.price ? "away" : "past target"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {!alert.triggered && (
                            <button onClick={() => setAlerts((p) => p.map((a) => a.id === alert.id ? { ...a, active: !a.active } : a))}
                              className={`relative w-10 h-5 rounded-full transition-colors ${alert.active ? "bg-emerald-500" : "bg-white/10"}`}>
                              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${alert.active ? "translate-x-5" : "translate-x-0.5"}`} />
                            </button>
                          )}
                          <button onClick={() => setAlerts((p) => p.filter((a) => a.id !== alert.id))}
                            className="text-slate-700 hover:text-red-400 transition-colors p-1.5">
                            <Icon icon={faXmark} className="text-sm" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export default PriceAlertsPage