// Raw API shapes from CoinRanking v2

export interface ApiCoin {
  uuid: string;
  symbol: string;
  name: string;
  color: string | null;
  iconUrl: string;
  marketCap: string;
  price: string;
  listedAt: number;
  tier: number;
  change: string;           // 24h % change
  rank: number;
  sparkline: (string | null)[];
  lowVolume: boolean;
  coinrankingUrl: string;
  "24hVolume": string;
  btcPrice: string;
  contractAddresses: string[];
}

export interface ApiCoinDetail extends ApiCoin {
  description: string;
  websiteUrl: string;
  links: { name: string; type: string; url: string }[];
  supply: {
    confirmed: boolean;
    supplyAt: number;
    max: string | null;
    total: string;
    circulating: string;
  };
  allTimeHigh: {
    price: string;
    timestamp: number;
  };
  numberOfMarkets: number;
  numberOfExchanges: number;
}

export interface ApiHistoryPoint {
  price: string | null;
  timestamp: number;
}

export interface ApiStats {
  totalCoins: number;
  totalMarkets: number;
  totalExchanges: number;
  totalMarketCap: string;
  total24hVolume: string;
  btcDominance: number;
  bestCoins: ApiCoin[];
  newestCoins: ApiCoin[];
}

// Normalised shapes used throughout the app

export interface Coin {
  uuid: string;
  symbol: string;
  name: string;
  color: string;
  iconUrl: string;
  rank: number;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  sparkline: number[];
  btcPrice: number;
}

export interface CoinDetail extends Coin {
  description: string;
  websiteUrl: string;
  links: { name: string; type: string; url: string }[];
  supply: {
    max: number | null;
    total: number;
    circulating: number;
  };
  allTimeHigh: {
    price: number;
    timestamp: number;
  };
  numberOfMarkets: number;
  numberOfExchanges: number;
}

export interface HistoryPoint {
  price: number;
  timestamp: number;
}

export interface GlobalStats {
  totalCoins: number;
  totalMarkets: number;
  totalExchanges: number;
  totalMarketCap: number;
  total24hVolume: number;
  btcDominance: number;
}

// Normalisation helpers

export function normaliseCoin(c: ApiCoin): Coin {
  return {
    uuid: c.uuid,
    symbol: c.symbol,
    name: c.name,
    color: c.color ?? "#10B981",
    iconUrl: c.iconUrl,
    rank: c.rank,
    price: parseFloat(c.price) || 0,
    change24h: parseFloat(c.change) || 0,
    marketCap: parseFloat(c.marketCap) || 0,
    volume24h: parseFloat(c["24hVolume"]) || 0,
    sparkline: (c.sparkline ?? [])
      .map((v) => parseFloat(v ?? "0"))
      .filter((v) => !isNaN(v) && isFinite(v)),
    btcPrice: parseFloat(c.btcPrice) || 0,
  };
}

export function normaliseCoinDetail(c: ApiCoinDetail): CoinDetail {
  return {
    ...normaliseCoin(c),
    description: c.description ?? "",
    websiteUrl: c.websiteUrl ?? "",
    links: c.links ?? [],
    supply: {
      max: c.supply?.max ? parseFloat(c.supply.max) : null,
      total: c.supply?.total ? parseFloat(c.supply.total) : 0,
      circulating: c.supply?.circulating ? parseFloat(c.supply.circulating) : 0,
    },
    allTimeHigh: {
      price: parseFloat(c.allTimeHigh?.price ?? "0"),
      timestamp: c.allTimeHigh?.timestamp ?? 0,
    },
    numberOfMarkets: c.numberOfMarkets ?? 0,
    numberOfExchanges: c.numberOfExchanges ?? 0,
  };
}

export function normaliseHistory(raw: ApiHistoryPoint[]): HistoryPoint[] {
  return raw
    .filter((p) => p.price !== null)
    .map((p) => ({
      price: parseFloat(p.price!),
      timestamp: p.timestamp,
    }))
    .filter((p) => !isNaN(p.price) && isFinite(p.price));
}
