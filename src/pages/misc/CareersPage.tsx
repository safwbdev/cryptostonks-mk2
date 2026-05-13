import { PageLayout } from "../../components";

// Careers
const JOBS = [
    { title: "Senior Backend Engineer", dept: "Engineering", location: "Remote", type: "Full-time" },
    { title: "Staff Frontend Engineer", dept: "Engineering", location: "Remote", type: "Full-time" },
    { title: "ML / Data Engineer", dept: "Data", location: "Remote / SF", type: "Full-time" },
    { title: "Product Designer", dept: "Design", location: "Remote", type: "Full-time" },
    { title: "Growth Marketing Manager", dept: "Marketing", location: "Remote / NY", type: "Full-time" },
    { title: "Technical Writer", dept: "Product", location: "Remote", type: "Contract" },
];

const DEPT_COLORS: Record<string, string> = {
    Engineering: "text-cyan-400 bg-cyan-500/10",
    Data: "text-purple-400 bg-purple-500/10",
    Design: "text-pink-400 bg-pink-500/10",
    Marketing: "text-amber-400 bg-amber-500/10",
    Product: "text-blue-400 bg-blue-500/10",
};

function CareersPage() {
    return (
        <PageLayout title="Careers" subtitle="Help us build the future of crypto data. We're a remote-first, mission-driven team." badge="We're Hiring">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
                <div className="grid sm:grid-cols-3 gap-4">
                    {["Remote-first", "Competitive equity", "Unlimited PTO"].map((p) => (
                        <div key={p} className="bg-[#0D1424] border border-white/7 rounded-xl p-5 text-center">
                            <p className="text-white font-semibold text-sm">{p}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <h2 className="text-white font-bold text-lg mb-5">Open Roles</h2>
                    <div className="space-y-3">
                        {JOBS.map((job) => (
                            <div key={job.title} className="bg-[#0D1424] border border-white/7 hover:border-white/14 rounded-xl p-5 flex items-center justify-between gap-4 cursor-pointer transition-colors">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-white font-semibold text-sm">{job.title}</p>
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${DEPT_COLORS[job.dept]}`}>{job.dept}</span>
                                    </div>
                                    <p className="text-slate-600 text-xs">{job.location} · {job.type}</p>
                                </div>
                                <span className="text-emerald-400 text-sm font-semibold shrink-0">Apply →</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-500/8 to-cyan-500/8 border border-white/6 rounded-2xl p-8 text-center">
                    <p className="text-white font-bold text-base mb-2">Don't see your role?</p>
                    <p className="text-slate-500 text-sm mb-5">We're always looking for exceptional talent. Send us your resume.</p>
                    <a href="/contact" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-6 py-2.5 rounded-xl text-sm transition-all">Get in touch</a>
                </div>
            </div>
        </PageLayout>
    );
}

export default CareersPage