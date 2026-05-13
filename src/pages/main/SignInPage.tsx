import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/"); }, 1200);
  }

  return (
    <div className="min-h-screen bg-[#070B14] flex flex-col">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/4 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/4 blur-3xl" />
      </div>
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-16">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L14.5 5.5V12.5L9 16L3.5 12.5V5.5L9 2Z" stroke="white" strokeWidth="1.5" fill="none" />
              <circle cx="9" cy="9" r="2.5" fill="white" />
            </svg>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            Crypto<span className="text-emerald-400">Stonks</span>
          </span>
        </Link>
        <div className="w-full max-w-sm">
          <div className="bg-[#0D1424] border border-white/8 rounded-2xl p-8">
            <h1 className="text-white font-extrabold text-2xl text-center mb-1">Welcome back</h1>
            <p className="text-slate-500 text-sm text-center mb-8">Sign in to your account</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-slate-400 text-xs font-medium block mb-1.5">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/50 text-white placeholder:text-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-slate-400 text-xs font-medium">Password</label>
                  <a href="#" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">Forgot password?</a>
                </div>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/50 text-white placeholder:text-slate-700 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors"
                  >
                    {showPw ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8s2.5-5 6-5 6 5 6 5-2.5 5-6 5S2 8 2 8Z" stroke="currentColor" strokeWidth="1.4" /><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" /><path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8s2.5-5 6-5 6 5 6 5-2.5 5-6 5S2 8 2 8Z" stroke="currentColor" strokeWidth="1.4" /><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" /></svg>
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-black font-bold text-sm rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] mt-2"
              >
                {loading ? "Signing in…" : "Sign In"}
              </button>
            </form>
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-slate-700 text-xs">or continue with</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Google", "Twitter"].map((provider) => (
                <button
                  key={provider}
                  className="flex items-center justify-center gap-2 py-2.5 bg-white/4 hover:bg-white/8 border border-white/8 rounded-xl text-sm text-slate-300 font-medium transition-colors"
                >
                  {provider === "Google" ? "G" : "𝕏"} {provider}
                </button>
              ))}
            </div>
          </div>
          <p className="text-center text-slate-600 text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/get-started" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInPage