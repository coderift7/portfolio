"use client";

import { useRef, useEffect, useState, type CSSProperties } from "react";
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
    <div
      ref={ref}
      className={className}
      data-visible={visible}
      style={{ "--stagger-delay": `${staggerDelay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // Find own index among siblings for stagger calc
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el?.parentElement) return;
    const siblings = Array.from(el.parentElement.children);
    setIndex(siblings.indexOf(el));
  }, []);

  // Check if ancestor StaggerContainer is visible (walks up to find data-visible)
  const parentRef = useRef<Element | null>(null);
  const [parentVisible, setParentVisible] = useState(false);

  useEffect(() => {
    let el = ref.current?.parentElement;
    while (el && !("visible" in (el as HTMLElement).dataset)) {
      el = el.parentElement;
    }
    if (!el) return;
    parentRef.current = el;
    const check = () => setParentVisible((el as HTMLElement).dataset.visible === "true");
    check();
    const observer = new MutationObserver(check);
    observer.observe(el, { attributes: true, attributeFilter: ["data-visible"] });
    return () => observer.disconnect();
  }, []);

  const delay = parentVisible ? index * 0.08 : 0;

  return (
    <div
      ref={ref}
      style={{
        opacity: parentVisible ? 1 : 0,
        transform: parentVisible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
      className={className}
    >
      {children}
    </div>
  );
}

export { motion };
