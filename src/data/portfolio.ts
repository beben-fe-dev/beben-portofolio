export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  metrics: string;
  colSpan?: string;
  link?: string;
  github?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  category: "lead" | "early";
  domain: string;
  badge: string;
  badgeColor: string;
  bullets: string[];
  stack: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: string; icon?: string }[];
}

export const portfolioData = {
  personal: {
    name: "Bento Putra Hermanto",
    shortName: "Bento",
    initials: "BH",
    role: "Senior Frontend & Mobile Engineer",
    availability: "Available for Senior Roles & Architecture Consulting",
    tagline: "Architecture. Performance. Craftsmanship.",
    bio: "Experienced Senior Frontend Engineer with 7+ years of track record building scalable web applications and cross-platform mobile systems (React 19, Next.js, React Native). Graduated in Computer Science from Bina Nusantara University (GPA 3.58) with a Game Application minor. Currently developing enterprise suites and React Native mobile modules at First Borneo Group, with previous senior engineering impact at Bang Jamin (GoTo Partner), Pintarnya, and Ruparupa.",
    location: "Jakarta, Indonesia",
    email: "bentoputrahermanto@gmail.com",
    whatsapp: "+62859106530700",
    whatsappUrl: "https://wa.me/62859106530700",
    github: "https://github.com/beben-fe-dev",
    stats: [
      { value: "7+", label: "Years Experience", desc: "Production web & mobile engineering" },
      { value: "20+", label: "Projects Delivered", desc: "Enterprise & consumer web/mobile apps" },
      { value: "3.58", label: "Binus CS GPA", desc: "Minor in Game Application" },
      { value: "100%", label: "Code Quality", desc: "Zero compromise on craft & speed" }
    ]
  },

  services: [
    {
      id: "architecture",
      title: "Web & React Native Architecture",
      desc: "Architecting modular, maintainable web systems and cross-platform iOS & Android mobile apps using React 19, Next.js, and React Native.",
      icon: "Layers",
      gradient: "from-sky-500/20 to-blue-500/5",
      borderColor: "border-sky-500/20",
      points: ["React Native (iOS & Android)", "Next.js App Router & SSR", "Zustand & Redux State Engines", "Custom API Wrapper Abstractions"]
    },
    {
      id: "uiux",
      title: "UI/UX & Design Engineering",
      desc: "Translating complex design tokens into pixel-perfect Tailwind CSS and React Native styling with fluid motion and full accessibility.",
      icon: "Palette",
      gradient: "from-purple-500/20 to-pink-500/5",
      borderColor: "border-purple-500/20",
      points: ["Apple Human Interface Principles", "Design Systems & Token Architecture", "Figma to High-Fidelity Code", "Spring Physics & Micro-interactions"]
    },
    {
      id: "performance",
      title: "Performance & Low-Bandwidth",
      desc: "Optimizing bundle budgets, virtualized DOM/lists, and offline-first caching for challenging networks and field operations.",
      icon: "Zap",
      gradient: "from-emerald-500/20 to-teal-500/5",
      borderColor: "border-emerald-500/20",
      points: ["Sub-second Time-to-Interactive (TTI)", "Under 15KB Payload Budgets", "Offline-First Sync Protocols", "Core Web Vitals Perfection"]
    },
    {
      id: "spatial",
      title: "3D Web & Interactive Systems",
      desc: "Leveraging a Game Application minor background to build hardware-accelerated WebGL canvas shaders, Three.js scenes, and web game loops.",
      icon: "Box",
      gradient: "from-amber-500/20 to-orange-500/5",
      borderColor: "border-amber-500/20",
      points: ["Three.js & Custom WebGL Shaders", "2D/3D Canvas Interactive Graphics", "Game Mechanics & Collision Loops", "Spatial Computing & Reactive Web"]
    }
  ],

  projects: [
    {
      id: "bangjamin",
      title: "Bang Jamin x GoTo Insurtech Ecosystem",
      subtitle: "Insurance Claim Automation & Real-time Partner Engine (Web & React Native)",
      description: "End-to-end claim submission feature, partner management dashboard, and React Native mobile flows built in close collaboration with GoTo teams. Reduced approval turnaround to <3 minutes.",
      image: "/projects/bangjamin.webp",
      tags: ["React Native", "ReactJS", "TypeScript", "GoTo APIs", "Zustand"],
      metrics: "99.8% Claim SLA · <3 Min Turnaround",
      colSpan: "md:col-span-7",
      link: "https://bangjamin.com"
    },
    {
      id: "ruparupa",
      title: "Ruparupa E-Commerce Checkout Engine",
      subtitle: "Enterprise PCP-PDP & Multi-Gateway Transactions",
      description: "Core transactional payment flows, user address book management, and PCP-PDP browsing architecture for Indonesia's largest home living and retail e-commerce platform.",
      image: "/projects/ruparupa.webp",
      tags: ["ReactJS", "TypeScript", "Redux", "API Wrapper", "High-Traffic"],
      metrics: "Zero Checkout Latency Drop",
      colSpan: "md:col-span-5",
      link: "https://www.ruparupa.com"
    },
    {
      id: "pintarnya",
      title: "Pintarnya.com SSR Career Platform",
      subtitle: "Next.js SSR Landing Pages & Corporate Ad Billing",
      description: "Engineered high-conversion user onboarding, custom checkout billing for corporate hiring ads, and server-side rendered Company Pages optimized for search engine indexation.",
      image: "/projects/pintarnya.webp",
      tags: ["Next.js", "SSR / SEO", "React", "Payment Gateways", "Tailwind"],
      metrics: "+35% SEO Indexation Speed",
      colSpan: "md:col-span-5",
      link: "https://pintarnya.com"
    },
    {
      id: "firstborneo",
      title: "First Borneo Group AgriTech Suite",
      subtitle: "Field Operation & Telemetry Dashboard with React Native Mobile",
      description: "Built from scratch for plantation field workers operating in low-bandwidth remote environments. Features offline caching, instant mobile synchronization, and ultra-lightweight payload budgets.",
      image: "/projects/firstborneo.webp",
      tags: ["React Native", "React 19", "TypeScript", "Offline-First", "Low-Bandwidth UX"],
      metrics: "<15 KB Payload · 100% Adoption",
      colSpan: "md:col-span-7",
      link: "https://wa.me/62859106530700"
    }
  ],

  experiences: [
    {
      id: "fbg",
      company: "First Borneo Group",
      role: "Building Frontend / Developer",
      period: "12/2025 – Present",
      category: "lead",
      domain: "AgriTech & Enterprise",
      badge: "Current Role",
      badgeColor: "#10b981",
      bullets: [
        "Gathered and analyzed functional requirements from plantation field workers, branch offices, and headquarters to define clear frontend specifications.",
        "Translated business logic into structured technical documentation, user flows, and UI implementation plans for internal operational dashboards.",
        "Developed enterprise dashboard applications and React Native mobile modules from scratch, implementing responsive and scalable architecture aligned with UI/UX standards.",
        "Engineered ultra-lightweight, performance-optimized dashboards and mobile views tailored for field operations in low-bandwidth environments (<15KB payload budget).",
        "Collaborated closely with UI/UX designers and backend engineers to ensure seamless API integration and consistent user experience across web and mobile.",
        "Conducted product walkthroughs and digital onboarding sessions, helping plantation workers successfully transition from manual paper to digital systems."
      ],
      stack: ["React Native", "React 19", "TypeScript", "Tailwind CSS", "Offline Cache", "Low-Bandwidth UX"]
    },
    {
      id: "bangjamin",
      company: "Bang Jamin",
      role: "Senior Frontend Engineer",
      period: "08/2023 – 12/2025",
      category: "lead",
      domain: "Insurtech & Ecosystem",
      badge: "GoTo Partnership",
      badgeColor: "#38bdf8",
      bullets: [
        "Spearheaded the Claim Feature Bang Jamin x GoTo, making insurance claim submission and automated tracking fast, user-friendly, and transparent.",
        "Engineered the React Native mobile claim application for Bang Jamin x GoTo ecosystem, allowing users to capture incident photos, submit claims, and track settlement status on iOS and Android.",
        "Architected the Partner Dashboard Bang Jamin x GoTo, delivering real-time insights into service management, performance metrics, and settlement status.",
        "Engineered the Internal Claim Review Dashboard, enabling rapid review and approval workflows that reduced document verification turnaround to <3 minutes.",
        "Collaborated closely with Bang Jamin and GoTo cross-functional engineering teams to ensure high-security, scalable partner integration.",
        "Revamped the web and mobile interfaces to improve accessibility, conversion rates, and mobile user engagement."
      ],
      stack: ["React Native", "ReactJS", "TypeScript", "GoTo APIs", "Zustand", "Mobile Claim Flow"]
    },
    {
      id: "pintarnya",
      company: "Pintarnya",
      role: "Frontend Engineer",
      period: "07/2022 – 08/2023",
      category: "lead",
      domain: "Career & HR Technology",
      badge: "Scale & Growth",
      badgeColor: "#a855f7",
      bullets: [
        "Engineered a custom corporate ad posting payment flow, enabling streamlined hiring visibility for corporate partners.",
        "Designed and implemented a high-conversion user onboarding interface, reducing friction and maximizing new user activation.",
        "Built the Company Profile Page feature on Pintarnya.com using Next.js Server-Side Rendering (SSR) for instant SEO search indexation.",
        "Created dynamic, fast-loading marketing landing pages that drove measurable spikes in user acquisition and retention.",
        "Developed internal admin views and content management dashboards optimizing operational team workflows."
      ],
      stack: ["Next.js", "SSR / SEO", "React", "Tailwind CSS", "Payment Gateway"]
    },
    {
      id: "ruparupa",
      company: "Ruparupa",
      role: "Frontend Engineer",
      period: "03/2021 – 07/2022",
      category: "lead",
      domain: "Retail E-Commerce",
      badge: "High-Traffic E-Commerce",
      badgeColor: "#f59e0b",
      bullets: [
        "Engineered core payment transactions, user profile management, and PCP-PDP (Product Listing & Detail) flows for Indonesia's premier e-commerce platform.",
        "Developed a custom frontend API wrapper layer, significantly simplifying frontend-backend communication and decoupling network complexity.",
        "Built interactive administrative dashboards to optimize catalog management and order fulfillment workflows.",
        "Mentored junior engineering interns, establishing clean coding conventions, review checklists, and collaborative team growth."
      ],
      stack: ["ReactJS", "TypeScript", "Redux", "PCP/PDP Flow", "API Wrapper"]
    },
    {
      id: "ghuraf",
      company: "Ghuraf Indonesia",
      role: "Frontend Developer (Freelance)",
      period: "06/2021 – 08/2021",
      category: "early",
      domain: "Digital Agency & Client Web",
      badge: "Freelance",
      badgeColor: "#64748b",
      bullets: [
        "Delivered tailored, responsive web solutions customized to diverse stakeholder specifications and brand guidelines.",
        "Established automated build, test, and deployment workflows utilizing GitHub Actions and Firebase Hosting.",
        "Engineered modern single-page applications with clean JavaScript and ReactJS best practices."
      ],
      stack: ["JavaScript ES6+", "React", "Firebase Hosting", "GitHub Actions"]
    },
    {
      id: "alsintanlink",
      company: "Alsintanlink",
      role: "Frontend Developer (Freelance)",
      period: "01/2021 – 03/2021",
      category: "early",
      domain: "AgriTech Logistics",
      badge: "Freelance",
      badgeColor: "#64748b",
      bullets: [
        "Designed and implemented intuitive web applications for tracking digital agricultural machinery and tool logistics.",
        "Managed codebase versioning, cloud hosting setups, and rapid feature rollouts on Firebase.",
        "Delivered high-performance web views with an emphasis on mobile responsiveness and cross-browser consistency."
      ],
      stack: ["React", "Firebase", "REST APIs", "Mobile-First CSS"]
    },
    {
      id: "pharos-fe",
      company: "Pharos Indonesia",
      role: "Frontend Developer",
      period: "07/2019 – 03/2021",
      category: "early",
      domain: "Pharmaceutical & E-Commerce",
      badge: "HealthTech",
      badgeColor: "#0ea5e9",
      bullets: [
        "Maintained and optimized CenturyNet online pharmacy platform and critical internal enterprise portals.",
        "Integrated Firebase Authentication protocols, enhancing security and multi-device session handling for thousands of users.",
        "Developed interactive operational data visualization modules, empowering corporate management with real-time business metrics."
      ],
      stack: ["JavaScript", "HTML5 / CSS3", "Firebase Auth", "Data Visualization"]
    },
    {
      id: "pharos-game",
      company: "Pharos Indonesia",
      role: "Game Developer",
      period: "03/2019 – 06/2020",
      category: "early",
      domain: "Interactive Gaming",
      badge: "Interactive",
      badgeColor: "#ec4899",
      bullets: [
        "Programmed and launched 'Gummy Run', an interactive promotional web game that dramatically boosted user retention and brand awareness.",
        "Established automated web game test environments with Firebase Hosting for rapid QA and playtesting.",
        "Maintained modular game loops, collision detection algorithms, and sprite asset pipelines with Git."
      ],
      stack: ["Canvas 2D / WebGL", "Game Loops", "Firebase", "Git Workflows"]
    }
  ] as Experience[],

  education: {
    institution: "Bina Nusantara University (BINUS)",
    degree: "Bachelor of Computer Science (S.Kom)",
    period: "Class of 2020",
    gpa: "3.58 / 4.00",
    minor: "Game Application",
    description: "Rigorous academic curriculum covering algorithmic design, object-oriented software engineering, computer graphics, and distributed systems. Minor in Game Application focused on real-time physics, graphics rendering loops, and interactive multimedia."
  },

  skills: [
    {
      title: "Core Web & Mobile Frameworks",
      icon: "Code2",
      skills: [
        { name: "ReactJS / React 19", level: "Expert" },
        { name: "React Native (iOS & Android)", level: "Expert" },
        { name: "Next.js (App Router, SSR/SSG)", level: "Expert" },
        { name: "HTML5 & Semantic DOM", level: "Expert" },
        { name: "CSS3 / Modern Layouts", level: "Expert" }
      ]
    },
    {
      title: "Programming Languages",
      icon: "Terminal",
      skills: [
        { name: "TypeScript (Strict Typing, Generics)", level: "Expert" },
        { name: "JavaScript (ESNext, Asynchronous)", level: "Expert" },
        { name: "SQL / Relational Queries", level: "Intermediate" }
      ]
    },
    {
      title: "State, Styling & Motion",
      icon: "Sparkles",
      skills: [
        { name: "Tailwind CSS & Token Systems", level: "Expert" },
        { name: "Zustand & Redux Toolkit", level: "Expert" },
        { name: "Motion & Micro-interactions", level: "Advanced" },
        { name: "Three.js & WebGL Shaders", level: "Advanced" }
      ]
    },
    {
      title: "Backend, APIs & Workflow",
      icon: "Cpu",
      skills: [
        { name: "REST APIs & Contract Schemas", level: "Expert" },
        { name: "Firebase (Auth, Firestore, Hosting)", level: "Advanced" },
        { name: "Git, GitHub Actions & CI/CD", level: "Expert" },
        { name: "Vite, Metro & Webpack", level: "Advanced" }
      ]
    }
  ]
};
