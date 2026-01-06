"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Sample project data - akan diganti dengan data dari Sanity CMS
const heroProjects = [
    {
        id: 1,
        title: "Harmony Residence",
        category: "Architecture",
        location: "Jakarta, Indonesia",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
        slug: "harmony-residence",
    },
    {
        id: 2,
        title: "Urban Oasis Tower",
        category: "Commercial",
        location: "Surabaya, Indonesia",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
        slug: "urban-oasis-tower",
    },
    {
        id: 3,
        title: "Serene Villa",
        category: "Interior",
        location: "Bali, Indonesia",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
        slug: "serene-villa",
    },
    {
        id: 4,
        title: "Green Corporate HQ",
        category: "Engineering",
        location: "Bandung, Indonesia",
        image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1920&q=80",
        slug: "green-corporate-hq",
    },
];

// Animation variants
const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            delay,
            ease: [0.25, 0.1, 0.25, 1] as any,
        },
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
};

const titleWordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
    },
};

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % heroProjects.length);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + heroProjects.length) % heroProjects.length);
    }, []);

    const goToSlide = (index: number) => {
        if (index === currentSlide) return;
        setDirection(index > currentSlide ? 1 : -1);
        setCurrentSlide(index);
    };

    // Auto-play
    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const currentProject = heroProjects[currentSlide];
    const nextProject = heroProjects[(currentSlide + 1) % heroProjects.length];

    // Split title into words for stagger animation
    const titleWords = currentProject.title.split(" ");

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background Images with AnimatePresence */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as any }}
                    className="absolute inset-0"
                >
                    <Image
                        src={currentProject.image}
                        alt={currentProject.title}
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end pb-20 lg:pb-32">
                <div className="container-custom">
                    <div className="max-w-4xl">
                        <AnimatePresence mode="wait">
                            <motion.div key={currentSlide}>
                                {/* Category Badge */}
                                <motion.span
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    custom={0}
                                    className="inline-block text-xs uppercase tracking-[0.2em] text-accent-gold mb-4"
                                >
                                    {currentProject.category}
                                </motion.span>

                                {/* Title with word stagger */}
                                <motion.h1
                                    className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-foreground-light mb-4 overflow-hidden"
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
                                >
                                    {titleWords.map((word, index) => (
                                        <motion.span
                                            key={index}
                                            variants={titleWordVariants}
                                            transition={{
                                                duration: 0.6,
                                                ease: [0.25, 0.1, 0.25, 1] as any,
                                            }}
                                            className="inline-block mr-[0.25em]"
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                </motion.h1>

                                {/* Location */}
                                <motion.p
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    custom={0.3}
                                    className="text-foreground-light/70 text-lg mb-8"
                                >
                                    {currentProject.location}
                                </motion.p>

                                {/* View Project Button */}
                                <motion.div
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    custom={0.4}
                                >
                                    <Link
                                        href={`/projects/${currentProject.slug}`}
                                        className="group inline-flex items-center gap-3 text-foreground-light text-sm uppercase tracking-wider"
                                    >
                                        <span className="relative">
                                            View Project
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
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Carousel Controls - Bottom Right */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-20 lg:bottom-32 right-6 lg:right-12 flex items-center gap-4"
            >
                {/* Slide Counter */}
                <div className="hidden md:flex items-center gap-2 text-foreground-light/70 text-sm">
                    <span className="text-foreground-light font-medium">
                        {String(currentSlide + 1).padStart(2, "0")}
                    </span>
                    <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="w-8 h-[1px] bg-foreground-light/50 origin-left"
                    />
                    <span>{String(heroProjects.length).padStart(2, "0")}</span>
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center gap-2">
                    <motion.button
                        onClick={prevSlide}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 rounded-full border border-foreground-light/30 flex items-center justify-center text-foreground-light hover:bg-foreground-light/10 transition-all"
                        aria-label="Previous slide"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </motion.button>
                    <motion.button
                        onClick={nextSlide}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 rounded-full border border-foreground-light/30 flex items-center justify-center text-foreground-light hover:bg-foreground-light/10 transition-all"
                        aria-label="Next slide"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </motion.button>
                </div>

                {/* Next Project Thumbnail */}
                <div className="hidden lg:block">
                    <motion.button
                        onClick={nextSlide}
                        whileHover={{ scale: 1.05 }}
                        className="relative w-24 h-16 rounded-lg overflow-hidden border-2 border-foreground-light/30 hover:border-accent-gold transition-colors group"
                    >
                        <Image
                            src={nextProject.image}
                            alt={nextProject.title}
                            fill
                            className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                            sizes="96px"
                        />
                    </motion.button>
                </div>
            </motion.div>

            {/* Slide Indicators - Bottom Center */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
            >
                {heroProjects.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-1 rounded-full transition-all duration-500 ${index === currentSlide
                            ? "w-8 bg-accent-gold"
                            : "w-4 bg-foreground-light/30 hover:bg-foreground-light/50"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute bottom-8 left-6 lg:left-12 hidden md:flex flex-col items-center gap-2"
            >
                <span className="text-foreground-light/50 text-xs uppercase tracking-widest rotate-90 origin-center translate-x-6">
                    Scroll
                </span>
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="w-px h-16 bg-gradient-to-b from-foreground-light/50 to-transparent origin-top"
                />
            </motion.div>
        </section>
    );
}
