"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

interface StackedLayoutProps {
    children: React.ReactNode[];
    sectionTitles?: string[];
    sectionIds?: string[]; // IDs for anchor navigation
}

export function StackedLayout({ children, sectionTitles = [], sectionIds = [] }: StackedLayoutProps) {
    const items = Array.isArray(children) ? children : [children];
    // Generate default numbering if no titles provided
    const titles = sectionTitles.length === items.length
        ? sectionTitles
        : items.map((_, i) => (i + 1).toString().padStart(2, '0'));

    // Default IDs if not provided (should be provided for nav to work)
    const ids = sectionIds.length === items.length
        ? sectionIds
        : items.map((_, i) => `section-${i}`);

    return (
        <div className="flex flex-col w-full relative">
            {items.map((child, i) => (
                <SectionWrapper key={i} index={i} id={ids[i]}>
                    {child}
                </SectionWrapper>
            ))}

            {/* Premium Navigation Rail */}
            <ScrollHUD titles={titles} ids={ids} />
        </div>
    );
}

function SectionWrapper({ children, index, id }: { children: React.ReactNode; index: number; id: string }) {
    return (
        // Sticky Hero (i=0), Floating Layers for others
        <div id={id} className={`w-full relative ${index === 0 ? "sticky top-0 z-0 h-screen" : "z-10 bg-black"}`}>
            {/* Depth Shadow for floating sections */}
            {index > 0 && (
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20 z-20 shadow-[0_0_30px_rgba(255,255,255,0.1)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent before:opacity-50" />
            )}
            {index > 0 && (
                <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-0" />
            )}

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true, margin: "-10%" }}
                className="w-full relative"
            >
                {children}
            </motion.div>
        </div>
    );
}

function ScrollHUD({ titles, ids }: { titles: string[], ids: string[] }) {
    // Track active section using IntersectionObserver for perfect precision
    const [activeSection, setActiveSection] = useState(0);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        ids.forEach((id, index) => {
            const element = document.getElementById(id);
            if (!element) return;

            // Strict lock-on when center of view hits element
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(index);
                    }
                });
            }, {
                root: null,
                rootMargin: "-45% 0px -45% 0px",
                threshold: 0
            });

            observer.observe(element);
            observers.push(observer);
        });

        return () => {
            observers.forEach(obs => obs.disconnect());
        };
    }, [ids]);

    return (
        <div className="fixed left-6 md:left-8 top-1/2 -translate-y-1/2 h-[60vh] z-50 pointer-events-none hidden lg:flex flex-col items-start gap-0">
            {/* The Rail Line */}
            <div className="absolute left-[7px] top-0 bottom-0 w-[1px] bg-white/10">
                {/* Dynamic Height Line matching active section position */}
                <motion.div
                    initial={false}
                    animate={{ height: `${(activeSection / (titles.length - 1)) * 100}%` }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    style={{ transformOrigin: "top" }}
                    className="absolute top-0 w-full bg-[#00ff88] shadow-[0_0_15px_#00ff88]"
                />
            </div>

            {/* Markers */}
            <div className="flex flex-col justify-between h-full w-full pl-6 py-2">
                {titles.map((title, i) => (
                    <SectionMarker
                        key={i}
                        index={i}
                        title={title}
                        isActive={activeSection === i}
                        id={ids[i]}
                    />
                ))}
            </div>
        </div>
    );
}

function SectionMarker({ index, title, isActive, id }: { index: number; title: string; isActive: boolean; id: string }) {
    return (
        <div className="relative group flex items-center pointer-events-auto cursor-pointer"
            onClick={() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
        >
            {/* Dot on Rail */}
            <div className="absolute -left-[27px] flex items-center justify-center w-[12px] h-[12px]">
                <motion.div
                    initial={false}
                    animate={{
                        scale: isActive ? 1.5 : 1,
                        backgroundColor: isActive ? "#00ff88" : "rgba(255,255,255,0.2)",
                        borderColor: isActive ? "transparent" : "rgba(0,0,0,0.5)"
                    }}
                    className={`w-[8px] h-[8px] rounded-full transition-shadow duration-500
                        ${isActive ? "shadow-[0_0_15px_#00ff88]" : "group-hover:bg-white/50"}
                    `}
                />
            </div>

            {/* Label */}
            <div className="flex flex-col justify-center">
                <span className={`text-[10px] uppercase font-mono tracking-[0.2em] transition-all duration-500
                     ${isActive ? "text-[#00ff88] translate-x-1" : "text-white/20 translate-x-0 group-hover:text-white/60"}
                `}>
                    0{index + 1}
                </span>
                <span className={`text-xs font-display font-medium tracking-wide transition-all duration-500 origin-left
                    ${isActive ? "text-white scale-100 opacity-100 blur-0 translate-x-1" : "text-white/40 scale-90 opacity-0 blur-sm translate-x-0 group-hover:opacity-100 group-hover:blur-0"}
                `}>
                    {title}
                </span>
            </div>
        </div>
    );
}
