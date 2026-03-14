"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiAward, FiExternalLink, FiX } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";

/* ── Certifications data ── */
const certifications = [
  {
    title: "AICTE Google AI/ML Virtual Internship",
    issuer: "AICTE × Google",
    icon: "🤖",
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    skills: ["AI/ML", "Google Cloud", "Machine Learning"],
    year: "2024",
    credentialUrl: "#",
    description:
      "Completed a hands-on virtual internship program covering Artificial Intelligence and Machine Learning fundamentals — delivered in collaboration with AICTE and Google.",
  },
  {
    title: "AICTE AWS Cloud Virtual Internship",
    issuer: "AICTE × AWS",
    icon: "☁️",
    color: "from-blue-400 to-blue-700",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/30",
    skills: ["AWS", "Cloud", "Cloud Services"],
    year: "2024",
    credentialUrl: "#",
    description:
      "Completed a hands-on virtual internship program covering AWS Cloud services — delivered in collaboration with AICTE and Amazon Web Services.",
  },
  {
    title: "IBM Cloud Computing Certification",
    issuer: "IBM via Coursera",
    icon: "☁️",
    color: "from-blue-600 to-indigo-600",
    bgColor: "bg-blue-600/10",
    borderColor: "border-blue-600/30",
    skills: ["Cloud Computing", "IBM Cloud", "DevOps", "Microservices"],
    year: "2023",
    credentialUrl: "#",
    description:
      "Earned IBM's cloud computing certification via Coursera, covering cloud architecture, DevOps practices, containerization with Docker/Kubernetes, and deploying microservices on IBM Cloud.",
  },
];

/* ── Lightbox modal ──────────────────────────────────────── */
function CertLightbox({ cert, onClose }) {
  return (
    <AnimatePresence>
      {cert && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9970] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed z-[9971] inset-x-4 top-1/2 -translate-y-1/2
                       sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-[520px]
                       dark:bg-slate-900 bg-white rounded-3xl overflow-hidden
                       border dark:border-slate-700/60 border-slate-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-2 w-full bg-gradient-to-r ${cert.color}`} />
            <div className="p-6 sm:p-7">
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 rounded-full
                           dark:bg-slate-800 bg-slate-100 flex items-center justify-center
                           dark:text-slate-400 text-slate-500 hover:text-red-400 transition-colors"
              >
                <FiX className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-4 mb-5">
                <div className={`w-14 h-14 rounded-2xl ${cert.bgColor} flex items-center justify-center text-2xl flex-shrink-0`}>
                  {cert.icon}
                </div>
                <div>
                  <h2 className="text-lg font-bold dark:text-white text-slate-900 leading-snug mb-1">
                    {cert.title}
                  </h2>
                  <p className={`text-sm font-semibold bg-gradient-to-r ${cert.color} bg-clip-text text-transparent`}>
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
              </div>

              <p className="text-sm dark:text-slate-400 text-slate-600 leading-relaxed mb-5">
                {cert.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {cert.skills.map((skill) => (
                  <span key={skill}
                    className="px-3 py-1 rounded-full text-xs font-medium
                               dark:bg-slate-800 bg-slate-100
                               dark:text-slate-300 text-slate-600
                               border dark:border-slate-700/40 border-slate-200">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t dark:border-slate-800 border-slate-100">
                <div className="flex items-center gap-2">
                  <FiAward className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs dark:text-slate-400 text-slate-500">Verified Certification</span>
                </div>
                {cert.credentialUrl !== "#" && (
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                    View Credential <FiExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Cert card ───────────────────────────────────────────── */
function CertCard({ cert, index, onClick }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      className={`dark:bg-slate-800/60 bg-white rounded-2xl p-6 cursor-pointer
                  border ${cert.borderColor} dark:border-opacity-30 border-opacity-40
                  hover:shadow-card-hover transition-all duration-300 group hover:-translate-y-1`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl ${cert.bgColor} flex items-center justify-center text-xl flex-shrink-0`}>
          {cert.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-base dark:text-white text-slate-900 leading-snug">
              {cert.title}
            </h3>
            <FiExternalLink className="w-4 h-4 flex-shrink-0 dark:text-slate-500 text-slate-400 group-hover:text-cyan-400 transition-colors" />
          </div>
          <p className={`text-sm font-semibold mb-3 bg-gradient-to-r ${cert.color} bg-clip-text text-transparent`}>
            {cert.issuer} · {cert.year}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {cert.skills.map((skill) => (
              <span key={skill}
                className="px-2.5 py-0.5 rounded-md text-xs font-medium
                           dark:bg-slate-700/60 bg-slate-100 dark:text-slate-300 text-slate-600
                           border dark:border-slate-600/40 border-slate-200">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t dark:border-slate-700/40 border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiAward className="w-4 h-4 text-emerald-400" />
          <span className="text-xs dark:text-slate-400 text-slate-500">Verified Certification</span>
        </div>
        <span className="text-xs dark:text-slate-500 text-slate-400 group-hover:text-cyan-400 transition-colors">
          Click for details →
        </span>
      </div>
    </motion.div>
  );
}

/* ── Main section ────────────────────────────────────────── */
export default function Certifications() {
  const [selected, setSelected] = useState(null);

  return (
    <SectionWrapper id="certifications" alternate>
      <SectionHeading
        label="Certifications"
        title="Professional"
        highlight="Certifications"
        subtitle="Industry-recognized credentials. Click any card for details."
      />
      <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
        {certifications.map((cert, index) => (
          <CertCard key={cert.title} cert={cert} index={index} onClick={() => setSelected(cert)} />
        ))}
      </div>
      <CertLightbox cert={selected} onClose={() => setSelected(null)} />
    </SectionWrapper>
  );
}
