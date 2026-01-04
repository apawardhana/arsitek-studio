'use client';

import { motion } from 'framer-motion';

interface AnimatedLineProps {
    className?: string;
    color?: string;
    height?: number;
    direction?: 'left' | 'right' | 'center';
    delay?: number;
    duration?: number;
}

export default function AnimatedLine({
    className = '',
    color = 'var(--color-olive)',
    height = 1,
    direction = 'left',
    delay = 0,
    duration = 0.8,
}: AnimatedLineProps) {
    const originX = {
        left: 0,
        right: 1,
        center: 0.5,
    };

    return (
        <motion.div
            className={className}
            style={{
                height: `${height}px`,
                backgroundColor: color,
                transformOrigin: `${originX[direction] * 100}% center`,
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        />
    );
}

// Animated underline for links/text
interface AnimatedUnderlineProps {
    className?: string;
    color?: string;
}

export function AnimatedUnderline({
    className = '',
    color = 'currentColor',
}: AnimatedUnderlineProps) {
    return (
        <motion.span
            className={`absolute bottom-0 left-0 h-[1px] ${className}`}
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        />
    );
}

// Horizontal rule with expand animation
interface ExpandingHRProps {
    className?: string;
    delay?: number;
}

export function ExpandingHR({ className = '', delay = 0 }: ExpandingHRProps) {
    return (
        <motion.hr
            className={`border-0 bg-olive/20 ${className}`}
            style={{ height: '1px', transformOrigin: 'left center' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
                duration: 1,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        />
    );
}
