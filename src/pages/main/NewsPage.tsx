import { useState } from "react";
import { PageLayout } from "../../components";
import {
  Icon,
  faChartBar, faScaleBalanced, faCoins, faChartLine,
  faBolt, faGamepad, faNewspaper, faMagnifyingGlass, faFire,
} from "../../components/Icon";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

const CATEGORIES = ["All", "Bitcoin", "Ethereum", "DeFi", "NFTs", "Regulation", "Markets", "Technology"];

interface Article {
  id: number; category: string; title: string; excerpt: string;
  author: string; time: string; readTime: string; featured: boolean;
  tagLabel: string; tagIcon: IconProp; tagColor: string;
}

const ARTICLES: Article[] = [
  { id: 1, category: "Bitcoin", title: "Bitcoin Surges Past $68K as Institutional Demand Reaches Record Highs", excerpt: "Major asset managers report unprecedented inflows into Bitcoin ETFs, with total AUM surpassing $65 billion as Wall Street continues to embrace digital assets.", author: "Sarah Chen", time: "2 hours ago", readTime: "4 min read", featured: true, tagLabel: "Trending", tagIcon: faFire, tagColor: "text-orange-400 bg-orange-500/10" },
  { id: 2, category: "Ethereum", title: "Ethereum's Dencun Upgrade Slashes Layer-2 Transaction Fees by 90%", excerpt: "The highly anticipated EIP-4844 proto-danksharding is live, dramatically reducing the cost of posting data from rollups to Ethereum mainnet.", author: "Marcus Liu", time: "5 hours ago", readTime: "6 min read", featured: true, tagLabel: "Analysis", tagIcon: faChartBar, tagColor: "text-blue-400 bg-blue-500/10" },
  { id: 3, category: "Regulation", title: "SEC Approves Spot Ethereum ETF Applications From Major Fund Managers", excerpt: "In a landmark decision, the Securities and Exchange Commission granted approval to several spot Ethereum ETF applications, paving the way for institutional adoption.", author: "Jessica Park", time: "8 hours ago", readTime: "5 min read", featured: false, tagLabel: "Regulation", tagIcon: faScaleBalanced, tagColor: "text-purple-400 bg-purple-500/10" },
  { id: 4, category: "DeFi", title: "Total Value Locked in DeFi Protocols Reaches $120 Billion", excerpt: "Decentralized finance protocols are seeing a massive resurgence, with Uniswap, Aave, and Compound leading the charge as yield opportunities improve.", author: "Alex Rivera", time: "12 hours ago", readTime: "3 min read", featured: false, tagLabel: "DeFi", tagIcon: faCoins, tagColor: "text-emerald-400 bg-emerald-500/10" },
  { id: 5, category: "Markets", title: "Altcoin Season Incoming? Total Crypto Market Cap Eyes $3 Trillion", excerpt: "On-chain metrics suggest Bitcoin dominance may be peaking, historically a precursor to capital rotation into altcoins and the start of an altseason.", author: "David Kim", time: "1 day ago", readTime: "7 min read", featured: false, tagLabel: "Markets", tagIcon: faChartLine, tagColor: "text-cyan-400 bg-cyan-500/10" },
  { id: 6, category: "Technology", title: "Solana Processes 100,000 TPS in Stress Test, Eyes New Performance Records", excerpt: "The Solana network achieved a major milestone during a coordinated network stress test, processing over 100,000 transactions per second with no downtime.", author: "Priya Nair", time: "1 day ago", readTime: "4 min read", featured: false, tagLabel: "Technology", tagIcon: faBolt, tagColor: "text-yellow-400 bg-yellow-500/10" },
  { id: 7, category: "NFTs", title: "NFT Trading Volume Spikes 200% as New Gaming Ecosystem Launches", excerpt: "A new blockchain-based gaming platform has sparked renewed interest in NFT ownership, with daily trading volume exceeding $800 million for the first time in a year.", author: "Tom Walsh", time: "2 days ago", readTime: "5 min read", featured: false, tagLabel: "NFTs", tagIcon: faGamepad, tagColor: "text-pink-400 bg-pink-500/10" },
  { id: 8, category: "Bitcoin", title: "Lightning Network Capacity Surpasses 7,000 BTC for the First Time", excerpt: "Bitcoin's Layer-2 scaling solution continues to grow steadily, with node count and channel capacity both reaching all-time highs as adoption accelerates.", author: "Rachel Stone", time: "2 days ago", readTime: "3 min read", featured: false, tagLabel: "Bitcoin", tagIcon: faBolt, tagColor: "text-orange-400 bg-orange-500/10" },
];

