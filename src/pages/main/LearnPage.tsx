import { useState } from "react";
import { PageLayout } from "../../components";
import {
  Icon,
  faRocket, faBuildingColumns, faChartBar, faScaleBalanced,
  faGamepad, faGlobe, faBook, faMagnifyingGlass, faGraduationCap,
} from "../../components/Icon";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

const COURSES = [
  { title: "Crypto for Beginners", icon: faRocket, lessons: 12, duration: "2h 30m", level: "Beginner", color: "from-emerald-500/15 to-teal-500/10", border: "border-emerald-500/20", description: "Learn the fundamentals of blockchain, Bitcoin, and how to safely buy your first crypto." },
  { title: "Understanding DeFi", icon: faBuildingColumns, lessons: 9, duration: "1h 45m", level: "Intermediate", color: "from-blue-500/15 to-cyan-500/10", border: "border-blue-500/20", description: "Dive into decentralized finance — how lending, yield farming, and DEXs actually work." },
  { title: "Technical Analysis Masterclass", icon: faChartBar, lessons: 18, duration: "4h 20m", level: "Intermediate", color: "from-purple-500/15 to-violet-500/10", border: "border-purple-500/20", description: "Master candlestick patterns, support/resistance, RSI, MACD, and Fibonacci retracements." },
  { title: "Portfolio Management & Risk", icon: faScaleBalanced, lessons: 10, duration: "2h 10m", level: "Advanced", color: "from-amber-500/15 to-yellow-500/10", border: "border-amber-500/20", description: "Build a resilient crypto portfolio. Learn position sizing, rebalancing, and risk management." },
  { title: "NFTs & Digital Ownership", icon: faGamepad, lessons: 8, duration: "1h 30m", level: "Beginner", color: "from-pink-500/15 to-rose-500/10", border: "border-pink-500/20", description: "Understand what NFTs are, how to evaluate them, and the technology powering digital ownership." },
  { title: "Web3 & Smart Contracts", icon: faGlobe, lessons: 14, duration: "3h 05m", level: "Advanced", color: "from-indigo-500/15 to-blue-500/10", border: "border-indigo-500/20", description: "Explore how Ethereum smart contracts work, interact with dApps, and understand Web3's vision." },
];

const GLOSSARY = [
  { term: "HODL", def: "Hold On for Dear Life — crypto slang for holding assets through volatility instead of selling." },
  { term: "DeFi", def: "Decentralized Finance — financial services built on blockchain without traditional intermediaries." },
  { term: "Gas", def: "A fee paid in ETH to compensate for computing power required to execute transactions on Ethereum." },
  { term: "Whale", def: "An individual or entity holding a very large amount of cryptocurrency, capable of moving markets." },
  { term: "FOMO", def: "Fear Of Missing Out — the anxiety of missing a potential profit opportunity in fast-moving markets." },
  { term: "FUD", def: "Fear, Uncertainty, Doubt — negative sentiment or misinformation spread to drive down prices." },
  { term: "ATH", def: "All-Time High — the highest price a cryptocurrency has ever reached." },
  { term: "DAO", def: "Decentralized Autonomous Organization — a community-governed entity using smart contracts." },
  { term: "Staking", def: "Locking up cryptocurrency to help validate transactions and earn passive rewards on a PoS network." },
  { term: "Layer 2", def: "A secondary framework built on top of an existing blockchain to improve scalability and reduce fees." },
  { term: "NFT", def: "Non-Fungible Token — a unique digital asset verified on the blockchain, representing ownership." },
  { term: "Mempool", def: "Memory pool — a waiting area where unconfirmed transactions sit before being included in a block." },
];

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];
const levelColors: Record<string, string> = {
  Beginner: "text-emerald-400 bg-emerald-500/10",
  Intermediate: "text-blue-400 bg-blue-500/10",
  Advanced: "text-purple-400 bg-purple-500/10",
};

