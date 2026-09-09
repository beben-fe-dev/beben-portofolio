import { motion } from "framer-motion";
import { Code2, Award, Layout, GraduationCap } from "lucide-react";
import { MagicCard } from "../lightswind/magic-card";

const stats = [
  { icon: <Layout className="w-6 h-6" />, label: "Years Experience", value: "7+" },
  { icon: <Code2 className="w-6 h-6" />, label: "Projects Delivered", value: "20+" },
  { icon: <GraduationCap className="w-6 h-6" />, label: "Binus CS GPA", value: "3.58" },
  { icon: <Award className="w-6 h-6" />, label: "Code Quality", value: "100%" },
];

export const AboutSection = () => {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        className="flex flex-col md:flex-row gap-16 items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex-1 space-y-6 text-left">
          <div>
            <span className="text-xs uppercase tracking-widest text-primary font-bold mb-3 inline-block">
              Background &amp; Philosophy
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Passionate about <span className="text-gradient-primary">Digital Excellence</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              I am an experienced Senior Frontend Engineer with over 7 years of track record building scalable, high-performance web systems and responsive user interfaces. Graduated from Bina Nusantara University with a Computer Science degree (GPA 3.58) and a minor in Game Application.
            </p>
            <p className="text-base text-muted-foreground/90 leading-relaxed">
              My engineering journey covers high-throughput retail e-commerce checkout flows at Ruparupa, automated claim and partner dashboards at Bang Jamin integrating with GoTo ecosystem, Next.js SSR career portals at Pintarnya, and ultra-lightweight offline-first field suites for First Borneo Group.
            </p>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4 w-full">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="h-full"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <MagicCard
                className="h-full p-6 rounded-[2rem] border border-border/80 bg-card/80 shadow-xl relative overflow-hidden flex flex-col justify-between"
                gradientSize={260}
                gradientColor="rgba(139, 92, 246, 0.12)"
              >
                <div className="w-12 h-12 rounded-2xl bg-muted/60 border border-border/80 flex items-center justify-center text-primary mb-4 flex-shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-black text-foreground tracking-tight mb-1">{stat.value}</h3>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
