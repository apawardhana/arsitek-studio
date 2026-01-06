"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedText from "@/components/animation/AnimatedText";
import FadeIn from "@/components/animation/FadeIn";
import CountUp from "@/components/animation/CountUp";
import AnimatedLine from "@/components/animation/AnimatedLine";

interface AboutContentProps {
    initialSettings: any;
}

export default function AboutContent({ initialSettings }: AboutContentProps) {
    const stats = [
        { number: initialSettings?.yearsExperience || 25, suffix: "+", label: "Years Experience" },
        { number: initialSettings?.projectsCompleted || 500, suffix: "+", label: "Projects Completed" },
        { number: initialSettings?.awards || 50, suffix: "+", label: "Design Awards" },
        { number: initialSettings?.teamSize || 100, suffix: "+", label: "Team Members" },
    ];

    const philosophyPoints = [
        {
            number: "01",
            title: "Human-Centered Design",
            description:
                "Every space we create is designed with people in mind, ensuring comfort, functionality, and emotional connection.",
        },
        {
            number: "02",
            title: "Sustainable Innovation",
            description:
                "We integrate sustainable practices and innovative technologies to create buildings that respect our environment.",
        },
        {
            number: "03",
            title: "Timeless Aesthetics",
            description:
                "Our designs transcend trends, creating spaces that remain beautiful and relevant for generations.",
        },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-end overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] as any }}
                    className="absolute inset-0"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80"
                        alt="Arsitek Studio Office"
                        fill
                        priority
                        className="object-cover"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="container-custom relative z-10 pb-16 lg:pb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-accent-gold text-sm uppercase tracking-[0.2em] mb-4 block"
                    >
                        About Us
                    </motion.span>
                    <AnimatedText
                        text={initialSettings?.tagline || "Crafting architectural excellence since 1999"}
                        tag="h1"
                        className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-foreground-light max-w-4xl"
                        delay={0.3}
                    />
                </div>
            </section>

            {/* Story Section */}
            <section className="section-padding bg-background">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        <div>
                            <FadeIn>
                                <span className="text-accent-gold text-sm uppercase tracking-[0.2em] mb-4 block">
                                    Our Story
                                </span>
                            </FadeIn>
                            <AnimatedText
                                text="A legacy of innovation and design excellence"
                                tag="h2"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-8"
                                delay={0.1}
                            />
                            <FadeIn delay={0.2}>
                                <div className="space-y-6 text-foreground-muted leading-relaxed whitespace-pre-wrap">
                                    {initialSettings?.story || (
                                        <>
                                            <p>
                                                Founded in 1999 by a group of visionary architects, Arsitek
                                                Studio has grown from a small design practice into one of
                                                Indonesia&apos;s most respected architectural firms.
                                            </p>
                                            <p>
                                                Our journey began with a simple belief: that great
                                                architecture has the power to transform lives. This principle
                                                continues to guide every project we undertake, from intimate
                                                residential spaces to landmark commercial developments.
                                            </p>
                                        </>
                                    )}
                                </div>
                            </FadeIn>
                            <FadeIn delay={0.3}>
                                <Link
                                    href="/projects"
                                    className="group inline-flex items-center gap-2 mt-8 text-olive text-sm uppercase tracking-wider"
                                >
                                    <span className="relative">
                                        View Our Work
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
                        <FadeIn direction="left" delay={0.2}>
                            <motion.div
                                className="relative overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Image
                                    src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"
                                    alt="Arsitek Studio Work"
                                    width={600}
                                    height={800}
                                    className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </motion.div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 lg:py-24 bg-accent-cream relative overflow-hidden">
                <div className="container-custom relative z-10">
                    <motion.div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.15 } },
                        }}
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="text-center relative"
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                                }}
                            >
                                {index !== 0 && (
                                    <motion.div
                                        className="absolute left-0 top-1/4 h-1/2 w-px bg-olive/20 hidden lg:block"
                                        initial={{ scaleY: 0 }}
                                        whileInView={{ scaleY: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                    />
                                )}
                                <CountUp
                                    target={stat.number}
                                    suffix={stat.suffix}
                                    delay={index * 0.15}
                                    className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-olive block mb-2"
                                />
                                <span className="text-foreground-muted text-sm uppercase tracking-widest">
                                    {stat.label}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="section-padding bg-background-dark">
                <div className="container-custom">
                    <div className="max-w-3xl mb-16">
                        <FadeIn>
                            <span className="text-accent-gold text-sm uppercase tracking-[0.2em] mb-4 block">
                                Our Philosophy
                            </span>
                        </FadeIn>
                        <AnimatedText
                            text="Design that matters"
                            tag="h2"
                            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground-light"
                            delay={0.1}
                        />
                    </div>

                    <div className="space-y-0">
                        {initialSettings?.philosophy ? (
                            <FadeIn delay={0.2}>
                                <p className="text-foreground-muted text-lg leading-relaxed whitespace-pre-wrap max-w-4xl">
                                    {initialSettings.philosophy}
                                </p>
                            </FadeIn>
                        ) : (
                            philosophyPoints.map((point, index) => (
                                <motion.div
                                    key={point.number}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="group"
                                >
                                    {index === 0 && (
                                        <AnimatedLine
                                            className="w-full"
                                            color="rgba(255, 255, 255, 0.1)"
                                            delay={0.2}
                                        />
                                    )}
                                    <div className="numbered-item border-border-dark hover:bg-white/5 transition-colors px-4 -mx-4">
                                        <motion.span
                                            className="numbered-item-number text-foreground-muted group-hover:text-accent-gold transition-colors"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                                        >
                                            {point.number}
                                        </motion.span>
                                        <div className="numbered-item-content flex-1">
                                            <h3 className="font-serif text-2xl md:text-3xl font-light text-foreground-light group-hover:text-accent-gold transition-colors">
                                                {point.title}
                                            </h3>
                                            <p className="text-foreground-muted mt-2 max-w-xl">
                                                {point.description}
                                            </p>
                                        </div>
                                    </div>
                                    <AnimatedLine
                                        className="w-full"
                                        color="rgba(255, 255, 255, 0.1)"
                                        delay={index * 0.1 + 0.3}
                                    />
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="section-padding bg-background">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                        <FadeIn>
                            <span className="text-accent-gold text-sm uppercase tracking-[0.2em] mb-4 block">
                                Vision
                            </span>
                            <h3 className="font-serif text-3xl md:text-4xl font-light mb-6">
                                {initialSettings?.vision || "To be the leading architectural practice in Southeast Asia"}
                            </h3>
                            <p className="text-foreground-muted leading-relaxed">
                                {initialSettings?.vision_description || "We envision a future where our designs set the standard for sustainable, human-centered architecture across the region and beyond."}
                            </p>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <span className="text-accent-gold text-sm uppercase tracking-[0.2em] mb-4 block">
                                Mission
                            </span>
                            <h3 className="font-serif text-3xl md:text-4xl font-light mb-6">
                                {initialSettings?.mission || "Creating spaces that inspire and transform"}
                            </h3>
                            <p className="text-foreground-muted leading-relaxed">
                                {initialSettings?.mission_description || "Through innovative design, sustainable practices, and collaborative partnerships, we create architectural solutions that enhance the quality of life for all who experience our spaces."}
                            </p>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-background-olive overflow-hidden">
                <div className="container-custom text-center">
                    <FadeIn>
                        <AnimatedText
                            text="Ready to start your project?"
                            tag="h2"
                            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground-light mb-8"
                        />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <p className="text-foreground-light/70 max-w-xl mx-auto mb-10">
                            Let&apos;s discuss how we can bring your architectural vision to
                            life.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-3 text-foreground-light text-sm uppercase tracking-wider"
                        >
                            <span className="relative">
                                Get in Touch
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
