"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "@/components/providers/loading-provider";
import { useAudio } from "@/hooks/use-audio";

export function Preloader() {
    const { isLoading, setIsLoading } = useLoading();
    const [count, setCount] = useState(0);
    const playRevealSound = useAudio("/sounds/whoosh.mp3"); // You'll need to add this file

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                const increment = Math.floor(Math.random() * 10) + 1;
                return Math.min(prev + increment, 100);
            });
        }, 60);

        if (count === 100) {
            const timeout = setTimeout(() => {
                // Trigger transition
                playRevealSound();
                setIsLoading(false);
            }, 800);
            return () => clearTimeout(timeout);
        }

        return () => clearInterval(interval);
    }, [count, isLoading, setIsLoading, playRevealSound]);

    // "Curtain" ease - heavy start, smooth finish
    const ease = [0.76, 0, 0.24, 1] as const;

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[9999] flex items-center justify-center cursor-none pointer-events-none"
                    exit={{ transition: { duration: 2 } }}
                >
                    {/* Left Curtain Panel */}
                    <motion.div
                        className="absolute top-0 left-0 w-1/2 h-full bg-black z-10"
                        style={{
                            // Velvet Fold Effect
                            background: "linear-gradient(90deg, #050505 0%, #1a1a1a 20%, #000000 40%, #1a1a1a 60%, #050505 80%, #000000 100%)"
                        }}
                        initial={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 1.4, ease }}
                    >
                        {/* Deep Shadow for the edge */}
                        <div className="absolute right-0 top-0 w-[150px] h-full bg-gradient-to-l from-black via-black/50 to-transparent pointer-events-none opacity-80" />
                    </motion.div>

                    {/* Right Curtain Panel */}
                    <motion.div
                        className="absolute top-0 right-0 w-1/2 h-full bg-black z-10"
                        style={{
                            // Velvet Fold Effect (Mirrored logic)
                            background: "linear-gradient(90deg, #000000 0%, #050505 20%, #1a1a1a 40%, #000000 60%, #1a1a1a 80%, #050505 100%)"
                        }}
                        initial={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 1.4, ease }}
                    >
                        {/* Deep Shadow for the edge */}
                        <div className="absolute left-0 top-0 w-[150px] h-full bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none opacity-80" />
                    </motion.div>

                    {/* Center Content */}
                    <motion.div
                        className="relative z-20 flex flex-col items-center justify-center p-12"
                        exit={{ filter: "blur(10px)", opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
                    >
                        <div className="relative overflow-hidden">
                            <motion.h1
                                className="text-9xl md:text-[12rem] font-bold font-display text-white tabular-nums tracking-tighter mix-blend-difference"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {count}
                            </motion.h1>
                            {/* Ultra-thin Loading Bar */}
                            <motion.div
                                className="h-[1px] bg-white/50 absolute bottom-6 left-0 w-full"
                                initial={{ scaleX: 0, originX: 0 }}
                                animate={{ scaleX: count / 100 }}
                                transition={{ ease: "linear" }}
                            />
                        </div>
                    </motion.div>

                    {/* System Text */}
                    <motion.div
                        className="absolute bottom-10 right-10 z-20 hidden md:block text-right mix-blend-difference"
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    >
                        <p className="text-sm font-mono text-white/70 uppercase tracking-widest mb-1">
                            System Check
                        </p>
                        <p className="text-xs text-white/40">
                            Ready_
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
