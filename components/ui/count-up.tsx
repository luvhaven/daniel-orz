"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function CountUp({ end, duration = 2, delay = 0, className }: { end: number, duration?: number, delay?: number, className?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (!isInView) return;

        // Add delay before starting animation
        const delayTimeout = setTimeout(() => {
            let startTime: number;
            let animationFrame: number;

            const animate = (time: number) => {
                if (!startTime) startTime = time;
                const progress = (time - startTime) / (duration * 1000);

                if (progress < 1) {
                    setCount(Math.floor(end * progress));
                    animationFrame = requestAnimationFrame(animate);
                } else {
                    setCount(end);
                }
            };

            animationFrame = requestAnimationFrame(animate);

            return () => cancelAnimationFrame(animationFrame);
        }, delay * 1000);

        return () => clearTimeout(delayTimeout);
    }, [isInView, end, duration, delay]);

    return <span ref={ref} className={className}>{count}</span>;
}
