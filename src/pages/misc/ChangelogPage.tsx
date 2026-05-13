import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { PageLayout } from "../../components";
import { Icon } from "../../components/Icon";

function ChangelogPage() {
    const entries = [
        { version: "v3.2.0", date: "May 1, 2025", type: "feature", items: ["AI price signals powered by on-chain data", "New 3Y and 5Y chart time periods", "Exchange page with real-time swap rates"] },
        { version: "v3.1.0", date: "Apr 10, 2025", type: "feature", items: ["Portfolio P&L tracking with cost basis", "Price Alerts with push notifications", "Improved mobile performance"] },
        { version: "v3.0.5", date: "Mar 28, 2025", type: "fix", items: ["Fixed sparkline rendering on Safari", "Corrected 7d volume calculation", "Improved API rate limit messaging"] },
        { version: "v3.0.0", date: "Mar 15, 2025", type: "major", items: ["Complete UI redesign", "New dark mode theme", "Component architecture rewrite in React + TypeScript", "10x faster initial load time"] },
    ];
    const typeColors: Record<string, string> = {
        major: "text-purple-400 bg-purple-500/10",
        feature: "text-emerald-400 bg-emerald-500/10",
        fix: "text-amber-400 bg-amber-500/10",
    };
    return (
        <PageLayout title="Changelog" subtitle="What's new, fixed, and improved in CryptoStonks." badge="Release Notes">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
                {entries.map((e) => (
                    <div key={e.version} className="bg-[#0D1424] border border-white/7 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                            <span className="text-white font-extrabold font-mono">{e.version}</span>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${typeColors[e.type]}`}>{e.type}</span>
                            <span className="text-slate-600 text-xs ml-auto">{e.date}</span>
                        </div>
                        <ul className="space-y-2">
                            {e.items.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-slate-400 text-sm">
                                    <Icon icon={faArrowRight} className="text-emerald-400 mt-1 shrink-0 text-xs" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </PageLayout>
    );
}

export default ChangelogPage