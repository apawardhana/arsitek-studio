"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedText from "@/components/animation/AnimatedText";
import FadeIn from "@/components/animation/FadeIn";

// Sample projects data - akan diganti dengan data dari Sanity CMS
const allProjects = [
    {
        id: 1,
        title: "Harmony Residence",
        category: "architecture",
        sector: "residential",
        location: "Jakarta, Indonesia",
        year: 2023,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        slug: "harmony-residence",
    },
    {
        id: 2,
        title: "Urban Oasis Tower",
        category: "architecture",
        sector: "commercial",
        location: "Surabaya, Indonesia",
        year: 2023,
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
        slug: "urban-oasis-tower",
    },
    {
        id: 3,
        title: "Serene Villa",
        category: "interior",
        sector: "residential",
        location: "Bali, Indonesia",
        year: 2022,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
        slug: "serene-villa",
    },
    {
        id: 4,
        title: "Green Corporate HQ",
        category: "engineering",
        sector: "corporate",
        location: "Bandung, Indonesia",
        year: 2023,
        image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80",
        slug: "green-corporate-hq",
    },
    {
        id: 5,
        title: "Minimalist Beach House",
        category: "architecture",
        sector: "residential",
        location: "Bali, Indonesia",
        year: 2022,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        slug: "minimalist-beach-house",
    },
    {
        id: 6,
        title: "Modern Office Complex",
        category: "architecture",
        sector: "commercial",
        location: "Jakarta, Indonesia",
        year: 2021,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
        slug: "modern-office-complex",
    },
    {
        id: 7,
        title: "Luxury Penthouse",
        category: "interior",
        sector: "residential",
        location: "Singapore",
        year: 2023,
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
        slug: "luxury-penthouse",
    },
    {
        id: 8,
        title: "Eco Resort",
        category: "landscape",
        sector: "hospitality",
        location: "Lombok, Indonesia",
        year: 2022,
        image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
        slug: "eco-resort",
    },
    {
        id: 9,
        title: "Embassy Building",
        category: "architecture",
        sector: "government",
        location: "Jakarta, Indonesia",
        year: 2021,
        image: "https://images.unsplash.com/photo-1554435493-93422e8220c8?w=800&q=80",
        slug: "embassy-building",
    },
    {
        id: 10,
        title: "Industrial Warehouse",
        category: "engineering",
        sector: "industrial",
        location: "Cikarang, Indonesia",
        year: 2023,
        image: "https://images.unsplash.com/photo-1565610222536-ef125c59da2e?w=800&q=80",
        slug: "industrial-warehouse",
    },
];

const categories = [
    { id: "all", label: "All" },
    { id: "architecture", label: "Architecture" },
    { id: "interior", label: "Interior" },
    { id: "landscape", label: "Landscape" },
    { id: "engineering", label: "Engineering" },
];

const sectors = [
    { id: "all", label: "All Sectors" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
    { id: "corporate", label: "Corporate" },
    { id: "hospitality", label: "Hospitality" },
    { id: "industrial", label: "Industrial" },
    { id: "government", label: "Government" },
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
            ease: [0.25, 0.1, 0.25, 1],
        },
    }),
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.3 },
    },
};

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [activeSector, setActiveSector] = useState("all");

    const filteredProjects = allProjects.filter((project) => {
        const categoryMatch =
            activeCategory === "all" || project.category === activeCategory;
        const sectorMatch =
            activeSector === "all" || project.sector === activeSector;
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
                        {categories.map((category, index) => (
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
                                {/* Animated underline */}
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
                                                    <span className="text-accent-gold text-xs uppercase tracking-[0.2em] mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                        {project.category}
                                                    </span>
                                                    <h3 className="font-serif text-2xl md:text-3xl text-foreground-light mb-1">
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-foreground-light/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                                                        {project.location} • {project.year}
                                                    </p>
                                                </div>

                                                {/* View Button */}
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
