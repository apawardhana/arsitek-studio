"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedText from "../animation/AnimatedText";
import FadeIn from "../animation/FadeIn";
import AnimatedLine from "../animation/AnimatedLine";

const footerLinks = {
    navigation: [
        { href: "/", label: "Home" },
        { href: "/about", label: "About Us" },
        { href: "/projects", label: "Projects" },
        { href: "/team", label: "Team" },
        { href: "/contact", label: "Contact" },
    ],
    services: [
        { href: "/projects?category=architecture", label: "Architecture" },
        { href: "/projects?category=interior", label: "Interior Design" },
        { href: "/projects?category=landscape", label: "Landscape" },
        { href: "/projects?category=engineering", label: "Engineering" },
    ],
};

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    },
};

interface FooterProps {
    initialSettings?: any;
}

export default function Footer({ initialSettings }: FooterProps) {
    const contactInfo = {
        email: initialSettings?.email || "hello@arsitekstudio.com",
        phone: initialSettings?.phone || "+62 889 7349 3507",
        address: initialSettings?.address || "Jl. Sudirman No. 123\nJakarta Selatan, 12190\nIndonesia",
    };
    return (
        <footer className="bg-background-dark text-foreground-light">
            {/* CTA Section */}
            <section className="section-padding border-b border-border-dark">
                <div className="container-custom text-center">
                    <FadeIn>
                        <AnimatedText
                            text="Re-imagine Your"
                            tag="h2"
                            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-2"
                        />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <span className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-accent-gold block mb-8">
                            Future Project
                        </span>
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <p className="text-foreground-muted max-w-xl mx-auto mb-10">
                            Let&apos;s collaborate to bring your architectural vision to life.
                            Our team is ready to transform your ideas into reality.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-3 text-foreground-light text-sm uppercase tracking-wider"
                        >
                            <span className="relative">
                                Start a Conversation
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

            {/* Footer Links */}
            <div className="section-padding">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                        {/* Brand */}
                        <FadeIn className="lg:col-span-1">
                            <Link href="/" className="inline-block mb-6 group">
                                <span className="font-serif text-3xl font-light">ARSITEK</span>
                                <span className="text-accent-gold font-serif text-3xl group-hover:scale-125 inline-block transition-transform duration-300">.</span>
                            </Link>
                            <p className="text-foreground-muted text-sm leading-relaxed mb-6">
                                Award-winning architecture and engineering firm specializing in
                                modern, sustainable design solutions.
                            </p>
                            {/* Social Links */}
                            <div className="flex items-center gap-4">
                                {[
                                    { label: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                                    { label: "LinkedIn", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
                                    { label: "Facebook", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z" },
                                ].map((social, index) => (
                                    <motion.a
                                        key={social.label}
                                        href="#"
                                        className="w-10 h-10 rounded-full border border-border-dark flex items-center justify-center hover:border-accent-gold hover:text-accent-gold transition-colors"
                                        aria-label={social.label}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d={social.icon} />
                                        </svg>
                                    </motion.a>
                                ))}
                            </div>
                        </FadeIn>

                        {/* Navigation */}
                        <FadeIn delay={0.1}>
                            <h4 className="text-sm uppercase tracking-widest mb-6">
                                Navigation
                            </h4>
                            <motion.ul
                                className="space-y-4"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {footerLinks.navigation.map((link) => (
                                    <motion.li key={link.href} variants={itemVariants}>
                                        <Link
                                            href={link.href}
                                            className="relative text-foreground-muted hover:text-foreground-light transition-colors group inline-block"
                                        >
                                            {link.label}
                                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-gold group-hover:w-full transition-all duration-300" />
                                        </Link>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </FadeIn>

                        {/* Services */}
                        <FadeIn delay={0.2}>
                            <h4 className="text-sm uppercase tracking-widest mb-6">
                                Services
                            </h4>
                            <motion.ul
                                className="space-y-4"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {footerLinks.services.map((link) => (
                                    <motion.li key={link.href} variants={itemVariants}>
                                        <Link
                                            href={link.href}
                                            className="relative text-foreground-muted hover:text-foreground-light transition-colors group inline-block"
                                        >
                                            {link.label}
                                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-gold group-hover:w-full transition-all duration-300" />
                                        </Link>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </FadeIn>

                        {/* Contact */}
                        <FadeIn delay={0.3}>
                            <h4 className="text-sm uppercase tracking-widest mb-6">
                                Contact
                            </h4>
                            <ul className="space-y-4 text-foreground-muted">
                                <li>
                                    <motion.a
                                        href={`mailto:${contactInfo.email}`}
                                        className="hover:text-foreground-light transition-colors inline-block"
                                        whileHover={{ x: 5 }}
                                    >
                                        {contactInfo.email}
                                    </motion.a>
                                </li>
                                <li>
                                    <motion.a
                                        href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                                        className="hover:text-foreground-light transition-colors inline-block"
                                        whileHover={{ x: 5 }}
                                    >
                                        {contactInfo.phone}
                                    </motion.a>
                                </li>
                                <li className="leading-relaxed whitespace-pre-wrap">
                                    {contactInfo.address}
                                </li>
                            </ul>
                        </FadeIn>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <motion.div
                className="border-t border-border-dark py-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-foreground-muted text-sm">
                        © {new Date().getFullYear()} Arsitek Studio. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-foreground-muted">
                        <Link href="/privacy" className="hover:text-foreground-light transition-colors relative group">
                            Privacy Policy
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-gold group-hover:w-full transition-all duration-300" />
                        </Link>
                        <Link href="/terms" className="hover:text-foreground-light transition-colors relative group">
                            Terms of Service
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-gold group-hover:w-full transition-all duration-300" />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </footer>
    );
}
