'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import Image from 'next/image';

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    speed?: number; // Positive = slower, Negative = faster
    grayscaleHover?: boolean;
    zoomOnHover?: boolean;
    fill?: boolean;
    width?: number;
    height?: number;
    priority?: boolean;
}

export default function ParallaxImage({
    src,
    alt,
    className = '',
    speed = 0.2,
    grayscaleHover = true,
    zoomOnHover = true,
    fill = true,
    width,
    height,
    priority = false,
}: ParallaxImageProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [`${speed * -100}px`, `${speed * 100}px`]);

    return (
        <motion.div
            ref={ref}
            className={`overflow-hidden ${className}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <motion.div
                style={{ y }}
                className={`relative w-full h-full ${grayscaleHover ? 'grayscale hover:grayscale-0' : ''}`}
                whileHover={zoomOnHover ? { scale: 1.05 } : {}}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
                {fill ? (
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover transition-all duration-700"
                        priority={priority}
                    />
                ) : (
                    <Image
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        className="object-cover transition-all duration-700"
                        priority={priority}
                    />
                )}
            </motion.div>
        </motion.div>
    );
}

// Simple scale reveal image without parallax
interface ScaleRevealImageProps {
    src: string;
    alt: string;
    className?: string;
    grayscaleHover?: boolean;
    delay?: number;
}

export function ScaleRevealImage({
    src,
    alt,
    className = '',
    grayscaleHover = true,
    delay = 0,
}: ScaleRevealImageProps) {
    return (
        <motion.div
            className={`overflow-hidden ${className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <motion.div
                className={`relative w-full h-full ${grayscaleHover ? 'grayscale hover:grayscale-0' : ''}`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <Image src={src} alt={alt} fill className="object-cover transition-all duration-700" />
            </motion.div>
        </motion.div>
    );
}

// Image reveal with clip-path
interface ClipRevealImageProps {
    children: ReactNode;
    className?: string;
    direction?: 'left' | 'right' | 'up' | 'down';
}

export function ClipRevealImage({
    children,
    className = '',
    direction = 'up',
}: ClipRevealImageProps) {
    const clipPaths = {
        up: ['inset(100% 0 0 0)', 'inset(0)'],
        down: ['inset(0 0 100% 0)', 'inset(0)'],
        left: ['inset(0 100% 0 0)', 'inset(0)'],
        right: ['inset(0 0 0 100%)', 'inset(0)'],
    };

    return (
        <motion.div
            className={`overflow-hidden ${className}`}
            initial={{ clipPath: clipPaths[direction][0] }}
            whileInView={{ clipPath: clipPaths[direction][1] }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
            {children}
        </motion.div>
    );
}
