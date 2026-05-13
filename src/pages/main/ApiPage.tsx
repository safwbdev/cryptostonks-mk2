import { useState } from "react";
import { PageLayout } from "../../components";

const ENDPOINTS = [
  {
    method: "GET", path: "/v1/coins", tag: "Coins",
    description: "Returns a list of coins with current prices, market cap, and other market data.",
    params: [
      { name: "limit", type: "integer", required: false, desc: "Number of coins to return (default: 50, max: 100)" },
      { name: "offset", type: "integer", required: false, desc: "Number of coins to skip (default: 0)" },
      { name: "orderBy", type: "string", required: false, desc: "Order results by: price, marketCap, 24hVolume, change" },
      { name: "timePeriod", type: "string", required: false, desc: "Time period for change: 1h, 3h, 12h, 24h, 7d, 30d, 1y" },
    ],
    response: `{
  "status": "success",
  "data": {
    "stats": { "total": 22481, "totalCoins": 22481 },
    "coins": [
      {
        "uuid": "Qwsogvtv82FCd",
        "symbol": "BTC",
        "name": "Bitcoin",
        "color": "#f7931A",
        "iconUrl": "https://cdn.coinranking.com/Sy33Krudb/btc.svg",
        "marketCap": "1340000000000",
        "price": "68420.55",
        "change": "2.34",
        "rank": 1,
        "sparkline": ["62000", "63500", ...]
      }
    ]
  }
}`,
  },
  {
    method: "GET", path: "/v1/coin/:uuid", tag: "Coins",
    description: "Returns detailed data for a single coin, including supply, ATH, and description.",
    params: [
      { name: "uuid", type: "string", required: true, desc: "The UUID of the coin" },
      { name: "timePeriod", type: "string", required: false, desc: "Time period for change: 24h, 7d, 30d, 1y" },
    ],
    response: `{
  "status": "success",
  "data": {
    "coin": {
      "uuid": "Qwsogvtv82FCd",
      "symbol": "BTC",
      "name": "Bitcoin",
      "price": "68420.55",
      "marketCap": "1340000000000",
      "allTimeHigh": { "price": "73738.00", "timestamp": 1710374400 },
      "supply": {
        "circulating": "19587150",
        "total": "19587150",
        "max": "21000000"
      }
    }
  }
}`,
  },
  {
    method: "GET", path: "/v1/coin/:uuid/history", tag: "Coins",
    description: "Returns historical price data for a coin over a specified time period.",
    params: [
      { name: "uuid", type: "string", required: true, desc: "The UUID of the coin" },
      { name: "timePeriod", type: "string", required: true, desc: "Time period: 1h, 3h, 12h, 24h, 7d, 30d, 3m, 6m, 1y, 3y, 5y" },
    ],
    response: `{
  "status": "success",
  "data": {
    "change": "2.34",
    "history": [
      { "price": "62000.00", "timestamp": 1709769600 },
      { "price": "63500.00", "timestamp": 1709856000 },
      ...
    ]
  }
}`,
  },
  {
    method: "GET", path: "/v1/exchanges", tag: "Exchanges",
    description: "Returns a list of exchanges with volume, number of markets, and supported coins.",
    params: [
      { name: "limit", type: "integer", required: false, desc: "Number of exchanges to return (default: 20)" },
      { name: "offset", type: "integer", required: false, desc: "Number of exchanges to skip" },
    ],
    response: `{
  "status": "success",
  "data": {
    "exchanges": [
      {
        "uuid": "x1RLWF",
        "name": "Binance",
        "iconUrl": "...",
        "volume": "28400000000",
        "numberOfMarkets": 1400,
        "numberOfCoins": 385
      }
    ]
  }
}`,
  },
];

const METHOD_COLORS: Record<string, string> = {
  GET: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  POST: "text-blue-400   bg-blue-500/10   border-blue-500/20",
  DELETE: "text-red-400    bg-red-500/10    border-red-500/20",
};

