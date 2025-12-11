"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "@/components/providers/loading-provider";
import { useOrchestralSound } from "@/hooks/use-orchestral-sound";

export function Preloader() {
    const { isLoading, setIsLoading } = useLoading();
    const [count, setCount] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const playOrchestra = useOrchestralSound();

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = "hidden";
            window.scrollTo(0, 0); // Reset scroll
        } else {
            document.body.style.overflow = "unset";
        }

        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsReady(true);
                    return 100;
                }
                const increment = Math.floor(Math.random() * 10) + 1;
                return Math.min(prev + increment, 100);
            });
        }, 60);

        return () => clearInterval(interval);
    }, [isLoading]);

    const handleEnter = () => {
        playOrchestra();
        setIsLoading(false);
    };

    const ease = [0.76, 0, 0.24, 1] as const;

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto"
                    exit={{ transition: { duration: 2 } }}
                >
                    {/* Left Curtain Panel */}
                    <motion.div
                        className="absolute top-0 left-0 w-1/2 h-full bg-black z-10"
                        style={{
                            background: "repeating-linear-gradient(90deg, #050505, #050505 2vw, #111 3vw, #111 5vw, #050505 6vw)"
                        }}
                        initial={{ x: 0 }}
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
                        initial={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 1.6, ease }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
                        <div className="absolute left-0 top-0 w-[200px] h-full bg-gradient-to-r from-black via-black/60 to-transparent opacity-90" />
                    </motion.div>

                    {/* Center Content */}
                    <motion.div
                        className="relative z-20 flex flex-col items-center justify-center p-12"
                        exit={{ filter: "blur(10px)", opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
                    >
                        <div className="relative overflow-hidden flex flex-col items-center gap-6">
                            {/* Counter / Enter Button Transition */}
                            <AnimatePresence mode="wait">
                                {!isReady ? (
                                    <motion.h1
                                        key="count"
                                        className="text-9xl md:text-[12rem] font-bold font-display text-white tabular-nums tracking-tighter mix-blend-difference"
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -50 }}
                                    >
                                        {count}
                                    </motion.h1>
                                ) : (
                                    <motion.button
                                        key="enter"
                                        onClick={handleEnter}
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        whileHover={{ scale: 1.05, letterSpacing: "0.2em" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="text-white text-3xl font-light uppercase tracking-[0.15em] border border-white/20 px-12 py-6 rounded-full glass hover:bg-white/10 transition-all cursor-pointer z-50 pointer-events-auto"
                                    >
                                        Enter
                                    </motion.button>
                                )}
                            </AnimatePresence>

                            {/* Loading Bar */}
                            {!isReady && (
                                <motion.div
                                    className="h-[1px] bg-white/50 absolute bottom-6 left-0 w-full"
                                    initial={{ scaleX: 0, originX: 0 }}
                                    animate={{ scaleX: count / 100 }}
                                    transition={{ ease: "linear" }}
                                />
                            )}
                        </div>
                    </motion.div>

                    {/* System Text */}
                    <motion.div
                        className="absolute bottom-10 right-10 z-20 hidden md:block text-right mix-blend-difference"
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    >
                        <p className="text-sm font-mono text-white/70 uppercase tracking-widest mb-1">
                            {isReady ? "Awaiting Input" : "System Check"}
                        </p>
                        <p className="text-xs text-white/40 animate-pulse">
                            {isReady ? "Click to Initialize" : "Processing..."}
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
