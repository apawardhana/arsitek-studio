"use client";

import { motion } from "framer-motion";
import AnimatedText from "../animation/AnimatedText";
import FadeIn from "../animation/FadeIn";
import AnimatedLine from "../animation/AnimatedLine";

interface Service {
    number: string;
    title: string;
    description: string;
}

interface ServicesSectionProps {
    initialServices?: Service[];
}

export default function ServicesSection({ initialServices }: ServicesSectionProps) {
    const defaultServices = [
        {
            number: "01",
            title: "Architecture",
            description:
                "Creating innovative architectural designs that blend aesthetics with functionality, from concept to completion.",
        },
        {
            number: "02",
            title: "Interior Design",
            description:
                "Transforming spaces into inspiring environments that reflect your personality and enhance daily living.",
        },
        {
            number: "03",
            title: "Landscape",
            description:
                "Designing outdoor spaces that harmonize with nature and create sustainable, beautiful environments.",
        },
        {
            number: "04",
            title: "Engineering",
            description:
                "Delivering structural and MEP engineering solutions that ensure safety, efficiency, and sustainability.",
        },
    ];

    const services = initialServices?.length ? initialServices : defaultServices;

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (delay: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay,
                ease: [0.25, 0.1, 0.25, 1] as any,
            },
        }),
    };
    return (
        <section className="section-padding bg-background">
            <div className="container-custom">
                {/* Section Header */}
                <div className="mb-16 lg:mb-24">
                    <FadeIn delay={0}>
                        <span className="text-accent-gold text-sm uppercase tracking-[0.2em] mb-4 block">
                            What We Do
                        </span>
                    </FadeIn>
                    <AnimatedText
                        text="Crafting spaces that inspire and endure"
                        tag="h2"
                        className="font-serif text-4xl md:text-5xl lg:text-6xl font-light max-w-3xl"
                        delay={0.1}
                    />
                </div>

                {/* Services List - SiteX Style Numbered List */}
                <div className="space-y-0">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.number}
                            variants={itemVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            custom={index * 0.1}
                            className="group cursor-pointer"
                        >
                            {/* Animated top line */}
                            {index === 0 && (
                                <AnimatedLine
                                    className="w-full"
                                    color="rgba(61, 61, 44, 0.2)"
                                    delay={0.2}
                                />
                            )}

                            <div className="numbered-item hover:bg-accent-cream/30 transition-colors px-4 -mx-4">
                                <motion.span
                                    className="numbered-item-number group-hover:text-accent-gold transition-colors"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                                >
                                    {service.number}
                                </motion.span>
                                <div className="numbered-item-content flex-1">
                                    <motion.h3
                                        className="font-serif text-2xl md:text-3xl font-light group-hover:text-accent-gold transition-colors"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                    >
                                        {service.title}
                                    </motion.h3>
                                    <motion.p
                                        className="text-foreground-muted mt-2 max-w-xl"
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                                    >
                                        {service.description}
                                    </motion.p>
                                </div>
                                {/* Arrow Icon */}
                                <motion.div
                                    className="hidden md:flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    whileHover={{ x: 5 }}
                                >
                                    <svg
                                        className="w-8 h-8 text-accent-gold"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </motion.div>
                            </div>

                            {/* Animated bottom line */}
                            <AnimatedLine
                                className="w-full"
                                color="rgba(61, 61, 44, 0.2)"
                                delay={index * 0.1 + 0.3}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
