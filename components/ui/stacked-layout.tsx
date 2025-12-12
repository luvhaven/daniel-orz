"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

interface StackedLayoutProps {
    children: React.ReactNode[];
    sectionTitles?: string[];
}

export function StackedLayout({ children, sectionTitles = [] }: StackedLayoutProps) {
    const items = Array.isArray(children) ? children : [children];
    // Generate default numbering if no titles provided
    const titles = sectionTitles.length === items.length
        ? sectionTitles
        : items.map((_, i) => (i + 1).toString().padStart(2, '0'));

    return (
        <div className="flex flex-col w-full relative">
            {items.map((child, i) => (
                // Sticky Hero (i=0), Floating Layers (i>0)
                <div key={i} className={`w-full relative ${i === 0 ? "sticky top-0 z-0 h-screen" : "z-10 bg-black"}`}>

                    {/* Depth Shadow for floating sections */}
                    {i > 0 && (
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20 z-20 shadow-[0_0_30px_rgba(255,255,255,0.1)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent before:opacity-50" />
                    )}
                    {i > 0 && (
                        <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-0" />
                    )}

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        className="w-full relative"
                    >
                        {child}
                    </motion.div>
                </div>
            ))}

            {/* Premium Navigation Rail */}
            <ScrollHUD titles={titles} />
        </div>
    );
}

function ScrollHUD({ titles }: { titles: string[] }) {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 100, damping: 20, restDelta: 0.001 });

    // Track active section for detailed display
    const [activeSection, setActiveSection] = useState(0);

    return (
        <div className="fixed left-6 md:left-8 top-1/2 -translate-y-1/2 h-[60vh] z-50 pointer-events-none hidden lg:flex flex-col items-start gap-0">
            {/* The Rail */}
            <div className="absolute left-[7px] top-0 bottom-0 w-[1px] bg-white/10">
                <motion.div
                    style={{ scaleY, transformOrigin: "top" }}
                    className="absolute inset-0 w-full bg-[#00ff88] shadow-[0_0_15px_#00ff88]"
                />
            </div>

            {/* Markers */}
            <div className="flex flex-col justify-between h-full w-full pl-6 py-2">
                {titles.map((title, i) => (
                    <SectionMarker
                        key={i}
                        index={i}
                        title={title}
                        total={titles.length}
                        globalProgress={scrollYProgress}
                    />
                ))}
            </div>
        </div>
    );
}

function SectionMarker({ index, title, total, globalProgress }: { index: number; title: string; total: number; globalProgress: any }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);

    // Map global progress to this specific section's "zone"
    // Approx: i / total to (i+1) / total
    const start = index / total;
    const end = (index + 1) / total;

    // We update active state via change listener
    useEffect(() => {
        return globalProgress.on("change", (v: number) => {
            // Heuristic for active section
            // Note: Sticky hero messes up linear mapping slightly but good enough for visual HUD
            // Use a generous overlap
            if (v >= start - 0.05 && v < end) {
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        });
    }, [globalProgress, start, end]);

    return (
        <div className="relative group flex items-center pointer-events-auto cursor-pointer"
            onClick={() => window.scrollTo({ top: (document.body.scrollHeight / total) * index, behavior: 'smooth' })} // Rough scroll nav
        >
            {/* Dot on Rail */}
            <motion.div
                className={`absolute -left-[21px] w-[9px] h-[9px] rounded-full border border-black transition-all duration-500
                    ${isActive ? "bg-[#00ff88] scale-150 shadow-[0_0_10px_#00ff88]" : "bg-white/20 group-hover:bg-white/50 group-hover:scale-125"}
                `}
            />

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
