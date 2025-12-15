"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function LiquidLogo() {
    const { scrollYProgress } = useScroll();

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Map scroll 0..1 to Y position 40..-5
    const y = useTransform(smoothProgress, [0, 1], [40, -5]);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="w-[60px] h-[40px] relative group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <svg viewBox="0 0 60 40" className="w-full h-full overflow-visible">
                <defs>
                    {/* Gradient for the Liquid */}
                    <linearGradient id="liquid-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" /> {/* Electric Blue */}
                        <stop offset="100%" stopColor="#0ea5e9" /> {/* Cyan */}
                    </linearGradient>

                    {/* Mask defining the text shape */}
                    <mask id="text-mask">
                        <text
                            x="30"
                            y="30"
                            textAnchor="middle"
                            className="font-display font-bold text-3xl"
                            fill="white"
                        >
                            DO
                        </text>
                    </mask>
                </defs>

                {/* Background Text (Empty Outline) */}
                <text
                    x="30"
                    y="30"
                    textAnchor="middle"
                    className="font-display font-bold text-3xl"
                    fill="rgba(255,255,255,0.05)"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1"
                >
                    DO
                </text>

                {/* Liquid Wave Group */}
                <g mask="url(#text-mask)">
                    <motion.path
                        /* Wave path: Wide enough to loop horizontally. Extends deep downwards for fill */
                        d="M -60 0 Q -30 10 0 0 T 60 0 T 120 0 V 100 H -60 Z"
                        fill="url(#liquid-gradient)"
                        style={{ y }}
                        animate={{
                            x: [-60, 0]
                        }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: isHovered ? 1.5 : 3
                        }}
                    />
                </g>

                {/* Glossy Reflection (Optional) */}
                <text
                    x="30"
                    y="30"
                    textAnchor="middle"
                    className="font-display font-bold text-3xl"
                    fill="url(#liquid-gradient)"
                    fillOpacity="0.2"
                    style={{ mixBlendMode: 'overlay' }}
                    pointerEvents="none"
                >
                    DO
                </text>
            </svg>
        </div>
    );
}
