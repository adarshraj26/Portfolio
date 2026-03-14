"use client";
import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Blog from "@/components/Blog";
import BuildEstimator from "@/components/BuildEstimator";
import Certifications from "@/components/Certifications";
import CodePlayground from "@/components/CodePlayground";
import CodingStats from "@/components/CodingStats";
import Contact from "@/components/Contact";
import { useDevMode } from "@/components/DevModeContext";
import DevStats from "@/components/DevStats";
import DeveloperToolbelt from "@/components/DeveloperToolbelt";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import GitHubHeatmap from "@/components/GitHubHeatmap";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import { useRecruiterMode } from "@/components/RecruiterModeContext";

import Skills from "@/components/Skills";

export default function Home() {

/**
 * Main page — assembles all portfolio sections in order.
 * Each section has a unique id for smooth-scroll navigation.
 */
  const { devMode } = useDevMode();
  const { recruiterMode } = useRecruiterMode();
  if (recruiterMode) {
    return (
      <main className="min-h-screen dark:bg-[#0f172a] bg-slate-50 overflow-x-hidden">
        <Navbar />
        <Hero />
        <About />
        <DevStats />
        <Skills />
        <CodingStats leetcodeUsername="Adarsh_Raj26" hackerrankUsername="adarshraj26" />
        <Experience />
        <Projects />
        <Achievements />
        <Education />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    );
  }
  return (
    <main className="min-h-screen dark:bg-[#0f172a] bg-slate-50 overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <GitHubHeatmap />
      <DevStats />
      <Skills />
      <CodingStats leetcodeUsername="Adarsh_Raj26" hackerrankUsername="adarshraj26" />
      {devMode && <CodePlayground />}
      <Experience />
      <Projects />
      <DeveloperToolbelt />
      {devMode && <BuildEstimator />}
      <Achievements />
      <Education />
      <Certifications />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