function ApiPage() {
  const [activeEndpoint, setActiveEndpoint] = useState(ENDPOINTS[0]);
  const [apiKey] = useState("cs_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  const [copied, setCopied] = useState(false);

  function copy(text: string) {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <PageLayout
      title="API Reference"
      subtitle="Integrate real-time crypto data into your apps with our fast, reliable REST API."
      badge="Developer API"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-[#0D1424] border border-white/8 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-white font-bold text-sm mb-1">Your API Key</p>
            <p className="text-slate-600 text-xs">Include in the <code className="text-emerald-400">x-access-token</code> header with every request.</p>
          </div>
          <div className="flex items-center gap-2 bg-white/3 border border-white/8 rounded-xl px-4 py-2.5 font-mono text-sm text-emerald-400 min-w-0">
            <span className="truncate">{apiKey}</span>
            <button onClick={() => copy(apiKey)} className="shrink-0 text-slate-600 hover:text-white transition-colors ml-2">
              {copied ? "✓" : <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><path d="M2 10V2h8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/3 border border-white/6 rounded-xl px-4 py-3 mb-8 font-mono text-sm">
          <span className="text-slate-600">Base URL:</span>
          <span className="text-cyan-400">https://api.cryptostonks.io</span>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="space-y-1">
            <p className="text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3 px-2">Endpoints</p>
            {ENDPOINTS.map((ep) => (
              <button
                key={ep.path}
                onClick={() => setActiveEndpoint(ep)}
                className={`w-full text-left px-3 py-2.5 rounded-xl transition-colors ${activeEndpoint.path === ep.path
                  ? "bg-white/6 border border-white/8"
                  : "hover:bg-white/3"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${METHOD_COLORS[ep.method]}`}>
                    {ep.method}
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-1 font-mono truncate">{ep.path}</p>
              </button>
            ))}
          </div>
          <div className="lg:col-span-3 space-y-5">
            <div className="bg-[#0D1424] border border-white/8 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${METHOD_COLORS[activeEndpoint.method]}`}>
                  {activeEndpoint.method}
                </span>
                <code className="text-slate-200 font-mono text-sm">{activeEndpoint.path}</code>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{activeEndpoint.description}</p>
            </div>
            <div className="bg-[#0D1424] border border-white/8 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/6">
                <h3 className="text-white font-bold text-sm">Parameters</h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left px-5 py-3 text-slate-600 text-xs">Name</th>
                    <th className="text-left px-5 py-3 text-slate-600 text-xs">Type</th>
                    <th className="text-left px-5 py-3 text-slate-600 text-xs">Required</th>
                    <th className="text-left px-5 py-3 text-slate-600 text-xs">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {activeEndpoint.params.map((p) => (
                    <tr key={p.name} className="border-b border-white/4">
                      <td className="px-5 py-3">
                        <code className="text-cyan-400 text-xs font-mono">{p.name}</code>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-purple-400 text-xs font-mono">{p.type}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-xs font-semibold ${p.required ? "text-orange-400" : "text-slate-600"}`}>
                          {p.required ? "required" : "optional"}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-slate-500 text-xs">{p.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-[#0D1424] border border-white/8 rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/6 flex items-center justify-between">
                <h3 className="text-white font-bold text-sm">Example Response</h3>
                <button
                  onClick={() => copy(activeEndpoint.response)}
                  className="text-xs text-slate-500 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              </div>
              <pre className="px-5 py-4 text-xs text-slate-400 font-mono overflow-x-auto leading-relaxed bg-black/20">
                {activeEndpoint.response}
              </pre>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "Free tier", value: "100 req/min", sub: "No API key required" },
                { label: "Pro tier", value: "1,000 req/min", sub: "With API key" },
                { label: "Enterprise", value: "Unlimited", sub: "Custom SLA" },
              ].map((t) => (
                <div key={t.label} className="bg-white/3 border border-white/6 rounded-xl p-4">
                  <p className="text-slate-500 text-xs mb-1">{t.label}</p>
                  <p className="text-white font-bold text-sm">{t.value}</p>
                  <p className="text-slate-700 text-xs mt-0.5">{t.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default ApiPage