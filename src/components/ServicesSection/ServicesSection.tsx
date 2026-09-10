import { motion } from "framer-motion";
import { Code2, Palette, Cpu, Layers } from "lucide-react";
import { MagicCard } from "../lightswind/magic-card";

const services = [
  {
    icon: Layers,
    title: "Frontend & System Architecture",
    description: "Architecting modular, maintainable web applications using React 19, Next.js App Router, SSR/SSG, and scalable state machines.",
  },
  {
    icon: Palette,
    title: "UI/UX & Design Engineering",
    description: "Translating complex Figma designs into responsive Tailwind CSS with Emil Kowalski-inspired fluid motion and full accessibility.",
  },
  {
    icon: Cpu,
    title: "Performance & Low-Bandwidth Systems",
    description: "Optimizing bundle budgets, virtualized DOM rendering, and offline-first caching for challenging networks and field operations.",
  },
  {
    icon: Code2,
    title: "3D Web & Interactive Graphics",
    description: "Leveraging a Game Application minor background to build hardware-accelerated WebGL canvas shaders, Three.js scenes, and web game loops.",
  }
];

export const ServicesSection = () => {
  return (
    <section id="services" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-20 md:scroll-mt-24">
      {/* Standard Apple Centered Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center mb-14 md:mb-16"
      >
        <span className="text-xs uppercase tracking-widest text-primary font-bold mb-3 inline-block">
          Core Capabilities
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground tracking-[-0.02em]">
          What I <span className="text-gradient-primary">Bring to the Table</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Disciplined engineering practices combined with modern frontend methodologies to build robust digital products that scale.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 400, damping: 26 }}
              viewport={{ once: true, amount: 0.1 }}
              className="h-full"
            >
              <MagicCard
                className="h-full p-8 rounded-[2.25rem] border border-border/80 bg-card/85 shadow-lg hover:shadow-2xl relative overflow-hidden group transition-shadow duration-300"
                gradientSize={320}
                gradientColor="rgba(139, 92, 246, 0.15)"
              >
                {/* Apple Specular Edge Highlight */}
                <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent pointer-events-none" />

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-muted/70 border border-border/80 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/40 group-hover:shadow-[0_0_16px_rgba(56,189,248,0.25)] transition-all duration-300 ease-out">
                    <Icon className="w-6 h-6 group-hover:rotate-6 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                    {service.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {service.description}
                </p>
              </MagicCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
