"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
    links: {
        demo?: string;
        repo?: string;
    };
    image?: string;
    index: number;
}

export function ProjectCard({ title, description, tags, links, index }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative rounded-3xl bg-card border border-border/50 overflow-hidden hover:border-primary/50 transition-colors duration-500 h-full flex flex-col"
        >
            {/* Image Placeholder / Gradient Area */}
            <div className="aspect-video w-full overflow-hidden bg-muted relative">
                <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 group-hover:scale-105 transition-transform duration-700`} />

                {/* Overlay content on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                    {links.demo && (
                        <a
                            href={links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform flex items-center gap-2 font-semibold"
                        >
                            <ExternalLink className="w-4 h-4" /> Live Demo
                        </a>
                    )}
                    {links.repo && (
                        <a
                            href={links.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/20 text-white backdrop-blur-md border border-white/50 rounded-full hover:scale-110 transition-transform flex items-center gap-2 font-semibold"
                        >
                            <Github className="w-4 h-4" /> Code
                        </a>
                    )}
                </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold group-hover:gradient-text transition-all duration-300">
                        {title}
                    </h3>
                    {links.demo && (
                        <a
                            href={links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
                        </a>
                    )}
                </div>

                <p className="text-muted-foreground mb-6 line-clamp-3">
                    {description}
                </p>

                <div className="mt-auto flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