const TRENDING = [
  "Bitcoin ETF Flows", "Ethereum Dencun", "Solana TVL",
  "Altcoin Season", "Fed Rate Decision", "DeFi Yields", "Layer 2 Adoption",
];

function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = ARTICLES.filter((a) => {
    const matchCat = activeCategory === "All" || a.category === activeCategory;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  const featured = filtered.filter((a) => a.featured);
  const regular = filtered.filter((a) => !a.featured);

  return (
    <PageLayout
      title="Crypto News"
      subtitle="Stay ahead with real-time news, analysis, and insights from across the crypto ecosystem."
      badge="Latest News"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-1 flex-wrap">
                {CATEGORIES.map((c) => (
                  <button key={c} onClick={() => setActiveCategory(c)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${activeCategory === c
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      : "text-slate-500 border-white/6 hover:text-slate-300 hover:border-white/12"
                      }`}>
                    {c}
                  </button>
                ))}
              </div>
              <div className="relative sm:ml-auto">
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search news..."
                  className="bg-white/5 border border-white/10 text-white placeholder:text-slate-600 rounded-xl px-4 py-2 pl-9 text-sm focus:outline-none focus:border-emerald-500/40 w-full sm:w-52" />
                <Icon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 text-xs" />
              </div>
            </div>
            {featured.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4">
                {featured.map((article) => (
                  <article key={article.id}
                    className="group bg-[#0D1424] border border-white/7 hover:border-white/14 rounded-2xl p-5 cursor-pointer transition-all hover:bg-white/3">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full ${article.tagColor}`}>
                        <Icon icon={article.tagIcon} className="text-[10px]" />
                        {article.tagLabel}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-base leading-snug mb-2 group-hover:text-emerald-300 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-600 pt-4 border-t border-white/5">
                      <span className="text-slate-500 font-medium">{article.author}</span>
                      <span>·</span><span>{article.time}</span>
                      <span>·</span><span>{article.readTime}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
            <div className="space-y-3">
              {regular.map((article) => (
                <article key={article.id}
                  className="group bg-[#0D1424] border border-white/7 hover:border-white/14 rounded-xl p-5 cursor-pointer transition-all hover:bg-white/3 flex gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full ${article.tagColor}`}>
                        <Icon icon={article.tagIcon} className="text-[10px]" />
                        {article.tagLabel}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold text-sm leading-snug mb-1.5 group-hover:text-emerald-300 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-1 mb-2">{article.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="text-slate-500">{article.author}</span>
                      <span>·</span><span>{article.time}</span>
                      <span>·</span><span>{article.readTime}</span>
                    </div>
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/5 to-white/2 border border-white/6 flex items-center justify-center shrink-0">
                    <Icon icon={article.tagIcon} className={`text-xl ${article.tagColor.split(" ")[0]}`} />
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-slate-600">
                <Icon icon={faNewspaper} className="text-4xl mb-3" />
                <p className="font-semibold text-slate-500">No articles found</p>
                <p className="text-sm mt-1">Try a different search or category</p>
              </div>
            )}
          </div>
          <div className="space-y-5">
            <div className="bg-[#0D1424] border border-white/7 rounded-2xl p-5">
              <h3 className="text-white font-bold text-sm mb-4">Trending Topics</h3>
              <div className="space-y-2">
                {TRENDING.map((topic, i) => (
                  <button key={topic} onClick={() => setSearch(topic)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors text-left">
                    <span className="text-slate-700 text-xs font-mono w-4">{i + 1}</span>
                    <span className="text-slate-400 text-sm hover:text-white transition-colors">{topic}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/8 to-cyan-500/8 border border-emerald-500/15 rounded-2xl p-5">
              <h3 className="text-white font-bold text-sm mb-1">Daily Digest</h3>
              <p className="text-slate-500 text-xs mb-4 leading-relaxed">
                Get the top 5 crypto stories delivered to your inbox every morning.
              </p>
              <input type="email" placeholder="your@email.com"
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500/40 mb-2" />
              <button className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold rounded-xl transition-colors">
                Subscribe Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default NewsPage