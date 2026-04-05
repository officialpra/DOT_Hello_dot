"use client";

import { useEffect, useRef } from "react";

/**
 * ScrollReveal
 * Wraps any element and fades it up smoothly when it enters the viewport.
 * Works bidirectionally — reveals on scroll DOWN and on scroll back UP.
 *
 * Props:
 *  - delay  (ms) : stagger delay before animation starts, default 0
 *  - duration (ms): animation duration, default 700
 *  - y (px)      : vertical offset to start from, default 40
 *  - className   : extra classes for the wrapper div
 */
export default function ScrollReveal({
  children,
  delay = 0,
  duration = 700,
  y = 40,
  className = "",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Start hidden
    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px)`;
    el.style.transition = `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`;
    el.style.willChange = "opacity, transform";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Element entered viewport — reveal it
          el.style.opacity = "1";
          el.style.transform = "translateY(0px)";
        } else {
          // Element left viewport — hide it again so it re-animates on next enter
          // (This makes scrolling UP also trigger the reveal again)
          el.style.opacity = "0";
          el.style.transform = `translateY(${y}px)`;
        }
      },
      {
        threshold: 0.1,     // trigger when 10% of element is visible
        rootMargin: "0px 0px -40px 0px", // small offset from bottom edge
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, duration, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
