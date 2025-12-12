"use client";

import { useEffect, useRef } from "react";

export function GrainOverlay() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const drawGrain = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            // Create noise
            const imageData = ctx.createImageData(width, height);
            const buffer32 = new Uint32Array(imageData.data.buffer);

            for (let i = 0; i < buffer32.length; i++) {
                if (Math.random() < 0.1) { // 10% density
                    // Set alpha to a low value (e.g., 10-20ish out of 255)
                    // Format is ABGR (little endian) -> 0xAA BB GG RR
                    // Alpha = 15 (0x0F)
                    buffer32[i] = 0x0Fffffff;
                }
            }

            ctx.putImageData(imageData, 0, 0);

            // Loop slowly to avoid seizure, maybe every 2nd or 3rd frame
            // Or just static? Animated grain is better.
            animationFrameId = requestAnimationFrame(drawGrain);
        };

        window.addEventListener("resize", resize);
        resize();
        drawGrain();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[50] pointer-events-none opacity-20"
        />
    );
}
