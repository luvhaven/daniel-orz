"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useWhooshSound } from "@/hooks/use-whoosh-sound";

// --- Types ---
type Vector2 = { x: number; y: number };
type Mirror = { id: string; x: number; y: number; angle: number; width: number; type: "mirror" | "prism" };
type Ray = { start: Vector2; end: Vector2; intensity: number };
type Target = { x: number; y: number; radius: number; hit: boolean };

// --- Math Helpers ---
const rotatePoint = (p: Vector2, center: Vector2, angle: number): Vector2 => {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    const px = p.x - center.x;
    const py = p.y - center.y;
    return {
        x: px * c - py * s + center.x,
        y: px * s + py * c + center.y,
    };
};

const getIntersection = (p1: Vector2, p2: Vector2, p3: Vector2, p4: Vector2): Vector2 | null => {
    const d = (p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x);
    if (d === 0) return null;

    const u = ((p3.x - p1.x) * (p4.y - p3.y) - (p3.y - p1.y) * (p4.x - p3.x)) / d;
    const v = ((p3.x - p1.x) * (p2.y - p1.y) - (p3.y - p1.y) * (p2.x - p1.x)) / d;

    if (u >= 0 && u <= 1 && v >= 0 && v <= 1) {
        return {
            x: p1.x + u * (p2.x - p1.x),
            y: p1.y + u * (p2.y - p1.y),
        };
    }
    return null;
};

