"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Github, Linkedin, Mail, Phone, Download, Send, Power } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GlassCard } from "@/components/ui/glass-card";
import { useLoading } from "@/components/providers/loading-provider";
import { DownloadCVButton } from "@/components/cv/download-button";

export function ContactSection() {
    const [copied, setCopied] = useState(false);
    const { setGoodbye } = useLoading();
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
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[100px] rounded-full"
                />
            </div>

            <div className="container-custom relative z-10">
                <div className="mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4 block"
                    >
                        Get In Touch
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold font-display"
                    >
                        Let's build <br />
                        <span className="gradient-text">the future</span> together.
                    </motion.h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <GlassCard className="p-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold">Email</h3>
                                <div className="p-2 bg-white/5 rounded-full">
                                    <Mail className="w-5 h-5 text-primary" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <a
                                    href={`mailto:${email}`}
                                    className="text-2xl md:text-3xl font-display font-bold hover:text-primary transition-colors block break-all"
                                >
                                    {email}
                                </a>
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors group"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                                    {copied ? "Copied!" : "Copy Email"}
                                </button>
                            </div>
                        </GlassCard>

                        <div className="grid gap-6">
                            {contactMethods.map((method, _index) => (
                                <GlassCard
                                    key={method.label}
                                    className="p-6 flex items-center gap-6 group hover:border-primary/50 transition-colors cursor-pointer"
                                    onClick={() => window.open(method.href, "_blank")}
                                >
                                    <div className={`p-4 rounded-xl bg-gradient-to-br ${method.color} group-hover:scale-110 transition-transform duration-300`}>
                                        <method.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <span className="text-sm text-muted-foreground block mb-1">{method.label}</span>
                                        <span className="text-lg font-semibold group-hover:text-primary transition-colors">{method.value}</span>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>

                    {/* CTA Box */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-30" />
                        <div className="relative h-full bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col justify-between overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[80px] rounded-full pointer-events-none" />

                            <div className="space-y-6 relative z-10">
                                <h3 className="text-3xl font-bold font-display">Availability</h3>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    I am currently open to discussing new opportunities, whether it's a senior engineering role, architectural consultation, or leading a high-impact project.
                                </p>
                                <div className="flex items-center gap-3 text-green-400 bg-green-400/10 px-4 py-2 rounded-full w-fit">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                    <span className="text-sm font-medium">Available for work</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Final CTA */}
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
                                    Let's discuss how I can contribute to your success.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <MagneticButton
                                    onClick={() => window.location.href = "mailto:doriazowan@gmail.com"}
                                    className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold text-lg hover:shadow-glow transition-all duration-300"
                                >
                                    <Send className="w-5 h-5 inline-block mr-2" />
                                    Send Message
                                </MagneticButton>

                                <DownloadCVButton />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center text-muted-foreground flex flex-col items-center gap-6"
                >
                    <p className="text-sm">
                        © {new Date().getFullYear()} Daniel Oriazowan. All rights reserved.
                    </p>

                    <button
                        onClick={() => setGoodbye(true)}
                        className="flex items-center gap-2 text-[10px] text-white/20 hover:text-red-500 transition-colors uppercase tracking-[0.2em] group border border-transparent hover:border-red-500/20 px-4 py-2 rounded-full"
                    >
                        <Power className="w-3 h-3 group-hover:animate-pulse" />
                        Terminate Session
                    </button>
                </motion.footer>
            </div>
        </section>
    );
}
