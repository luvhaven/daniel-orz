"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useLoading } from "@/components/providers/loading-provider";
import { CountUp } from "@/components/ui/count-up";

export function HeroSection() {
    const { isLoading } = useLoading();
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

            {/* Background Ambience */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-primary/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-secondary/10 rounded-full blur-[100px]"
                />
            </div>

            {/* Main Content Wrapper with Vertigo Entrance */}
            <motion.div
                className="container-custom relative z-10 grid lg:grid-cols-2 gap-12 items-center"
                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                animate={!isLoading ? {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
                } : {}}
            >

                {/* Left Column: Typography */}
                <motion.div
                    style={{ y: y1 }}
                    className="order-1 lg:order-1 space-y-8"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="h-[1px] w-12 bg-primary"></span>
                            <span className="text-secondary font-mono tracking-widest text-sm uppercase">Senior Frontend Engineer</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold font-display leading-[0.9] tracking-tighter mb-6">
                            DANIEL <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/20">
                                ORIAZOWAN
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground max-w-lg leading-relaxed font-light">
                            Crafting <span className="text-white font-medium">decade-defining</span> digital experiences that merge engineering precision with artistic fluidity.
                        </p>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={!isLoading ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap gap-4 pt-4"
                    >
                        <MagneticButton className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform flex items-center gap-2">
                            <Mail className="w-5 h-5" /> Contact Me
                        </MagneticButton>

                        <div className="flex items-center gap-4 px-6">
                            <a href="https://github.com/danieloriazowan" target="_blank" className="p-3 glass rounded-full hover:bg-white/10 transition-colors">
                                <Github className="w-6 h-6" />
                            </a>
                            <a href="https://linkedin.com/in/daniel-oriazowan" target="_blank" className="p-3 glass rounded-full hover:bg-white/10 transition-colors">
                                <Linkedin className="w-6 h-6" />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Column: Visual */}
                <motion.div
                    style={{ y: y2 }}
                    className="order-2 lg:order-2 relative flex justify-center lg:justify-end"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={!isLoading ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                        className="relative w-[300px] md:w-[450px] aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl glass"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                        <Image
                            src="/uploaded_image_1765475161369.jpg"
                            alt="Daniel Oriazowan"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-[2s]"
                            priority
                        />

                        {/* Overlay Badge */}
                        <div className="absolute bottom-6 left-6 z-20">
                            <div className="glass px-4 py-2 rounded-xl flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-sm font-mono text-white/90">Available for new roles</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating Elements (Improved Contrast) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={!isLoading ? { y: [0, -20, 0], opacity: 1 } : {}}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute top-10 right-10 z-20 glass p-4 rounded-2xl hidden md:block backdrop-blur-md bg-black/40 border border-white/20"
                    >
                        <div className="flex items-baseline gap-1">
                            <CountUp end={15} duration={2.5} delay={1.5} className="text-4xl font-bold font-display text-white drop-shadow-lg" />
                            <span className="text-2xl font-bold text-white">+</span>
                        </div>
                        <span className="block text-xs uppercase tracking-wider text-white font-bold mt-1 drop-shadow-md">Years Exp.</span>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                initial={{ opacity: 0 }}
                animate={!isLoading ? { opacity: 1 } : {}}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <ArrowDown className="w-5 h-5 text-white/50" />
                </motion.div>
            </motion.div>
        </section>
    );
}
