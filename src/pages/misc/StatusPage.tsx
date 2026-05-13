import { faCircleCheck } from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import { Icon } from "../../components/Icon";
import { PageLayout } from "../../components";

function StatusPage() {
    const services = [
        { name: "API", status: "operational", uptime: "99.99%" },
        { name: "Price Feeds", status: "operational", uptime: "99.97%" },
        { name: "Website", status: "operational", uptime: "100%" },
        { name: "Mobile Apps", status: "operational", uptime: "99.98%" },
        { name: "WebSocket", status: "operational", uptime: "99.95%" },
        { name: "Notifications", status: "degraded", uptime: "98.20%" },
    ];
    const statusStyles: Record<string, string> = {
        operational: "text-emerald-400 bg-emerald-500/10",
        degraded: "text-yellow-400 bg-yellow-500/10",
        down: "text-red-400 bg-red-500/10",
    };
    return (
        <PageLayout title="System Status" subtitle="Real-time status of all CryptoStonks systems and services." badge="Status">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <Icon icon={faCircleCheck} className="text-emerald-400 text-2xl" />
                    </div>
                    <div>
                        <p className="text-white font-bold">All major systems operational</p>
                        <p className="text-slate-500 text-xs mt-0.5">Last updated: just now · May 8, 2026, 12:00 UTC</p>
                    </div>
                </div>
                <div className="bg-[#0D1424] border border-white/7 rounded-2xl overflow-hidden">
                    {services.map((s, i) => (
                        <div key={s.name} className={`flex items-center justify-between px-5 py-4 ${i < services.length - 1 ? "border-b border-white/5" : ""}`}>
                            <div className="flex items-center gap-3">
                                <span className={`w-2 h-2 rounded-full ${s.status === "operational" ? "bg-emerald-400" : s.status === "degraded" ? "bg-yellow-400" : "bg-red-400"}`} />
                                <span className="text-white text-sm font-medium">{s.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-slate-600 text-xs hidden sm:block">{s.uptime} uptime (30d)</span>
                                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${statusStyles[s.status]}`}>{s.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-[#0D1424] border border-white/7 rounded-2xl p-5">
                    <h3 className="text-white font-bold text-sm mb-3">Recent Incidents</h3>
                    <p className="text-slate-600 text-sm flex items-center gap-2">
                        <Icon icon={faCircleCheck} className="text-emerald-600" /> No incidents in the past 30 days.
                    </p>
                </div>
            </div>
        </PageLayout>
    );
}

export default StatusPage