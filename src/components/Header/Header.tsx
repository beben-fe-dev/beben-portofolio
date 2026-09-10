import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants, type MotionProps } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { ThemeToggle } from "../lightswind/theme-toggle";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Career", href: "#career" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (isMobileMenuOpen) return;
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 20) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false); // Scrolling down
      } else {
        setShowHeader(true); // Scrolling up
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleScrollTo = (id: string) => {
    if (lenis) {
      lenis.scrollTo(id, { offset: id === "#hero" ? 0 : -80 });
    } else {
      const el = document.querySelector(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const menuVariants: Variants = {
    open: {
      clipPath: "circle(1500px at 90% 5%)",
      transition: { type: "spring", stiffness: 20, restDelta: 2 },
    },
    closed: {
      clipPath: "circle(0px at 90% 5%)",
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
  };

  const listVariants: Variants = {
    open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };

  const itemVariants: Variants = {
    open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
    closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } },
  };

  return (
    <AnimatePresence>
      {showHeader && (
        <motion.header
          initial={{ y: -90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -90, opacity: 0, transition: { duration: 0.25, ease: [0.32, 0, 0.67, 0] } }}
          transition={{ type: "spring", stiffness: 360, damping: 28 }}
          className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none"
        >
          <div className="pointer-events-auto glass-panel relative overflow-hidden w-full max-w-6xl rounded-2xl sm:rounded-[2rem] flex items-center justify-between px-3.5 py-2 sm:px-6 sm:py-3.5 shadow-2xl border border-border/80">
            {/* Apple Specular Edge Highlight */}
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/50 dark:via-white/20 to-transparent pointer-events-none" />

            {/* Logo */}
            <motion.a
              onClick={() => handleScrollTo("#hero")}
              whileTap={{ scale: 0.96 }}
              className="cursor-pointer font-extrabold text-lg flex items-center gap-2.5 sm:gap-3 group select-none flex-shrink-0"
            >
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-gradient-to-tr from-purple-600 via-primary to-sky-400 p-[1px] shadow-lg group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-background rounded-[7px] sm:rounded-[11px] flex items-center justify-center">
                  <span className="font-extrabold text-[11px] sm:text-xs tracking-tighter bg-gradient-to-r from-purple-500 to-sky-400 bg-clip-text text-transparent">
                    BH
                  </span>
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold tracking-tight text-foreground text-xs sm:text-sm leading-none group-hover:text-primary transition-colors">
                  Bento Putra Hermanto
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold text-muted-foreground tracking-widest uppercase mt-0.5">
                  Portfolio
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex flex-1 justify-center px-4">
              <ul className="flex items-center space-x-7">
                {navItems.map((item) => (
                  <motion.li
                    key={item.name}
                    whileTap={{ scale: 0.95 }}
                    className="relative group text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors py-1"
                  >
                    <a
                      onClick={() => handleScrollTo(item.href)}
                      className="cursor-pointer hover:text-foreground transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)] origin-center"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Actions: Theme Toggle & WhatsApp CTA */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <ThemeToggle />

              <motion.a
                href="https://wa.me/62859106530700"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.96 }}
                className="relative overflow-hidden group/cta hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-foreground text-background hover:opacity-95 transition-all shadow-md ml-1"
              >
                {/* Apple Ambient Sheen */}
                <span className="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="relative z-10">Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5 relative z-10 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform duration-200" />
              </motion.a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-foreground hover:text-primary transition-transform duration-150 active:scale-90 p-2"
                aria-label="Open Mobile Menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>

          {/* Mobile Sidebar (Circle Reveal from Top-Right) */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                {...({
                  initial: "closed",
                  animate: "open",
                  exit: "closed",
                  variants: menuVariants,
                } as MotionProps)}
                className="fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center pointer-events-auto"
              >
                {/* Mobile Menu Top Bar: Theme Toggle & Close Button */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-auto">
                  <ThemeToggle />
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-foreground p-2 rounded-full hover:bg-muted/30 active:scale-90 transition-transform"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ delay: 0.2 }}
                    aria-label="Close Mobile Menu"
                  >
                    <X size={28} />
                  </motion.button>
                </div>

                <motion.ul
                  {...({ variants: listVariants } as MotionProps)}
                  className="flex flex-col items-center justify-center space-y-8"
                >
                  {navItems.map((item) => (
                    <motion.li key={item.name} {...({ variants: itemVariants } as MotionProps)}>
                      <a
                        onClick={() => handleScrollTo(item.href)}
                        className="text-3xl sm:text-4xl font-extrabold text-muted-foreground hover:text-primary transition-colors cursor-pointer tracking-tight"
                      >
                        {item.name}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>

                <div className="mt-10">
                  <a
                    href="https://wa.me/62859106530700"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-primary text-primary-foreground shadow-lg"
                  >
                    <span>Connect on WhatsApp</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
