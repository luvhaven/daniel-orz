"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function LiquidLogo() {
    const { scrollYProgress } = useScroll();

    // Smooth out the scroll value
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Map scroll bounds [0, 1] to percentage [0, 100]
    // Invert for Y axis fill: 100% (bottom) -> 0% (top)
    // Actually we want fill from bottom up.
    // SVG coords: 0 is top. Height is e.g. 100.
    // Fill level: y starts at 100, goes to 0.
    const fillLevel = useTransform(smoothProgress, [0, 1], ["100%", "0%"]);

    // Wave animation state
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative w-16 h-10 flex items-center justify-center font-display font-bold text-3xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <svg width="60" height="40" viewBox="0 0 60 40" className="overflow-visible">
                <defs>
                    <clipPath id="logo-clip">
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="28"
                            fontWeight="bold"
                            fontFamily="var(--font-display)"
                        >
                            DO
                        </text>
                    </clipPath>

                    {/* Gradient for Liquid */}
                    <linearGradient id="liquid-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" /> {/* Electric Blue */}
                        <stop offset="100%" stopColor="#0ea5e9" /> {/* Cyan */}
                    </linearGradient>
                </defs>

                {/* Background Outline/Base */}
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="28"
                    fontWeight="bold"
                    fontFamily="var(--font-display)"
                    fill="rgba(255,255,255,0.1)"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1"
                >
                    DO
                </text>

                {/* Liquid Fill Group */}
                <g clipPath="url(#logo-clip)">
                    <motion.div className="relative w-full h-full">
                        {/* Wave Path */}
                        <motion.path
                            d="M0,0 C15,5 30,5 45,0 C60,-5 75,-5 90,0 V50 H0 V0 Z"
                            fill="url(#liquid-gradient)"
                            className="translate-x-[-15px]"
                            style={{
                                y: fillLevel,
                            }}
                            animate={{
                                x: ["0%", "-50%"]
                            }}
                            transition={{
                                repeat: Infinity,
                                ease: "linear",
                                duration: 2 // Fast ripple
                            }}
                        />
                    </motion.div>
                </g>

                {/* We use SVG masks usually for this. Let's try a simpler approach compatible with Framer Motion + SVG */}
                {/* Re-structure: The fill rect creates the liquid, masked by text */}

            </svg>
        </div>
    );
}
