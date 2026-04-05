"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({ children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.08,           // smoothness factor (0.08 = very smooth, like butter)
            wheelMultiplier: 1.0, // scroll speed multiplier
            touchMultiplier: 1.5, // touch scroll speed
            infinite: false,
        });

        lenisRef.current = lenis;

        // Expose globally so Footer (and any component) can call scrollToTop
        window.lenis = lenis;

        // Expose a premium scroll-to-top helper with custom easing
        window.scrollToTopLenis = () => {
            lenis.scrollTo(0, {
                duration: 1.8,
                // Quartic ease-out: fast start, elegant deceleration
                easing: (t) => 1 - Math.pow(1 - t, 4),
            });
        };

        let rafId;
        function raf(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId); // prevent RAF leak on unmount
            lenis.destroy();
            window.lenis = null;
            window.scrollToTopLenis = null;
        };
    }, []);

    return children;
}