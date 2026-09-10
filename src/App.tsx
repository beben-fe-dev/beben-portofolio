import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { HeroSection } from "./components/HeroSection/HeroSection";
import { AboutSection } from "./components/AboutSection/AboutSection";
import { ServicesSection } from "./components/ServicesSection/ServicesSection";
import { ProjectsSection } from "./components/ProjectsSection/ProjectsSection";
import { EducationSection } from "./components/EducationSection/EducationSection";
import { CareerTimeline } from "./components/CareerSection/CareerTimeline";
import { ContactSection } from "./components/ContactSection/ContactSection";
import { ReactLenis } from "lenis/react";
import { Home, User, GraduationCap, Briefcase, FolderKanban, Send, Layers } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

import Dock from "./components/lightswind/dock";
import { SmoothCursor } from "./components/lightswind/smooth-cursor";

export default function App() {
  const [showDock, setShowDock] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > window.innerHeight * 0.25) {
        setShowDock(true);
      } else {
        setShowDock(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const dockItems = [
    { icon: <Home size={20} />, label: "Home", onClick: () => scrollToSection("hero") },
    { icon: <User size={20} />, label: "About", onClick: () => scrollToSection("about") },
    { icon: <Layers size={20} />, label: "Services", onClick: () => scrollToSection("services") },
    { icon: <FolderKanban size={20} />, label: "Projects", onClick: () => scrollToSection("projects") },
    { icon: <Briefcase size={20} />, label: "Career", onClick: () => scrollToSection("career") },
    { icon: <GraduationCap size={20} />, label: "Education", onClick: () => scrollToSection("education") },
    { icon: <Send size={20} />, label: "Contact", onClick: () => scrollToSection("contact") },
  ];

  return (
    <div className="bg-transparent min-h-screen relative overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
      {/* Dynamic Ambient Background Aura for Entire Page */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        <div className="absolute top-[25%] -left-[10%] w-[500px] h-[500px] rounded-full blur-[140px] bg-sky-400/[0.05] dark:bg-sky-500/[0.06]" />
        <div className="absolute top-[55%] -right-[10%] w-[550px] h-[550px] rounded-full blur-[150px] bg-purple-400/[0.04] dark:bg-purple-600/[0.05]" />
        <div className="absolute top-[80%] left-[20%] w-[450px] h-[450px] rounded-full blur-[130px] bg-indigo-400/[0.03] dark:bg-indigo-500/[0.05]" />
      </div>

      {/* Apple-style thin specular scroll progress indicator */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-sky-400 via-primary to-purple-500 origin-left z-[100] pointer-events-none shadow-[0_0_10px_rgba(56,189,248,0.6)]"
      />

      <SmoothCursor />
      <ReactLenis root options={{ smoothWheel: true, duration: 1.2 }}>
        <Header />

        <main className="w-full flex flex-col pb-28 border-none">
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <ProjectsSection />
          <CareerTimeline />
          <EducationSection />
          <ContactSection />
        </main>

        {/* Floating Apple macOS Dock Navigation Bar */}
        <AnimatePresence>
          {showDock && (
            <motion.div
              initial={{ y: 90, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 90, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="fixed bottom-4 left-0 right-0 z-[999] hidden md:block"
            >
              <Dock
                items={dockItems}
                panelHeight={58}
                baseItemSize={44}
                magnification={68}
                distance={160}
                spring={{ mass: 0.1, stiffness: 220, damping: 14 }}
                multiBorder
              />
            </motion.div>
          )}
        </AnimatePresence>
      </ReactLenis>
    </div>
  );
}
