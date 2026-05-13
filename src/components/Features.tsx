import { Link } from "react-router-dom";
import { features } from "../data/cryptoData";
import { Icon } from "./Icon";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

function Features() {
  return (
    <section className="py-24 bg-[#0A0F1E] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6">
            Why CryptoStonks
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything you need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              trade smarter
            </span>
          </h2>
          <p className="text-slate-400 text-lg">
            Professional-grade tools packed into a beautiful, easy-to-use interface.
            Built for beginners and experts alike.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative bg-white/3 hover:bg-white/5 border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background: i % 3 === 0
                    ? "radial-gradient(circle at 50% 0%, rgba(16,185,129,0.08), transparent 60%)"
                    : i % 3 === 1
                      ? "radial-gradient(circle at 50% 0%, rgba(6,182,212,0.08), transparent 60%)"
                      : "radial-gradient(circle at 50% 0%, rgba(139,92,246,0.08), transparent 60%)"
                }}
              />

              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center mb-4">
                <Icon icon={f.icon as IconProp} className="text-emerald-400 text-base" />
              </div>
              <h3 className="text-white font-semibold text-base mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-purple-500/10 border border-white/5 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">
            Ready to get started?
          </h3>
          <p className="text-slate-400 mb-6 text-sm">
            Join over 2 million investors tracking their crypto portfolio on CryptoStonks.
          </p>
          <Link
            to="/get-started"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-8 py-3 rounded-xl transition-all hover:scale-[1.02]"
          >
            Create free account
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Features