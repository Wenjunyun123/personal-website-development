"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
  type RefObject
} from "react";
import styles from "./record.module.css";

export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onStoreChange);
      return () => media.removeEventListener("change", onStoreChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article";
  id?: string;
  style?: CSSProperties;
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  id,
  style
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => {
      node.dataset.reveal = "shown";
    };

    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      show();
      return;
    }

    node.dataset.reveal = "hidden";
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const Tag = as;

  return (
    <Tag
      ref={ref as RefObject<HTMLDivElement>}
      id={id}
      className={[styles.reveal, className].filter(Boolean).join(" ")}
      data-reveal={undefined}
      style={{
        ...style,
        transitionDelay: delay ? `${delay}ms` : undefined
      }}
    >
      {children}
    </Tag>
  );
}

type CountUpProps = {
  value: number;
  display: string;
  formatComma?: boolean;
  className?: string;
};

export function CountUp({ value, display, formatComma = false, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const formatter = useMemo(() => new Intl.NumberFormat("en-US"), []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const render = (current: number) => {
      node.textContent = formatComma ? formatter.format(current) : String(current);
    };

    node.textContent = display;

    if (value === 0 || reducedMotion || typeof IntersectionObserver === "undefined") {
      return;
    }

    let frame = 0;
    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || started) return;
        started = true;
        observer.disconnect();
        const start = performance.now();
        const duration = 1200;

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          render(Math.round(eased * value));
          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          } else {
            node.textContent = display;
          }
        };

        render(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      node.textContent = display;
    };
  }, [display, formatComma, formatter, reducedMotion, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
