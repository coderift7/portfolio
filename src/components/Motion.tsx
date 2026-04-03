"use client";

import { createContext, useContext, useRef, useEffect, useState, type CSSProperties } from "react";
import { motion, type Variants } from "framer-motion";

// Keep variant exports for type compat — but animations are now CSS-driven
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
};

// CSS-based IntersectionObserver hook (no Framer Motion)
function useIntersect(margin = "-80px") {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return { ref, visible };
}

// Animation direction from variants
function getTransform(variants: Variants, visible: boolean): CSSProperties {
  if (visible) return { opacity: 1, transform: "translate(0, 0)" };

  const hidden = variants.hidden as Record<string, number> | undefined;
  const x = hidden?.x ?? 0;
  const y = hidden?.y ?? 28;
  return { opacity: 0, transform: `translate(${x}px, ${y}px)` };
}

export function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useIntersect("-80px");

  return (
    <div
      ref={ref}
      style={{
        ...getTransform(variants, visible),
        transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
      className={className}
    >
      {children}
    </div>
  );
}

// React Context for StaggerContainer → StaggerItem communication
const StaggerContext = createContext(false);

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const { ref, visible } = useIntersect("-60px");

  return (
    <StaggerContext.Provider value={visible}>
      <div
        ref={ref}
        className={className}
        style={{ "--stagger-delay": `${staggerDelay}s` } as CSSProperties}
      >
        {children}
      </div>
    </StaggerContext.Provider>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const visible = useContext(StaggerContext);

  // Find own index among siblings for stagger calc
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el?.parentElement) return;
    const siblings = Array.from(el.parentElement.children);
    setIndex(siblings.indexOf(el));
  }, []);

  const delay = visible ? index * 0.08 : 0;

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
      className={className}
    >
      {children}
    </div>
  );
}

export { motion };
