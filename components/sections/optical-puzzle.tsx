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

// Line-Line Intersection
const getIntersection = (p1: Vector2, p2: Vector2, p3: Vector2, p4: Vector2): Vector2 | null => {
    const d = (p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x);
    if (d === 0) return null; // Parallel

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

    // Game State
    const mirrorsRef = useRef<Mirror[]>([
        { id: "m1", x: 300, y: 300, angle: Math.PI / 4, width: 100, type: "mirror" },
        { id: "m2", x: 600, y: 200, angle: Math.PI / 2, width: 100, type: "mirror" },
        { id: "m3", x: 500, y: 500, angle: -Math.PI / 6, width: 100, type: "prism" },
    ]);
    const targetRef = useRef<Target>({ x: 800, y: 400, radius: 30, hit: false });
    const draggingRef = useRef<{ id: string; offsetX: number; offsetY: number; startAngle: number } | null>(null);
    const mouseRef = useRef<Vector2>({ x: 0, y: 0 });

    const initGame = useCallback(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        // Resize
        const resize = () => {
            const rect = container.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;

            // Responsive layout adjustments
            if (rect.width < 768) {
                // Mobile Layout reset
                mirrorsRef.current = [
                    { id: "m1", x: rect.width * 0.5, y: rect.height * 0.4, angle: Math.PI / 4, width: 80, type: "mirror" },
                    { id: "m2", x: rect.width * 0.3, y: rect.height * 0.6, angle: 0, width: 80, type: "mirror" },
                ];
                targetRef.current = { x: rect.width * 0.5, y: rect.height * 0.8, radius: 25, hit: false };
            } else {
                targetRef.current = { x: rect.width * 0.85, y: rect.height * 0.5, radius: 40, hit: false };
                mirrorsRef.current = [
                    { id: "m1", x: rect.width * 0.3, y: rect.height * 0.3, angle: Math.PI / 4, width: 120, type: "mirror" },
                    { id: "m2", x: rect.width * 0.6, y: rect.height * 0.2, angle: Math.PI / 2, width: 120, type: "mirror" },
                    { id: "m3", x: rect.width * 0.5, y: rect.height * 0.7, angle: -Math.PI / 6, width: 120, type: "prism" },
                ];
            }
        };
        window.addEventListener("resize", resize);
        resize();

        // Loop
        let animationId: number;
        const render = () => {
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Update Dragging
            if (draggingRef.current) {
                const mirror = mirrorsRef.current.find(m => m.id === draggingRef.current!.id);
                if (mirror) {
                    mirror.x = mouseRef.current.x - draggingRef.current.offsetX;
                    mirror.y = mouseRef.current.y - draggingRef.current.offsetY;

                    // Simple rotation based on movement delta would be complex, let's use scroll wheel or keys for rotation?
                    // Or let's just make dragging easy and add a "Rotate" handle? 
                    // For simplicity, let's auto-rotate slightly towards mouse delta or keep static rotation and use click to rotate 45deg.
                }
            }

            // Clear
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Transparent!

            // --- Logic: Raytracing ---
            const rays: Ray[] = [];
            let currentRay = { start: { x: 0, y: canvas.height * 0.5 }, angle: 0, intensity: 1.0 }; // Start from left center

            // Max bounces
            let hitTarget = false;

            for (let b = 0; b < 10; b++) {
                // Find closest intersection
                let closestHit: { pt: Vector2; mirror: Mirror | null; dist: number } | null = null;

                // Check canvas bounds (end of world)
                const farPoint = {
                    x: currentRay.start.x + Math.cos(currentRay.angle) * 3000,
                    y: currentRay.start.y + Math.sin(currentRay.angle) * 3000,
                };

                // Default hit is far point
                closestHit = { pt: farPoint, mirror: null, dist: 3000 };

                // Check Mirrors
                mirrorsRef.current.forEach(m => {
                    // Mirror is a line segment. Calculate endpoints based on angle and width
                    const p1 = rotatePoint({ x: m.x - m.width / 2, y: m.y }, { x: m.x, y: m.y }, m.angle);
                    const p2 = rotatePoint({ x: m.x + m.width / 2, y: m.y }, { x: m.x, y: m.y }, m.angle);

                    // Backface culling? Mirrors are double sided here physics wise
                    const hit = getIntersection(currentRay.start, farPoint, p1, p2);
                    if (hit) {
                        const dist = Math.hypot(hit.x - currentRay.start.x, hit.y - currentRay.start.y);
                        if (dist < closestHit!.dist && dist > 1) { // > 1 to avoid self-intersection on bounce
                            closestHit = { pt: hit, mirror: m, dist };
                        }
                    }
                });

                // Check Target
                const t = targetRef.current;
                // Circle intersection approx (line circle)
                // Simply check if ray passes close to center?
                // Or simplified: check distance from line segment to point. 
                // For "Game" feel, let's just use the end point of the ray if it hits nothing else?
                // No, we need to know if the ray *passes through* the target.
                const cx = t.x, cy = t.y, r = t.radius;
                // vector from ray start to circle center
                const fx = cx - currentRay.start.x;
                const fy = cy - currentRay.start.y;
                // project f onto ray direction
                const tProj = fx * Math.cos(currentRay.angle) + fy * Math.sin(currentRay.angle);
                // closest point on ray line to circle center
                const closestX = currentRay.start.x + tProj * Math.cos(currentRay.angle);
                const closestY = currentRay.start.y + tProj * Math.sin(currentRay.angle);

                const distToCenter = Math.hypot(closestX - cx, closestY - cy);
                const distAlongRay = tProj;

                // If intersects circle and is closer than mirror hit
                if (distToCenter < r && distAlongRay > 0 && distAlongRay < closestHit.dist) {
                    hitTarget = true;
                    // Visualize ray stopping at target center roughly
                    closestHit = {
                        pt: { x: closestX, y: closestY }, // Hit "inside" target
                        mirror: null,
                        dist: distAlongRay
                    };
                }

                rays.push({ start: currentRay.start, end: closestHit.pt, intensity: currentRay.intensity });

                if (!closestHit.mirror) break; // Hit wall or target

                // Calculate Reflection
                const m = closestHit.mirror;
                // Normal vector of mirror
                const normalAngle = m.angle - Math.PI / 2;
                // Reflection formula: r = d - 2(d.n)n
                // Or angle approach:
                // angle of incidence ...
                // Quick reflection physics: 
                // New Angle = 2 * WallAngle - OldAngle?
                // Wait. Mirror angle is the surface angle. Normal is +90deg.
                // Reflected Angle is 
                let reflectAngle = 2 * m.angle - currentRay.angle;

                if (m.type === 'prism') {
                    // Refract / Split? For MVP let's make prism act like a 90deg bender or just scatter
                    if (b % 2 === 0) reflectAngle += Math.PI / 4; // Fun scattering
                    currentRay.intensity *= 0.8;
                }

                currentRay = { start: closestHit.pt, angle: reflectAngle, intensity: currentRay.intensity * 0.95 };

                // Prevent infinite loops
                if (currentRay.intensity < 0.1) break;
            }

            // Sync Hit State
            if (hitTarget !== targetRef.current.hit) {
                targetRef.current.hit = hitTarget;
                if (hitTarget) {
                    setSolved(true);
                    playWhoosh(); // Success sound reused!
                } else {
                    setSolved(false);
                }
            }


            // --- Render ---

            // Draw Target
            const t = targetRef.current;
            ctx.beginPath();
            ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
            ctx.fillStyle = t.hit ? "#00ff88" : "#222"; // Green if hit, Dark if not
            ctx.fill();
            ctx.strokeStyle = t.hit ? "#fff" : "#444";
            ctx.lineWidth = 2;
            ctx.stroke();
            // Glow
            if (t.hit) {
                ctx.shadowBlur = 30;
                ctx.shadowColor = "#00ff88";
                ctx.fillStyle = "#ffffff";
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            // Draw Rays
            ctx.lineCap = "round";
            rays.forEach(ray => {
                ctx.beginPath();
                ctx.moveTo(ray.start.x, ray.start.y);
                ctx.lineTo(ray.end.x, ray.end.y);
                ctx.strokeStyle = t.hit ? `rgba(100, 255, 200, ${ray.intensity})` : `rgba(255, 50, 50, ${ray.intensity})`;
                ctx.lineWidth = t.hit ? 4 : 2;
                ctx.shadowBlur = t.hit ? 15 : 10;
                ctx.shadowColor = t.hit ? "#00ff88" : "#ff0044";
                ctx.stroke();
                ctx.shadowBlur = 0;
            });

            // Draw Mirrors
            mirrorsRef.current.forEach(m => {
                const p1 = rotatePoint({ x: m.x - m.width / 2, y: m.y }, { x: m.x, y: m.y }, m.angle);
                const p2 = rotatePoint({ x: m.x + m.width / 2, y: m.y }, { x: m.x, y: m.y }, m.angle);

                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);

                // Type styles
                if (m.type === "mirror") {
                    ctx.strokeStyle = "#ffffff";
                    ctx.lineWidth = 6;
                } else {
                    ctx.strokeStyle = "rgba(200, 200, 255, 0.5)"; // Prism glass look
                    ctx.lineWidth = 8;
                }
                ctx.stroke();

                // Draw Pivot / Handle
                ctx.beginPath();
                ctx.arc(m.x, m.y, 6, 0, Math.PI * 2);
                ctx.fillStyle = "#fff";
                ctx.fill();
            });

            // Source Emitter
            ctx.beginPath();
            ctx.arc(0, canvas.height * 0.5, 20, 0, Math.PI * 2);
            ctx.fillStyle = "#333";
            ctx.fill();

            animationId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationId);
        };
    }, [playWhoosh]);

    useEffect(() => {
        initGame();
    }, [initGame]);

    // Interaction Handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseRef.current = { x, y };

        // Check if clicking a mirror handle
        const clickedMirror = mirrorsRef.current.find(m => Math.hypot(m.x - x, m.y - y) < 40); // Generous hit area
        if (clickedMirror) {
            draggingRef.current = { id: clickedMirror.id, offsetX: x - clickedMirror.x, offsetY: y - clickedMirror.y, startAngle: clickedMirror.angle };

            // Interaction: Right click or Double click rotates?
            // Actually let's just say Click rotates 45 degrees for simplicity if not dragging?
            // Or just allow dragging.
        }
    };

    // Rotation on Click
    const handleClick = (e: React.MouseEvent) => {
        // Only if we didn't drag much? simplified.
        const rect = canvasRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const clickedMirror = mirrorsRef.current.find(m => Math.hypot(m.x - x, m.y - y) < 40);

        if (clickedMirror) {
            clickedMirror.angle += Math.PI / 8; // Rotate 22.5 deg
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseUp = () => {
        draggingRef.current = null;
    };

    return (
        <section className="relative w-full h-[80vh] bg-black overflow-hidden flex flex-col items-center justify-center border-y border-white/10">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,30,30,0.5)_0%,transparent_100%)]" />
            </div>

            <div className="absolute top-8 text-center pointer-events-none z-10 mix-blend-difference">
                <h3 className="text-2xl font-display text-white tracking-widest uppercase mb-2 animate-pulse">
                    {solved ? "Signal Established" : "Signal Loss Detected"}
                </h3>
                <p className="text-white/40 font-mono text-sm">
                    {solved ? "System Link: ACTIVE" : "Drag & Click mirrors to re-route data stream"}
                </p>
            </div>

            <canvas
                ref={canvasRef}
                className="relative z-10 w-full h-full cursor-move active:cursor-grabbing"
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
                    className="absolute bottom-16 z-20"
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
