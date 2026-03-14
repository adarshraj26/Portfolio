"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiBookOpen, FiClock, FiExternalLink, FiHeart } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";

const DEV_USERNAME = "adarshraj26";

/* ── Article card ── */
function ArticleCard({ article, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.a
      ref={ref}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group flex flex-col h-full dark:bg-slate-800/60 bg-white rounded-2xl overflow-hidden
                 border dark:border-slate-700/50 border-slate-200
                 hover:border-cyan-500/40 hover:-translate-y-1.5
                 hover:shadow-[0_16px_48px_rgba(0,0,0,0.2),0_0_0_1px_rgba(6,182,212,0.15)]
                 transition-all duration-300"
    >
      {/* Cover image */}
      {article.cover_image ? (
        <div className="h-44 overflow-hidden flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="h-44 flex-shrink-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20
                        flex items-center justify-center">
          <FiBookOpen className="w-12 h-12 dark:text-slate-600 text-slate-300" />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Tags */}
        {article.tag_list?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {article.tag_list.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full
                           bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="font-bold text-sm leading-snug dark:text-white text-slate-900
                       group-hover:text-cyan-400 transition-colors duration-200 line-clamp-2">
          {article.title}
        </h3>

        {/* Description */}
        {article.description && (
          <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed line-clamp-3 flex-1">
            {article.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t dark:border-slate-700/50 border-slate-200 mt-auto">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs dark:text-slate-500 text-slate-400">
              <FiClock className="w-3 h-3" />
              {article.reading_time_minutes} min
            </span>
            <span className="flex items-center gap-1 text-xs dark:text-slate-500 text-slate-400">
              <FiHeart className="w-3 h-3" />
              {article.positive_reactions_count}
            </span>
          </div>
          <FiExternalLink className="w-3.5 h-3.5 dark:text-slate-600 text-slate-400 group-hover:text-cyan-400 transition-colors" />
        </div>
      </div>
    </motion.a>
  );
}

/* ── Skeleton card ── */
function SkeletonCard() {
  return (
    <div className="dark:bg-slate-800/60 bg-white rounded-2xl overflow-hidden
                    border dark:border-slate-700/50 border-slate-200 animate-pulse">
      <div className="h-44 dark:bg-slate-700/50 bg-slate-200" />
      <div className="p-5 space-y-3">
        <div className="flex gap-2">
          <div className="h-4 w-14 dark:bg-slate-700 bg-slate-200 rounded-full" />
          <div className="h-4 w-12 dark:bg-slate-700 bg-slate-200 rounded-full" />
        </div>
        <div className="h-4 dark:bg-slate-700 bg-slate-200 rounded w-4/5" />
        <div className="h-4 dark:bg-slate-700 bg-slate-200 rounded w-3/5" />
        <div className="space-y-2">
          <div className="h-3 dark:bg-slate-700/60 bg-slate-100 rounded" />
          <div className="h-3 dark:bg-slate-700/60 bg-slate-100 rounded w-5/6" />
          <div className="h-3 dark:bg-slate-700/60 bg-slate-100 rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}

/* ── Section ── */
export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [failed, setFailed]     = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch(
          `https://dev.to/api/articles?username=${DEV_USERNAME}&per_page=6&state=published`,
          { next: { revalidate: 3600 } }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setArticles(data);
      } catch {
        setFailed(true);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  return (
    <SectionWrapper id="blog">
      <SectionHeading
        label="Writing"
        title="Blog &"
        highlight="Notes"
        subtitle="Technical writeups, learnings, and dev insights I share on DEV.to."
      />

      {/* Loading skeletons */}
      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* Error / empty */}
      {!loading && (failed || articles.length === 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="text-4xl mb-4">✍️</div>
          <p className="dark:text-slate-400 text-slate-600 mb-2 font-medium">
            {failed ? "Could not load articles right now." : "No articles published yet."}
          </p>
          <p className="text-sm dark:text-slate-500 text-slate-400 mb-6">
            Articles will appear here once published on DEV.to.
          </p>
          <a
            href={`https://dev.to/${DEV_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold
                       bg-gradient-to-r from-cyan-500 to-blue-600 text-white
                       hover:opacity-90 transition-opacity"
          >
            <FiExternalLink className="w-4 h-4" />
            View on DEV.to
          </a>
        </motion.div>
      )}

      {/* Articles grid */}
      {!loading && !failed && articles.length > 0 && (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-10"
          >
            <a
              href={`https://dev.to/${DEV_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold
                         dark:bg-slate-800 bg-white dark:text-slate-300 text-slate-700
                         border dark:border-slate-700/60 border-slate-200
                         hover:border-cyan-500/50 hover:text-cyan-400
                         transition-all duration-200"
            >
              <FiExternalLink className="w-4 h-4" />
              Read all on DEV.to
            </a>
          </motion.div>
        </>
      )}
    </SectionWrapper>
  );
}
