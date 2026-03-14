"use client";

import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import { useState } from "react";
import {
    FiCheck,
    FiCopy,
    FiGithub,
    FiLinkedin,
    FiMail,
    FiMessageSquare,
    FiPhone,
    FiSend,
    FiUser,
} from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";

/* ── Contact info cards data ── */
const contactCards = [
  {
    icon: FiMail,
    label: "Email",
    value: "contact.adarshraj26@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&to=contact.adarshraj26@gmail.com",
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-500/10",
    copyValue: "contact.adarshraj26@gmail.com",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/adarsh-raj26",
    href: "https://www.linkedin.com/in/adarsh-raj26/",
    color: "from-blue-600 to-indigo-600",
    bgColor: "bg-blue-600/10",
  },
  {
    icon: FiGithub,
    label: "GitHub",
    value: "github.com/adarshraj26",
    href: "https://github.com/adarshraj26",
    color: "from-slate-500 to-slate-700",
    bgColor: "bg-slate-500/10",
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "+91 9386012794",
    href: "tel:+919386012794",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    copyValue: "+91 9386012794",
  },
];

/**
 * Contact — Section with contact info cards and a message form.
 * The form is set up with basic validation; you can connect to
 * EmailJS or a backend for actual email sending.
 */
export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    // EmailJS integration
    const serviceId = "service_up04cp9";
    const templateId = "template_219mzjm";
    const publicKey = "9L3E0lEuQPfMlmZES";

    try {
      await emailjs.send(serviceId, templateId, form, publicKey);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <SectionWrapper id="contact">
      <SectionHeading
        label="Contact"
        title="Get In"
        highlight="Touch"
        subtitle="I'm open to new opportunities. Let's build something amazing together."
      />

      <div className="grid lg:grid-cols-2 gap-10 items-start">
        {/* Left: Info cards */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <p className="text-base dark:text-slate-400 text-slate-600 leading-relaxed mb-6">
            Whether you have a project idea, job opportunity, or just want to say hi —
            my inbox is always open. I&apos;ll get back to you as soon as possible!
          </p>

          {contactCards.map(({ icon: Icon, label, value, href, color, bgColor, copyValue }, i) => {
            const cardClass = `flex items-center gap-4 p-4 rounded-xl
                         dark:bg-slate-800/50 bg-white
                         border dark:border-slate-700/50 border-slate-200
                         hover:border-cyan-500/40 hover:shadow-card-hover
                         transition-all duration-300 group`;
            const cardInner = (
              <>
                <div className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center
                                 group-hover:scale-110 transition-transform duration-200 flex-shrink-0`}>
                  <Icon
                    className={`w-5 h-5 bg-gradient-to-r ${color} bg-clip-text`}
                    style={{ color: "currentColor" }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs dark:text-slate-500 text-slate-400 font-medium uppercase tracking-wider">
                    {label}
                  </p>
                  <p className="text-sm dark:text-slate-200 text-slate-800 font-medium group-hover:text-cyan-400 transition-colors truncate">
                    {value}
                  </p>
                </div>
                {copyValue && (
                  <div className="ml-auto flex-shrink-0">
                    {copiedId === label
                      ? <FiCheck className="w-4 h-4 text-emerald-400" />
                      : <FiCopy className="w-4 h-4 dark:text-slate-500 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    }
                  </div>
                )}
              </>
            );

            return copyValue ? (
              <motion.div
                key={label}
                role="button"
                tabIndex={0}
                onClick={() => handleCopy(label, copyValue)}
                onKeyDown={(e) => e.key === "Enter" && handleCopy(label, copyValue)}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
                className={`${cardClass} cursor-pointer`}
              >
                {cardInner}
              </motion.div>
            ) : (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
                className={cardClass}
              >
                {cardInner}
              </motion.a>
            );
          })}
        </motion.div>

        {/* Right: Contact form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form
            onSubmit={handleSubmit}
            className="dark:bg-slate-800/60 bg-white rounded-2xl p-6 sm:p-8
                       border dark:border-slate-700/50 border-slate-200
                       space-y-5"
          >
            <h3 className="font-bold text-lg dark:text-white text-slate-900">
              Send a Message
            </h3>

            {/* Name + Email row */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-slate-500 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm
                             dark:bg-slate-700/50 bg-slate-50
                             dark:border-slate-600/50 border-slate-200 border
                             dark:text-white text-slate-900
                             dark:placeholder-slate-500 placeholder-slate-400
                             focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30
                             transition-all duration-200"
                />
              </div>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-slate-500 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm
                             dark:bg-slate-700/50 bg-slate-50
                             dark:border-slate-600/50 border-slate-200 border
                             dark:text-white text-slate-900
                             dark:placeholder-slate-500 placeholder-slate-400
                             focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30
                             transition-all duration-200"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="relative">
              <FiMessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-slate-500 text-slate-400" />
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm
                           dark:bg-slate-700/50 bg-slate-50
                           dark:border-slate-600/50 border-slate-200 border
                           dark:text-white text-slate-900
                           dark:placeholder-slate-500 placeholder-slate-400
                           focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30
                           transition-all duration-200"
              />
            </div>

            {/* Message */}
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message..."
              required
              rows={5}
              className="w-full px-4 py-3 rounded-xl text-sm
                         dark:bg-slate-700/50 bg-slate-50
                         dark:border-slate-600/50 border-slate-200 border
                         dark:text-white text-slate-900
                         dark:placeholder-slate-500 placeholder-slate-400
                         focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30
                         transition-all duration-200 resize-none"
            />

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl
                         font-semibold text-sm text-white
                         bg-gradient-to-r from-cyan-500 to-blue-600
                         hover:from-cyan-400 hover:to-blue-500
                         disabled:opacity-60 disabled:cursor-not-allowed
                         hover:scale-[1.02] active:scale-[0.98]
                         transition-all duration-200 shadow-glow-cyan"
            >
              {status === "sending" ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </>
              ) : status === "success" ? (
                <>✅ Message Sent!</>
              ) : (
                <>
                  <FiSend className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>

            {/* Success feedback */}
            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-emerald-400 text-center"
              >
                Thanks! I&apos;ll get back to you soon. 🎉
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>

      {/* Copied toast */}
      {copiedId && (
        <motion.div
          key={copiedId}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50
                     flex items-center gap-2 px-5 py-2.5 rounded-xl
                     bg-emerald-500 text-white text-sm font-medium shadow-lg"
        >
          <FiCheck className="w-4 h-4" />
          Copied to clipboard!
        </motion.div>
      )}
    </SectionWrapper>
  );
}
