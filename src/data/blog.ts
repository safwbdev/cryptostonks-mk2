import { faBook, faChartBar, faChess, faScaleBalanced } from "@fortawesome/free-solid-svg-icons";

const POSTS = [
    { slug: "bitcoin-halving-2024", category: "Analysis", title: "The 2024 Bitcoin Halving: What Every Investor Should Know", excerpt: "Every four years, Bitcoin's block reward is cut in half. We break down the mechanics, historical price impacts, and what to expect this cycle.", author: "Maya Reyes", date: "Apr 15, 2025", readTime: "8 min", featured: true, icon: faChartBar },
    { slug: "defi-yields-explained", category: "Education", title: "DeFi Yield Farming Explained: A Plain-English Guide", excerpt: "Yield farming can seem intimidating, but the core concepts are straightforward. Learn how liquidity pools, AMMs, and APY actually work.", author: "Priya Sharma", date: "Apr 10, 2025", readTime: "6 min", featured: true, icon: faBook },
    { slug: "solana-vs-ethereum", category: "Comparison", title: "Solana vs Ethereum in 2025: Which Chain Wins?", excerpt: "We compare TPS, fees, developer ecosystem, and total value locked to determine which smart contract platform has the edge heading into the bull run.", author: "James Okafor", date: "Apr 5, 2025", readTime: "10 min", featured: false, icon: faScaleBalanced },
    { slug: "portfolio-rebalancing", category: "Strategy", title: "When and How to Rebalance Your Crypto Portfolio", excerpt: "Rebalancing is one of the most underutilized tools in a crypto investor's toolkit. Here's a data-driven approach to keeping your allocation optimal.", author: "Sam Torres", date: "Apr 1, 2025", readTime: "5 min", featured: false, icon: faChess },
    { slug: "stablecoins-guide", category: "Education", title: "The Complete Guide to Stablecoins: USDC, USDT, DAI and More", excerpt: "Not all stablecoins are created equal. We examine the risks, collateralization, and use cases of the most popular dollar-pegged assets.", author: "Luca Benedetti", date: "Mar 28, 2025", readTime: "7 min", featured: false, icon: faBook },
    { slug: "on-chain-metrics", category: "Analysis", title: "5 On-Chain Metrics That Predicted the Last Bitcoin Bull Run", excerpt: "MVRV ratio, NVT signal, exchange reserves — these on-chain indicators told the story before price did. Here's what they're saying now.", author: "Luca Benedetti", date: "Mar 20, 2025", readTime: "9 min", featured: false, icon: faChartBar },
];

const CATS = ["All", "Analysis", "Education", "Strategy", "Comparison"];

const CAT_COLORS: Record<string, string> = {
    Analysis: "text-blue-400 bg-blue-500/10",
    Education: "text-emerald-400 bg-emerald-500/10",
    Strategy: "text-purple-400 bg-purple-500/10",
    Comparison: "text-amber-400 bg-amber-500/10",
};

export { POSTS, CATS, CAT_COLORS }