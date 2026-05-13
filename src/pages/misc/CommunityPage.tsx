import { PageLayout } from "../../components";
import { Icon } from "../../components/Icon";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faDiscord } from "@fortawesome/free-brands-svg-icons/faDiscord";
import { faTelegram } from "@fortawesome/free-brands-svg-icons/faTelegram";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons/faXTwitter";
import { faYoutube } from "@fortawesome/free-brands-svg-icons/faYoutube";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons/faNewspaper";
import { faReddit } from "@fortawesome/free-brands-svg-icons/faReddit";

function CommunityPage() {
    return (
        <PageLayout title="Community" subtitle="Connect with 2 million+ crypto enthusiasts, traders, and builders." badge="CryptoStonks Community">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[
                        { icon: faDiscord as IconProp, iconColor: "text-indigo-400", name: "Discord", members: "85,000+", desc: "Join our Discord server for real-time market discussions, signals, and community events.", cta: "Join Discord", color: "border-indigo-500/30" },
                        { icon: faXTwitter as IconProp, iconColor: "text-slate-300", name: "Twitter/X", members: "420,000+", desc: "Follow @CryptoStonks for market updates, product news, and community highlights.", cta: "Follow Us", color: "border-slate-500/30" },
                        { icon: faTelegram as IconProp, iconColor: "text-blue-400", name: "Telegram", members: "64,000+", desc: "Get instant price alerts and market updates delivered to your Telegram.", cta: "Join Channel", color: "border-blue-500/30" },
                        { icon: faYoutube as IconProp, iconColor: "text-red-400", name: "YouTube", members: "28,000+", desc: "Weekly market analysis, tutorials, and deep dives on our YouTube channel.", cta: "Subscribe", color: "border-red-500/30" },
                        { icon: faNewspaper as IconProp, iconColor: "text-emerald-400", name: "Newsletter", members: "120,000+", desc: "Our daily digest lands in 120,000 inboxes every morning with the top 5 stories.", cta: "Subscribe Free", color: "border-emerald-500/30" },
                        { icon: faReddit as IconProp, iconColor: "text-orange-400", name: "Reddit", members: "31,000+", desc: "r/CryptoStonks — community-led discussion, research, and memes.", cta: "Join Subreddit", color: "border-orange-500/30" },
                    ].map((c) => (
                        <div key={c.name} className={`bg-[#0D1424] border ${c.color} rounded-2xl p-6`}>
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-4">
                                <Icon icon={c.icon} className={`${c.iconColor} text-xl`} />
                            </div>
                            <div className="flex items-baseline gap-2 mb-1">
                                <h3 className="text-white font-bold text-base">{c.name}</h3>
                                <span className="text-slate-600 text-xs">{c.members} members</span>
                            </div>
                            <p className="text-slate-500 text-xs leading-relaxed mb-5">{c.desc}</p>
                            <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/8 text-white text-xs font-semibold rounded-xl transition-colors">{c.cta}</button>
                        </div>
                    ))}
                </div>
            </div>
        </PageLayout>
    );
}

export default CommunityPage