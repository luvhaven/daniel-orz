"use client";

import { motion } from "framer-motion";
import { BentoCard } from "@/components/ui/bento-card";
import { Calendar, Building2, ChevronRight } from "lucide-react";

export function ExperienceSection() {
    const experiences = [
        {
            id: 1,
            company: "Big Web Digital",
            location: "Lagos, Nigeria",
            role: "Lead Frontend Engineer",
            period: "Apr 2020 – Present",
            current: true,
            summary: "Spearheading frontend strategy and architecture for enterprise-scale applications.",
            achievements: [
                "Architected a Next.js/React ecosystem that serves 100k+ monthly users, achieving a 99.9% uptime and reducing server costs by 20%.",
                "Engineered a high-performance rendering engine using React Server Components, slashing Time-to-Interactive (TTI) by 45% and boosting Core Web Vitals scores to 95+.",
                "Established a comprehensive Design System & Component Library, accelerating feature velocity by 40% and ensuring 100% UI consistency across 5+ products.",
                "Mentored a team of 6 engineers, introducing strict code review protocols and CI/CD automation that reduced bug production by 35%.",
                "Led the migration of legacy monolithic codebases to micro-frontends (Module Federation), decoupling deployments and improving scalability.",
            ],
            color: "from-blue-500/20 to-purple-500/20",
        },
        {
            id: 2,
            company: "Michelle and Anthony Consulting",
            location: "Lagos, Nigeria",
            role: "Head of Information Technology",
            period: "Feb 2019 – Mar 2020",
            current: false,
            summary: "Directed IT operations and digital transformation initiatives.",
            achievements: [
                "Orchestrated a company-wide digital transformation, migrating on-premise infrastructure to reliable cloud solutions (Azure/AWS), ensuring 99.99% data availability.",
                "Implemented enterprise-grade security protocols (ISO 27001 standards) that protected sensitive client data and eliminated security breaches during tenure.",
                "Optimized operational workflows by deploying custom automation scripts, reducing manual data entry work by 15 hours/week per employee.",
                "Managed vendor relationships and IT budgets of $50k+, successfully negotiating contracts to reduce software licensing costs by 15%.",
            ],
            color: "from-purple-500/20 to-pink-500/20",
        },
        {
            id: 3,
            company: "Big Web Digital",
            location: "Lagos, Nigeria",
            role: "Frontend Engineer",
            period: "Feb 2017 – Apr 2020",
            current: false,
            summary: "Delivered high-fidelity UI implementations for diverse client projects.",
            achievements: [
                "Developed 15+ responsive web applications from scratch, translating complex UI/UX designs into pixel-perfect code with 100% fidelity.",
                "Integrated complex payment gateways (Stripe, Paystack) and third-party APIs, processing over $1M in transactions securely.",
                "Championed the adoption of Modern JavaScript (ES6+) and React Hooks, refactoring legacy class components to improve maintainability and performance.",
                "Built offline-first Progressive Web Apps (PWAs) that increased user retention by 25% in low-bandwidth regions.",
            ],
            color: "from-pink-500/20 to-orange-500/20",
        },
        {
            id: 4,
            company: "DG Solutions",
            location: "Lagos, Nigeria",
            role: "Software Engineer",
            period: "Jul 2013 – Jan 2017",
            current: false,
            summary: "Full-stack development focus with emphasis on real-time systems.",
            achievements: [
                "Engineered real-time collaboration tools using WebSockets (Socket.io), enabling sub-100ms latency for live user updates.",
                "Developed and maintained RESTful APIs serving frontend clients, ensuring efficient data payloads and <200ms response times.",
                "Automated critical testing workflows using Selenium and various unit testing frameworks, reducing regression bugs by over 50%.",
                "Played a key role in network infrastructure design, ensuring robust connectivity for mission-critical software deployments.",
            ],
            color: "from-orange-500/20 to-yellow-500/20",
        },
    ];

    return (
        <section id="experience" className="section-padding relative overflow-hidden bg-black">
            <div className="container-custom relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <span className="h-[1px] w-12 bg-primary"></span>
                        <span className="text-primary font-mono tracking-widest text-sm uppercase">Career Trajectory</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold font-display leading-tight">
                        ENGINEERING <br />
                        <span className="text-muted-foreground opacity-50">EXCELLENCE</span>
                    </h2>
                </motion.div>

                {/* Timeline */}
                <div className="space-y-12 max-w-5xl mx-auto">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="relative group"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10 group-hover:bg-primary/50 transition-colors duration-500 hidden lg:block" />

                            <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:pl-12 relative">
                                {/* Timeline Dot */}
                                <div className="absolute left-[-5px] top-2 w-[11px] h-[11px] rounded-full bg-black border-2 border-white/20 group-hover:border-primary group-hover:bg-primary transition-all duration-300 hidden lg:block" />

                                {/* Left side - Meta */}
                                <div className="text-muted-foreground space-y-2">
                                    <div className="flex items-center gap-2 text-white font-mono text-sm">
                                        <Calendar className="w-4 h-4 text-primary" />
                                        <span>{exp.period}</span>
                                    </div>
                                    <div className="text-sm">{exp.location}</div>
                                    {exp.current && (
                                        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mt-2">
                                            Current
                                        </span>
                                    )}
                                </div>

                                {/* Right side - Content */}
                                <BentoCard className="!p-0 border-white/5 hover:border-primary/20 transition-colors duration-500 overflow-hidden">
                                    <div className={`h-2 w-full bg-gradient-to-r ${exp.color}`} />
                                    <div className="p-8 md:p-10 space-y-6">
                                        <div>
                                            <h3 className="text-3xl font-bold mb-1 text-white group-hover:text-primary transition-colors">
                                                {exp.role}
                                            </h3>
                                            <div className="flex items-center gap-2 text-lg text-muted-foreground font-medium">
                                                <Building2 className="w-5 h-5" />
                                                {exp.company}
                                            </div>
                                        </div>

                                        <p className="text-lg text-white/80 leading-relaxed font-light border-l-2 border-primary/30 pl-4 py-1">
                                            {exp.summary}
                                        </p>

                                        <div className="space-y-4">
                                            {exp.achievements.map((achievement, i) => (
                                                <div key={i} className="flex items-start gap-4 group/item">
                                                    <div className="mt-1.5 p-1 rounded-full bg-white/5 group-hover/item:bg-primary/20 transition-colors">
                                                        <ChevronRight className="w-3 h-3 text-white/50 group-hover/item:text-primary transition-colors" />
                                                    </div>
                                                    <span className="text-muted-foreground group-hover/item:text-white transition-colors duration-300">
                                                        {achievement}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </BentoCard>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
