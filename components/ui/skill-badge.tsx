"use client";

import { motion } from "framer-motion";

interface SkillBadgeProps {
    name: string;
    level?: "beginner" | "intermediate" | "expert";
    icon?: React.ReactNode;
}

export function SkillBadge({ name, level = "expert", icon }: SkillBadgeProps) {
    const levelColors = {
        beginner: "from-teal-500/20 to-emerald-600/20 border-teal-500/30",
        intermediate: "from-indigo-500/20 to-blue-600/20 border-indigo-500/30",
        expert: "from-primary/20 to-secondary/20 border-primary/30",
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -2 }}
            className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full
        bg-gradient-to-r ${levelColors[level]}
        border backdrop-blur-sm
        transition-all duration-300
        hover:shadow-lg hover:shadow-primary/20
        group
      `}
        >
            {icon && (
                <span className="text-lg group-hover:scale-110 transition-transform">
                    {icon}
                </span>
            )}
            <span className="text-sm font-medium">{name}</span>
        </motion.div>
    );
}
