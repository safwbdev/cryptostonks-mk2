import { useState } from "react";
import { PageLayout } from "../../components";
import { faCircleCheck, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { Icon } from "../../components/Icon";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

function ContactPage() {
    const [sent, setSent] = useState(false);
    return (
        <PageLayout title="Contact Us" subtitle="Have a question, feedback, or partnership inquiry? We'd love to hear from you." badge="Get in Touch">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-2 gap-10">
                    <div className="space-y-5">
                        {[
                            { icon: faEnvelope, label: "Email", value: "hello@cryptostonks.io", sub: "We reply within 24 hours" },
                            { icon: faXTwitter, label: "Twitter", value: "@CryptoStonks", sub: "DMs are open" },
                            { icon: faDiscord, label: "Discord", value: "discord.gg/cryptostonks", sub: "Community support" },
                        ].map((c) => (
                            <div key={c.label} className="bg-[#0D1424] border border-white/7 rounded-xl p-5 flex items-center gap-4">
                                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                                    <Icon icon={c.icon as IconProp} className="text-emerald-400 text-lg" />
                                </div>
                                <div>
                                    <p className="text-slate-500 text-xs">{c.label}</p>
                                    <p className="text-white font-semibold text-sm mt-0.5">{c.value}</p>
                                    <p className="text-slate-600 text-xs mt-0.5">{c.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-[#0D1424] border border-white/7 rounded-2xl p-7">
                        {sent ? (
                            <div className="text-center py-10">
                                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                                    <Icon icon={faCircleCheck} className="text-emerald-400 text-3xl" />
                                </div>
                                <p className="text-white font-bold text-lg mb-2">Message sent!</p>
                                <p className="text-slate-500 text-sm">We'll get back to you within 24 hours.</p>
                            </div>
                        ) : (
                            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                                <h3 className="text-white font-bold text-base mb-5">Send a Message</h3>
                                {[
                                    { label: "Name", type: "text", placeholder: "Your name" },
                                    { label: "Email", type: "email", placeholder: "you@example.com" },
                                    { label: "Subject", type: "text", placeholder: "What's this about?" },
                                ].map((f) => (
                                    <div key={f.label}>
                                        <label className="text-slate-500 text-xs font-medium block mb-1.5">{f.label}</label>
                                        <input required type={f.type} placeholder={f.placeholder}
                                            className="w-full bg-white/4 border border-white/8 focus:border-emerald-500/50 text-white placeholder:text-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors" />
                                    </div>
                                ))}
                                <div>
                                    <label className="text-slate-500 text-xs font-medium block mb-1.5">Message</label>
                                    <textarea required rows={4} placeholder="Tell us how we can help..."
                                        className="w-full bg-white/4 border border-white/8 focus:border-emerald-500/50 text-white placeholder:text-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors resize-none" />
                                </div>
                                <button type="submit" className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm rounded-xl transition-all hover:scale-[1.01]">
                                    Send Message →
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}

export default ContactPage