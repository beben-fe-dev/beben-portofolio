import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Github } from "../icons/SocialIcons";
import TechStackSection from "../TechStackSection/TechStackSection";
import { Button } from "../lightswind/button";
import { Badge } from "../lightswind/badge";
import { DotPattern } from "../lightswind/dot-pattern";
import { HangingIdCard } from "../lightswind/HangingIdCard";

export const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-dvh flex flex-col justify-center pt-8 md:pt-14 overflow-hidden bg-background">
      {/* Background Dot Pattern with Radial Vignette Shade */}
      <DotPattern width={18} height={18} cx={1} cy={1} cr={1} glow />
      
      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-14 pb-12">
        
        {/* Left Editorial Content */}
        <motion.div 
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mb-6"
          >
            <Badge variant="outline" size="lg" className="gap-2.5 py-1.5 px-4 glass-panel border-border/80">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-foreground">Available for Senior Roles &amp; Consulting</span>
            </Badge>
          </motion.div>

          {/* Main Display Headline (Apple Typography) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mb-5"
          >
            <span className="text-xs uppercase tracking-widest text-primary font-bold mb-3 block">
              Bento Putra Hermanto · 7+ Years Experience
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.08] mb-2">
              Architecting systems. <br className="hidden sm:inline" />
              <span className="text-gradient-primary">Crafting interfaces.</span>
            </h1>
          </motion.div>

          <motion.p 
            className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 w-full max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            Senior Frontend Engineer specialized in scalable component architecture, <b>React Native (iOS &amp; Android)</b> mobile apps, low-bandwidth offline suites, and high-volume e-commerce and insurtech platforms.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8 w-full sm:w-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            <a href="#projects">
              <Button size="lg" className="rounded-full px-7 h-12 bg-primary text-primary-foreground font-semibold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5">
                Explore Selected Works <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="https://wa.me/62859106530700" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="rounded-full px-7 h-12 glass-panel text-foreground font-semibold flex items-center gap-2 hover:bg-foreground/5 transition-all hover:-translate-y-0.5 border-border/80">
                Direct WhatsApp <Mail className="w-4 h-4" />
              </Button>
            </a>
          </motion.div>

          {/* Direct Social Links */}
          <motion.div 
            className="flex items-center gap-5 justify-center lg:justify-start w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <a href="https://github.com/beben-fe-dev" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-1" title="GitHub">
              <Github className="w-5 h-5" />
            </a>
            <a href="mailto:bentoputrahermanto@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors p-1" title="Email">
              <Mail className="w-5 h-5" />
            </a>
            <span className="text-xs text-muted-foreground/60 font-mono">
              Jakarta, Indonesia · CS Graduate (GPA 3.58)
            </span>
          </motion.div>
        </motion.div>

        {/* Right Content - Visual Hanging Lanyard ID Card with Beloved Original Aesthetic */}
        <motion.div 
          className="flex-1 w-full max-w-md relative flex justify-center items-center py-2"
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <HangingIdCard
            name="Bento Putra Hermanto"
            role="Senior Frontend & Mobile Engineer"
            badgeId="BH-2026-SR"
            accentColor="#8b5cf6"
            ropeLength={75}
            ropeColor="#1c1d24"
            cardWidth="w-72 sm:w-80 md:w-84"
          >
            <div className="flex flex-col h-full bg-card w-full text-left">
              {/* Beloved Header Banner with Rich Gradient & Holographic Aura */}
              <div className="relative px-5 pt-7 pb-6 flex flex-col items-center bg-gradient-to-br from-purple-700 via-primary to-indigo-950 text-white overflow-hidden">
                {/* Circuit background overlay */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

                {/* Profile Avatar with Dual Glowing Ring */}
                <div className="relative w-20 h-20 mb-3 group">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 blur-sm opacity-70 animate-pulse" />
                  <div className="relative w-full h-full rounded-full border-2 border-white/80 overflow-hidden bg-zinc-900 shadow-inner flex items-center justify-center text-white font-bold text-2xl">
                    BH
                  </div>
                </div>

                <h3 className="font-extrabold text-lg dark:text-white text-black/90 tracking-tight drop-shadow-sm text-center">
                  Bento Putra Hermanto
                </h3>
                <p className="dark:text-white/80 text-black/80 font-medium text-xs mt-0.5 text-center">
                  Senior Frontend &amp; Mobile Engineer
                </p>
              </div>

              {/* Details 2x2 Grid - Guaranteed Crisp Contrast in Both Light & Dark Modes */}
              <div className="p-4 flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-2.5 w-full text-left bg-muted/40 p-3 rounded-xl border border-border/50">
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase tracking-widest font-bold">Specialty</span>
                    <span className="font-bold text-foreground text-xs block truncate">React &amp; React Native</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase tracking-widest font-bold">Location</span>
                    <span className="font-bold text-foreground text-xs block">Jakarta, ID</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase tracking-widest font-bold">Experience</span>
                    <span className="font-bold text-foreground text-xs block">7+ Years</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[9px] uppercase tracking-widest font-bold">Status</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-1">
                      ● Active
                    </span>
                  </div>
                </div>

                {/* HD Barcode & Auth Tag */}
                <div className="flex flex-col items-center mt-1 w-full gap-1">
                  <div className="flex gap-[2.5px] items-end h-7 px-3 py-0.5 bg-muted/60 rounded-lg border border-border/40 w-full justify-center">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-foreground rounded-[1px]"
                        style={{
                          width: i % 4 === 0 ? "3.5px" : i % 2 === 0 ? "2px" : "1px",
                          height: `${50 + Math.sin(i * 1.4) * 45}%`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </HangingIdCard>
        </motion.div>
      </div>

      {/* Curated Tech Stack Strip */}
      <TechStackSection />
    </section>
  );
};
