"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedText from "@/components/animation/AnimatedText";
import FadeIn from "@/components/animation/FadeIn";

interface ContactContentProps {
    initialSettings: any;
}

export default function ContactContent({ initialSettings }: ContactContentProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const contactInfo = {
        email: initialSettings?.email || "hello@arsitekstudio.com",
        phone: initialSettings?.phone || "+62 889 7349 3507",
        address: initialSettings?.address || "Jl. Sudirman No. 123\nJakarta Selatan, 12190\nIndonesia",
        instagram: initialSettings?.instagram || "#",
        linkedin: initialSettings?.linkedin || "#",
        facebook: initialSettings?.facebook || "#",
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Send to our local API to save in database
            const dbPromise = fetch("/api/submissions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            // Send to Web3Forms for email notification
            const web3Promise = fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    access_key: "6607bed0-601c-486e-9412-6fdcab2c2893",
                    subject: `[Arsitek Studio] New Contact: ${formData.subject}`,
                    from_name: formData.name,
                    email: formData.email,
                    phone: formData.phone || "Not provided",
                    project_type: formData.subject,
                    message: formData.message,
                }),
            });

            const [dbResponse, web3Response] = await Promise.all([dbPromise, web3Promise]);
            const web3Result = await web3Response.json();

            if (web3Result.success || dbResponse.ok) {
                setIsSubmitted(true);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                });
            } else {
                throw new Error("Failed to send message");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Gagal mengirim pesan. Silakan coba lagi atau hubungi langsung via email.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const socialLinks = [
        { label: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z", url: contactInfo.instagram },
        { label: "LinkedIn", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", url: contactInfo.linkedin },
        { label: "Facebook", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z", url: contactInfo.facebook },
    ];

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
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
                        alt="Contact Us"
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
                        Get in Touch
                    </motion.span>
                    <AnimatedText
                        text="Let's create something extraordinary"
                        tag="h1"
                        className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-foreground-light max-w-3xl"
                        delay={0.3}
                    />
                </div>
            </section>

            {/* Contact Content */}
            <section className="section-padding bg-background">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        {/* Contact Form */}
                        <FadeIn direction="right">
                            <h2 className="font-serif text-3xl md:text-4xl font-light mb-8">
                                Send us a message
                            </h2>

                            <AnimatePresence mode="wait">
                                {isSubmitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="bg-accent-cream p-8 text-center"
                                    >
                                        <motion.svg
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                            className="w-16 h-16 text-accent-gold mx-auto mb-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </motion.svg>
                                        <h3 className="font-serif text-2xl mb-2">Thank you!</h3>
                                        <p className="text-foreground-muted">
                                            We&apos;ve received your message and will get back to you shortly.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        onSubmit={handleSubmit}
                                        className="space-y-8"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <motion.div
                                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            <div className="relative">
                                                <motion.input
                                                    type="text"
                                                    name="name"
                                                    placeholder="Your Name *"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="form-input"
                                                    whileFocus={{ scale: 1.01 }}
                                                />
                                            </div>
                                            <div>
                                                <motion.input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email Address *"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="form-input"
                                                    whileFocus={{ scale: 1.01 }}
                                                />
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <div>
                                                <motion.input
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="Phone Number"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="form-input"
                                                    whileFocus={{ scale: 1.01 }}
                                                />
                                            </div>
                                            <div>
                                                <motion.select
                                                    name="subject"
                                                    required
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    className="form-input cursor-pointer"
                                                    whileFocus={{ scale: 1.01 }}
                                                >
                                                    <option value="">Project Type *</option>
                                                    <option value="architecture">Architecture</option>
                                                    <option value="interior">Interior Design</option>
                                                    <option value="landscape">Landscape</option>
                                                    <option value="engineering">Engineering</option>
                                                    <option value="other">Other</option>
                                                </motion.select>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <motion.textarea
                                                name="message"
                                                placeholder="Tell us about your project *"
                                                required
                                                rows={5}
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="form-input resize-none"
                                                whileFocus={{ scale: 1.01 }}
                                            />
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <motion.button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-background-dark text-white text-sm uppercase tracking-wider overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <svg
                                                            className="animate-spin w-4 h-4"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <circle
                                                                className="opacity-25"
                                                                cx="12"
                                                                cy="12"
                                                                r="10"
                                                                stroke="currentColor"
                                                                strokeWidth="4"
                                                            />
                                                            <path
                                                                className="opacity-75"
                                                                fill="currentColor"
                                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                            />
                                                        </svg>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Message
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
                                                    </>
                                                )}
                                            </motion.button>
                                        </motion.div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </FadeIn>

                        {/* Contact Info */}
                        <FadeIn direction="left" delay={0.2}>
                            <h2 className="font-serif text-3xl md:text-4xl font-light mb-8">
                                Contact Information
                            </h2>

                            <motion.div
                                className="space-y-8"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={{
                                    hidden: {},
                                    visible: { transition: { staggerChildren: 0.1 } },
                                }}
                            >
                                {[
                                    {
                                        title: "Office",
                                        content: (
                                            <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                                                {contactInfo.address}
                                            </p>
                                        ),
                                    },
                                    {
                                        title: "Email",
                                        content: (
                                            <motion.a
                                                href={`mailto:${contactInfo.email}`}
                                                className="text-foreground hover:text-accent-gold transition-colors inline-block"
                                                whileHover={{ x: 5 }}
                                            >
                                                {contactInfo.email}
                                            </motion.a>
                                        ),
                                    },
                                    {
                                        title: "Phone",
                                        content: (
                                            <motion.a
                                                href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                                                className="text-foreground hover:text-accent-gold transition-colors inline-block"
                                                whileHover={{ x: 5 }}
                                            >
                                                {contactInfo.phone}
                                            </motion.a>
                                        ),
                                    },
                                    {
                                        title: "Working Hours",
                                        content: (
                                            <p className="text-foreground">
                                                Monday - Friday: 9:00 AM - 6:00 PM
                                                <br />
                                                Saturday: 9:00 AM - 1:00 PM
                                            </p>
                                        ),
                                    },
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        variants={{
                                            hidden: { opacity: 0, x: 20 },
                                            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                                        }}
                                    >
                                        <h3 className="text-accent-gold text-sm uppercase tracking-widest mb-3">
                                            {item.title}
                                        </h3>
                                        {item.content}
                                    </motion.div>
                                ))}

                                {/* Social Links */}
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, x: 20 },
                                        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                                    }}
                                >
                                    <h3 className="text-accent-gold text-sm uppercase tracking-widest mb-3">
                                        Follow Us
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        {socialLinks.map((social) => (
                                            <motion.a
                                                key={social.label}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-accent-gold hover:text-accent-gold transition-colors"
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
                                </motion.div>
                            </motion.div>
                        </FadeIn>
                    </div>
                </div>
            </section>
        </>
    );
}
