"use client";

import { motion } from "framer-motion";
import CountUp from "../animation/CountUp";
import AnimatedLine from "../animation/AnimatedLine";

interface StatItem {
    number: number;
    suffix: string;
    label: string;
}

interface StatsSectionProps {
    initialStats?: StatItem[];
}

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1] as any,
        },
    },
};

export default function StatsSection({ initialStats }: StatsSectionProps) {
    const defaultStats = [
        { number: 25, suffix: "+", label: "Years of Experience" },
        { number: 500, suffix: "+", label: "Projects Completed" },
        { number: 50, suffix: "+", label: "Design Awards" },
        { number: 100, suffix: "+", label: "Team Members" },
    ];

    const stats = initialStats || defaultStats;
    return (
        <section className="py-16 lg:py-24 bg-accent-cream relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-1/2 left-0 w-full h-px bg-olive/10"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                />
            </div>

            <div className="container-custom relative z-10">
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className="text-center relative"
                            variants={itemVariants}
                        >
                            {/* Vertical divider between items */}
                            {index !== 0 && (
                                <motion.div
                                    className="absolute left-0 top-1/4 h-1/2 w-px bg-olive/20 hidden lg:block"
                                    initial={{ scaleY: 0 }}
                                    whileInView={{ scaleY: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                />
                            )}

                            {/* Number with CountUp */}
                            <CountUp
                                target={stat.number}
                                suffix={stat.suffix}
                                delay={index * 0.15}
                                className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-olive block mb-2"
                            />

                            {/* Label */}
                            <motion.span
                                className="text-foreground-muted text-sm uppercase tracking-widest block"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                            >
                                {stat.label}
                            </motion.span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
