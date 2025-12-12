"use client";

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "@/components/providers/loading-provider";
import { useOrchestralSound } from "@/hooks/use-orchestral-sound";
import { useWarmGoodbye } from "@/hooks/use-warm-goodbye";

export function Preloader() {
    const { isLoading, setIsLoading, isGoodbye } = useLoading();
    const [count, setCount] = useState(0);
    const playOrchestra = useOrchestralSound();
    const playGoodbye = useWarmGoodbye();

    // Trigger goodbye sound when state changes
    useEffect(() => {
        if (isGoodbye) {
            playGoodbye();
        }
    }, [isGoodbye, playGoodbye]);

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = "hidden";
            window.scrollTo(0, 0);
        } else {
            document.body.style.overflow = "unset";
        }

        if (!isLoading) return;

        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);

                    // Cinematic Entrance Logic
                    // 1. Attempt sound (might be blocked by autoplay policy)
                    playOrchestra();

                    // 2. Delayed transition to let "100" register visually
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 500);

                    return 100;
                }
                // Non-linear increment for organic feel
                const increment = Math.floor(Math.random() * 15) + 1;
                return Math.min(prev + increment, 100);
            });
        }, 80);

        return () => clearInterval(interval);
    }, [isLoading, setIsLoading, playOrchestra]);

    const ease = [0.76, 0, 0.24, 1] as const;

    return (
        <AnimatePresence mode="wait">
            {(isLoading || isGoodbye) && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto"
                    initial={isGoodbye ? { opacity: 0 } : { opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ transition: { duration: 2 } }}
                >
                    {/* Left Curtain Panel */}
                    <motion.div
                        className="absolute top-0 left-0 w-1/2 h-full bg-black z-10"
                        style={{
                            background: "repeating-linear-gradient(90deg, #050505, #050505 2vw, #111 3vw, #111 5vw, #050505 6vw)"
                        }}
                        initial={{ x: isGoodbye ? "-100%" : 0 }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 1.6, ease }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
                        <div className="absolute right-0 top-0 w-[200px] h-full bg-gradient-to-l from-black via-black/60 to-transparent opacity-90" />
                    </motion.div>

                    {/* Right Curtain Panel */}
                    <motion.div
                        className="absolute top-0 right-0 w-1/2 h-full bg-black z-10"
                        style={{
                            background: "repeating-linear-gradient(90deg, #050505, #050505 2vw, #111 3vw, #111 5vw, #050505 6vw)"
                        }}
                        initial={{ x: isGoodbye ? "100%" : 0 }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 1.6, ease }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
                        <div className="absolute left-0 top-0 w-[200px] h-full bg-gradient-to-r from-black via-black/60 to-transparent opacity-90" />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        className="relative z-20 flex flex-col items-center justify-center p-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.8 } }}
                    >
                        {/* Loading Logic */}
                        {isLoading && (
                            <div className="relative flex flex-col items-center">
                                <motion.div
                                    className="overflow-hidden h-[12rem] flex items-center justify-center"
                                >
                                    <motion.h1
                                        className="text-9xl md:text-[12rem] font-bold font-display text-white tabular-nums tracking-tighter mix-blend-difference"
                                        initial={{ y: 100 }}
                                        animate={{ y: 0 }}
                                        exit={{
                                            opacity: 0,
                                            scale: 1.5,
                                            filter: "blur(20px)",
                                            transition: { duration: 0.8, ease: "easeInOut" }
                                        }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                    >
                                        {count}
                                    </motion.h1>
                                </motion.div>
                            </div>
                        )}

                        {/* Goodbye Logic */}
                        {isGoodbye && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1 }}
                                className="text-center"
                            >
                                <h2 className="text-4xl md:text-6xl font-light font-display text-white tracking-widest mb-4">
                                    Session Terminated
                                </h2>
                                <p className="text-white/50 font-mono">Until next time.</p>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
