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
    <section id="services" className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <span className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-3 inline-block">
          Core Capabilities
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gradient-primary">
          What I Do
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
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
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <MagicCard
                className="h-full p-8 rounded-[2rem] border border-border/80 bg-card/80"
                gradientSize={280}
                gradientColor="rgba(139, 92, 246, 0.12)"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {service.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm">
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
