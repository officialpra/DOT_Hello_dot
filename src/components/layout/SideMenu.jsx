"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

const NAV_LINKS = [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Stories", href: "/stories" },
    { label: "Product", href: "/product" },
];

const SOCIAL_LINKS = [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Twitter", href: "https://twitter.com" },
];

const EASE_OUT_EXPO = "cubic-bezier(0.22, 1, 0.36, 1)";

// ============================================================================
// MATH HELPERS
// ============================================================================

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
}

// ============================================================================
// SVG PATH GENERATOR
// Builds a cubic-bezier path that bulges at the mouse Y position
// ============================================================================

function generateWavePath(mouseY, height, bulgeAmount, spread) {
    const my = clamp(mouseY, 0, 1);  // Allow full range — no artificial padding
    const h = height;
    const svgW = 100;
    const right = svgW;

    const BASE_BULGE = 0;   // Completely invisible at rest
    const MAX_BULGE = 70;
    const activeBulge = BASE_BULGE + (bulgeAmount * (MAX_BULGE - BASE_BULGE));

    const peakX = right - activeBulge;
    const peakY = my * h;
    const halfSpread = spread * 0.5;

    // NO clamping — let the curve extend beyond viewport bounds
    // The SVG clips it naturally via overflow:hidden
    const topStartY = peakY - spread;
    const botEndY = peakY + spread;

    return [
        `M ${right} ${topStartY}`,
        `C ${right} ${topStartY + halfSpread * 0.3},`,
        `  ${peakX} ${peakY - halfSpread * 0.5},`,
        `  ${peakX} ${peakY}`,
        `C ${peakX} ${peakY + halfSpread * 0.5},`,
        `  ${right} ${botEndY - halfSpread * 0.3},`,
        `  ${right} ${botEndY}`,
        `Z`
    ].join(" ");
}

// ============================================================================
// LIQUID WAVE TRIGGER COMPONENT (Performance-Optimized)
// ============================================================================

