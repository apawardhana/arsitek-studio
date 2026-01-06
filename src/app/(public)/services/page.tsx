"use client";

import { motion } from "framer-motion";
import AnimatedText from "@/components/animation/AnimatedText";
import FadeIn from "@/components/animation/FadeIn";
import AnimatedLine from "@/components/animation/AnimatedLine";
import Link from "next/link";

const services = [
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

export default function ServicesPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="section-padding bg-background pt-32 lg:pt-40">
                <div className="container-custom">
                    <div className="max-w-4xl">
                        <FadeIn>
                            <span className="text-accent-gold text-sm uppercase tracking-[0.2em] mb-6 block">
                                What We Do
                            </span>
                        </FadeIn>
                        <AnimatedText
                            text="Crafting spaces that inspire and endure"
                            tag="h1"
                            className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight"
                            delay={0.1}
                        />
                    </div>
                </div>
            </section>

            {/* Services List Section */}
            <section className="section-padding bg-background pt-8 lg:pt-12">
                <div className="container-custom">
                    <div className="max-w-4xl">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.number}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group"
                            >
                                {index === 0 && (
                                    <AnimatedLine
                                        className="w-full"
                                        color="var(--border)"
                                        delay={0.2}
                                    />
                                )}
                                <div className="numbered-item hover:bg-accent-cream/30 transition-colors px-4 -mx-4">
                                    <motion.span
                                        className="numbered-item-number text-foreground-muted group-hover:text-accent-gold transition-colors min-w-[3rem]"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                                    >
                                        {service.number}
                                    </motion.span>
                                    <div className="numbered-item-content flex-1">
                                        <h3 className="font-serif text-xl md:text-2xl font-light text-foreground group-hover:text-accent-gold transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-foreground-muted mt-2 max-w-xl leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                                <AnimatedLine
                                    className="w-full"
                                    color="var(--border)"
                                    delay={index * 0.1 + 0.3}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-background-olive overflow-hidden">
                <div className="container-custom text-center">
                    <FadeIn>
                        <AnimatedText
                            text="Let's bring your vision to life"
                            tag="h2"
                            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground-light mb-8"
                        />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <p className="text-foreground-light/70 max-w-xl mx-auto mb-10">
                            Whether it&apos;s architecture, interior design, landscape, or engineering,
                            our team is ready to transform your ideas into reality.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-3 text-foreground-light text-sm uppercase tracking-wider"
                        >
                            <span className="relative">
                                Start Your Project
                                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-gold group-hover:w-full transition-all duration-400" />
                            </span>
                            <svg
                                className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </Link>
                    </FadeIn>
                </div>
            </section>
        </>
    );
}
