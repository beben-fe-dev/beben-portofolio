import React, { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import { cn } from "../lib/utils";

export type AnimationType =
  | "none"
  | "circle-spread"
  | "round-morph"
  | "swipe-left"
  | "swipe-up"
  | "diag-down-right"
  | "fade-in-out"
  | "shrink-grow"
  | "flip-x-in"
  | "split-vertical"
  | "swipe-right"
  | "swipe-down"
  | "wave-ripple";

const ANIMATION_TYPES: AnimationType[] = [
  "circle-spread",
  "round-morph",
  "swipe-left",
  "swipe-right",
  "swipe-up",
  "swipe-down",
  "diag-down-right",
  "fade-in-out",
  "shrink-grow",
  "wave-ripple",
  "split-vertical",
  "flip-x-in",
];

export interface ToggleThemeProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
  animationType?: AnimationType | "random";
}

export function ThemeToggle({
  className,
  duration = 400,
  animationType = "random",
  ...props
}: ToggleThemeProps) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Ensure View Transition override CSS is present in head
  useEffect(() => {
    let styleElement = document.getElementById("toggle-theme-vt-override") as HTMLStyleElement;
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "toggle-theme-vt-override";
      styleElement.textContent = `
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
      `;
      document.head.appendChild(styleElement);
    }
  }, []);

  const applyTheme = useCallback((targetDark: boolean) => {
    setIsDark(targetDark);
    if (targetDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", targetDark ? "dark" : "light");
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  const toggleTheme = useCallback(async () => {
    const currentAnimation: AnimationType =
      animationType === "random"
        ? ANIMATION_TYPES[Math.floor(Math.random() * ANIMATION_TYPES.length)]
        : animationType;

    const newTheme = !isDark;

    // Fallback if View Transitions API is not supported or throws
    if (!(document as any).startViewTransition) {
      applyTheme(newTheme);
      return;
    }

    try {
      const transition = (document as any).startViewTransition(() => {
        flushSync(() => {
          applyTheme(newTheme);
        });
      });

      // Spatial animation with safe WebKit / Mobile Safari fallback
      try {
        await transition.ready;

        // Calculate coordinates and dimensions for spatial animations
        const btn = buttonRef.current;
        const left = btn ? btn.getBoundingClientRect().left : window.innerWidth / 2;
        const top = btn ? btn.getBoundingClientRect().top : window.innerHeight / 2;
        const width = btn ? btn.getBoundingClientRect().width : 40;
        const height = btn ? btn.getBoundingClientRect().height : 40;

        const x = left + width / 2;
        const y = top + height / 2;
        const maxRadius = Math.hypot(
          Math.max(left, window.innerWidth - left),
          Math.max(top, window.innerHeight - top)
        );
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        switch (currentAnimation) {
          case "circle-spread":
            document.documentElement.animate(
              {
                clipPath: [
                  `circle(0px at ${x}px ${y}px)`,
                  `circle(${maxRadius}px at ${x}px ${y}px)`,
                ],
              },
              {
                duration,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
              }
            );
            break;

          case "round-morph":
            document.documentElement.animate(
              [
                { opacity: 0, transform: "scale(0.8) rotate(5deg)" },
                { opacity: 1, transform: "scale(1) rotate(0deg)" },
              ],
              {
                duration: duration * 1.2,
                easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                pseudoElement: "::view-transition-new(root)",
              }
            );
            break;

          case "swipe-left":
            document.documentElement.animate(
              {
                clipPath: [
                  `inset(0 0 0 ${viewportWidth}px)`,
                  `inset(0 0 0 0)`,
                ],
              },
              {
                duration,
                easing: "cubic-bezier(0.2, 0, 0, 1)",
                pseudoElement: "::view-transition-new(root)",
              }
            );
            break;

          case "swipe-right":
            document.documentElement.animate(
              {
                clipPath: [
                  `inset(0 ${viewportWidth}px 0 0)`,
                  `inset(0 0 0 0)`,
                ],
              },
              {
                duration,
                easing: "cubic-bezier(0.2, 0, 0, 1)",
                pseudoElement: "::view-transition-new(root)",
              }
            );
            break;

          case "swipe-up":
            document.documentElement.animate(
              {
                clipPath: [
                  `inset(${viewportHeight}px 0 0 0)`,
                  `inset(0 0 0 0)`,
                ],
              },
              {
                duration,
                easing: "cubic-bezier(0.2, 0, 0, 1)",
                pseudoElement: "::view-transition-new(root)",
              }
            );
            break;

          case "swipe-down":
            document.documentElement.animate(
              {
                clipPath: [
                  `inset(0 0 ${viewportHeight}px 0)`,
                  `inset(0 0 0 0)`,
                ],
              },
              {
                duration,
                easing: "cubic-bezier(0.2, 0, 0, 1)",
                pseudoElement: "::view-transition-new(root)",
              }
            );
            break;

          case "diag-down-right":
            document.documentElement.animate(
              {
                clipPath: [
                  `polygon(0 0, 0 0, 0 0, 0 0)`,
                  `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                ],
              },
              {
                duration,
                easing: "cubic-bezier(0.2, 0, 0, 1)",
                pseudoElement: "::view-transition-new(root)",
              }
            );
            break;

          case "fade-in-out":
            document.documentElement.animate(
              [{ opacity: 0 }, { opacity: 1 }],
              {
                duration,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
              }
            );
            break;

          case "shrink-grow":
            document.documentElement.animate(
              [
                { transform: "scale(0.9)", opacity: 0 },
                { transform: "scale(1)", opacity: 1 },
              ],
              {
                duration,
                easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                pseudoElement: "::view-transition-new(root)",
              }
            );
            break;

          case "wave-ripple":
            document.documentElement.animate(
              {
                clipPath: [
                  `circle(0% at ${x}px ${y}px)`,
                  `circle(50% at ${x}px ${y}px)`,
                  `circle(100% at ${x}px ${y}px)`,
                ],
              },
              {
                duration: duration * 1.2,
                easing: "ease-out",
                pseudoElement: "::view-transition-new(root)",
              }
            );
            break;

          case "split-vertical":
            document.documentElement.animate(
              {
                clipPath: [
                  `polygon(0 50%, 100% 50%, 100% 50%, 0 50%)`,
                  `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                ],
              },
              {
                duration,
                easing: "cubic-bezier(0.2, 0, 0, 1)",
                pseudoElement: "::view-transition-new(root)",
              }
            );
            break;

          case "flip-x-in":
            document.documentElement.animate(
              [
                { transform: "rotateY(90deg)", opacity: 0 },
                { transform: "rotateY(0deg)", opacity: 1 },
              ],
              {
                duration: duration * 1.3,
                easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                pseudoElement: "::view-transition-new(root)",
              }
            );
            break;

          case "none":
          default:
            break;
        }
      } catch {
        // Mobile Safari WebKit doesn't support pseudoElement in Web Animations API
      }
    } catch {
      // If startViewTransition fails, apply immediately
      applyTheme(newTheme);
    }
  }, [isDark, duration, animationType, applyTheme]);

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        "p-2.5 rounded-full glass-panel border border-foreground/10 hover:border-primary/40 text-foreground transition-all shadow-md flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95",
        className
      )}
      aria-label="Toggle Theme"
      {...props}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
      ) : (
        <Moon className="h-5 w-5 text-indigo-500 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
      )}
    </button>
  );
}

export const ToggleTheme = ThemeToggle;
export default ThemeToggle;
