"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedText from "@/components/animation/AnimatedText";

interface Project {
    id: string;
    title: string;
    category: string;
    sector: string;
    location: string | null;
    year: number | null;
    coverImage: string;
    slug: string;
}

interface ProjectsContentProps {
    initialProjects: Project[];
}

const categories = [
    { id: "all", label: "All" },
    { id: "ARCHITECTURE", label: "Architecture" },
    { id: "INTERIOR", label: "Interior" },
    { id: "LANDSCAPE", label: "Landscape" },
    { id: "ENGINEERING", label: "Engineering" },
];

const sectors = [
    { id: "all", label: "All Sectors" },
    { id: "RESIDENTIAL", label: "Residential" },
    { id: "COMMERCIAL", label: "Commercial" },
    { id: "CORPORATE", label: "Corporate" },
    { id: "HOSPITALITY", label: "Hospitality" },
    { id: "INDUSTRIAL", label: "Industrial" },
    { id: "GOVERNMENT", label: "Government" },
];

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            delay,
            ease: [0.25, 0.1, 0.25, 1] as any,
        },
    }),
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.3 },
    },
};

export default function ProjectsContent({ initialProjects }: ProjectsContentProps) {
    const [activeCategory, setActiveCategory] = useState("all");
    const [activeSector, setActiveSector] = useState("all");

    const filteredProjects = initialProjects.filter((project) => {
        const categoryMatch =
            activeCategory === "all" || project.category.toUpperCase() === activeCategory;
        const sectorMatch =
            activeSector === "all" || project.sector.toUpperCase() === activeSector;
        return categoryMatch && sectorMatch;
    });

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute inset-0"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80"
                        alt="Architecture Projects"
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
                        Our Work
                    </motion.span>
                    <AnimatedText
                        text="Explore our portfolio"
                        tag="h1"
                        className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-foreground-light max-w-3xl"
                        delay={0.3}
                    />
                </div>
            </section>

            {/* Filters */}
            <section className="py-8 lg:py-12 bg-background border-b border-border sticky top-20 lg:top-24 z-40">
                <div className="container-custom">
                    {/* Category Tabs */}
                    <motion.div
                        className="flex flex-wrap items-center gap-4 lg:gap-8 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        {categories.map((category) => (
                            <motion.button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`relative text-sm uppercase tracking-widest transition-colors pb-2 ${activeCategory === category.id
                                    ? "text-foreground"
                                    : "text-foreground-muted hover:text-foreground"
                                    }`}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {category.label}
                                <motion.span
                                    className="absolute bottom-0 left-0 h-[2px] bg-accent-gold"
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: activeCategory === category.id ? "100%" : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.button>
                        ))}
                    </motion.div>

                    {/* Sector Dropdown */}
                    <motion.div
                        className="flex items-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <span className="text-foreground-muted text-sm">Filter by sector:</span>
                        <select
                            value={activeSector}
                            onChange={(e) => setActiveSector(e.target.value)}
                            className="bg-transparent border border-border px-4 py-2 text-sm focus:outline-none focus:border-accent-gold transition-colors"
                        >
                            {sectors.map((sector) => (
                                <option key={sector.id} value={sector.id}>
                                    {sector.label}
                                </option>
                            ))}
                        </select>
                    </motion.div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="section-padding bg-background">
                <div className="container-custom">
                    {filteredProjects.length === 0 ? (
                        <motion.div
                            className="text-center py-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <p className="text-foreground-muted text-lg">
                                No projects found matching your criteria.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
                            layout
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        custom={index * 0.1}
                                        layout
                                    >
                                        <Link
                                            href={`/projects/${project.slug}`}
                                            className="block group"
                                        >
                                            <div className="relative overflow-hidden aspect-[4/3]">
                                                <motion.div
                                                    className="relative w-full h-full"
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                                                >
                                                    <Image
                                                        src={project.coverImage}
                                                        alt={project.title}
                                                        fill
                                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                                    />
                                                </motion.div>

                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                                    <span className="text-accent-gold text-xs uppercase tracking-[0.2em] mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                        {project.category}
                                                    </span>
                                                    <h3 className="font-serif text-2xl md:text-3xl text-foreground-light mb-1">
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-foreground-light/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                                                        {project.location} {project.year ? `• ${project.year}` : ""}
                                                    </p>
                                                </div>

                                                <motion.div
                                                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
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
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </section>
        </>
    );
}
