import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS } from "../data/links";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = (to: string) => to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070B14]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
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
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${isActive(link.to)
                  ? "text-emerald-400 font-medium bg-emerald-500/8"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Link to="/sign-in" className="text-sm text-slate-400 hover:text-white transition-colors px-3 py-2">
              Sign In
            </Link>
            <Link
              to="/get-started"
              className="text-sm font-medium bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-slate-400 hover:text-white p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#070B14] border-t border-white/5 px-4 py-4">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 text-sm rounded-lg transition-colors ${isActive(link.to)
                  ? "text-emerald-400 font-medium bg-emerald-500/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 mt-3 pt-3 border-t border-white/5">
              <Link
                to="/sign-in"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center text-sm text-slate-400 border border-white/10 hover:border-white/20 rounded-lg py-2.5"
              >
                Sign In
              </Link>
              <Link
                to="/get-started"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center text-sm font-medium bg-emerald-500 hover:bg-emerald-400 text-black rounded-lg py-2.5"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header