import { PageLayout } from "../../components";
import { Icon } from "../../components/Icon";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { STATS, TEAM, TIMELINE } from "../../data/about";

function AboutPage() {
  return (
    <PageLayout
      title="About CryptoStonks"
      subtitle="We're on a mission to make professional-grade crypto data and tools accessible to everyone — not just Wall Street."
      badge="Our Story"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-white mb-5">Why we built this</h2>
            <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
              <p>The crypto market never sleeps — and neither should your data. We built CryptoStonks because we were frustrated with slow, cluttered, unreliable data sources clearly designed for institutions, not regular people.</p>
              <p>Our founders came from Goldman Sachs, Google, and Coinbase with one shared belief: every investor — whether you have $100 or $100 million — deserves the same quality of data and tools.</p>
              <p>Today, CryptoStonks serves over 2 million users in 150 countries, tracking 10,000+ assets across 200+ exchanges, updated every second.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-[#0D1424] border border-white/7 rounded-2xl p-5 text-center">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                  <Icon icon={s.icon as IconProp} className="text-emerald-400 text-base" />
                </div>
                <p className="text-white font-extrabold text-xl">{s.value}</p>
                <p className="text-slate-600 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-10 text-center">Our journey</h2>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-px bg-white/8" />
            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <div key={item.year} className={`relative flex gap-6 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="inline-block bg-[#0D1424] border border-white/8 rounded-xl p-4">
                      <p className="text-emerald-400 font-extrabold text-sm mb-1">{item.year}</p>
                      <p className="text-slate-400 text-xs leading-relaxed">{item.event}</p>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-start pt-4">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#070B14] relative z-10" />
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-3 text-center">Meet the team</h2>
          <p className="text-slate-500 text-sm text-center mb-10">A team of 40+ builders, designers, and data scientists passionate about crypto.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-[#0D1424] border border-white/7 rounded-2xl p-6 hover:border-white/14 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                  <Icon icon={member.icon as IconProp} className="text-emerald-400 text-lg" />
                </div>
                <h3 className="text-white font-bold text-base">{member.name}</h3>
                <p className="text-emerald-400 text-xs font-semibold mt-0.5 mb-3">{member.role}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-r from-emerald-500/8 via-cyan-500/8 to-purple-500/8 border border-white/6 rounded-2xl p-10 text-center">
          <h3 className="text-2xl font-extrabold text-white mb-2">Join our team</h3>
          <p className="text-slate-400 text-sm mb-6">We're hiring engineers, designers, and data scientists. Remote-first, mission-driven.</p>
          <a href="/careers" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-3 rounded-xl transition-all hover:scale-[1.02]">
            View Open Roles
            <Icon icon="arrow-right" className="text-xs" />
          </a>
        </div>
      </div>
    </PageLayout>
  );
}

export default AboutPage