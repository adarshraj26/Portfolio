import AiPortfolioChat from "@/components/AiPortfolioChat";
import CommandPalette from "@/components/CommandPalette";
import CurrentlyWidget from "@/components/CurrentlyWidget";
import CursorSpotlight from "@/components/CursorSpotlight";
import { DevModeProvider } from "@/components/DevModeContext";
import DevModeToggle from "@/components/DevModeToggle";
import ExperimentalFeatures from "@/components/ExperimentalFeatures";
import HireMeConfetti from "@/components/HireMeConfetti";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";
import LoadingScreen from "@/components/LoadingScreen";
import PageTransitionWrapper from "@/components/PageTransitionWrapper";
import { RecruiterModeProvider } from "@/components/RecruiterModeContext";
import RecruiterModeToggle from "@/components/RecruiterModeToggle";
import ResumeViewer from "@/components/ResumeViewer";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Adarsh Raj | Full Stack Developer",
  description:
    "Full Stack Developer building scalable web applications and AI-driven solutions. React, Node.js, AWS, and more.",
  keywords: [
    "Adarsh Raj",
    "Full Stack Developer",
    "React",
    "Node.js",
    "Portfolio",
    "Web Developer",
    "AI Solutions",
  ],
  authors: [{ name: "Adarsh Raj" }],
  openGraph: {
    title: "Adarsh Raj | Full Stack Developer",
    description:
      "Full Stack Developer building scalable web applications and AI-driven solutions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adarsh Raj | Full Stack Developer",
    description:
      "Full Stack Developer building scalable web applications and AI-driven solutions.",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <RecruiterModeProvider>
            <DevModeProvider>
              <LoadingScreen />
              <CursorSpotlight />
              <CommandPalette />
              <KonamiEasterEgg />
              <CurrentlyWidget />
              <ResumeViewer />
              <HireMeConfetti />
              <ExperimentalFeatures />
              <DevModeToggle />
              <RecruiterModeToggle />
              <AiPortfolioChat />
              <PageTransitionWrapper>{children}</PageTransitionWrapper>
            </DevModeProvider>
          </RecruiterModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