function LearnPage() {
  const [activeLevel, setActiveLevel] = useState("All");
  const [glossarySearch, setGlossarySearch] = useState("");
  const [activeTab, setActiveTab] = useState<"courses" | "glossary">("courses");

  const filteredCourses = COURSES.filter(
    (c) => activeLevel === "All" || c.level === activeLevel
  );
  const filteredGlossary = GLOSSARY.filter(
    (g) => g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      g.def.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  return (
    <PageLayout
      title="Learn Crypto"
      subtitle="From blockchain basics to advanced trading — everything you need to become a confident crypto investor."
      badge="Education Hub"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: "50+", label: "Free Courses" },
            { value: "200+", label: "Lessons" },
            { value: "120K+", label: "Students" },
          ].map((s) => (
            <div key={s.label} className="bg-[#0D1424] border border-white/7 rounded-xl p-4 text-center">
              <p className="text-2xl font-extrabold text-emerald-400">{s.value}</p>
              <p className="text-slate-500 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-1 bg-white/3 rounded-xl p-1 w-fit border border-white/5">
          {(["courses", "glossary"] as const).map((t) => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`px-5 py-2 text-sm font-semibold rounded-lg capitalize transition-colors flex items-center gap-2 ${activeTab === t ? "bg-emerald-500/15 text-emerald-400" : "text-slate-500 hover:text-slate-300"
                }`}>
              <Icon icon={t === "courses" ? faGraduationCap : faBook} className="text-xs" />
              {t === "courses" ? "Courses" : "Glossary"}
            </button>
          ))}
        </div>
        {activeTab === "courses" && (
          <>
            <div className="flex gap-2 flex-wrap">
              {LEVELS.map((l) => (
                <button key={l} onClick={() => setActiveLevel(l)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${activeLevel === l
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    : "text-slate-500 border-white/6 hover:text-slate-300 hover:border-white/12"
                    }`}>
                  {l}
                </button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCourses.map((course) => (
                <div key={course.title}
                  className={`group bg-gradient-to-br ${course.color} border ${course.border} rounded-2xl p-6 cursor-pointer hover:scale-[1.01] transition-all`}>
                  <div className="w-12 h-12 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center mb-4">
                    <Icon icon={course.icon as IconProp} className="text-white text-lg" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${levelColors[course.level]}`}>
                      {course.level}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-base mb-2 leading-snug">{course.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-5">{course.description}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-white/8">
                    <span className="flex items-center gap-1.5">
                      <Icon icon={faBook} className="text-[10px]" />
                      {course.lessons} lessons
                    </span>
                    <span>{course.duration}</span>
                  </div>
                  <button className="mt-4 w-full py-2.5 bg-white/8 hover:bg-white/14 text-white text-sm font-semibold rounded-xl transition-colors border border-white/8">
                    Start Learning
                    <Icon icon="arrow-right" className="ml-2 text-xs" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
        {activeTab === "glossary" && (
          <>
            <div className="relative max-w-sm">
              <input type="text" value={glossarySearch} onChange={(e) => setGlossarySearch(e.target.value)}
                placeholder="Search terms..."
                className="w-full bg-white/5 border border-white/10 text-white placeholder:text-slate-600 rounded-xl px-4 py-2.5 pl-10 text-sm focus:outline-none focus:border-emerald-500/40" />
              <Icon icon={faMagnifyingGlass} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 text-xs" />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {filteredGlossary.map((g) => (
                <div key={g.term} className="bg-[#0D1424] border border-white/7 rounded-xl p-5 hover:border-white/12 transition-colors">
                  <p className="text-emerald-400 font-bold text-sm mb-1.5">{g.term}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{g.def}</p>
                </div>
              ))}
            </div>
            {filteredGlossary.length === 0 && (
              <div className="text-center py-12">
                <Icon icon={faMagnifyingGlass} className="text-slate-700 text-3xl mb-3" />
                <p className="text-slate-500">No terms match "{glossarySearch}"</p>
              </div>
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
}

export default LearnPage