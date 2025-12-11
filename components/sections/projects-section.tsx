"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

interface Project {
    title: string;
    category: string;
    description: string;
    tags: string[];
    color: string;
}

const projects: Project[] = [
    {
        title: "Enterprise E-Commerce",
        category: "Architecture",
        description: "A headless commerce solution serving 50k+ daily active users with sub-second load times.",
        tags: ["Next.js", "GraphQL", "AWS"],
        color: "from-blue-500/20 to-cyan-500/20"
    },
    {
        title: "FinTech Dashboard",
        category: "Data Visualization",
        description: "Real-time financial analytics platform processing millions of data points via WebSockets.",
        tags: ["React", "D3.js", "Socket.io"],
        color: "from-purple-500/20 to-pink-500/20"
    },
    {
        title: "AI Content Studio",
        category: "Generative AI",
        description: "Production-grade AI application integrating LLMs for real-time content generation.",
        tags: ["OpenAI", "Edge Runtime", "PostgreSQL"],
        color: "from-orange-500/20 to-red-500/20"
    },
    {
        title: "Design System Core",
        category: "Infrastructure",
        description: "Internal component library standardized across 8 product lines improving velocity by 30%.",
        tags: ["Storybook", "Turborepo", "CI/CD"],
        color: "from-green-500/20 to-emerald-500/20"
    }
];

function ProjectItem({ project, index, targetScale }: { project: Project; index: number; targetScale: number }) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "start start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div
                style={{ scale: index === projects.length - 1 ? 1 : scale, opacity }}
                className="relative w-full max-w-5xl h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden glass border border-white/10 group bg-[#0a0a0a]"
            >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />

                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between z-10">
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
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 md:justify-end">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-4 py-2 rounded-full border border-white/10 bg-black/20 text-sm font-medium">
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
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"]
    });

    return (
        <section id="projects" className="relative bg-black" ref={container}>
            <div className="container-custom py-24 mb-12">
                <h2 className="text-6xl md:text-8xl font-bold font-display mb-8">
                    SELECTED <br /> <span className="text-muted-foreground opacity-30">WORKS</span>
                </h2>
            </div>

            <div className="pb-[20vh]">
                {projects.map((project, index) => {
                    const targetScale = 1 - ((projects.length - index) * 0.05);
                    return <ProjectItem key={index} index={index} project={project} targetScale={targetScale} />;
                })}
            </div>
        </section>
    );
}
