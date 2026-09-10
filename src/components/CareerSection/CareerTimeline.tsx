import { ScrollTimeline } from "../lightswind/scroll-timeline";
import { Briefcase, Award, Layers, Users, Globe, Smartphone, Code, Shield } from "lucide-react";

export const CareerTimeline = () => {
  const careerEvents = [
    {
      year: "12/2025 – Present",
      title: "Building Frontend / Developer",
      subtitle: "First Borneo Group · AgriTech & Enterprise",
      description:
        "Developing enterprise dashboard applications and React Native mobile modules from scratch with a modular, scalable architecture. Engineered ultra-lightweight, performance-optimized web & React Native applications tailored for plantation field workers in low-bandwidth environments (<15KB payload budget). Translated business requirements into structured technical docs and guided user digital onboarding.",
      icon: <Globe className="h-4 w-4 mr-2 text-emerald-400" />,
    },
    {
      year: "08/2023 – 12/2025",
      title: "Senior Frontend Engineer",
      subtitle: "Bang Jamin · Insurtech (GoTo Partner)",
      description:
        "Spearheaded the Claim Feature Bang Jamin x GoTo for seamless submission & tracking. Engineered the React Native mobile claim application for iOS & Android, allowing policyholders to photograph damage, upload documents, and track settlement status. Architected the Partner Dashboard with real-time analytics and built Internal Claim Dashboard reducing approval turnaround to <3 minutes.",
      icon: <Shield className="h-4 w-4 mr-2 text-sky-400" />,
    },
    {
      year: "07/2022 – 08/2023",
      title: "Frontend Engineer",
      subtitle: "Pintarnya · Career & HR Technology",
      description:
        "Engineered customized corporate ad posting payment flow with automated invoice generation. Designed high-conversion onboarding interfaces. Built Pintarnya.com Company Page with Next.js SSR for maximum SEO indexation. Created dynamic high-speed marketing landing pages and internal operational views.",
      icon: <Layers className="h-4 w-4 mr-2 text-purple-400" />,
    },
    {
      year: "03/2021 – 07/2022",
      title: "Frontend Engineer",
      subtitle: "Ruparupa · Retail E-Commerce",
      description:
        "Architected payment transactions, user profiles, and PCP-PDP (Product Listing & Detail) flows for Indonesia's premier e-commerce platform. Developed custom frontend API wrapper layer reducing network complexity. Created interactive administrative dashboards and mentored junior engineering interns.",
      icon: <Briefcase className="h-4 w-4 mr-2 text-amber-400" />,
    },
    {
      year: "06/2021 – 08/2021",
      title: "Frontend Developer (Freelance)",
      subtitle: "Ghuraf Indonesia · Digital Agency",
      description:
        "Delivered tailored responsive web applications using JavaScript and ReactJS. Streamlined automated project management, testing, and continuous deployment workflows with GitHub and Firebase Hosting.",
      icon: <Users className="h-4 w-4 mr-2 text-cyan-400" />,
    },
    {
      year: "01/2021 – 03/2021",
      title: "Frontend Developer (Freelance)",
      subtitle: "Alsintanlink · AgriTech Logistics",
      description:
        "Designed and implemented user-focused web solutions for agricultural machinery and tool logistics tracking. Managed code repositories and rapid deployment cycles via GitHub and Firebase.",
      icon: <Smartphone className="h-4 w-4 mr-2 text-emerald-400" />,
    },
    {
      year: "07/2019 – 03/2021",
      title: "Frontend Developer",
      subtitle: "Pharos Indonesia · Pharma & Healthcare",
      description:
        "Maintained and enhanced internal web systems and the CenturyNet e-commerce platform. Integrated Firebase Authentication protocols with high security. Developed interactive operational data visualization modules for corporate leadership.",
      icon: <Code className="h-4 w-4 mr-2 text-blue-400" />,
    },
    {
      year: "03/2019 – 06/2020",
      title: "Game Developer",
      subtitle: "Pharos Indonesia · Interactive Media",
      description:
        "Programmed promotional browser game 'Gummy Run' boosting user engagement and brand visibility. Enhanced test reliability using Firebase test hosting and maintained structured Git asset pipelines.",
      icon: <Award className="h-4 w-4 mr-2 text-rose-400" />,
    },
  ];

  return (
    <div id="career" className="scroll-mt-20 md:scroll-mt-24">
      <ScrollTimeline
        events={careerEvents}
        title="Career Journey"
        subtitle="7+ years of engineering impact across enterprise, e-commerce, insurtech, and agritech"
        animationOrder="staggered"
        cardAlignment="alternating"
        cardVariant="elevated"
        parallaxIntensity={0.15}
        revealAnimation="fade"
        progressIndicator={true}
        lineColor="bg-primary/20"
        activeColor="bg-primary"
        progressLineWidth={3}
        progressLineCap="round"
      />
    </div>
  );
};
