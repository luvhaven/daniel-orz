"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export function StackedLayout({ children }: { children: React.ReactNode[] }) {
    const items = Array.isArray(children) ? children : [children];

    return (
        <div className="flex flex-col w-full relative">
            {items.map((child, i) => (
                // First item (Hero) is Sticky to allow "Curtain Reveal" of the next section
                <div key={i} className={`w-full relative ${i === 0 ? "sticky top-0 z-0" : "z-10 bg-black"}`}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="w-full"
                    >
                        {child}
                    </motion.div>
                </div>
            ))}

            {/* Global Sci-Fi Scroll Progress - Left Border */}
            <ScrollHUD total={items.length} />
        </div>
    );
}

function ScrollHUD({ total }: { total: number }) {
    const { scrollYProgress } = useScroll();
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div className="fixed left-0 top-0 bottom-0 w-[2px] z-50 pointer-events-none hidden md:block">
            {/* Track */}
            <div className="absolute inset-0 bg-white/5" />
            {/* Bar */}
            <motion.div
                style={{ scaleY, transformOrigin: "top" }}
                className="absolute inset-0 w-full bg-[#00ff88] shadow-[0_0_10px_#00ff88]"
            />
            {/* Markers */}
            {Array.from({ length: total }).map((_, i) => (
                <div key={i} className="absolute left-0 w-4 h-[1px] bg-white/20" style={{ top: `${(i / (total - 1)) * 100}%` }} />
            ))}
        </div>
    );
}
