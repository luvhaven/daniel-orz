"use client";

import { motion } from "framer-motion";
import { BentoCard } from "@/components/ui/bento-card";
import { SkillBadge } from "@/components/ui/skill-badge";
import { Code2, Palette, Terminal, Zap, Cpu, Search, Layers, GitBranch } from "lucide-react";
import { CountUp } from "@/components/ui/count-up";

export function AboutSection() {
    const frontendSkills = [
        { name: "JavaScript (ES6+)", level: 98, icon: <Terminal className="w-4 h-4" /> },
        { name: "TypeScript", level: 95, icon: <Code2 className="w-4 h-4" /> },
        { name: "React", level: 98, icon: <Zap className="w-4 h-4" /> },
        { name: "Next.js", level: 95, icon: <Layers className="w-4 h-4" /> },
        { name: "Tailwind CSS", level: 95, icon: <Palette className="w-4 h-4" /> },
        { name: "Framer Motion", level: 90, icon: <Zap className="w-4 h-4" /> },
    ];

    const backendSkills = [
        { name: "Node.js", level: 85, icon: <Terminal className="w-4 h-4" /> },
        { name: "GraphQL", level: 80, icon: <GitBranch className="w-4 h-4" /> },
        { name: "PostgreSQL", level: 75, icon: <Search className="w-4 h-4" /> },
        { name: "Docker", level: 70, icon: <Cpu className="w-4 h-4" /> },
        { name: "AWS", level: 75, icon: <Code2 className="w-4 h-4" /> },
    ];

    return (
        <section id="about" className="section-padding relative overflow-hidden bg-black">
            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left: Narrative */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4">
                            <span className="h-[1px] w-12 bg-primary"></span>
                            <span className="text-secondary font-mono tracking-widest text-sm uppercase">Philosophy</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl font-bold font-display leading-tight">
                            BEYOND <br />
                            <span className="text-muted-foreground opacity-50">THE CODE</span>
                        </h2>

                        <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                            <p>
                                I don't just build websites; I engineer <span className="text-white font-medium">digital ecosystems</span>. With over 15 years deeply embedded in the tech landscape, I've transitioned from writing lines of code to orchestrating complex, scalable architectures that drive business growth.
                            </p>
                            <p>
                                My approach is rooted in <span className="text-white font-medium">Precision Engineering</span> and <span className="text-white font-medium">User-Centric Design</span>. I believe that performance isn't a feature—it's the baseline. Every millisecond saved is respect paid to the user's time.
                            </p>
                            <p>
                                Whether leading teams, optimizing legacy systems, or crafting award-winning interfaces, my goal remains constant: to bridge the gap between ambitious design and robust engineering.
                            </p>
                        </div>

                        <div className="pt-8 grid grid-cols-3 gap-8 border-t border-white/10">
                            <div>
                                <div className="flex items-baseline mb-2">
                                    <CountUp end={15} duration={2} className="text-4xl font-bold text-white" />
                                    <span className="text-4xl font-bold text-white">+</span>
                                </div>
                                <span className="text-xs uppercase tracking-widest text-muted-foreground">Years Experience</span>
                            </div>
                            <div>
                                <div className="flex items-baseline mb-2">
                                    <CountUp end={50} duration={2.5} className="text-4xl font-bold text-white" />
                                    <span className="text-4xl font-bold text-white">+</span>
                                </div>
                                <span className="text-xs uppercase tracking-widest text-muted-foreground">Projects Shipped</span>
                            </div>
                            <div>
                                <div className="flex items-baseline mb-2">
                                    <CountUp end={100} duration={3} className="text-4xl font-bold text-white" />
                                    <span className="text-4xl font-bold text-white">k+</span>
                                </div>
                                <span className="text-xs uppercase tracking-widest text-muted-foreground">Users Served</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Skills Grid */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <BentoCard className="border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-10 space-y-12">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-primary/20 rounded-lg text-primary">
                                        <Code2 className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold font-display">Frontend Arsenal</h3>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {frontendSkills.map((skill) => (
                                        <SkillBadge key={skill.name} {...skill} />
                                    ))}
                                </div>
                            </div>

                            <div className="pt-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-secondary/20 rounded-lg text-secondary">
                                        <Cpu className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold font-display">Backend & DevOps</h3>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {backendSkills.map((skill) => (
                                        <SkillBadge key={skill.name} {...skill} />
                                    ))}
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/10">
                                <p className="text-sm text-muted-foreground italic">
                                    "The tools change, but the fundamentals of engineering excellence remain constant."
                                </p>
                            </div>
                        </BentoCard>

                        {/* Decoration */}
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-[80px] z-[-1]" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
