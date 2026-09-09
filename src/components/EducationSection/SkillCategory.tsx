import { motion } from "framer-motion";
import {
  Atom,
  Code2,
  Sparkles,
  Layers,
  Box,
  Palette,
  Zap,
  Brain,
  Workflow,
  Eye,
  ShieldCheck,
  Database
} from "lucide-react";

export default function ProfessionalProfile() {
  const technicalSkills = [
    { name: "ReactJS & Next.js (App Router, SSR)", level: 96, icon: Atom, color: "text-cyan-400" },
    { name: "TypeScript & Static Type Contracts", level: 95, icon: Code2, color: "text-blue-400" },
    { name: "Tailwind CSS & Design Systems", level: 94, icon: Sparkles, color: "text-purple-400" },
    { name: "Zustand & Redux State Engines", level: 92, icon: Layers, color: "text-emerald-400" },
    { name: "Three.js, WebGL & Canvas Graphics", level: 86, icon: Box, color: "text-amber-400" },
    { name: "Firebase, REST & GraphQL APIs", level: 90, icon: Database, color: "text-rose-400" },
  ];

  const frontendTraits = [
    {
      title: "Pixel-Perfect UI Craft",
      desc: "Translating design tokens, typography, and fluid micro-interactions with exact fidelity.",
      icon: Palette,
      color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    },
    {
      title: "Web Vitals & Performance",
      desc: "Sub-second TTI, tight bundle budgets, and zero main-thread layout thrashing.",
      icon: Zap,
      color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    },
    {
      title: "Design System Architecture",
      desc: "Building composable, accessible component primitives and reusable token systems.",
      icon: Layers,
      color: "text-sky-400 border-sky-500/30 bg-sky-500/10",
    },
    {
      title: "State Machine Scalability",
      desc: "Architecting predictable unidirectional data flows with Zustand & Redux.",
      icon: Brain,
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    },
    {
      title: "Accessibility (a11y) First",
      desc: "Semantic HTML5 structure, ARIA compliance, and full keyboard-navigable user flows.",
      icon: Eye,
      color: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    },
    {
      title: "Low-Bandwidth & Resilient UX",
      desc: "Offline-first caching, lazy-loading strategies, and graceful network degradation.",
      icon: ShieldCheck,
      color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    },
    {
      title: "Strict Type Safety",
      desc: "Defensive TypeScript contracts and API schemas eliminating runtime surprises.",
      icon: Code2,
      color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    },
    {
      title: "Design-to-Engine Bridge",
      desc: "Collaborating seamlessly with UI/UX designers and backend API engineers.",
      icon: Workflow,
      color: "text-teal-400 border-teal-500/30 bg-teal-500/10",
    },
  ];

  return (
    <motion.section
      id="skills"
      className="space-y-8"
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.3 },
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          <Code2 className="w-5 h-5" />
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">Expertise &amp; Skills</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Technical Skills */}
        <div className="glass-panel p-8 rounded-[2rem] border border-foreground/15 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/60">
              <h4 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary" /> Technical Arsenal
              </h4>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/60 px-3 py-1 rounded-full border border-border/50">
                Mastery
              </span>
            </div>

            <div className="space-y-6">
              {technicalSkills.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <div key={i} className="space-y-2.5">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-foreground flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-foreground/5 border border-foreground/10">
                          <Icon className={`w-4 h-4 ${skill.color}`} />
                        </div>
                        {skill.name}
                      </span>
                      <span className="font-mono font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full text-xs border border-primary/20">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="h-2 w-full bg-muted/70 rounded-full overflow-hidden p-0.5 border border-border/40">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary via-sky-400 to-emerald-400 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Frontend Engineering Professional Traits */}
        <div className="glass-panel p-8 rounded-[2rem] border border-foreground/15 shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/60">
              <h4 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> Professional Traits
              </h4>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/60 px-3 py-1 rounded-full border border-border/50">
                Frontend Mindset
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {frontendTraits.map((trait, i) => {
                const Icon = trait.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`p-3.5 rounded-2xl border flex flex-col justify-between transition-all cursor-default ${trait.color}`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-xs font-bold tracking-tight text-foreground">
                        {trait.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-snug">
                      {trait.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 text-center">
            <h5 className="font-bold text-foreground mb-1 text-xs sm:text-sm">7+ Years Engineering Dedication</h5>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Consistently delivering production-grade web systems with zero compromise on UI craft, runtime performance, and accessibility.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
