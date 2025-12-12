"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealTextProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function RevealText({ children, className = "", delay = 0 }: RevealTextProps) {
    const text = typeof children === "string" ? children : "";
    const words = text.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (_i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: delay },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            className={className}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    key={index}
                    className="inline-block mr-2"
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}
