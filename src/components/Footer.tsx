import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { FOOTER_LINKS, SOCIALS } from "../data/links";

function Footer() {
  return (
    <footer className="bg-[#070B14] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L14.5 5.5V12.5L9 16L3.5 12.5V5.5L9 2Z" stroke="white" strokeWidth="1.5" fill="none" />
                  <circle cx="9" cy="9" r="2.5" fill="white" />
                </svg>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Crypto<span className="text-emerald-400">Stonks</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              Real-time crypto market data for everyone. Track, analyze, and grow your portfolio.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <Link
                  key={s.title}
                  to={s.to}
                  aria-label={s.title}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 flex items-center justify-center transition-colors"
                >
                  <Icon icon={s.icon} className={`${s.iconColor} text-xl`} />
                </Link>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white text-sm font-semibold mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            © 2025 CryptoStonks. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <Link to="/status" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
              All systems operational
            </Link>
          </div>
          <p className="text-slate-700 text-xs text-center sm:text-right">
            Prices are for informational purposes only. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer 