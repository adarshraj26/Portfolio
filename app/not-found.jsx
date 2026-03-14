import Link from "next/link";
import { FiArrowLeft, FiCode } from "react-icons/fi";

/**
 * not-found — Custom 404 page for Next.js App Router.
 * Server component — no "use client" needed.
 */
export default function NotFound() {
  return (
    <main className="min-h-screen dark:bg-[#0f172a] bg-slate-50
                     flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center">

        {/* Fake code editor block */}
        <div className="dark:bg-slate-800/60 bg-white rounded-2xl p-6
                        border dark:border-slate-700/50 border-slate-200
                        shadow-lg font-mono text-sm text-left mb-8">
          <div className="flex items-center gap-1.5 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-2 text-xs dark:text-slate-500 text-slate-400">
              404.js
            </span>
          </div>
          <div className="space-y-1.5 dark:text-slate-400 text-slate-500">
            <p>
              <span className="text-purple-400">const</span>{" "}
              <span className="text-cyan-400">page</span>
              {" = "}
              <span className="text-amber-300">await</span> fetch(url);
            </p>
            <p className="text-red-400">{"// ❌ 404: Page not found"}</p>
            <p>
              <span className="text-purple-400">throw new</span>{" "}
              <span className="text-red-400">Error</span>(
              <span className="text-amber-300">
                &quot;This route doesn&apos;t exist&quot;
              </span>
              );
            </p>
          </div>
        </div>

        {/* 404 heading */}
        <p className="text-8xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500
                      bg-clip-text text-transparent mb-4 leading-none">
          404
        </p>

        <h1 className="text-2xl font-bold dark:text-white text-slate-900 mb-3">
          Page Not Found
        </h1>
        <p className="dark:text-slate-400 text-slate-600 mb-8 leading-relaxed">
          Looks like you wandered into unknown territory.
          <br />
          Let&apos;s get you back on track.
        </p>

        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm
                     bg-gradient-to-r from-cyan-500 to-blue-600 text-white
                     hover:scale-105 hover:shadow-lg transition-all duration-200"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        {/* Fun footer note */}
        <p className="mt-6 text-xs dark:text-slate-600 text-slate-400 flex items-center justify-center gap-1.5">
          <FiCode className="w-3.5 h-3.5" />
          No stack trace, just vibes.
        </p>
      </div>
    </main>
  );
}
