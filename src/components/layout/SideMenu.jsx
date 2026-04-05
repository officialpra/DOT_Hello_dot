"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1];

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
// SVG PATH GENERATOR (For Trigger)
// ============================================================================

function generateWavePath(mouseY, height, bulgeAmount, spread) {
    const my = clamp(mouseY, 0, 1);
    const h = height;
    const svgW = 100;
    const right = svgW;

    const BASE_BULGE = 0;
    const MAX_BULGE = 70;
    const activeBulge = BASE_BULGE + (bulgeAmount * (MAX_BULGE - BASE_BULGE));

    const peakX = right - activeBulge;
    const peakY = my * h;
    const halfSpread = spread * 0.5;

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
// LIQUID WAVE TRIGGER COMPONENT
// ============================================================================

const LiquidWaveTrigger = ({ onOpen, isOpen }) => {
    const pathRef = useRef(null);
    const iconRef = useRef(null);
    const rafRef = useRef(null);
    const isRunning = useRef(false);
    const cachedHeight = useRef(900);

    const mouseState = useRef({
        targetY: 0.5,
        currentY: 0.5,
        targetBulge: 0,
        currentBulge: 0,
    });

    const SPREAD = 350;
    const SENSOR_WIDTH = 50;
    const SVG_WIDTH = 100;

    const startLoop = useCallback(() => {
        if (isRunning.current) return;
        isRunning.current = true;
        rafRef.current = requestAnimationFrame(updateFrame);
    }, []);

    const stopLoop = useCallback(() => {
        isRunning.current = false;
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    }, []);

    const updateFrame = useCallback(() => {
        if (!isRunning.current) return;

        const st = mouseState.current;

        st.currentY = lerp(st.currentY, st.targetY, 0.08);
        st.currentBulge = lerp(st.currentBulge, st.targetBulge, 0.06);

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

        if (iconRef.current) {
            const peakY = st.currentY * h;
            const BASE_BULGE = 0;
            const MAX_BULGE = 70;
            const activeBulge = BASE_BULGE + (st.currentBulge * (MAX_BULGE - BASE_BULGE));
            const peakX = SVG_WIDTH - activeBulge;
            const iconX = (peakX + SVG_WIDTH) / 2;
            iconRef.current.style.transform = `translate(${iconX | 0}px, ${peakY | 0}px) translate(-50%, -50%)`;
            iconRef.current.style.opacity = st.currentBulge > 0.15 ? String(clamp(st.currentBulge * 2, 0, 1)) : "0";
        }

        rafRef.current = requestAnimationFrame(updateFrame);
    }, []);

    useEffect(() => {
        const updateHeight = () => { cachedHeight.current = window.innerHeight; };
        updateHeight();
        window.addEventListener("resize", updateHeight, { passive: true });
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    useEffect(() => {
        return () => stopLoop();
    }, [stopLoop]);

    useEffect(() => {
        const handleMove = (e) => {
            const w = window.innerWidth;
            const distFromRight = w - e.clientX;

            if (distFromRight > SENSOR_WIDTH + 20) {
                const st = mouseState.current;
                if (st.targetBulge > 0) {
                    st.targetBulge = 0;
                    if (st.currentBulge > 0.002) startLoop();
                }
                return;
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
                    willChange: "transform",
                }}
            >
                <path
                    ref={pathRef}
                    d={generateWavePath(0.5, h, 0, SPREAD)}
                    fill="black"
                />
            </svg>

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
// CURVED PANEL COMPONENTS
// ============================================================================

const Curve = ({ type = "leading" }) => {
    // ─── TWO CURVES for the ultimate Hellomonday feel ────────────────────────
    // "leading"  → Black bulge on the LEFT edge. Leads the slide.
    // "trailing" → White crescent on the RIGHT edge. Creates the sliver.

    const isLeading = type === "leading";

    // Leading paths: Bulge from right side of SVG (x=100) towards center (x=0)
    // This sits at -left-[99px], so x=100 is the edge that touches the black panel.
    const closedLeading = `M 100 0 L 100 100 C 100 75, 100 75, 100 50 C 100 25, 100 25, 100 0 Z`;
    const openLeading = `M 100 0 L 100 100 C 100 75, 20 75, 20 50 C 20 25, 100 25, 100 0 Z`;

    // Trailing paths: Concave curve on the right (already working)
    const closedTrailing = `M 100 0 L 100 100 C 100 70, 100 70, 100 50 C 100 30, 100 30, 100 0 Z`;
    const openTrailing = `M 100 0 L 100 100 C 100 70,  20 70,  20 50 C  20 30, 100 30, 100 0 Z`;

    const variants = {
        initial: { d: isLeading ? closedLeading : closedTrailing },
        enter: {
            d: isLeading ? openLeading : openTrailing,
            transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: isLeading ? closedLeading : closedTrailing,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
        }
    };

    return (
        <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className={`absolute top-0 ${isLeading ? "-left-[99px]" : "right-0"} w-[100px] h-full pointer-events-none hidden md:block`}
            style={{ zIndex: isLeading ? 0 : 1 }}
        >
            <motion.path
                variants={variants}
                initial="initial"
                animate="enter"
                exit="exit"
                fill={isLeading ? "#000000" : "#ffffff"}
            />
        </svg>
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

    const menuSlide = {
        initial: { x: "calc(100% + 100px)" },
        enter: { x: "0%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
        exit: { x: "calc(100% + 100px)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
    };

    const linkSlide = {
        initial: { x: 80, opacity: 0 },
        enter: (i) => ({
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i + 0.3 }
        }),
        exit: (i) => ({
            x: 80,
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i }
        })
    };

    return (
        <>
            <LiquidWaveTrigger onOpen={onOpen} isOpen={isOpen} />

            <button
                onClick={onOpen}
                className="md:hidden fixed top-6 right-6 z-40 flex flex-col gap-[5px] p-2"
                aria-label="Open navigation menu"
            >
                <span className="block w-6 h-[1.5px] bg-black rounded-full" />
                <span className="block w-6 h-[1.5px] bg-black rounded-full" />
                <span className="block w-4 h-[1.5px] bg-black rounded-full" />
            </button>

            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[2px]"
                    />
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        variants={menuSlide}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        className="fixed right-0 top-0 h-screen bg-black text-white z-[110] flex flex-col justify-between"
                        style={{ width: "clamp(300px, 100vw, 100vw)" }}
                    >
                        <Curve type="leading" />
                        <Curve type="trailing" />

                        {/* ── Logo top-left ── */}
                        <div className="absolute top-[40px] left-[40px] z-[120]">
                            <p
                                className="text-white font-sans font-bold select-none"
                                style={{ fontSize: "10px", lineHeight: 1.35, letterSpacing: "0.02em" }}
                            >
                                HELLO<br />MONDAY<br />/DEPT.
                            </p>
                        </div>

                        {/* ── Nav links staggered reveal ── */}
                        <div
                            className="flex flex-col justify-center items-center md:items-start h-full md:pl-[55%] px-6 md:pr-[130px]"
                        >
                            <div className="flex flex-col items-center md:items-start" style={{ gap: "4px" }}>
                                {NAV_LINKS.map((link, i) => (
                                    <div key={link.href} className="overflow-hidden">
                                        <motion.div
                                            custom={i}
                                            variants={linkSlide}
                                            initial="initial"
                                            animate="enter"
                                            exit="exit"
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={onClose}
                                                className="font-garamond text-white block hover:opacity-40 transition-opacity duration-300 text-center md:text-left"
                                                style={{
                                                    fontSize: "clamp(32px, 12vw, 80px)",
                                                    lineHeight: 1.1,
                                                    letterSpacing: "-0.01em",
                                                    fontWeight: 400,
                                                }}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Social links — aligned under nav on desktop, centered on mobile ── */}
                        <div
                            className="pb-12 md:pb-0 flex justify-center md:justify-start gap-8 md:gap-7 w-full md:w-auto md:absolute md:bottom-8 md:left-[55%]"
                        >
                            {SOCIAL_LINKS.map((s, i) => (
                                <motion.a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    custom={i + 5}
                                    variants={linkSlide}
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                    className="text-[#888] hover:text-white transition-colors duration-200 font-sans text-[13px] tracking-[0.05em]"
                                >
                                    {s.label}
                                </motion.a>
                            ))}
                        </div>

                        {/* ✕ Close button — Top-right white on mobile, centered-in-crescent black on desktop */}
                        <button
                            onClick={onClose}
                            aria-label="Close menu"
                            className="fixed md:absolute top-8 right-8 md:top-1/2 md:right-[10px] md:-translate-y-1/2 text-white md:text-black hover:scale-110 transition-all duration-200"
                            style={{
                                fontSize: "clamp(18px, 5vw, 24px)",
                                zIndex: 20,
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: "10px",
                            }}
                        >
                            ✕
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SideMenu;