const LiquidWaveTrigger = ({ onOpen, isOpen }) => {
    const pathRef = useRef(null);
    const iconRef = useRef(null);
    const rafRef = useRef(null);
    const isRunning = useRef(false);     // . Track if loop is active
    const cachedHeight = useRef(900);    // . Cache height to avoid layout thrash

    const mouseState = useRef({
        targetY: 0.5,
        currentY: 0.5,
        targetBulge: 0,
        currentBulge: 0,
    });

    const SPREAD = 350;
    const SENSOR_WIDTH = 50;       // Only activate within 50px of right edge
    const SVG_WIDTH = 100;

    // . Start the animation loop (only if not already running)
    const startLoop = useCallback(() => {
        if (isRunning.current) return;
        isRunning.current = true;
        rafRef.current = requestAnimationFrame(updateFrame);
    }, []);

    // . Stop the animation loop
    const stopLoop = useCallback(() => {
        isRunning.current = false;
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    }, []);

    // Animation loop
    const updateFrame = useCallback(() => {
        if (!isRunning.current) return;

        const st = mouseState.current;

        // Lerp toward targets
        st.currentY = lerp(st.currentY, st.targetY, 0.08);
        st.currentBulge = lerp(st.currentBulge, st.targetBulge, 0.06);

        // . Convergence check — if the wave has fully retracted AND
        // values have settled, STOP the loop entirely (save CPU)
        const bulgeSettled = Math.abs(st.currentBulge - st.targetBulge) < 0.001;
        const ySettled = Math.abs(st.currentY - st.targetY) < 0.001;

        if (bulgeSettled && ySettled && st.targetBulge === 0 && st.currentBulge < 0.002) {
            st.currentBulge = 0;
            if (pathRef.current) {
                pathRef.current.setAttribute("d", generateWavePath(0.5, cachedHeight.current, 0, SPREAD));
            }
            isRunning.current = false;
            return;
        }

        const h = cachedHeight.current;
        const path = generateWavePath(st.currentY, h, st.currentBulge, SPREAD);

        if (pathRef.current) {
            pathRef.current.setAttribute("d", path);
        }

        // Move icon to the curve's tip (peak center)
        if (iconRef.current) {
            const peakY = st.currentY * h;
            const BASE_BULGE = 0;
            const MAX_BULGE = 70;
            const activeBulge = BASE_BULGE + (st.currentBulge * (MAX_BULGE - BASE_BULGE));
            const peakX = SVG_WIDTH - activeBulge;
            const iconX = (peakX + SVG_WIDTH) / 2;
            iconRef.current.style.transform = `translate(${iconX | 0}px, ${peakY | 0}px) translate(-50%, -50%)`;
            // Fade icon in/out with the wave
            iconRef.current.style.opacity = st.currentBulge > 0.15 ? String(clamp(st.currentBulge * 2, 0, 1)) : "0";
        }

        rafRef.current = requestAnimationFrame(updateFrame);
    }, []);

    // . Cache viewport height (only on resize, not every frame)
    useEffect(() => {
        const updateHeight = () => { cachedHeight.current = window.innerHeight; };
        updateHeight();
        window.addEventListener("resize", updateHeight, { passive: true });
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => stopLoop();
    }, [stopLoop]);

    // Mouse tracking — only processes near right edge to avoid card conflicts
    useEffect(() => {
        const handleMove = (e) => {
            const w = window.innerWidth;
            const distFromRight = w - e.clientX;

            // Early exit — don't process if mouse is far from right edge
            // This prevents interference with ProjectCard liquid effects
            if (distFromRight > SENSOR_WIDTH + 20) {
                const st = mouseState.current;
                if (st.targetBulge > 0) {
                    st.targetBulge = 0;
                    if (st.currentBulge > 0.002) startLoop();
                }
                return; // . Skip all processing
            }

            const st = mouseState.current;
            const h = cachedHeight.current;

            st.targetY = clamp(e.clientY / h, 0, 1);

            if (distFromRight < SENSOR_WIDTH) {
                st.targetBulge = clamp(1 - (distFromRight / SENSOR_WIDTH), 0, 1);
                startLoop();
            } else {
                st.targetBulge = 0;
                if (st.currentBulge > 0.002) startLoop();
            }
        };

        window.addEventListener("mousemove", handleMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMove);
    }, [startLoop]);

    if (isOpen) return null;

    const h = cachedHeight.current;

    return (
        <div className="fixed right-0 top-0 z-50 hidden md:block" style={{ width: `${SVG_WIDTH}px`, height: "100vh", pointerEvents: "none", overflow: "hidden" }}>
            {/* Invisible sensor */}
            <div
                style={{
                    position: "fixed",
                    right: 0,
                    top: 0,
                    width: `${SENSOR_WIDTH}px`,
                    height: "100vh",
                    pointerEvents: "auto",
                    cursor: "pointer",
                    zIndex: 51,
                }}
                onClick={onOpen}
            />

            {/* SVG Wave — GPU-composited */}
            <svg
                viewBox={`0 0 ${SVG_WIDTH} ${h}`}
                preserveAspectRatio="none"
                style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    width: `${SVG_WIDTH}px`,
                    height: "100vh",
                    pointerEvents: "none",
                    willChange: "transform", // . GPU layer promotion
                }}
            >
                <path
                    ref={pathRef}
                    d={generateWavePath(0.5, h, 0, SPREAD)}
                    fill="black"
                />
            </svg>

            {/* Hamburger icon — follows curve tip */}
            <div
                ref={iconRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                    willChange: "transform",
                }}
            >
                <div className="flex flex-col gap-[4px] items-center">
                    <span className="block w-[14px] h-[1.5px] bg-white rounded-full" />
                    <span className="block w-[14px] h-[1.5px] bg-white rounded-full" />
                    <span className="block w-[10px] h-[1.5px] bg-white rounded-full" />
                </div>
            </div>
        </div>
    );
};

// ============================================================================
// MAIN SIDEMENU COMPONENT
// ============================================================================

