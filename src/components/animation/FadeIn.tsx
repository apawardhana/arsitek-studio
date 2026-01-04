'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface FadeInProps {
    children: ReactNode;
    direction?: Direction;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
    amount?: number;
}

const getVariants = (direction: Direction, distance: number = 40): Variants => {
    const directions: Record<Direction, { x?: number; y?: number }> = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
        none: {},
    };

    return {
        hidden: {
            opacity: 0,
            ...directions[direction],
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
        },
    };
};

export default function FadeIn({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    className = '',
    once = true,
    amount = 0.2,
}: FadeInProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            variants={getVariants(direction)}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1], // Smooth ease-out
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Stagger container for multiple children
interface StaggerContainerProps {
    children: ReactNode;
    staggerDelay?: number;
    className?: string;
    once?: boolean;
}

export function StaggerContainer({
    children,
    staggerDelay = 0.1,
    className = '',
    once = true,
}: StaggerContainerProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: 0.2 }}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Stagger item (use inside StaggerContainer)
interface StaggerItemProps {
    children: ReactNode;
    direction?: Direction;
    className?: string;
}

export function StaggerItem({
    children,
    direction = 'up',
    className = '',
}: StaggerItemProps) {
    return (
        <motion.div
            variants={getVariants(direction)}
            transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
