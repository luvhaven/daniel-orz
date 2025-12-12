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

    // Pre-warm audio capability on ANY interaction during loading
    useEffect(() => {
        const unlockAudio = () => {
            const Ctx = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new Ctx(); // Just accessing constructor often hints intent, but true unlock needs resume() on the actual context used
            // Since useOrchestralSound creates its own context on call, we can't easily pre-warm THAT specific one without calling it.
            // Strategy: We rely on the hook's internal logic which I will update next. 
            // Ideally, we want to capture a gesture to pass to the synth.
        };

        window.addEventListener("mousedown", unlockAudio, { once: true });
        window.addEventListener("keydown", unlockAudio, { once: true });
        return () => {
            window.removeEventListener("mousedown", unlockAudio);
            window.removeEventListener("keydown", unlockAudio);
        };
    }, []);

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

        // Creating an AudioContext here just to resume it on interaction? 
        // Best approach for "Auto" sound:
        // We can't cheat the browser. If they don't interact, no sound.
        // BUT, we can make the "Light Leak" animation so captivating it serves as the "Sound" visually if audio fails.

        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);

                    playOrchestra(); // Attempt playback

                    setTimeout(() => {
                        setIsLoading(false);
                    }, 800);

                    return 100;
                }
                // Non-linear increment for organic feel
                const increment = Math.floor(Math.random() * 15) + 1;
                return Math.min(prev + increment, 100);
            });
        }, 80);

        return () => clearInterval(interval);
    }, [isLoading, setIsLoading, playOrchestra]);

    // "Heavy Velvet" Easing
    const fabricEase = [0.25, 1, 0.5, 1] as const;

    return (
        <AnimatePresence mode="wait">
            {(isLoading || isGoodbye) && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto bg-black"
                    initial={isGoodbye ? { opacity: 0 } : { opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ transition: { duration: 2 } }}
                >
                    {/* Left Curtain Panel: texture & shadow */}
                    <motion.div
                        className="absolute top-0 left-0 w-1/2 h-full bg-[#050505] z-20"
                        style={{
                            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")",
                            boxShadow: "inset -10px 0 20px -10px rgba(0,0,0,0.8)"
                        }}
                        initial={{ x: isGoodbye ? "-100%" : 0 }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 2.2, ease: fabricEase }}
                    >
                        {/* Fabric Folds Highlight */}
                        <div className="absolute inset-0 opacity-20"
                            style={{ background: "repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.03) 60px, transparent 100px)" }} />

                        {/* Center Shadow overlay */}
                        <div className="absolute right-0 top-0 w-[150px] h-full bg-gradient-to-l from-black via-black/40 to-transparent" />
                    </motion.div>

                    {/* Right Curtain Panel */}
                    <motion.div
                        className="absolute top-0 right-0 w-1/2 h-full bg-[#050505] z-20"
                        style={{
                            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E\")",
                            boxShadow: "inset 10px 0 20px -10px rgba(0,0,0,0.8)"
                        }}
                        initial={{ x: isGoodbye ? "100%" : 0 }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 2.2, ease: fabricEase }}
                    >
                        {/* Fabric Folds Highlight */}
                        <div className="absolute inset-0 opacity-20"
                            style={{ background: "repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.03) 60px, transparent 100px)" }} />

                        {/* Center Shadow overlay */}
                        <div className="absolute left-0 top-0 w-[150px] h-full bg-gradient-to-r from-black via-black/40 to-transparent" />
                    </motion.div>

                    {/* Center Light Leak (Behind Curtains, Before Content) */}
                    <motion.div
                        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: count > 30 ? (count / 100) * 0.4 : 0 }}
                        exit={{ opacity: 0, scale: 2, transition: { duration: 0.5 } }}
                    >
                        <div className="w-[2px] h-full bg-white/20 blur-[100px]" />
                        <div className="absolute w-[300px] h-[300px] bg-primary/20 blur-[120px] rounded-full" />
                    </motion.div>


                    {/* Content */}
                    <motion.div
                        className="relative z-30 flex flex-col items-center justify-center p-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)", transition: { duration: 0.6 } }}
                    >
                        {/* Loading Logic */}
                        {isLoading && (
                            <div className="relative flex flex-col items-center">
                                <motion.div className="overflow-hidden h-[12rem] flex items-center justify-center relative">
                                    {/* Spotlight on Text */}
                                    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_70%)] opacity-50 blur-xl scale-150" />

                                    <motion.h1
                                        className="text-9xl md:text-[12rem] font-bold font-display text-white/90 tabular-nums tracking-tighter mix-blend-overlay z-10"
                                        initial={{ y: 100, filter: "blur(10px)" }}
                                        animate={{ y: 0, filter: "blur(0px)" }}
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
                                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                transition={{ delay: 1, duration: 1 }}
                                className="text-center"
                            >
                                <h2 className="text-4xl md:text-6xl font-light font-display text-white/90 tracking-[0.2em] mb-4 drop-shadow-2xl">
                                    TERMINATED
                                </h2>
                                <p className="text-white/40 font-mono text-sm tracking-widest uppercase">System shutdown complete</p>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
