import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { Icon } from "../../components/Icon";
import { PageLayout } from "../../components";
import { useState } from "react";

function HelpPage() {
    const [search, setSearch] = useState("");
    const faqs = [
        { q: "How do I create a price alert?", a: "Go to the Price Alerts page, select an asset, set your condition and target price, and click 'Create Alert'. You'll be notified via email when the price is reached." },
        { q: "Is my portfolio data stored securely?", a: "Yes. All portfolio data is encrypted at rest using AES-256 and in transit using TLS 1.3. We never sell your data to third parties." },
        { q: "How often is price data updated?", a: "Prices are updated in real-time from 200+ exchange feeds. The ticker updates every second; full market data refreshes every 30 seconds." },
        { q: "Can I export my portfolio data?", a: "Pro users can export portfolio data as CSV or JSON from the Portfolio page. Free users can export up to 5 assets." },
        { q: "What exchanges are supported?", a: "We aggregate data from 200+ exchanges including Binance, Coinbase, Kraken, OKX, Bybit, and more. See the full list in our documentation." },
        { q: "How do I get an API key?", a: "Sign up for a free account, go to Settings → API, and click 'Generate API Key'. Free tier gets 100 requests/minute." },
        { q: "Is there a mobile app?", a: "Yes! CryptoStonks is available on iOS (App Store) and Android (Google Play) with full feature parity and push notification support." },
        { q: "How do I cancel my Pro subscription?", a: "Go to Settings → Billing → Cancel Subscription. You'll keep Pro access until the end of your billing period." },
    ];
    const filtered = faqs.filter((f) => !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));
    return (
        <PageLayout title="Help Center" subtitle="Find answers to common questions or get in touch with our support team." badge="Support">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
                <div className="relative">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search help articles..."
                        className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/40 text-white placeholder:text-slate-600 rounded-2xl px-5 py-4 pl-12 text-sm focus:outline-none transition-colors" />
                    <Icon icon={faMagnifyingGlass} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 text-sm" />
                </div>
                <div className="space-y-3">
                    {filtered.map((f, i) => (
                        <details key={i} className="bg-[#0D1424] border border-white/7 rounded-xl group">
                            <summary className="px-5 py-4 text-white text-sm font-semibold cursor-pointer list-none flex items-center justify-between hover:text-emerald-300 transition-colors">
                                {f.q}
                                <span className="text-slate-600 group-open:text-emerald-400 transition-colors ml-3 shrink-0 text-lg leading-none">+</span>
                            </summary>
                            <p className="px-5 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">{f.a}</p>
                        </details>
                    ))}
                </div>
                {filtered.length === 0 && <p className="text-center text-slate-600 py-8">No results for "{search}"</p>}
                <div className="bg-gradient-to-br from-emerald-500/8 to-cyan-500/8 border border-white/6 rounded-2xl p-7 text-center">
                    <p className="text-white font-bold text-sm mb-1">Still need help?</p>
                    <p className="text-slate-500 text-xs mb-4">Our support team responds within 24 hours.</p>
                    <a href="/contact" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-2.5 rounded-xl text-sm transition-all">Contact Support</a>
                </div>
            </div>
        </PageLayout>
    );
}

export default HelpPage