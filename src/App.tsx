import { useState, useEffect } from 'react';
import { HUD } from './components/HUD';
import { Navigation } from './components/Navigation';
import { DashboardView } from './components/DashboardView';
import { MapView } from './components/MapView';
import { InventoryView } from './components/InventoryView';
import { ContactView } from './components/ContactView';
import { 
  playCoinSound, 
  playPowerupSound, 
  toggleMute, 
  getMuteStatus 
} from './utils/audio';
import { translations } from './utils/i18n';
import type { Language } from './utils/i18n';

// Define types
interface Experience {
  company: string;
  roleEn: string;
  roleId: string;
  period: string;
  world: string;
  bulletsEn: string[];
  bulletsId: string[];
  x: number; // map x coordinate percentage
  y: number; // map y coordinate percentage
}

interface Skill {
  name: string;
  level: string;
  type: string;
  icon: string;
  descEn: string;
  descId: string;
}

export default function App() {
  const [coinCount, setCoinCount] = useState(0);
  const [isMuted, setIsMuted] = useState(getMuteStatus());
  const [selectedJob, setSelectedJob] = useState<number>(0);
  const [unlockedSkills, setUnlockedSkills] = useState<string[]>([]);
  const [currentMenu, setCurrentMenu] = useState<'dashboard' | 'map' | 'inventory' | 'contact'>('dashboard');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [bentoPowerState, setBentoPowerState] = useState<'SUPER' | 'FIRE' | 'STAR' | 'TANOOKI'>('SUPER');
  const [xp, setXp] = useState(15400);

  // Theme state: dark mode default
  const [darkMode, setDarkMode] = useState(true);

  // i18n Language State (English default)
  const [lang, setLang] = useState<Language>('en');

  // Animated map position state
  const [mapCharPos, setMapCharPos] = useState({ x: 10, y: 50 });
  const [isWalking, setIsWalking] = useState(false);
  const [facingLeft, setFacingLeft] = useState(false);

  // Sync mute state on initial load
  useEffect(() => {
    setIsMuted(getMuteStatus());
  }, []);

  const handleSkillUnlocked = (skillName: string) => {
    if (!unlockedSkills.includes(skillName)) {
      setUnlockedSkills((prev) => [...prev, skillName]);
      setCoinCount((prev) => prev + 3);
      setXp((prev) => prev + 500);
      playPowerupSound();
    }
  };

  const handleToggleMute = () => {
    const muted = toggleMute();
    setIsMuted(muted);
  };

  const clickCoinHUD = () => {
    playCoinSound();
    setCoinCount(prev => prev + 1);
    setXp(prev => prev + 100);
  };

  const selectMenu = (menu: 'dashboard' | 'map' | 'inventory' | 'contact') => {
    playCoinSound();
    setCurrentMenu(menu);
  };

  const handleSelectSkill = (skill: Skill) => {
    playPowerupSound();
    setSelectedSkill(skill);
    // Add to unlocked list if not already there
    if (!unlockedSkills.includes(skill.name)) {
      setUnlockedSkills(prev => [...prev, skill.name]);
    }
    setCoinCount(prev => prev + 1);
    setXp(prev => prev + 150);

    // Change power state based on skill type
    if (skill.type === 'frontend') {
      setBentoPowerState('FIRE');
    } else if (skill.type === 'language') {
      setBentoPowerState('STAR');
    } else if (skill.type === 'mobile') {
      setBentoPowerState('TANOOKI');
    } else {
      setBentoPowerState('SUPER');
    }
  };

  const changeLanguage = (newLang: Language) => {
    playCoinSound();
    setLang(newLang);
  };

  // Experiences list
  const experiences: Experience[] = [
    {
      company: "First Borneo Group",
      roleEn: "Building Frontend / Developer",
      roleId: "Pengembang / Pembuat Frontend",
      period: "12/2025 – Present",
      world: "World 1-1",
      x: 10,
      y: 50,
      bulletsEn: [
        "Gathered and analyzed functional requirements from plantation workers, branch offices, and headquarters teams to define clear frontend specifications.",
        "Translated business requirements into structured technical documentation, user flows, and UI implementation plans for internal dashboard development.",
        "Developed internal dashboard applications from scratch, implementing responsive and scalable frontend architecture aligned with UI/UX design standards.",
        "Built versatile, lightweight, and performance-optimized dashboards tailored for field workers operating in low-bandwidth environments.",
        "Collaborated closely with UI/UX designers and backend engineers to ensure seamless integration and consistent user experience.",
        "Conducted product walkthroughs and onboarding sessions to support user adoption, particularly for workers transitioning from manual processes to digital systems."
      ],
      bulletsId: [
        "Menganalisis kebutuhan fungsional dari pekerja perkebunan, kantor cabang, dan tim kantor pusat untuk mendefinisikan spesifikasi frontend secara terperinci.",
        "Menerjemahkan kebutuhan bisnis menjadi dokumentasi teknis, user flow, dan rencana implementasi UI untuk pengembangan dasbor internal.",
        "Mengembangkan aplikasi dasbor internal dari nol, mengimplementasikan arsitektur frontend yang responsif dan skalabel sesuai standar UI/UX.",
        "Membangun dasbor yang serbaguna, ringan, dan dioptimalkan kinerjanya khusus untuk pekerja lapangan di lingkungan bandwidth rendah.",
        "Berkolaborasi dengan desainer UI/UX dan backend engineer untuk integrasi yang lancar dan pengalaman pengguna yang konsisten.",
        "Melakukan demo produk dan sesi orientasi untuk mendukung adopsi pengguna, terutama bagi pekerja yang bertransisi dari proses manual ke sistem digital."
      ]
    },
    {
      company: "Bang Jamin",
      roleEn: "Senior Frontend Engineer",
      roleId: "Insinyur Frontend Senior",
      period: "08/2023 – 12/2025",
      world: "World 1-2",
      x: 22,
      y: 35,
      bulletsEn: [
        "Developed the Claim Feature Bang Jamin x GoTo, making claim submissions and tracking more user-friendly and efficient.",
        "Developed the Partner Dashboard Bang Jamin x GoTo, giving partners real-time insights into service management, performance metrics, and claims.",
        "Developed a user-friendly Claim Dashboard for internal teams, making it easier to review and approve claims while greatly enhancing overall workflow efficiency.",
        "Collaborated closely with the Bang Jamin and GoTo teams to ensure seamless integration, delivering scalable and high-performance solutions.",
        "Enhanced company-wide efficiency by creating internal dashboards for finance and insurance operations.",
        "Developed a web interface for Bang Jamin to improve accessibility and engagement."
      ],
      bulletsId: [
        "Mengembangkan Fitur Klaim Bang Jamin x GoTo, membuat pengajuan dan pelacakan klaim menjadi lebih ramah pengguna dan efisien.",
        "Mengembangkan Partner Dashboard Bang Jamin x GoTo, memberikan wawasan real-time kepada mitra tentang metrik kinerja dan manajemen klaim.",
        "Mengembangkan Dasbor Klaim untuk tim internal guna mempermudah peninjauan dan persetujuan klaim sekaligus meningkatkan efisiensi alur kerja.",
        "Berkolaborasi dengan tim internal Bang Jamin dan GoTo untuk memastikan integrasi yang lancar serta menghadirkan solusi yang skalabel.",
        "Meningkatkan efisiensi perusahaan dengan membuat dasbor internal untuk operasi keuangan dan asuransi.",
        "Mengembangkan antarmuka web untuk Bang Jamin guna meningkatkan aksesibilitas dan keterlibatan pengguna."
      ]
    },
    {
      company: "Pintarnya",
      roleEn: "Frontend Engineer",
      roleId: "Insinyur Frontend",
      period: "07/2022 – 08/2023",
      world: "World 1-3",
      x: 35,
      y: 60,
      bulletsEn: [
        "Built a customized payment feature for corporate ad postings, enhancing visibility for workers.",
        "Designed a seamless onboarding interface, optimizing user experience for new users.",
        "Developed the Company Page feature on Pintarnya.com, improving engagement between users and employers.",
        "Created dynamic landing pages that boosted user satisfaction and engagement.",
        "Created internal views that optimized workflows and elevated the user experience."
      ],
      bulletsId: [
        "Membangun fitur pembayaran khusus untuk posting iklan perusahaan guna meningkatkan visibilitas bagi pencari kerja.",
        "Merancang antarmuka orientasi pengguna baru yang mulus untuk mengoptimalkan konversi.",
        "Mengembangkan fitur Halaman Perusahaan pada Pintarnya.com untuk meningkatkan keterlibatan antara pencari kerja dan pemberi kerja.",
        "Membuat landing page dinamis yang meningkatkan kepuasan dan keterlibatan pengguna.",
        "Merancang tampilan administratif internal untuk mengoptimalkan alur kerja operasional."
      ]
    },
    {
      company: "Ruparupa",
      roleEn: "Frontend Engineer",
      roleId: "Insinyur Frontend",
      period: "03/2021 – 07/2022",
      world: "World 1-4",
      x: 48,
      y: 40,
      bulletsEn: [
        "Designed & built payment transactions, user profile management, and PCP-PDP functionalities for a large-scale e-commerce platform.",
        "Developed an API wrapper, improving frontend-backend integration and reducing complexity.",
        "Built interactive administrative views to optimize internal workflows.",
        "Mentored interns, fostering collaboration and a growth-focused environment."
      ],
      bulletsId: [
        "Merancang & membangun transaksi pembayaran, manajemen profil pengguna, dan fungsionalitas PCP-PDP untuk platform e-commerce skala besar.",
        "Mengembangkan API wrapper frontend-backend untuk mempermudah integrasi dan mengurangi kompleksitas komunikasi data.",
        "Membangun tampilan administratif interaktif untuk mengoptimalkan alur kerja internal.",
        "Mementori anak magang, mendorong kolaborasi aktif dan lingkungan kerja yang berorientasi pada pertumbuhan."
      ]
    },
    {
      company: "Ghuraf Indonesia",
      roleEn: "Frontend Developer (Freelance)",
      roleId: "Pengembang Frontend (Lepas)",
      period: "06/2021 – 08/2021",
      world: "World 2-1",
      x: 60,
      y: 65,
      bulletsEn: [
        "Delivered project-specific display solutions tailored to diverse stakeholder needs.",
        "Streamlined project management and deployment with GitHub and Firebase.",
        "Developed responsive and user-centric web applications using JavaScript and React JS."
      ],
      bulletsId: [
        "Menyajikan solusi tampilan web kustom yang disesuaikan dengan kebutuhan spesifik pemangku kepentingan.",
        "Merampingkan manajemen proyek dan deployment menggunakan repositori GitHub dan hosting Firebase.",
        "Mengembangkan aplikasi web yang responsif menggunakan JavaScript murni dan React JS."
      ]
    },
    {
      company: "Alsintanlink",
      roleEn: "Frontend Developer (Freelance)",
      roleId: "Pengembang Frontend (Lepas)",
      period: "01/2021 – 03/2021",
      world: "World 2-2",
      x: 72,
      y: 45,
      bulletsEn: [
        "Designed and implemented user-focused web solutions that aligned with project goals.",
        "Managed repositories and deployments efficiently using GitHub and Firebase.",
        "Delivered high-quality web applications with a focus on responsiveness and usability."
      ],
      bulletsId: [
        "Merancang dan menerapkan solusi web yang berfokus pada pengguna akhir agar selaras dengan target proyek.",
        "Mengelola repositori kode dan siklus deployment secara efisien dengan GitHub dan Firebase.",
        "Menghasilkan aplikasi web berkualitas tinggi dengan fokus utama pada performa responsif dan kegunaan."
      ]
    },
    {
      company: "Pharos Indonesia",
      roleEn: "Frontend Developer",
      roleId: "Pengembang Frontend",
      period: "07/2019 – 03/2021",
      world: "World 2-3",
      x: 84,
      y: 60,
      bulletsEn: [
        "Maintained and optimized internal websites and the CenturyNet e-commerce platform.",
        "Integrated Firebase authentication, improving platform security and user experience.",
        "Developed a data visualization module for internal use, enabling informed decision-making."
      ],
      bulletsId: [
        "Memelihara dan mengoptimalkan fungsionalitas situs web internal serta platform e-commerce CenturyNet.",
        "Mengintegrasikan Firebase Authentication, meningkatkan keamanan platform dan pengalaman masuk pengguna.",
        "Mengembangkan modul visualisasi data interaktif untuk mempermudah pengambilan keputusan operasional internal."
      ]
    },
    {
      company: "Pharos Indonesia",
      roleEn: "Game Developer",
      roleId: "Pengembang Game",
      period: "03/2019 – 06/2020",
      world: "World 2-4",
      x: 95,
      y: 50,
      bulletsEn: [
        "Created Gummy Run, a promotional game that boosted engagement and brand visibility.",
        "Enhanced platform reliability and scalability with Firebase test hosting protocols.",
        "Streamlined code organization and ensured seamless project execution through Git maintenance."
      ],
      bulletsId: [
        "Menciptakan game promosi 'Gummy Run' yang meningkatkan interaksi pengguna dan visibilitas merek.",
        "Meningkatkan keandalan pengujian platform dengan protokol Firebase Test Hosting.",
        "Merapikan struktur kode dan memastikan kolaborasi tim berjalan lancar melalui pemeliharaan Git."
      ]
    }
  ];

  const skillsList: Skill[] = [
    { 
      name: "ReactJS", 
      level: "Expert", 
      type: "frontend", 
      icon: "🍄", 
      descEn: "Used to build interactive dashboards from scratch at First Borneo, claim features at Bang Jamin, and checkout flows at Ruparupa.",
      descId: "Digunakan untuk membangun dasbor interaktif dari nol di First Borneo Group, dasbor klaim di Bang Jamin, serta fitur checkout di Ruparupa." 
    },
    { 
      name: "Next JS", 
      level: "Expert", 
      type: "frontend", 
      icon: "🔥", 
      descEn: "Utilized to design Pintarnya.com's landing pages and company profiles requiring server-side rendering (SSR) and fast SEO loading.",
      descId: "Digunakan untuk merancang halaman utama Pintarnya.com yang membutuhkan optimasi SEO dan pemuatan halaman yang instan." 
    },
    { 
      name: "React Native", 
      level: "Expert", 
      type: "mobile", 
      icon: "🍀", 
      descEn: "Constructed cross-platform mobile modules for operation logs tracking and claim workflows in insurance tech.",
      descId: "Membangun aplikasi mobile multiplatform untuk pelacakan layanan operasional dan alur kerja klaim asuransi." 
    },
    { 
      name: "TypeScript", 
      level: "Expert", 
      type: "language", 
      icon: "⭐", 
      descEn: "Implemented static typing across e-commerce transactional views and claim structures to minimize runtime production bugs.",
      descId: "Menerapkan sistem tipe yang ketat pada platform e-commerce dan aplikasi dasbor internal berskala besar guna menghindari bug runtime." 
    },
    { 
      name: "JavaScript", 
      level: "Expert", 
      type: "language", 
      icon: "⚡", 
      descEn: "Engineered customized helper wrappers, browser routing, and highly performance-optimized DOM event handlers.",
      descId: "Membuat pustaka utilitas kustom, wrapper API, dan menangani manipulasi DOM yang kompleks secara performan." 
    },
    { 
      name: "HTML/CSS", 
      level: "Expert", 
      type: "frontend", 
      icon: "🎨", 
      descEn: "Designed accessible, semantically valid layouts styled to comply with high fidelity UI/UX guidelines.",
      descId: "Merancang kerangka web semantik yang aksesibel, responsif, dan ramah seluler di semua peramban modern." 
    },
    { 
      name: "Firebase", 
      level: "Intermediate", 
      type: "backend", 
      icon: "🔋", 
      descEn: "Configured secure user authentication and instant database hosting protocols at Pharos and Alsintanlink.",
      descId: "Mengatur autentikasi instan, hosting uji coba, serta database real-time di Pharos dan Alsintanlink." 
    },
    { 
      name: "Git", 
      level: "Expert", 
      type: "tools", 
      icon: "🔧", 
      descEn: "Maintained repository versioning, collaborative branching models, and deployment synchronization cycles.",
      descId: "Mengelola siklus kontrol versi Git, rebase, percabangan, serta merapikan workflow integrasi kode tim." 
    },
    { 
      name: "Microservices", 
      level: "Intermediate", 
      type: "architecture", 
      icon: "🧱", 
      descEn: "Coordinated frontend API calls with microservices architecture endpoints for modular data feeds.",
      descId: "Mengkoneksikan modul frontend dengan berbagai endpoint arsitektur microservices secara terpisah dan tangguh." 
    },
    { 
      name: "Public Speaking", 
      level: "Soft Skill", 
      type: "soft", 
      icon: "📣", 
      descEn: "Led dashboard walkthroughs and onboarding programs for field workers adopting digital agricultural systems.",
      descId: "Memandu sesi demo produk teknis dan onboarding bagi pengguna internal maupun pekerja lapangan." 
    },
    { 
      name: "Teamwork", 
      level: "Soft Skill", 
      type: "soft", 
      icon: "🤝", 
      descEn: "Partnered closely in cross-functional configurations with designers, backends, and branch offices.",
      descId: "Berkolaborasi erat secara lintas fungsi dengan manajer produk, tim backend, dan desainer UI/UX." 
    },
    { 
      name: "Leadership", 
      level: "Soft Skill", 
      type: "soft", 
      icon: "👑", 
      descEn: "Mentored engineering interns to establish solid development practices, clean architecture, and standards.",
      descId: "Membimbing pekerja magang frontend di Ruparupa, menanamkan standar kode bersih dan praktik terbaik." 
    },
    { 
      name: "Negotiation", 
      level: "Soft Skill", 
      type: "soft", 
      icon: "💬", 
      descEn: "Managed project scope definitions and discussed effort estimations directly with external corporate partners.",
      descId: "Mendiskusikan estimasi bobot fitur dan merundingkan prioritas pengerjaan bersama tim produk dan pemangku kepentingan." 
    }
  ];

  // Map walking animation handler
  useEffect(() => {
    const target = experiences[selectedJob];
    if (!target) return;

    let startX = mapCharPos.x;
    let startY = mapCharPos.y;
    
    setFacingLeft(target.x < startX);

    let elapsed = 0;
    const duration = 35;
    let active = true;
    setIsWalking(true);

    const tick = () => {
      if (!active) return;
      elapsed++;
      const t = Math.min(elapsed / duration, 1);
      
      const ease = t * (2 - t);
      const currX = startX + (target.x - startX) * ease;
      const currY = startY + (target.y - startY) * ease;
      
      setMapCharPos({ x: currX, y: currY });

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        setIsWalking(false);
      }
    };

    requestAnimationFrame(tick);
    return () => {
      active = false;
    };
  }, [selectedJob]);

  // Translate shorthand
  const t = (key: keyof typeof translations['en']) => {
    return translations[lang][key] || key;
  };

  return (
    <div className={`min-h-screen p-3 sm:p-5 md:p-8 flex flex-col items-center select-none font-sans relative overflow-x-hidden transition-colors duration-300 ${
      darkMode ? 'bg-[#0c0d14] text-white' : 'bg-[#f4f3ec] text-[#111118]'
    }`}>
      
      {/* HUD Header Component */}
      <HUD 
        bentoPowerState={bentoPowerState}
        coinCount={coinCount}
        xp={xp}
        selectedJob={selectedJob}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        lang={lang}
        changeLanguage={changeLanguage}
        isMuted={isMuted}
        handleToggleMute={handleToggleMute}
        clickCoinHUD={clickCoinHUD}
        t={t}
      />

      {/* Navigation Menu Component */}
      <Navigation 
        currentMenu={currentMenu}
        selectMenu={selectMenu}
        darkMode={darkMode}
        t={t}
      />

      {/* Screen Views Wrapper */}
      <main className="w-full max-w-6xl">
        
        {/* TABS 1: PLAY ARCADE / DASHBOARD VIEW */}
        {currentMenu === 'dashboard' && (
          <DashboardView 
            darkMode={darkMode}
            lang={lang}
            t={t}
            coinCount={coinCount}
            setCoinCount={setCoinCount}
            handleSkillUnlocked={handleSkillUnlocked}
            unlockedSkills={unlockedSkills}
            skillsList={skillsList}
          />
        )}

        {/* TABS 2: WORLD MAP SELECTOR VIEW */}
        {currentMenu === 'map' && (
          <MapView 
            darkMode={darkMode}
            t={t}
            experiences={experiences}
            selectedJob={selectedJob}
            setSelectedJob={setSelectedJob}
            mapCharPos={mapCharPos}
            isWalking={isWalking}
            facingLeft={facingLeft}
            bentoPowerState={bentoPowerState}
            lang={lang}
          />
        )}

        {/* TABS 3: INVENTORY VIEW */}
        {currentMenu === 'inventory' && (
          <InventoryView 
            darkMode={darkMode}
            lang={lang}
            t={t}
            skillsList={skillsList}
            selectedSkill={selectedSkill}
            handleSelectSkill={handleSelectSkill}
            unlockedSkills={unlockedSkills}
          />
        )}

        {/* TABS 4: SAVE GAME / CONTACT VIEW */}
        {currentMenu === 'contact' && (
          <ContactView 
            darkMode={darkMode}
            t={t}
            clickCoinHUD={clickCoinHUD}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl mt-12 mb-6 border-t-2 border-gray-800 pt-6 text-center select-none font-mono">
        <p className="retro-font-press text-[9px] text-gray-500 mb-4 animate-blink">
          {t('thankYou')}
        </p>
        <p className="text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Bento Putra Hermanto. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
