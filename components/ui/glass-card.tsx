"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export function GlassCard({ children, className = "", hover = true }: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={hover ? { y: -5, scale: 1.02 } : {}}
            className={`
        frosted-glass
        transition-all duration-300
        ${hover ? "hover:shadow-glow" : ""}
        ${className}
      `}
        >
            {children}
        </motion.div>
    );
}