export function OpticalPuzzleSection() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [solved, setSolved] = useState(false);
    const playWhoosh = useWhooshSound();

    // Game Logic Refs (Mutable to avoid re-renders)
    const mirrorsRef = useRef<Mirror[]>([]);
    const targetRef = useRef<Target>({ x: 0, y: 0, radius: 40, hit: false });
    const draggingRef = useRef<{ id: string; offsetX: number; offsetY: number; startAngle: number } | null>(null);
    const mouseRef = useRef<Vector2>({ x: 0, y: 0 });
    const initializedRef = useRef(false);

    const initGame = useCallback(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        let animationId: number;
        const resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];
            const { width, height } = entry.contentRect;

            // Handle High DPI
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;

            // Normalize scale for drawing operations
            const ctx = canvas.getContext("2d");
            if (ctx) ctx.scale(dpr, dpr);

            // Important: Style needs to match display size
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            // Reset Level Layout only if first run or drastic change (e.g. orientation)
            if (!initializedRef.current || Math.abs(width - (mirrorsRef.current[0]?.x ? width : 0)) > 200) {
                if (width < 768) {
                    // Mobile
                    mirrorsRef.current = [
                        { id: "m1", x: width * 0.5, y: height * 0.4, angle: Math.PI / 4, width: 80, type: "mirror" },
                        { id: "m2", x: width * 0.3, y: height * 0.6, angle: 0, width: 80, type: "mirror" },
                    ];
                    targetRef.current = { x: width * 0.5, y: height * 0.8, radius: 30, hit: false };
                } else {
                    // Desktop with guaranteed initialization
                    mirrorsRef.current = [
                        { id: "m1", x: width * 0.3, y: height * 0.3, angle: Math.PI / 4, width: 120, type: "mirror" },
                        { id: "m2", x: width * 0.6, y: height * 0.2, angle: Math.PI / 2, width: 120, type: "mirror" },
                        { id: "m3", x: width * 0.5, y: height * 0.7, angle: -Math.PI / 6, width: 120, type: "prism" },
                    ];
                    targetRef.current = { x: width * 0.85, y: height * 0.5, radius: 40, hit: false };
                }
                initializedRef.current = true;
            }
        });

        resizeObserver.observe(container);

        const render = () => {
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Effective Dimensions (Logical pixels)
            const width = canvas.width / (window.devicePixelRatio || 1);
            const height = canvas.height / (window.devicePixelRatio || 1);

            ctx.clearRect(0, 0, width, height);

            // --- Update Dragging ---
            if (draggingRef.current) {
                const mirror = mirrorsRef.current.find(m => m.id === draggingRef.current!.id);
                if (mirror) {
                    mirror.x = mouseRef.current.x - draggingRef.current.offsetX;
                    mirror.y = mouseRef.current.y - draggingRef.current.offsetY;
                }
            }

            // --- Raytracing Physics ---
            const rays: Ray[] = [];
            // Start laser from left-middle
            let currentRay = { start: { x: 0, y: height * 0.5 }, angle: 0, intensity: 1.0 };
            let hitTarget = false;

            for (let b = 0; b < 10; b++) {
                // Check Bounds
                const farPoint = {
                    x: currentRay.start.x + Math.cos(currentRay.angle) * 3000,
                    y: currentRay.start.y + Math.sin(currentRay.angle) * 3000,
                };
                let closestHit = { pt: farPoint, mirror: null as Mirror | null, dist: 3000 };

                // Intersection with Mirrors
                mirrorsRef.current.forEach(m => {
                    const halfW = m.width / 2;
                    const p1 = rotatePoint({ x: m.x - halfW, y: m.y }, { x: m.x, y: m.y }, m.angle);
                    const p2 = rotatePoint({ x: m.x + halfW, y: m.y }, { x: m.x, y: m.y }, m.angle);

                    const hit = getIntersection(currentRay.start, farPoint, p1, p2);
                    if (hit) {
                        const dist = Math.hypot(hit.x - currentRay.start.x, hit.y - currentRay.start.y);
                        if (dist < closestHit.dist && dist > 2) {
                            closestHit = { pt: hit, mirror: m, dist };
                        }
                    }
                });

                // Intersection with Target (Geometric approximation)
                const t = targetRef.current;
                const dx = t.x - currentRay.start.x;
                const dy = t.y - currentRay.start.y;
                const distToTargetCenter = Math.hypot(dx, dy);

                // Project vector to target onto ray direction
                const proj = dx * Math.cos(currentRay.angle) + dy * Math.sin(currentRay.angle);
                // Closest point on line to circle center
                const closestPtX = currentRay.start.x + proj * Math.cos(currentRay.angle);
                const closestPtY = currentRay.start.y + proj * Math.sin(currentRay.angle);
                const distPerpendicular = Math.hypot(t.x - closestPtX, t.y - closestPtY);

                if (distPerpendicular < t.radius && proj > 0 && proj < closestHit.dist) {
                    hitTarget = true;
                    // Stop ray inside target visually
                    closestHit = { pt: { x: closestPtX, y: closestPtY }, mirror: null, dist: proj };
                }

                rays.push({ start: currentRay.start, end: closestHit.pt, intensity: currentRay.intensity });

                if (!closestHit.mirror) break; // Terminate ray if not hitting a reflective surface

                // Reflection Logic
                const m = closestHit.mirror;
                // Reflected Angle = 2 * WallAngle - IncidentAngle
                let reflectAngle = 2 * m.angle - currentRay.angle;

                // Prisms scatter light and reduce intensity
                if (m.type === "prism") {
                    currentRay.intensity *= 0.7;
                    reflectAngle += (Math.random() * 0.1 - 0.05); // Slight jitter for "energy" feel
                } else {
                    currentRay.intensity *= 0.95;
                }

                currentRay = { start: closestHit.pt, angle: reflectAngle, intensity: currentRay.intensity };
                if (currentRay.intensity < 0.05) break;
            }

            // --- Game State Update ---
            if (hitTarget !== targetRef.current.hit) {
                targetRef.current.hit = hitTarget;
                if (hitTarget) {
                    setSolved(true);
                    if (playWhoosh) playWhoosh();
                } else {
                    setSolved(false);
                }
            }

            // --- Visuals ---

            // Draw Source
            ctx.beginPath();
            ctx.arc(0, height * 0.5, 15, 0, Math.PI * 2);
            ctx.fillStyle = "#fff";
            ctx.shadowBlur = 20;
            ctx.shadowColor = "#ffffff";
            ctx.fill();
            ctx.shadowBlur = 0;

            // Draw Rays
            ctx.lineCap = "round";
            rays.forEach((ray, i) => {
                ctx.beginPath();
                ctx.moveTo(ray.start.x, ray.start.y);
                ctx.lineTo(ray.end.x, ray.end.y);
                ctx.lineWidth = targetRef.current.hit ? 4 : 2;
                ctx.strokeStyle = targetRef.current.hit
                    ? `rgba(120, 255, 200, ${ray.intensity})`
                    : `rgba(255, 60, 60, ${ray.intensity})`;
                ctx.shadowBlur = targetRef.current.hit ? 20 : 10;
                ctx.shadowColor = targetRef.current.hit ? "#00ff88" : "#ff4444";
                ctx.stroke();
                ctx.shadowBlur = 0;
            });

            // Draw Mirrors & Prisms
            mirrorsRef.current.forEach(m => {
                const halfW = m.width / 2;
                // calculate visuals
                const p1 = rotatePoint({ x: m.x - halfW, y: m.y }, { x: m.x, y: m.y }, m.angle);
                const p2 = rotatePoint({ x: m.x + halfW, y: m.y }, { x: m.x, y: m.y }, m.angle);

                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);

                if (m.type === "mirror") {
                    ctx.strokeStyle = "#fff";
                    ctx.lineWidth = 6;
                } else {
                    // Prism Style
                    ctx.strokeStyle = "rgba(200, 220, 255, 0.8)";
                    ctx.lineWidth = 8;
                }
                ctx.stroke();

                // Pivot / Grip
                ctx.beginPath();
                ctx.arc(m.x, m.y, 8, 0, Math.PI * 2);
                ctx.fillStyle = "#fff";
                ctx.fill();
            });

            // Draw Target
            const t = targetRef.current;
            ctx.beginPath();
            ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
            ctx.fillStyle = t.hit ? "#00ff88" : "#222";
            ctx.fill();
            ctx.strokeStyle = t.hit ? "#fff" : "#444";
            ctx.lineWidth = 3;
            ctx.stroke();
            if (t.hit) {
                ctx.shadowBlur = 40;
                ctx.shadowColor = "#00ff88";
                ctx.fillStyle = "#fff";
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            animationId = requestAnimationFrame(render);
        };
        render();

        return () => {
            resizeObserver.disconnect();
            cancelAnimationFrame(animationId);
        };
    }, []); // Removed deps to ensure stability

    useEffect(() => {
        initGame();
    }, [initGame]);

    const handleMouseDown = (e: React.MouseEvent) => {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvasRef.current!.getBoundingClientRect();
        // Mouse coordinates relative to canvas styles (logical pixels)
        const x = (e.clientX - rect.left);
        const y = (e.clientY - rect.top);
        mouseRef.current = { x, y };

        const clickedMirror = mirrorsRef.current.find(m => Math.hypot(m.x - x, m.y - y) < 40);
        if (clickedMirror) {
            draggingRef.current = { id: clickedMirror.id, offsetX: x - clickedMirror.x, offsetY: y - clickedMirror.y, startAngle: clickedMirror.angle };
        }
    };

    // Simple Click-to-Rotate mechanism
    const handleClick = (e: React.MouseEvent) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const clickedMirror = mirrorsRef.current.find(m => Math.hypot(m.x - x, m.y - y) < 40);

        // Prevent rotation if we just dragged it
        if (clickedMirror && (!draggingRef.current)) { // Simplified check
            clickedMirror.angle += Math.PI / 4;
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseUp = () => {
        draggingRef.current = null;
    };

    return (
        <section ref={containerRef} className="relative w-full h-[80vh] bg-black overflow-hidden flex flex-col items-center justify-center border-y border-white/10">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,30,30,0.5)_0%,transparent_100%)]" />
            </div>

            <div className="absolute top-10 text-center pointer-events-none z-10 mix-blend-difference">
                <h3 className="text-2xl font-display text-white tracking-widest uppercase mb-2 animate-pulse">
                    {solved ? "Signal Established" : "Signal Loss Detected"}
                </h3>
                <p className="text-white/40 font-mono text-sm">
                    {solved ? "System Link: ACTIVE" : "Drag & Click mirrors to re-route data stream"}
                </p>
            </div>

            <canvas
                ref={canvasRef}
                className="relative z-10 block touch-action-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onClick={handleClick}
            />

            {/* Success Reward Layer */}
            {solved && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute bottom-16 z-20 pointer-events-auto"
                >
                    <a href="mailto:daniel@example.com" className="inline-flex items-center gap-2 px-8 py-4 bg-[#00ff88]/20 border border-[#00ff88] text-[#00ff88] font-mono uppercase tracking-widest hover:bg-[#00ff88]/30 transition-all cursor-pointer backdrop-blur-md">
                        <span>Initialize Comms</span>
                        <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-ping" />
                    </a>
                </motion.div>
            )}
        </section>
    );
}
