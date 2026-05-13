import { faBolt, faBoxOpen, faPlug, faRocket } from "@fortawesome/free-solid-svg-icons";
import { PageLayout } from "../../components";
import { Icon } from "../../components/Icon";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

function DocsPage() {
    const sections = [
        { title: "Getting Started", icon: faRocket as IconProp, items: ["Introduction", "Quick Start", "Authentication", "Rate Limits"] },
        { title: "REST API", icon: faPlug as IconProp, items: ["Coins Endpoint", "History Endpoint", "Exchanges Endpoint", "Markets Endpoint"] },
        { title: "WebSocket API", icon: faBolt as IconProp, items: ["Connection", "Subscribing to Prices", "Unsubscribing", "Error Handling"] },
        { title: "SDKs & Libraries", icon: faBoxOpen as IconProp, items: ["JavaScript / TypeScript", "Python", "Rust", "Go"] },
    ];
    return (
        <PageLayout title="Documentation" subtitle="Everything you need to integrate CryptoStonks data into your apps." badge="Developer Docs">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                    {sections.map((s) => (
                        <div key={s.title} className="bg-[#0D1424] border border-white/7 hover:border-white/14 rounded-2xl p-5 cursor-pointer transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                                <Icon icon={s.icon} className="text-emerald-400 text-base" />
                            </div>
                            <h3 className="text-white font-bold text-sm mb-3">{s.title}</h3>
                            <ul className="space-y-1.5">
                                {s.items.map((item) => (
                                    <li key={item} className="text-slate-500 text-xs hover:text-emerald-400 cursor-pointer transition-colors">→ {item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="bg-[#0D1424] border border-white/7 rounded-2xl p-6">
                    <h3 className="text-white font-bold text-sm mb-3">Quick Start</h3>
                    <pre className="text-xs font-mono text-slate-400 leading-relaxed bg-black/30 rounded-xl p-5 overflow-x-auto">
                        {`// Install the SDK
                            npm install @cryptostonks/sdk

                            // Initialize
                            import { CryptoStonks } from '@cryptostonks/sdk';
                            const client = new CryptoStonks({ apiKey: 'YOUR_API_KEY' });

                            // Get top coins
                            const { coins } = await client.getCoins({ limit: 10 });
                            console.log(coins[0].name, coins[0].price);

                            // Get price history
                            const { history } = await client.getCoinHistory({
                            uuid: 'Qwsogvtv82FCd',
                            timePeriod: '30d'
                        });`}
                    </pre>
                </div>
            </div>
        </PageLayout>
    );
}

export default DocsPage