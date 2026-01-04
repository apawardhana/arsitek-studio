"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedText from "@/components/animation/AnimatedText";
import FadeIn from "@/components/animation/FadeIn";

// Sample team data - akan diganti dengan data dari Sanity CMS
const leadership = [
    {
        name: "Andi Wijaya",
        role: "Founder & Principal Architect",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
        linkedin: "#",
    },
    {
        name: "Sarah Chen",
        role: "Design Director",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
        linkedin: "#",
    },
    {
        name: "Budi Santoso",
        role: "Technical Director",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
        linkedin: "#",
    },
    {
        name: "Maya Putri",
        role: "Interior Design Lead",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
        linkedin: "#",
    },
];

const architects = [
    {
        name: "Rizky Pratama",
        role: "Senior Architect",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    },
    {
        name: "Dewi Lestari",
        role: "Senior Architect",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    },
    {
        name: "Faisal Rahman",
        role: "Project Architect",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
    },
    {
        name: "Anita Susanti",
        role: "Project Architect",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    },
    {
        name: "Kevin Tan",
        role: "Junior Architect",
        image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80",
    },
    {
        name: "Linda Hartono",
        role: "Interior Designer",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay,
            ease: [0.25, 0.1, 0.25, 1],
        },
    }),
};

export default function TeamPage() {
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
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
                        alt="Arsitek Studio Team"
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
                        Our Team
                    </motion.span>
                    <AnimatedText
                        text="The minds behind our designs"
                        tag="h1"
                        className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-foreground-light max-w-3xl"
                        delay={0.3}
                    />
                </div>
            </section>

            {/* Leadership Section */}
            <section className="section-padding bg-background">
                <div className="container-custom">
                    <div className="mb-16">
                        <FadeIn>
                            <span className="text-accent-gold text-sm uppercase tracking-[0.2em] mb-4 block">
                                Leadership
                            </span>
                        </FadeIn>
                        <AnimatedText
                            text="Guiding our vision"
                            tag="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl font-light"
                            delay={0.1}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {leadership.map((member, index) => (
                            <motion.div
                                key={member.name}
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                custom={index * 0.1}
                                className="group"
                            >
                                <div className="relative overflow-hidden mb-6">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            width={400}
                                            height={500}
                                            className="w-full aspect-[3/4] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </motion.div>
                                    {/* LinkedIn Overlay */}
                                    <motion.a
                                        href={member.linkedin}
                                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                        aria-label={`${member.name} LinkedIn`}
                                        whileHover={{ backgroundColor: "rgba(0,0,0,0.7)" }}
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileHover={{ scale: 1 }}
                                            className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
                                        >
                                            <svg
                                                className="w-6 h-6 text-olive"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                        </motion.div>
                                    </motion.a>
                                </div>
                                <motion.h3
                                    className="font-serif text-xl mb-1"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                >
                                    {member.name}
                                </motion.h3>
                                <motion.p
                                    className="text-foreground-muted text-sm"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.4 }}
                                >
                                    {member.role}
                                </motion.p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="section-padding bg-accent-cream">
                <div className="container-custom">
                    <div className="mb-16">
                        <FadeIn>
                            <span className="text-accent-gold text-sm uppercase tracking-[0.2em] mb-4 block">
                                Our Team
                            </span>
                        </FadeIn>
                        <AnimatedText
                            text="Talented professionals"
                            tag="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl font-light"
                            delay={0.1}
                        />
                    </div>

                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.08 } },
                        }}
                    >
                        {architects.map((member, index) => (
                            <motion.div
                                key={member.name}
                                className="group text-center"
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                                }}
                            >
                                <div className="relative overflow-hidden mb-4">
                                    <motion.div
                                        whileHover={{ scale: 1.08 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            width={200}
                                            height={250}
                                            className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </motion.div>
                                </div>
                                <h3 className="font-serif text-lg mb-1">{member.name}</h3>
                                <p className="text-foreground-muted text-xs">{member.role}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Join Us CTA */}
            <section className="section-padding bg-background-dark overflow-hidden">
                <div className="container-custom text-center">
                    <FadeIn>
                        <span className="text-accent-gold text-sm uppercase tracking-[0.2em] mb-4 block">
                            Join Our Team
                        </span>
                    </FadeIn>
                    <FadeIn delay={0.1}>
                        <AnimatedText
                            text="We're always looking for talent"
                            tag="h2"
                            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground-light mb-8"
                        />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <p className="text-foreground-muted max-w-xl mx-auto mb-10">
                            If you&apos;re passionate about architecture and design, we&apos;d
                            love to hear from you. Explore career opportunities with us.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-3 text-foreground-light text-sm uppercase tracking-wider"
                        >
                            <span className="relative">
                                View Open Positions
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
