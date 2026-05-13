import { Link, useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#070B14] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/4 blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative text-center max-w-md">
        <div className="relative mb-6">
          <p
            className="text-[120px] font-extrabold leading-none tracking-tighter select-none"
            style={{
              background: "linear-gradient(135deg, #10B981 0%, #06B6D4 50%, #8B5CF6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            404
          </p>
          <div className="absolute top-1/2 -left-8 w-6 h-px bg-emerald-500/40" />
          <div className="absolute top-1/2 -right-8 w-6 h-px bg-emerald-500/40" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-6">
          Page not found
        </div>
        <h1 className="text-white font-extrabold text-2xl mb-3">
          This coin doesn't exist
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          Looks like this page went to zero. The URL you entered doesn't match
          any page on CryptoStonks.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 text-slate-300 hover:text-white border border-white/10 hover:border-white/25 px-5 py-2.5 rounded-xl text-sm transition-all"
          >
            ← Go back
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-5 py-2.5 rounded-xl text-sm transition-all hover:scale-[1.02]"
          >
            Back to Markets
          </Link>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-slate-600 text-xs mb-4">Popular pages</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: "Markets", to: "/" },
              { label: "Portfolio", to: "/portfolio" },
              { label: "Exchange", to: "/exchange" },
              { label: "News", to: "/news" },
              { label: "Learn", to: "/learn" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-xs text-slate-500 hover:text-emerald-400 border border-white/6 hover:border-emerald-500/30 px-3 py-1.5 rounded-lg transition-all"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage