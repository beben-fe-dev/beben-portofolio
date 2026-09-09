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
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false); // Scrolling down
      } else {
        setShowHeader(true); // Scrolling up
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    if (lenis) {
      lenis.scrollTo(id);
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
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0, transition: { duration: 0.35, ease: "easeInOut" } }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
        >
          <div className="pointer-events-auto glass-panel w-full max-w-6xl rounded-[2rem] flex items-center justify-between px-6 py-3.5 shadow-2xl border border-border/80">
            {/* Logo */}
            <a
              onClick={() => handleScrollTo("#hero")}
              className="cursor-pointer font-extrabold text-lg flex items-center gap-3 group select-none flex-shrink-0"
            >
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-primary to-sky-400 p-[1px] shadow-lg group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-background rounded-[11px] flex items-center justify-center">
                  <span className="font-extrabold text-xs tracking-tighter bg-gradient-to-r from-purple-500 to-sky-400 bg-clip-text text-transparent">
                    BH
                  </span>
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold tracking-tight text-foreground text-sm leading-none group-hover:text-primary transition-colors">
                  Bento Putra Hermanto
                </span>
                <span className="text-[9px] font-bold text-muted-foreground tracking-widest uppercase mt-0.5">
                  Portfolio
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex flex-1 justify-center px-4">
              <ul className="flex items-center space-x-7">
                {navItems.map((item) => (
                  <motion.li
                    key={item.name}
                    className="relative group text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors py-1"
                  >
                    <a
                      onClick={() => handleScrollTo(item.href)}
                      className="cursor-pointer hover:text-foreground"
                    >
                      {item.name}
                    </a>
                    <motion.span
                      className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-primary rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                      initial={{ width: 0, x: "-50%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.25 }}
                    />
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Actions: Theme Toggle & WhatsApp CTA */}
            <div className="flex items-center gap-2.5">
              <ThemeToggle />

              <a
                href="https://wa.me/62859106530700"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-foreground text-background hover:opacity-90 transition-all active:scale-95 shadow-md ml-1"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-foreground hover:text-primary transition-colors p-2"
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
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-8 right-8 text-foreground p-2 rounded-full hover:bg-muted/30"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  aria-label="Close Mobile Menu"
                >
                  <X size={28} />
                </motion.button>

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
