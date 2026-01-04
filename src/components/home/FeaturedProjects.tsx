"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedText from "../animation/AnimatedText";
import FadeIn from "../animation/FadeIn";

// Sample featured projects - akan diganti dengan data dari Sanity CMS
const featuredProjects = [
    {
        id: 1,
        title: "Minimalist Beach House",
        category: "Architecture",
        location: "Bali, Indonesia",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        slug: "minimalist-beach-house",
    },
    {
        id: 2,
        title: "Modern Office Complex",
        category: "Commercial",
        location: "Jakarta, Indonesia",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
        slug: "modern-office-complex",
    },
    {
        id: 3,
        title: "Luxury Penthouse",
        category: "Interior",
        location: "Singapore",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
        slug: "luxury-penthouse",
    },
    {
        id: 4,
        title: "Eco Resort",
        category: "Landscape",
        location: "Lombok, Indonesia",
        image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
        slug: "eco-resort",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            delay,
            ease: [0.25, 0.1, 0.25, 1],
        },
    }),
};

export default function FeaturedProjects() {
    return (
        <section className="section-padding bg-background-dark">
            <div className="container-custom">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                    <div>
                        <FadeIn delay={0}>
                            <span className="text-accent-gold text-sm uppercase tracking-[0.2em] mb-4 block">
                                Featured Work
                            </span>
                        </FadeIn>
                        <AnimatedText
                            text="Selected Projects"
                            tag="h2"
                            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground-light"
                            delay={0.1}
                        />
                    </div>
                    <FadeIn delay={0.3} direction="left">
                        <Link
                            href="/projects"
                            className="group inline-flex items-center gap-2 text-foreground-light text-sm uppercase tracking-wider self-start md:self-auto"
                        >
                            <span className="relative">
                                View All Projects
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

                {/* Projects Grid - 2 columns layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            custom={index * 0.15}
                        >
                            <Link
                                href={`/projects/${project.slug}`}
                                className="block group"
                            >
                                {/* Image Container */}
                                <div className="relative overflow-hidden aspect-[4/3]">
                                    {/* Grayscale to Color Image */}
                                    <motion.div
                                        className="relative w-full h-full"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                                    >
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </motion.div>

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <motion.span
                                            className="text-accent-gold text-xs uppercase tracking-[0.2em] mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
                                        >
                                            {project.category}
                                        </motion.span>
                                        <h3 className="font-serif text-2xl md:text-3xl text-foreground-light mb-1">
                                            {project.title}
                                        </h3>
                                        <p className="text-foreground-light/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                                            {project.location}
                                        </p>
                                    </div>

                                    {/* View Button */}
                                    <motion.div
                                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                        initial={{ scale: 0.8, rotate: -45 }}
                                        whileHover={{ scale: 1.1, rotate: 0 }}
                                    >
                                        <div className="w-12 h-12 rounded-full bg-foreground-light flex items-center justify-center">
                                            <svg
                                                className="w-5 h-5 text-foreground"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M7 17L17 7M17 7H7M17 7v10"
                                                />
                                            </svg>
                                        </div>
                                    </motion.div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
