import { faBullhorn, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { PageLayout } from "../../components";
import { Icon } from "../../components/Icon";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

function PressPage() {
    return (
        <PageLayout title="Press & Media" subtitle="Resources for journalists, analysts, and media professionals." badge="Press Room">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
                <div className="grid sm:grid-cols-2 gap-4">
                    {[
                        { title: "Press Kit", desc: "Download logos, screenshots, and brand assets.", icon: faBullhorn as IconProp, cta: "Download ZIP" },
                        { title: "Media Inquiries", desc: "For press inquiries, reach press@cryptostonks.io", icon: faEnvelope as IconProp, cta: "Send Email" },
                    ].map((r) => (
                        <div key={r.title} className="bg-[#0D1424] border border-white/7 rounded-2xl p-6">
                            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                                <Icon icon={r.icon} className="text-emerald-400 text-lg" />
                            </div>
                            <h3 className="text-white font-bold text-base mb-1">{r.title}</h3>
                            <p className="text-slate-500 text-sm mb-4">{r.desc}</p>
                            <button className="text-sm text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60 px-4 py-1.5 rounded-lg transition-colors">{r.cta}</button>
                        </div>
                    ))}
                </div>
                <div>
                    <h2 className="text-white font-bold text-lg mb-5">In The News</h2>
                    <div className="space-y-3">
                        {[
                            { pub: "TechCrunch", date: "Apr 2025", headline: "CryptoStonks raises $40M Series B to expand AI-powered crypto analytics" },
                            { pub: "Forbes", date: "Jan 2025", headline: "The 10 Best Crypto Tracking Apps of 2025" },
                            { pub: "Bloomberg", date: "Oct 2024", headline: "Retail crypto platforms see surge as Bitcoin approaches all-time highs" },
                            { pub: "The Block", date: "Jul 2024", headline: "CryptoStonks crosses 1 million users, launches API for developers" },
                        ].map((item) => (
                            <div key={item.headline} className="bg-[#0D1424] border border-white/7 rounded-xl p-4 flex gap-4 items-start cursor-pointer hover:border-white/14 transition-colors">
                                <div className="shrink-0 bg-white/4 border border-white/6 rounded-lg px-3 py-1.5 text-xs text-slate-400 font-semibold whitespace-nowrap">{item.pub}</div>
                                <div>
                                    <p className="text-white text-sm font-medium leading-snug">{item.headline}</p>
                                    <p className="text-slate-600 text-xs mt-1">{item.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

export default PressPage