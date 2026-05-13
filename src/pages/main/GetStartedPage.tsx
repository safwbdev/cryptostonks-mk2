import { useState } from "react";
import { Icon, faEnvelopeOpenText } from "../../components/Icon";
import { Link, useNavigate } from "react-router-dom";
import { PLANS } from "../../data/plans";

const STEPS = ["Create account", "Choose plan", "Verify email"];

function GetStartedPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [plan, setPlan] = useState<"free" | "pro">("free");
  const [loading, setLoading] = useState(false);

  function nextStep(e: React.FormEvent) {
    e.preventDefault();
    if (step < 2) { setStep((s) => s + 1); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/"); }, 1200);
  }

  return (
    <div className="min-h-screen bg-[#070B14] flex flex-col">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-emerald-500/4 blur-3xl" />
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
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${i < step ? "bg-emerald-500/20 text-emerald-400" :
                i === step ? "bg-emerald-500 text-black" :
                  "bg-white/5 text-slate-600"
                }`}>
                {i < step ? "✓" : i + 1} {s}
              </div>
              {i < STEPS.length - 1 && <div className="w-6 h-px bg-white/10" />}
            </div>
          ))}
        </div>

        <div className="w-full max-w-sm">
          {step === 0 && (
            <div className="bg-[#0D1424] border border-white/8 rounded-2xl p-8">
              <h1 className="text-white font-extrabold text-2xl text-center mb-1">Create your account</h1>
              <p className="text-slate-500 text-sm text-center mb-8">Free forever. No credit card required.</p>
              <form onSubmit={nextStep} className="space-y-4">
                <div>
                  <label className="text-slate-400 text-xs font-medium block mb-1.5">Full name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Satoshi Nakamoto"
                    className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/50 text-white placeholder:text-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-slate-400 text-xs font-medium block mb-1.5">Email address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com"
                    className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/50 text-white placeholder:text-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="text-slate-400 text-xs font-medium block mb-1.5">Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Min. 8 characters"
                    className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/50 text-white placeholder:text-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors" />
                </div>
                <button type="submit" className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm rounded-xl transition-all hover:scale-[1.01] mt-2">
                  Continue →
                </button>
              </form>
            </div>
          )}
          {step === 1 && (
            <div className="w-full max-w-lg">
              <div className="text-center mb-8">
                <h1 className="text-white font-extrabold text-2xl mb-1">Choose your plan</h1>
                <p className="text-slate-500 text-sm">You can upgrade or downgrade anytime.</p>
              </div>
              <form onSubmit={nextStep} className="space-y-4">
                {PLANS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlan(p.id)}
                    className={`w-full text-left bg-[#0D1424] border rounded-2xl p-5 transition-all ${plan === p.id ? "border-emerald-500/50 bg-emerald-500/5" : "border-white/8 hover:border-white/16"
                      }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-white font-bold text-base">{p.name}</p>
                          {p.highlight && <span className="text-xs font-bold text-black bg-emerald-400 px-2 py-0.5 rounded-full">Popular</span>}
                        </div>
                        <p className="text-slate-500 text-xs mt-0.5">{p.period}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-extrabold text-2xl">{p.price}</p>
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-slate-400 text-xs">
                          <span className="text-emerald-400 text-xs">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
                <button type="submit" className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm rounded-xl transition-all hover:scale-[1.01]">
                  Continue with {plan === "free" ? "Free plan" : "Pro trial"} →
                </button>
              </form>
            </div>
          )}
          {step === 2 && (
            <div className="bg-[#0D1424] border border-white/8 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                <Icon icon={faEnvelopeOpenText} className="text-emerald-400 text-3xl" />
              </div>
              <h1 className="text-white font-extrabold text-2xl mb-2">Check your inbox</h1>
              <p className="text-slate-400 text-sm mb-2">We sent a verification link to:</p>
              <p className="text-emerald-400 font-semibold text-sm mb-8">{email || "your@email.com"}</p>
              <form onSubmit={nextStep}>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-black font-bold text-sm rounded-xl transition-all"
                >
                  {loading ? "Setting up your account…" : "I've verified my email →"}
                </button>
              </form>
              <button className="mt-3 text-slate-600 text-xs hover:text-slate-400 transition-colors">
                Resend email
              </button>
            </div>
          )}

          <p className="text-center text-slate-600 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default GetStartedPage