"use client";

import Link from "next/link";
import { useEffect } from "react";

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

// Out-Expo easing — snappy start, silky deceleration (matching hellomonday.com)
const EASE_OUT_EXPO = "cubic-bezier(0.22, 1, 0.36, 1)";

const SideMenu = ({ isOpen, onClose, onOpen }) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    return (
        <>
            {/* ─────────────────────────────────────────────────────────────
          TRIGGER — curved black pill docked to right edge (always visible)
      ───────────────────────────────────────────────────────────────── */}
            <div className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-50">
                <button
                    onClick={onOpen}
                    aria-label="Open navigation menu"
                    className="group relative bg-black text-white flex items-center justify-center rounded-l-[100%_50%] transition-all duration-500"
                    style={{
                        width: "32px",
                        height: "500px",
                        transitionTimingFunction: EASE_OUT_EXPO,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.width = "44px"; }}
                    onMouseLeave={e => { e.currentTarget.style.width = "32px"; }}
                >
                    <div className="flex flex-col gap-[5px] items-center">
                        <span className="block w-4 h-[1.5px] bg-white transition-all duration-500 group-hover:w-5" />
                        <span className="block w-4 h-[1.5px] bg-white transition-all duration-500 group-hover:w-5" />
                        <span className="block w-3 h-[1.5px] bg-white transition-all duration-500 group-hover:w-4" />
                    </div>
                </button>
            </div>

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
          LAYER 1 — Black background overlay  (fades in first, fades out last)
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
                    // OPEN: immediate | CLOSE: wait for content + blob to exit first
                    transition: `opacity ${isOpen ? "0.5s" : "0.4s"} ease`,
                    transitionDelay: isOpen ? "0ms" : "450ms",
                }}
            />

            {/* ─────────────────────────────────────────────────────────────
          LAYER 2 — Content (logo, nav, social) — sits above overlay
      ───────────────────────────────────────────────────────────────── */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 110,
                    pointerEvents: isOpen ? "none" : "none", // clicks pass through to overlay/links
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
                        // OPEN: after 200ms | CLOSE: immediately
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
                        // OPEN: stagger 80ms per item, starting at 220ms
                        // CLOSE: all disappear fast, no stagger
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

                {/* ── Social links — bottom center, appear last ── */}
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
                        // OPEN: last, delay 660ms | CLOSE: immediately
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
          OPEN: slides in after overlay (delay 60ms)
          CLOSE: slides back out before overlay fades (delay 0ms, overlay delays 450ms)
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
                    // OPEN: slide in at 60ms delay | CLOSE: slide out immediately
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

                {/* ✕ Close button — centered on blob */}
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
