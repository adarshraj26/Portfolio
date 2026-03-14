"use client";
import { useRecruiterMode } from "./RecruiterModeContext";

export default function RecruiterSummary() {
  const { recruiterMode } = useRecruiterMode();
  if (!recruiterMode) return null;
  return (
    <div className="fixed inset-0 z-[99990] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-amber-200 dark:border-amber-700 p-8 max-w-2xl w-full relative">
        <h2 className="text-2xl font-black text-amber-600 mb-2">Recruiter Summary</h2>
        <p className="text-slate-700 dark:text-slate-200 mb-4 text-sm">A concise, recruiter-friendly overview of Adarsh Raj.</p>
        {/* Download Resume */}
        <a href="/Adarsh_Raj_9386012794.pdf" download className="inline-block mb-4 px-4 py-2 rounded bg-amber-500 text-white font-bold hover:bg-amber-600 transition">Download Resume</a>
        {/* Skill Matrix */}
        <div className="mb-4">
          <h3 className="font-bold text-amber-600 mb-1">Skill Matrix</h3>
          <table className="w-full text-xs border-collapse mb-2">
            <thead>
              <tr className="text-left">
                <th className="p-1">Skill</th>
                <th className="p-1">Level</th>
                <th className="p-1">Years</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-1">React.js</td><td className="p-1">Advanced</td><td className="p-1">3+</td></tr>
              <tr><td className="p-1">Node.js</td><td className="p-1">Advanced</td><td className="p-1">3+</td></tr>
              <tr><td className="p-1">Tailwind</td><td className="p-1">Intermediate</td><td className="p-1">2</td></tr>
              <tr><td className="p-1">AWS</td><td className="p-1">Intermediate</td><td className="p-1">2</td></tr>
              <tr><td className="p-1">Python</td><td className="p-1">Intermediate</td><td className="p-1">2</td></tr>
            </tbody>
          </table>
        </div>
        {/* Project Highlights */}
        <div className="mb-4">
          <h3 className="font-bold text-amber-600 mb-1">Project Highlights</h3>
          <ul className="list-disc pl-5 text-xs text-slate-700 dark:text-slate-200">
            <li><b>SensAI</b>: AI Career Coach Platform (React, Tailwind, NeonDB) — Resume builder, mock interviews, Gemini AI integration.</li>
            <li><b>AI-SaaS App</b>: Multi-format content generator (React, Tailwind) — Text, audio, video, image generation in a single interface.</li>
          </ul>
        </div>
        {/* Contact Card */}
        <div className="mb-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 flex flex-col gap-1">
          <span className="font-bold text-amber-700 dark:text-amber-300">Contact</span>
          <span className="text-xs">adarshraj26@gmail.com</span>
          <span className="text-xs">linkedin.com/in/adarsh-raj26</span>
          <span className="text-xs">+91 9386012794</span>
        </div>
        {/* Availability Status */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 font-bold text-xs">Open to Work</span>
        </div>
        {/* Achievements & Certifications */}
        <div className="mb-2">
          <h3 className="font-bold text-amber-600 mb-1">Achievements & Certifications</h3>
          <ul className="list-disc pl-5 text-xs text-slate-700 dark:text-slate-200">
            <li>Smart India Hackathon 2022 Winner</li>
            <li>Flipkart Grid 6.0 Finalist</li>
            <li>AWS Certified Cloud Practitioner</li>
          </ul>
        </div>
        {/* Close button */}
        <button onClick={() => window.location.reload()} className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title="Close">×</button>
      </div>
    </div>
  );
}
