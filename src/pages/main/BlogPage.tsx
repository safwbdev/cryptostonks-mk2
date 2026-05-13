import { useState } from "react";
import { PageLayout } from "../../components";
import { Icon, faPen } from "../../components/Icon";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { CAT_COLORS, CATS, POSTS } from "../../data/blog";

CAT_COLORS

function BlogPage() {
  const [cat, setCat] = useState("All");
  const filtered = POSTS.filter((p) => cat === "All" || p.category === cat);
  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <PageLayout title="Blog" subtitle="Insights, analysis, and education from the CryptoStonks team." badge="CryptoStonks Blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-2 flex-wrap mb-8">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${cat === c ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "text-slate-500 border-white/6 hover:text-slate-300 hover:border-white/12"
                }`}>{c}</button>
          ))}
        </div>

        {featured.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            {featured.map((post) => (
              <article key={post.slug}
                className="group bg-[#0D1424] border border-white/7 hover:border-white/14 rounded-2xl p-6 cursor-pointer transition-all hover:bg-white/3">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full ${CAT_COLORS[post.category] ?? "text-slate-400 bg-white/5"}`}>
                    <Icon icon={post.icon as IconProp} className="text-[10px]" /> {post.category}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg leading-snug mt-1 mb-2 group-hover:text-emerald-300 transition-colors">{post.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-slate-600 pt-4 border-t border-white/5">
                  <span className="text-slate-500 font-medium">{post.author}</span>
                  <span>·</span><span>{post.date}</span><span>·</span><span>{post.readTime} read</span>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="space-y-3">
          {rest.map((post) => (
            <article key={post.slug}
              className="group bg-[#0D1424] border border-white/7 hover:border-white/14 rounded-xl p-5 cursor-pointer transition-all hover:bg-white/3 flex gap-4 items-start">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full ${CAT_COLORS[post.category] ?? "text-slate-400 bg-white/5"}`}>
                    <Icon icon={post.icon as IconProp} className="text-[10px]" /> {post.category}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-sm leading-snug mb-1.5 group-hover:text-emerald-300 transition-colors">{post.title}</h3>
                <p className="text-slate-600 text-xs line-clamp-1 mb-2">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span className="text-slate-500">{post.author}</span><span>·</span><span>{post.date}</span><span>·</span><span>{post.readTime} read</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/4 to-white/1 border border-white/6 shrink-0 flex items-center justify-center">
                <Icon icon={post.icon as IconProp} className={`text-xl ${CAT_COLORS[post.category]?.split(" ")[0] ?? "text-slate-400"}`} />
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-600">
            <Icon icon={faPen} className="text-3xl mb-3" />
            <p className="font-semibold text-slate-500">No posts in this category yet</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export default BlogPage