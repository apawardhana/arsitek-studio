"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import MobileMenu from "./MobileMenu";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/projects", label: "Project" },
    { href: "/team", label: "Team" },
    { href: "/contact", label: "Contact Us" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
                    : "bg-transparent"
                    }`}
            >
                <div className="container-custom">
                    <nav className="flex items-center justify-between h-20 lg:h-24">
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <Link href="/" className="flex items-center gap-2 group">
                                <span className="font-serif text-2xl lg:text-3xl font-light tracking-wide">
                                    ARSITEK
                                </span>
                                <span className="text-accent-gold font-serif text-2xl lg:text-3xl group-hover:scale-125 transition-transform duration-300">.</span>
                            </Link>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-10">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.2 + index * 0.05,
                                        ease: [0.25, 0.1, 0.25, 1],
                                    }}
                                >
                                    <Link
                                        href={item.href}
                                        className={`relative py-2 text-sm uppercase tracking-wider transition-colors duration-300 group ${pathname === item.href
                                            ? "text-foreground"
                                            : "text-foreground/60 hover:text-foreground"
                                            }`}
                                    >
                                        {item.label}
                                        {/* Animated underline */}
                                        <span
                                            className={`absolute bottom-0 left-0 h-[1px] bg-accent-gold transition-all duration-400 ease-out ${pathname === item.href
                                                ? "w-full"
                                                : "w-0 group-hover:w-full"
                                                }`}
                                        />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Button - Desktop */}
                        <motion.div
                            className="hidden lg:block"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Link
                                href="/contact"
                                className="group relative inline-flex items-center gap-2 px-6 py-3 border border-olive text-olive text-sm uppercase tracking-wider overflow-hidden transition-colors duration-500 hover:text-foreground-light"
                            >
                                {/* Background fill animation */}
                                <span className="absolute inset-0 bg-olive transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                                <span className="relative z-10">Start a Project</span>
                                <svg
                                    className="relative z-10 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
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

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="lg:hidden p-2"
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Open menu"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </motion.button>
                    </nav>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                navItems={navItems}
                pathname={pathname}
            />
        </>
    );
}
