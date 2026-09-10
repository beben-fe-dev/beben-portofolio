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
    <section id="about" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-20 md:scroll-mt-24">
      {/* Standard Apple Centered Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center mb-14 md:mb-16"
      >
        <span className="text-xs uppercase tracking-widest text-primary font-bold mb-3 inline-block">
          Background &amp; Philosophy
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground tracking-[-0.02em]">
          Passionate about <span className="text-gradient-primary">Digital Excellence</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Senior Frontend Engineer dedicated to building high-performance web systems and fluid interfaces.
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row gap-12 lg:gap-16 items-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex-1 space-y-6 text-left">
          <p className="text-lg text-muted-foreground leading-relaxed">
            I am an experienced Senior Frontend Engineer with over 7 years of track record building scalable, high-performance web systems and responsive user interfaces. Graduated from Bina Nusantara University with a Computer Science degree (GPA 3.58) and a minor in Game Application.
          </p>
          <p className="text-base text-muted-foreground/90 leading-relaxed">
            My engineering journey covers high-throughput retail e-commerce checkout flows at Ruparupa, automated claim and partner dashboards at Bang Jamin integrating with GoTo ecosystem, Next.js SSR career portals at Pintarnya, and ultra-lightweight offline-first field suites for First Borneo Group.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4 w-full">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="h-full"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 400, damping: 26 }}
              viewport={{ once: true }}
            >
              <MagicCard
                className="h-full p-6 rounded-[2rem] border border-border/80 bg-card/85 shadow-lg hover:shadow-2xl relative overflow-hidden flex flex-col justify-between group transition-shadow duration-300"
                gradientSize={260}
                gradientColor="rgba(139, 92, 246, 0.14)"
              >
                {/* Apple Specular Top Rim */}
                <div className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent pointer-events-none" />

                <div className="w-12 h-12 rounded-2xl bg-muted/70 border border-border/80 flex items-center justify-center text-primary mb-4 flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary/10 group-hover:border-primary/40 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all duration-300 ease-out">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-black text-foreground tracking-tight mb-1 group-hover:text-primary transition-colors duration-200">
                    {stat.value}
                  </h3>
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
