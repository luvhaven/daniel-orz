"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useWhooshSound } from "@/hooks/use-whoosh-sound";

// --- Types ---
type Vector2 = { x: number; y: number };
type Mirror = {
    id: string;
    x: number;
    y: number;
    angle: number;
    targetAngle: number; // For smooth rotation
    width: number;
    type: "mirror" | "prism"
};
type Ray = { start: Vector2; end: Vector2; intensity: number; color: string };
type Target = { x: number; y: number; radius: number; hit: boolean; pulsePhase: number };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string };

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

const lerp = (start: number, end: number, t: number) => {
    return start * (1 - t) + end * t;
};

export function OpticalPuzzleSection() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [solved, setSolved] = useState(false);
    const [hovered, setHovered] = useState(false); // For cursor
    const playWhoosh = useWhooshSound();

    // Game Logic Refs
    const mirrorsRef = useRef<Mirror[]>([]);
    const targetRef = useRef<Target>({ x: 0, y: 0, radius: 40, hit: false, pulsePhase: 0 });
    const particlesRef = useRef<Particle[]>([]);
    const draggingRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);
    const mouseRef = useRef<Vector2>({ x: 0, y: 0 });
    const initializedRef = useRef(false);

    // Config
    const LASER_COLOR_MAIN = "#ff3366";
    const LASER_COLOR_HIT = "#00ff88";

    const initGame = useCallback(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        let animationId: number;
        const resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];
            const { width, height } = entry.contentRect;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            const ctx = canvas.getContext("2d");
            if (ctx) ctx.scale(dpr, dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            if (!initializedRef.current || Math.abs(width - (mirrorsRef.current[0]?.x ? width : 0)) > 200) {
                if (width < 768) {
                    mirrorsRef.current = [
                        { id: "m1", x: width * 0.5, y: height * 0.4, angle: Math.PI / 4, targetAngle: Math.PI / 4, width: 80, type: "mirror" },
                        { id: "m2", x: width * 0.3, y: height * 0.6, angle: 0, targetAngle: 0, width: 80, type: "mirror" },
                    ];
                    targetRef.current = { x: width * 0.5, y: height * 0.8, radius: 30, hit: false, pulsePhase: 0 };
                } else {
                    mirrorsRef.current = [
                        { id: "m1", x: width * 0.3, y: height * 0.3, angle: Math.PI / 4, targetAngle: Math.PI / 4, width: 120, type: "mirror" },
                        { id: "m2", x: width * 0.6, y: height * 0.2, angle: Math.PI / 2, targetAngle: Math.PI / 2, width: 120, type: "mirror" },
                        { id: "m3", x: width * 0.5, y: height * 0.7, angle: -Math.PI / 6, targetAngle: -Math.PI / 6, width: 120, type: "prism" },
                    ];
                    targetRef.current = { x: width * 0.85, y: height * 0.5, radius: 40, hit: false, pulsePhase: 0 };
                }
                initializedRef.current = true;
            }
        });

        resizeObserver.observe(container);

        const render = () => {
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const width = canvas.width / (window.devicePixelRatio || 1);
            const height = canvas.height / (window.devicePixelRatio || 1);

            ctx.clearRect(0, 0, width, height);

            // --- Update Physics & Logic ---

            // Dragging
            if (draggingRef.current) {
                const mirror = mirrorsRef.current.find(m => m.id === draggingRef.current!.id);
                if (mirror) {
                    mirror.x = mouseRef.current.x - draggingRef.current.offsetX;
                    mirror.y = mouseRef.current.y - draggingRef.current.offsetY;
                }
            }

            // Smooth Rotation
            mirrorsRef.current.forEach(m => {
                m.angle = lerp(m.angle, m.targetAngle, 0.1);
            });

            // Raycasting
            const rays: Ray[] = [];
            let currentRay = { start: { x: 0, y: height * 0.5 }, angle: 0, intensity: 1.0 };
            let hitTarget = false;
            const activeColor = targetRef.current.hit ? LASER_COLOR_HIT : LASER_COLOR_MAIN;

            for (let b = 0; b < 12; b++) {
                const farPoint = {
                    x: currentRay.start.x + Math.cos(currentRay.angle) * 3000,
                    y: currentRay.start.y + Math.sin(currentRay.angle) * 3000,
                };
                let closestHit = { pt: farPoint, mirror: null as Mirror | null, dist: 3000 };

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

                const t = targetRef.current;
                const dx = t.x - currentRay.start.x;
                const dy = t.y - currentRay.start.y;
                const proj = dx * Math.cos(currentRay.angle) + dy * Math.sin(currentRay.angle);
                const closestPtX = currentRay.start.x + proj * Math.cos(currentRay.angle);
                const closestPtY = currentRay.start.y + proj * Math.sin(currentRay.angle);
                const distPerpendicular = Math.hypot(t.x - closestPtX, t.y - closestPtY);

                if (distPerpendicular < t.radius * 0.8 && proj > 0 && proj < closestHit.dist) {
                    hitTarget = true;
                    closestHit = { pt: { x: closestPtX, y: closestPtY }, mirror: null, dist: proj };
                }

                rays.push({ start: currentRay.start, end: closestHit.pt, intensity: currentRay.intensity, color: activeColor });

                // Spawn Particles on Hit
                if (closestHit.mirror || hitTarget) {
                    if (Math.random() < 0.3) {
                        particlesRef.current.push({
                            x: closestHit.pt.x,
                            y: closestHit.pt.y,
                            vx: (Math.random() - 0.5) * 2,
                            vy: (Math.random() - 0.5) * 2,
                            life: 1.0,
                            color: activeColor
                        });
                    }
                }

                if (!closestHit.mirror) break;

                const m = closestHit.mirror;
                let reflectAngle = 2 * m.angle - currentRay.angle;
                if (m.type === "prism") {
                    currentRay.intensity *= 0.8;
                    reflectAngle += (Math.random() * 0.05 - 0.025);
                } else {
                    currentRay.intensity *= 0.95;
                }
                currentRay = { start: closestHit.pt, angle: reflectAngle, intensity: currentRay.intensity };
                if (currentRay.intensity < 0.05) break;
            }

            // Game State Update
            if (hitTarget !== targetRef.current.hit) {
                targetRef.current.hit = hitTarget;
                if (hitTarget) {
                    setSolved(true);
                    if (playWhoosh) playWhoosh();
                } else {
                    setSolved(false);
                }
            }

            // Check Hover for Cursor
            const mouseX = mouseRef.current.x;
            const mouseY = mouseRef.current.y;
            const hoveredMirror = mirrorsRef.current.some(m => Math.hypot(m.x - mouseX, m.y - mouseY) < 40);
            if (hoveredMirror !== hovered) setHovered(hoveredMirror);

            // --- Render Visuals ---

            // Draw Target
            const t = targetRef.current;
            t.pulsePhase += 0.05;
            ctx.beginPath();
            ctx.arc(t.x, t.y, t.radius + Math.sin(t.pulsePhase) * 3 * (t.hit ? 1 : 0), 0, Math.PI * 2);
            ctx.fillStyle = "#111"; // Inner Core
            ctx.fill();
            ctx.strokeStyle = t.hit ? LASER_COLOR_HIT : "#444";
            ctx.lineWidth = 3;
            ctx.stroke();

            // Target Rings
            ctx.beginPath();
            ctx.arc(t.x, t.y, t.radius * 0.6, 0, Math.PI * 2);
            ctx.fillStyle = t.hit ? LASER_COLOR_HIT : "#222";
            ctx.fill();
            if (t.hit) {
                ctx.shadowBlur = 30 + Math.sin(t.pulsePhase) * 10;
                ctx.shadowColor = LASER_COLOR_HIT;
                ctx.stroke(); // Double glow
                ctx.shadowBlur = 0;
            }

            // Draw Rays (Bloom Effect)
            ctx.lineCap = "round";
            // Pass 1: Wide Glow
            rays.forEach(ray => {
                ctx.beginPath();
                ctx.moveTo(ray.start.x, ray.start.y);
                ctx.lineTo(ray.end.x, ray.end.y);
                ctx.lineWidth = 8;
                ctx.strokeStyle = ray.color.replace(")", ", 0.2)").replace("rgb", "rgba"); // Transparent
                ctx.stroke();
            });
            // Pass 2: Core
            rays.forEach(ray => {
                ctx.beginPath();
                ctx.moveTo(ray.start.x, ray.start.y);
                ctx.lineTo(ray.end.x, ray.end.y);
                ctx.lineWidth = 2;
                ctx.strokeStyle = "#ffffff";
                ctx.shadowBlur = 10;
                ctx.shadowColor = ray.color;
                ctx.stroke();
                ctx.shadowBlur = 0;
            });

            // Draw Mirrors
            mirrorsRef.current.forEach(m => {
                const halfW = m.width / 2;
                const p1 = rotatePoint({ x: m.x - halfW, y: m.y }, { x: m.x, y: m.y }, m.angle);
                const p2 = rotatePoint({ x: m.x + halfW, y: m.y }, { x: m.x, y: m.y }, m.angle);

                // Glow if Hovered
                const isHoveringThis = Math.hypot(m.x - mouseX, m.y - mouseY) < 40;
                if (isHoveringThis) {
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
                }

                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.lineWidth = 6;
                ctx.strokeStyle = "#888"; // Back
                ctx.stroke();

                // Reflective Surface
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.lineWidth = 3;
                const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                grad.addColorStop(0, "rgba(255,255,255,0.1)");
                grad.addColorStop(0.5, "rgba(255,255,255,0.9)");
                grad.addColorStop(1, "rgba(255,255,255,0.1)");
                ctx.strokeStyle = grad;
                ctx.stroke();

                ctx.shadowBlur = 0;

                // Pivot
                ctx.beginPath();
                ctx.arc(m.x, m.y, 6, 0, Math.PI * 2);
                ctx.fillStyle = isHoveringThis ? "#fff" : "#aaa";
                ctx.fill();
            });

            // Particles
            particlesRef.current.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.05;
                if (p.life > 0) {
                    ctx.globalAlpha = p.life;
                    ctx.fillStyle = p.color;
                    ctx.fillRect(p.x, p.y, 2, 2);
                    ctx.globalAlpha = 1;
                } else {
                    particlesRef.current.splice(i, 1);
                }
            });

            // Source
            ctx.beginPath();
            ctx.arc(0, height * 0.5, 12, 0, Math.PI * 2);
            ctx.fillStyle = "#fff";
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#fff";
            ctx.fill();
            ctx.shadowBlur = 0;

            animationId = requestAnimationFrame(render);
        };
        render();

        return () => {
            resizeObserver.disconnect();
            cancelAnimationFrame(animationId);
        };
    }, []); // Stability

    useEffect(() => {
        initGame();
    }, [initGame]);

    const handleMouseDown = (e: React.MouseEvent) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const clickedMirror = mirrorsRef.current.find(m => Math.hypot(m.x - x, m.y - y) < 40);

        if (clickedMirror) {
            // Check if dragging or just clicking
            draggingRef.current = { id: clickedMirror.id, offsetX: x - clickedMirror.x, offsetY: y - clickedMirror.y };
        }
    };

    // Smooth Rotation on Click
    const handleClick = (e: React.MouseEvent) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const clickedMirror = mirrorsRef.current.find(m => Math.hypot(m.x - x, m.y - y) < 40);

        if (clickedMirror) {
            // Rotate 45deg
            clickedMirror.targetAngle += Math.PI / 4;
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

    // Cursor Style
    const cursorClass = hovered ? (draggingRef.current ? "cursor-grabbing" : "cursor-grab") : "cursor-default";

    return (
        <section ref={containerRef} className="relative w-full h-[80vh] bg-black overflow-hidden flex flex-col items-center justify-center border-y border-white/10 group">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,30,30,0.5)_0%,transparent_100%)] opacity-50" />
            </div>

            <div className="absolute top-10 text-center pointer-events-none z-10 mix-blend-difference select-none">
                <h3 className="text-2xl font-display text-white tracking-widest uppercase mb-2 animate-pulse">
                    {solved ? "Signal Established" : "Signal Loss Detected"}
                </h3>
                <p className="text-white/40 font-mono text-sm">
                    {solved ? "System Link: ACTIVE" : "Drag mirrors. Click to rotate."}
                </p>
            </div>

            <canvas
                ref={canvasRef}
                className={`relative z-10 block touch-action-none active:scale-[0.99] transition-transform duration-100 ${cursorClass}`}
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
                    <a href="mailto:daniel@example.com" className="inline-flex items-center gap-2 px-8 py-4 bg-[#00ff88]/20 border border-[#00ff88] text-[#00ff88] font-mono uppercase tracking-widest hover:bg-[#00ff88]/30 transition-all cursor-pointer backdrop-blur-md group-hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]">
                        <span>Initialize Comms</span>
                        <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-ping" />
                    </a>
                </motion.div>
            )}
        </section>
    );
}
