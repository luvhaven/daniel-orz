"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { BentoCard } from "@/components/ui/bento-card";

export function TestimonialsSection() {
    const testimonials = [
        {
            name: "Sarah Chen",
            role: "VP of Engineering",
            company: "TechFlow Solutions",
            quote:
                "Daniel is one of those rare engineers who not only writes exceptional code but also understands the product vision. His architectural decisions saved us months of technical debt.",
        },
        {
            name: "Michael Ross",
            role: "Lead Product Designer",
            company: "Creative Inc",
            quote:
                "Working with Daniel was a dream. He has an incredible eye for detail and perfectly translated complex Figma designs into pixel-perfect, responsive interfaces.",
        },
        {
            name: "James Wilson",
            role: "CTO",
            company: "StartUp X",
            quote:
                "Daniel's expertise in React and performance optimization was crucial for our launch. He took our load times from 3s to under 0.8s. Highly recommended.",
        },
    ];

    return (
        <section className="section-padding bg-muted/20 relative overflow-hidden">
            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
                        Trusted by <span className="gradient-text">Leaders</span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        What peers and technical leaders say about working with me.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <BentoCard className="h-full flex flex-col justify-between !p-8">
                                <div>
                                    <Quote className="w-10 h-10 text-primary/20 mb-6" />
                                    <p className="text-lg text-muted-foreground italic mb-6">
                                        "{t.quote}"
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{t.name}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            {t.role}, {t.company}
                                        </p>
                                    </div>
                                </div>
                            </BentoCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
