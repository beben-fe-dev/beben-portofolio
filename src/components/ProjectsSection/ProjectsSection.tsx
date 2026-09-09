import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "Bang Jamin x GoTo Insurtech Platform",
      subtitle: "Claim submission automation & real-time partner dashboard processing insurance workflows",
      link: "https://bangjamin.com",
      image: "/projects/bangjamin.webp",
      gridClass: "md:col-span-7 h-[420px]",
      tags: ["ReactJS", "TypeScript", "GoTo APIs", "Zustand", "Tailwind CSS"],
      badge: "99.8% SLA · <3 Min Turnaround",
    },
    {
      id: 2,
      title: "Ruparupa Checkout & PCP-PDP Engine",
      subtitle: "High-volume retail e-commerce checkout flow & modular catalog browsing",
      link: "https://www.ruparupa.com",
      image: "/projects/ruparupa.webp",
      gridClass: "md:col-span-5 h-[420px]",
      tags: ["ReactJS", "TypeScript", "Redux", "API Wrapper"],
      badge: "Zero Latency Drop",
    },
    {
      id: 3,
      title: "Pintarnya.com SSR Career Portal",
      subtitle: "Next.js SSR company profiles, automated hiring ad billing, and dynamic SEO landing pages",
      link: "https://pintarnya.com",
      image: "/projects/pintarnya.webp",
      gridClass: "md:col-span-5 h-[380px]",
      tags: ["Next.js", "SSR / SEO", "React", "Payment Gateways"],
      badge: "+35% SEO Speed",
    },
    {
      id: 4,
      title: "First Borneo Group AgriTech Suite",
      subtitle: "Offline-first plantation telemetry dashboard built for low-bandwidth remote operations",
      link: "https://wa.me/62859106530700",
      image: "/projects/firstborneo.webp",
      gridClass: "md:col-span-7 h-[380px]",
      tags: ["React 19", "TypeScript", "Offline-First", "Low-Bandwidth UX"],
      badge: "<15 KB Payload Budget",
    },
  ];

  return (
    <section id="projects" className="w-full max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="mb-12 md:mb-16"
      >
        <span className="text-xs uppercase tracking-widest text-sky-400 font-bold mb-3 inline-block">
          Case Studies
        </span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-center md:text-left text-foreground">
          Selected <span className="text-gradient-primary">Works</span>
        </h2>
        <p className="text-muted-foreground text-center md:text-left max-w-2xl text-lg">
          A showcase of complex systems, elegant interfaces, and scalable applications I've engineered.
        </p>
      </motion.div>

      {/* 12-Column Full-Width Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
        {projects.map((project, i) => (
          <motion.a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative overflow-hidden rounded-[2.25rem] block shadow-xl border border-foreground/10 ${project.gridClass}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Background Image Container */}
            <div className="absolute inset-0 bg-neutral-950">
              <img
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 transform-gpu"
                src={project.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
            </div>

            {/* Top Metric Badge */}
            <div className="absolute top-6 left-6 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-sky-400">
                {project.badge}
              </span>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-7 sm:p-8 flex flex-col justify-end pointer-events-none">
              <div className="flex items-end justify-between gap-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 transform-gpu">
                <div className="z-10 max-w-lg">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-tight drop-shadow-md">
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-base font-medium text-white/80 opacity-90 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2 mb-3">
                    {project.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md bg-white/10 backdrop-blur-md text-[11px] font-medium text-zinc-200 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Subtle Action Pill */}
                <div className="w-12 h-12 rounded-full glass-panel border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors duration-300 flex-shrink-0 shadow-lg">
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};
