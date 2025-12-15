"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface Project {
    title: string;
    category: string;
    description: string;
    tags: string[];
    color: string;
    image: string;
}

const projects: Project[] = [
    {
        title: "Lumina",
        category: "E-Commerce Architecture",
        description: "A headless luxury commerce solution serving 50k+ daily active users with sub-second load times.",
        tags: ["Next.js", "GraphQL", "AWS"],
        color: "from-blue-500/20 to-cyan-500/20",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "FinTech Dashboard",
        category: "Data Visualization",
        description: "Real-time financial analytics platform processing millions of data points via WebSockets.",
        tags: ["React", "D3.js", "Socket.io"],
        color: "from-indigo-500/20 to-blue-500/20",
        image: "/project-fintech.png"
    },
    {
        title: "Aether",
        category: "Generative AI",
        description: "Production-grade AI content studio integrating LLMs for real-time creativity.",
        tags: ["OpenAI", "Edge Runtime", "PostgreSQL"],
        color: "from-orange-500/20 to-red-500/20",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop"
    },
    {
        title: "Design System Core",
        category: "Infrastructure",
        description: "Internal component library standardized across 8 product lines improving velocity by 30%.",
        tags: ["Storybook", "Turborepo", "CI/CD"],
        color: "from-green-500/20 to-emerald-500/20",
        image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop"
    }
];

function ProjectItem({ project, index, _targetScale }: { project: Project; index: number; _targetScale: number }) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "start start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div ref={container} className="h-auto md:h-screen flex items-center justify-center sticky-item snap-center flex-shrink-0 w-[85vw] md:w-full md:sticky md:top-0">
            <motion.div
                style={isMobile ? {} : { scale: index === projects.length - 1 ? 1 : scale, opacity }}
                className="relative w-full md:max-w-5xl h-[50vh] md:h-[70vh] rounded-3xl overflow-hidden glass border border-white/10 group bg-[#0a0a0a]"
            >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />

                {/* Background Image */}
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                />

                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10 bg-gradient-to-t from-black via-transparent to-black/20">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-2 block">{project.category}</span>
                            <h3 className="text-4xl md:text-6xl font-bold font-display">{project.title}</h3>
                        </div>
                        <div className="bg-white/10 p-4 rounded-full backdrop-blur-md group-hover:bg-white group-hover:text-black transition-colors duration-300 cursor-pointer">
                            <ArrowUpRight className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-end">
                        <p className="text-xl text-white/80 leading-relaxed max-w-lg">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 md:justify-end">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-4 py-2 rounded-full border border-white/10 bg-black/40 text-sm font-medium backdrop-blur-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export function ProjectsSection() {
    const container = useRef(null);
    const { scrollYProgress: _scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"]
    });

    return (
        <section className="relative bg-black" ref={container}>
            <div className="container-custom py-24 mb-12">
                <h2 className="text-6xl md:text-8xl font-bold font-display mb-8">
                    SELECTED <br /> <span className="text-muted-foreground opacity-30">WORKS</span>
                </h2>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-12 md:pb-[20vh] md:block md:overflow-visible md:px-0 scrollbar-hide">
                {projects.map((project, index) => {
                    const targetScale = 1 - ((projects.length - index) * 0.05);
                    return <ProjectItem key={index} index={index} project={project} _targetScale={targetScale} />;
                })}
            </div>
        </section>
    );
}
