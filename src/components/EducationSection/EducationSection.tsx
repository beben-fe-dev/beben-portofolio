import SkillCategory from "./SkillCategory";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award, CheckCircle2, Calendar, Building2, Sparkles, Layers } from "lucide-react";
import { MagicCard } from "../lightswind/magic-card";

export const EducationSection = () => {
  const education = [
    {
      degree: "Bachelor of Computer Science (S.Kom)",
      school: "Bina Nusantara University (BINUS)",
      year: "Class of 2020",
      badge: "GPA: 3.58 / 4.00",
      badgeIcon: Award,
      badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
      icon: GraduationCap,
      details: [
        "Rigorous CS coursework covering Algorithms, Data Structures, OOP, Software Architecture & Database Systems",
        "Graduated with honors standing (GPA 3.58 / 4.00) demonstrating consistency and precision",
        "Developed interactive multimedia applications and web software systems",
        "Collaborated on multi-disciplinary engineering projects adhering to modern Agile development practices"
      ]
    },
    {
      degree: "Game Application Minor Specialization",
      school: "Bina Nusantara University (BINUS)",
      year: "2018 – 2020",
      badge: "Interactive Graphics Minor",
      badgeIcon: Sparkles,
      badgeColor: "text-primary bg-primary/10 border-primary/30",
      icon: BookOpen,
      details: [
        "Deep exploration of real-time rendering loops, frame-rate budget management, and 2D/3D collision physics",
        "Applied canvas and WebGL graphics principles directly to interactive web application development",
        "Engineered game mechanics, state machines, and dynamic asset management pipelines",
        "Directly informed a career-long focus on fluid 60FPS UI transitions and micro-interaction engineering"
      ]
    }
  ];

  return (
    <section id="education" className="max-w-7xl mx-auto px-6 py-24 space-y-20">
      
      {/* Education Header & Cards */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Academic <span className="text-gradient-primary">Background</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Strong theoretical computer science foundation and interactive graphics specialization powering high-performance frontend engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, i) => {
            const DegreeIcon = edu.icon;
            const BadgeIcon = edu.badgeIcon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <MagicCard
                  className="h-full p-8 rounded-[2.25rem] border border-border/80 bg-card/80 shadow-xl"
                  gradientSize={300}
                  gradientColor="rgba(139, 92, 246, 0.12)"
                >
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-muted/60 border border-border/80 flex items-center justify-center text-foreground flex-shrink-0">
                      <DegreeIcon className="w-6 h-6 text-primary" />
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold border ${edu.badgeColor}`}>
                      <BadgeIcon className="w-3.5 h-3.5" />
                      {edu.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-foreground mb-1">
                    {edu.degree}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-primary" />
                      {edu.school}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 font-mono text-xs">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.year}
                    </span>
                  </div>

                  <ul className="space-y-3 pt-4 border-t border-border/60">
                    {edu.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </MagicCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Skills Sub-section from SkillCategory */}
      <SkillCategory />
    </section>
  );
};