const SideMenu = ({ isOpen, onClose, onOpen }) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    return (
        <>
            {/* LIQUID WAVE TRIGGER — replaces the old static pill */}
            <LiquidWaveTrigger onOpen={onOpen} isOpen={isOpen} />

            {/* Mobile hamburger */}
            <button
                onClick={onOpen}
                className="md:hidden fixed top-6 right-6 z-40 flex flex-col gap-[5px] p-2"
                aria-label="Open navigation menu"
            >
                <span className="block w-6 h-[1.5px] bg-black rounded-full" />
                <span className="block w-6 h-[1.5px] bg-black rounded-full" />
                <span className="block w-4 h-[1.5px] bg-black rounded-full" />
            </button>

            {/* ─────────────────────────────────────────────────────────────
          LAYER 1 — Black background overlay
      ───────────────────────────────────────────────────────────────── */}
            <div
                onClick={onClose}
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 100,
                    backgroundColor: "#000",
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? "auto" : "none",
                    transition: `opacity ${isOpen ? "0.5s" : "0.4s"} ease`,
                    transitionDelay: isOpen ? "0ms" : "450ms",
                }}
            />

            {/* ─────────────────────────────────────────────────────────────
          LAYER 2 — Content (logo, nav, social)
      ───────────────────────────────────────────────────────────────── */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 110,
                    pointerEvents: isOpen ? "none" : "none",
                }}
            >
                {/* ── Logo top-left ── */}
                <div
                    style={{
                        position: "absolute",
                        top: "40px",
                        left: "40px",
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? "translateY(0)" : "translateY(-10px)",
                        transition: `opacity 0.5s ease, transform 0.5s ${EASE_OUT_EXPO}`,
                        transitionDelay: isOpen ? "220ms" : "0ms",
                        pointerEvents: "none",
                    }}
                >
                    <p
                        className="text-white font-sans font-bold select-none"
                        style={{ fontSize: "10px", lineHeight: 1.35, letterSpacing: "0.02em" }}
                    >
                        HELLO<br />MONDAY<br />/DEPT.
                    </p>
                </div>

                {/* ── Nav links — staggered cascade ── */}
                <nav
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        paddingLeft: "clamp(40px, 48%, 58%)",
                        pointerEvents: isOpen ? "auto" : "none",
                    }}
                >
                    {NAV_LINKS.map((link, i) => {
                        const openDelay = 220 + i * 80;
                        const closeDelay = 0;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={onClose}
                                style={{
                                    display: "block",
                                    opacity: isOpen ? 1 : 0,
                                    transform: isOpen ? "translateY(0)" : "translateY(18px)",
                                    transition: `opacity 0.55s ${EASE_OUT_EXPO}, transform 0.55s ${EASE_OUT_EXPO}`,
                                    transitionDelay: isOpen ? `${openDelay}ms` : `${closeDelay}ms`,
                                }}
                            >
                                <span
                                    className="font-garamond text-white block"
                                    style={{
                                        fontSize: "clamp(56px, 7.5vw, 108px)",
                                        lineHeight: 1.1,
                                        letterSpacing: "0.01em",
                                        fontWeight: 400,
                                        transition: "opacity 0.25s ease",
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.opacity = "0.45"; }}
                                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                                >
                                    {link.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* ── Social links — bottom center ── */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "32px",
                        left: 0,
                        right: "100px",
                        display: "flex",
                        justifyContent: "center",
                        gap: "40px",
                        opacity: isOpen ? 1 : 0,
                        transition: "opacity 0.45s ease",
                        transitionDelay: isOpen ? "660ms" : "0ms",
                        pointerEvents: isOpen ? "auto" : "none",
                    }}
                >
                    {SOCIAL_LINKS.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#888] hover:text-white transition-colors duration-200 font-sans select-none"
                            style={{ fontSize: "13px", letterSpacing: "0.04em" }}
                        >
                            {s.label}
                        </a>
                    ))}
                </div>
            </div>

            {/* ─────────────────────────────────────────────────────────────
          LAYER 3 — White curved blob (slides in from right)
      ───────────────────────────────────────────────────────────────── */}
            <div
                style={{
                    position: "fixed",
                    right: 0,
                    top: 0,
                    height: "100vh",
                    zIndex: 120,
                    display: "flex",
                    alignItems: "center",
                    transform: isOpen ? "translateX(0)" : "translateX(105%)",
                    transition: `transform ${isOpen ? "0.65s" : "0.55s"} ${EASE_OUT_EXPO}`,
                    transitionDelay: isOpen ? "60ms" : "0ms",
                    pointerEvents: isOpen ? "auto" : "none",
                }}
            >
                {/* SVG blob */}
                <svg
                    viewBox="0 0 120 800"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    style={{ height: "100vh", width: "auto", display: "block" }}
                >
                    <path
                        d="M 120 0 L 120 800 C 55 800, 0 690, 22 560 C 50 410, 50 410, 22 255 C 0 130, 55 0, 120 0 Z"
                        fill="white"
                    />
                </svg>

                {/* ✕ Close button */}
                <button
                    onClick={onClose}
                    aria-label="Close menu"
                    style={{
                        position: "absolute",
                        left: "20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#000",
                        fontSize: "20px",
                        width: "36px",
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        transition: "opacity 0.2s ease",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = "0.5"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                >
                    ✕
                </button>
            </div>
        </>
    );
};

export default SideMenu;
