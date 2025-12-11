"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Github, Linkedin, Mail, Phone, Download, Send } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GlassCard } from "@/components/ui/glass-card";

export function ContactSection() {
    const [copied, setCopied] = useState(false);
    const email = "doriazowan@gmail.com";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const contactMethods = [
        {
            icon: Phone,
            label: "Phone",
            value: "+234 802 638 1777",
            href: "tel:+2348026381777",
            color: "from-secondary/20 to-accent/20",
        },
        {
            icon: Linkedin,
            label: "LinkedIn",
            value: "Daniel Oriazowan",
            href: "https://linkedin.com/in/daniel-oriazowan",
            color: "from-accent/20 to-primary/20",
        },
        {
            icon: Github,
            label: "GitHub",
            value: "@danieloriazowan",
            href: "https://github.com/danieloriazowan",
            color: "from-primary/20 to-accent/20",
        },
    ];

    return (
        <section id="contact" className="section-padding bg-background relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 mesh-gradient opacity-50" />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl"
                />
            </div>

            <div className="container-custom relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
                        Let's Build Something <span className="gradient-text">Amazing</span>{" "}
                        Together
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground">
                        Available for senior frontend engineering roles and technical leadership positions.
                    </p>
                </motion.div>

                {/* Contact methods grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-16">
                    {/* Email Card (Interactive) */}
                    <motion.button
                        onClick={handleCopy}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative flex items-center gap-6 p-6 md:p-8 rounded-3xl glass w-full hover:bg-white/5 transition-colors text-left"
                    >
                        <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                            <Mail className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Email</p>
                            <h3 className="text-xl md:text-2xl font-bold font-display text-white group-hover:text-primary transition-colors break-all">
                                {email}
                            </h3>
                        </div>
                        <div className="absolute top-6 right-6">
                            <AnimatePresence mode="wait">
                                {copied ? (
                                    <motion.div
                                        key="check"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                    >
                                        <Check className="w-5 h-5 text-green-500" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="copy"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                    >
                                        <Copy className="w-5 h-5 text-muted-foreground group-hover:text-white" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.button>

                    {/* Other Methods */}
                    {contactMethods.map((method, index) => (
                        <motion.a
                            key={method.label}
                            href={method.href}
                            target={method.href.startsWith("http") ? "_blank" : undefined}
                            rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="group flex items-center gap-6 p-6 md:p-8 rounded-3xl glass w-full hover:bg-white/5 transition-colors"
                        >
                            <div className={`p-4 rounded-full bg-gradient-to-br ${method.color} text-primary group-hover:scale-110 transition-transform`}>
                                <method.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">{method.label}</p>
                                <h3 className="text-lg font-bold text-white group-hover:text-secondary transition-colors">{method.value}</h3>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="frosted-glass text-center p-12 rounded-4xl bg-white/5 border border-white/10">
                        <div className="max-w-2xl mx-auto space-y-8">
                            <div>
                                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                                    Ready to <span className="gradient-text">Level Up</span> Your Team?
                                </h3>
                                <p className="text-lg text-muted-foreground">
                                    I am currently available for new opportunities.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <MagneticButton
                                    onClick={() => window.location.href = "mailto:doriazowan@gmail.com"}
                                    className="px-8 py-4 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-full font-semibold text-lg shadow-glow hover:shadow-glow-lg"
                                >
                                    <Send className="w-5 h-5 inline-block mr-2" />
                                    Send Message
                                </MagneticButton>

                                <MagneticButton
                                    onClick={() => {
                                        window.open("/daniel-oriazowan-cv.pdf", "_blank");
                                    }}
                                    className="px-8 py-4 glass border-2 border-primary/30 rounded-full font-semibold text-lg hover:border-primary/50 text-white"
                                >
                                    <Download className="w-5 h-5 inline-block mr-2" />
                                    Download CV
                                </MagneticButton>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center text-muted-foreground"
                >
                    <p className="text-sm">
                        © {new Date().getFullYear()} Daniel Oriazowan. All rights reserved.
                    </p>
                </motion.footer>
            </div>
        </section>
    );
}
