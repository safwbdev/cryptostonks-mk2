import { usePolling } from "../hooks/useFetch";
import { coinRankingApi } from "../data/api";
import type { Coin } from "../types/api";

function formatPrice(price: number): string {
  if (price < 1) return `$${price.toFixed(4)}`;
  if (price < 100) return `$${price.toFixed(2)}`;
  return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function TickerItem({ coin }: { coin: Coin }) {
  const pos = coin.change24h >= 0;
  return (
    <div className="flex items-center gap-2 text-sm shrink-0">
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-black shrink-0"
        style={{ backgroundColor: coin.color }}
      >
        {coin.symbol.slice(0, 1)}
      </span>
      <span className="text-slate-300 font-medium">{coin.symbol}</span>
      <span className="text-slate-500">{formatPrice(coin.price)}</span>
      <span className={`text-xs font-medium ${pos ? "text-emerald-400" : "text-red-400"}`}>
        {pos ? "▲" : "▼"} {Math.abs(coin.change24h).toFixed(2)}%
      </span>
      <span className="text-white/6 mx-2">|</span>
    </div>
  );
}

function TickerBar() {
  // Fetch top 20 coins, refresh every 30 seconds
  const { data: coins } = usePolling(
    () => coinRankingApi.getCoins({ limit: 20, orderBy: "marketCap" }),
    120_000
  );

  // Duplicate for seamless loop
  const items: Coin[] = coins ? [...coins, ...coins] : [];

  if (!coins) {
    // Minimal placeholder while loading
    return (
      <div className="bg-[#0A0F1E] border-b border-white/5 py-2.5 h-10" />
    );
  }

  return (
    <div className="bg-[#0A0F1E] border-b border-white/5 overflow-hidden py-2.5">
      <div
        className="flex gap-6 whitespace-nowrap w-max"
        style={{ animation: "ticker 40s linear infinite" }}
      >
        {items.map((coin, i) => (
          <TickerItem key={`${coin.uuid}-${i}`} coin={coin} />
        ))}
      </div>
    </div>
  );
}

export default TickerBar