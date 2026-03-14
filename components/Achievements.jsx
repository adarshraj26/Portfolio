"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";

/* ── Achievements data ── */
const achievements = [
  {
    title: "Smart India Hackathon 2022",
    subtitle: "EV Charging Station Locator",
    description:
      "Developed a real-time EV charging station locator app with live availability tracking, helping EV users find nearby stations quickly.",
    icon: "🏆",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    type: "National Hackathon",
  },
  {
    title: "Smart Odisha Hackathon 2022",
    subtitle: "Alumni Chat Application",
    description:
      "Built a real-time alumni networking and chat platform enabling university graduates to connect, share opportunities and mentorship.",
    icon: "🥈",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    type: "State Hackathon",
  },
  {
    title: "Flipkart Grid 6.0",
    subtitle: "Qualified Round 2",
    description:
      "Advanced to Round 2 of Flipkart Grid 6.0, one of India's most prestigious engineering challenges, demonstrating strong problem-solving skills.",
    icon: "⚡",
    color: "from-cyan-500 to-teal-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    type: "Industry Competition",
  },
  {
    title: "Hackathon Coordinator",
    subtitle: "Inter-College Events",
    description:
      "Coordinated and organized multiple inter-college hackathon events, managing teams, schedules, and technical infrastructure for 100+ participants.",
    icon: "🎯",
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    type: "Leadership",
  },
];

/** Individual achievement card */
const AchievementCard = ({ achievement, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className={`dark:bg-slate-800/60 bg-white rounded-2xl p-6
                  border ${achievement.borderColor} dark:border-opacity-30 border-opacity-50
                  hover:shadow-card-hover transition-all duration-300 group
                  hover:-translate-y-1`}
    >
      {/* Icon + type badge row */}
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${achievement.bgColor}
                         flex items-center justify-center text-2xl
                         group-hover:scale-110 transition-transform duration-200`}>
          {achievement.icon}
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
                          bg-gradient-to-r ${achievement.color} text-white`}>
          {achievement.type}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-base dark:text-white text-slate-900 mb-1">
        {achievement.title}
      </h3>
      <p className={`text-sm font-semibold mb-2
                     bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent`}>
        {achievement.subtitle}
      </p>

      {/* Description */}
      <p className="text-sm dark:text-slate-400 text-slate-600 leading-relaxed">
        {achievement.description}
      </p>
    </motion.div>
  );
};

/**
 * Achievements — Grid of hackathon and competition cards.
 */
export default function Achievements() {
  return (
    <SectionWrapper id="achievements" alternate>
      <SectionHeading
        label="Achievements"
        title="Hackathons &"
        highlight="Awards"
        subtitle="Competitive programming and hackathon highlights."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {achievements.map((item, index) => (
          <AchievementCard key={item.title} achievement={item} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}
