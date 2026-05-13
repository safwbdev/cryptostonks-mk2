import { Link } from "react-router-dom";
import Footer from "./Footer";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  accentColor?: string;
  badge?: string;
  children: React.ReactNode;
}

function PageLayout({
  title,
  subtitle,
  breadcrumb,
  badge,
  children,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#070B14] pt-16 flex flex-col">
      {/* Breadcrumb */}
      <div className="border-b border-white/5 bg-[#0A0F1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm">
          <Link to="/" className="text-slate-500 hover:text-slate-300 transition-colors">Home</Link>
          <span className="text-slate-700">/</span>
          <span className="text-white font-medium">{breadcrumb || title}</span>
        </div>
      </div>

      {/* Hero strip */}
      <div className="relative border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[#070B14]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 left-1/4 w-96 h-40 bg-emerald-500/6 blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-5">
              {badge}
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">{title}</h1>
          {subtitle && (
            <p className="text-slate-400 text-base max-w-2xl leading-relaxed">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {children}
      </div>

      <Footer />
    </div>
  );
}

export default PageLayout 