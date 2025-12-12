"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useVelocity, useMotionValue } from "framer-motion";

export function WarpTransition({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

    // Velocity tracking for "Warp Speed" effect
    const scrollY = useMotionValue(0);
    const { scrollY: globalScrollY } = useScroll();
    const velocity = useVelocity(globalScrollY);
    const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });

    // 3D Transforms based on scroll position relative to viewport
    // Calculate "Distance from Center"

    // Actually, simpler approach for "Sci-Fi Scroll":
    // 1. Scale down slightly when not in center.
    // 2. RotateX based on velocity.
    // 3. Blur based on velocity.

    const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // "Warp" distortion
    const skewX = useTransform(smoothVelocity, [-1000, 0, 1000], [-5, 0, 5]);
    const rotateX = useTransform(smoothVelocity, [-1000, 0, 1000], [15, 0, -15]); // Tilt forward/back on speed
    const blur = useTransform(smoothVelocity, [-2000, 0, 2000], [10, 0, 10]); // Motion blur

    // Dynamic Filter
    const filter = useTransform(blur, (b) => `blur(${Math.min(b, 10)}px)`);

    return (
        <motion.div
            ref={containerRef}
            style={{
                scale,
                opacity,
                rotateX,
                skewX,
                filter,
                transformPerspective: 1000,
                transformOrigin: "center center"
            }}
            className="w-full relative py-20 will-change-transform" // Add padding to allow separate focus
        >
            {children}
        </motion.div>
    );
}

// Global "Starfield" or "Grid" background that reacts to scroll?
export function WarpBackground() {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 5000], [0, -2000]); // Parallax Stars

    return (
        <div className="fixed inset-0 z-[-1] bg-black pointer-events-none overflow-hidden">
            {/* Dynamic Grid */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 opacity-20"
            >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#444_1px,transparent_1px),linear-gradient(to_bottom,#444_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
                    style={{ transform: "perspective(500px) rotateX(60deg)" }}
                />
            </motion.div>

            {/* Stars / Particles could go here */}
        </div>
    );
}
