"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X, Power } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useHaptic } from "@/hooks/use-haptic";
import { useLoading } from "@/components/providers/loading-provider";
import { LiquidLogo } from "@/components/ui/liquid-logo";

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { scrollY, scrollYProgress } = useScroll();
    const { trigger } = useHaptic();
    const { setGoodbye } = useLoading();

    const backgroundColor = useTransform(
        scrollY,
        [0, 100],
        ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
    );

    const [activeSection, setActiveSection] = useState("about");

    useEffect(() => {
        setMounted(true);

        const handleScroll = () => {
            const sections = navItems.map(item => item.href.substring(1));
            const scrollPosition = window.scrollY + 200; // Offset

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const top = element.offsetTop;
                    const height = element.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(section);
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Experience", href: "#experience" },
        { name: "Contact", href: "#contact" },
    ];

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
    };

    if (!mounted) return null;

    return (
        <motion.nav
            style={{ backgroundColor }}
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-white/10"
        >
            <div className="container-custom">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <motion.a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="relative z-50 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                    >
                        <LiquidLogo />
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.href.substring(1);
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(item.href);
                                    }}
                                    className={`relative px-2 py-1 transition-colors font-medium
                                        ${isActive ? "text-white" : "text-muted-foreground hover:text-white"}`}
                                >
                                    {item.name}
                                    {isActive && (
                                        <motion.span
                                            layoutId="activeNav"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </a>
                            );
                        })}

                        <MagneticButton
                            onClick={() => scrollToSection("#contact")}
                            className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold hover:shadow-glow"
                        >
                            Hire Me
                        </MagneticButton>

                        <button
                            onClick={() => {
                                setGoodbye(true);
                                trigger();
                            }}
                            className="p-3 rounded-full hover:bg-white/10 transition-colors group"
                        >
                            <Power className="w-5 h-5 text-muted-foreground group-hover:text-red-500 group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-all" />
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center gap-4 relative z-50">
                        <button
                            onClick={() => {
                                setIsOpen(!isOpen);
                                trigger();
                            }}
                            className="p-2 rounded-full glass"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed inset-0 top-0 left-0 w-full h-[100dvh] bg-black/95 backdrop-blur-2xl z-40 flex flex-col justify-center items-center md:hidden"
                        >
                            <div className="flex flex-col gap-8 text-center">
                                {navItems.map((item, i) => (
                                    <motion.a
                                        key={item.name}
                                        href={item.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + (i * 0.1) }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            scrollToSection(item.href);
                                        }}
                                        className="text-5xl font-bold font-display text-white/50 transition-all duration-300 hover:text-white hover:scale-110 hover:text-glow active:scale-95"
                                    >
                                        {item.name}
                                    </motion.a>
                                ))}
                                <motion.a
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection("#contact");
                                        trigger();
                                    }}
                                    className="mt-8 px-8 py-4 bg-white text-black rounded-full font-bold text-xl active:scale-95 transition-transform"
                                >
                                    Hire Me
                                </motion.a>

                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    onClick={() => {
                                        setIsOpen(false);
                                        setGoodbye(true);
                                        trigger();
                                    }}
                                    className="mt-4 p-4 rounded-full bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/50 transition-all group"
                                >
                                    <Power className="w-8 h-8 text-white/50 group-hover:text-red-500 transition-colors" />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>


            {/* Mobile-Only Progress Bar */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary lg:hidden origin-left"
                style={{ scaleX: scrollYProgress }}
            />
        </motion.nav>
    );
}
