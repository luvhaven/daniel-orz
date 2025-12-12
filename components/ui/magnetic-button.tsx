"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useHaptic } from "@/hooks/use-haptic";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}


export function MagneticButton({
    children,
    className = "",
    onClick,
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { trigger } = useHaptic();

    const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const width = ref.current?.offsetWidth || 0;
        const height = ref.current?.offsetHeight || 0;
        const left = ref.current?.getBoundingClientRect().left || 0;
        const top = ref.current?.getBoundingClientRect().top || 0;
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x, y });
    };

    const handleClick = () => {
        trigger();
        onClick?.();
    };

    const resetPosition = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={resetPosition}
            onClick={handleClick}
            animate={{ x: position.x * 0.3, y: position.y * 0.3 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`relative inline-flex items-center justify-center font-medium transition-colors focus-visible-custom active:scale-95 ${className}`}
        >
            {children}
        </motion.button>
    );
}
