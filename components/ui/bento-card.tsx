"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoCardProps {
    children: ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
    gradient?: boolean;
}

const sizeClasses = {
    sm: "col-span-1 row-span-1",
    md: "col-span-1 md:col-span-2 row-span-1",
    lg: "col-span-1 md:col-span-2 lg:col-span-2 row-span-2",
    xl: "col-span-full row-span-2",
};

export function BentoCard({
    children,
    className = "",
    size = "md",
    gradient = false,
}: BentoCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className={`
        ${sizeClasses[size]}
        rounded-3xl overflow-hidden relative group
        ${gradient ? "bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" : "bg-card"}
        border border-border/50 hover:border-primary/50
        transition-all duration-500
        hover:shadow-2xl hover:shadow-primary/10
        ${className}
      `}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 p-6 md:p-8 h-full">
                {children}
            </div>
        </motion.div>
    );
}
