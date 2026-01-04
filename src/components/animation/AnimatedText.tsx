'use client';

import { motion, Variants } from 'framer-motion';

interface AnimatedTextProps {
    text: string;
    className?: string;
    once?: boolean;
    delay?: number;
    staggerDelay?: number;
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
    splitBy?: 'word' | 'char';
}

const wordVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
    },
};

const charVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
    },
};

export default function AnimatedText({
    text,
    className = '',
    once = true,
    delay = 0,
    staggerDelay = 0.03,
    tag = 'h2',
    splitBy = 'word',
}: AnimatedTextProps) {
    const Tag = motion[tag];

    if (splitBy === 'word') {
        const words = text.split(' ');

        return (
            <Tag
                className={className}
                initial="hidden"
                whileInView="visible"
                viewport={{ once, amount: 0.5 }}
                transition={{ staggerChildren: staggerDelay, delayChildren: delay }}
            >
                {words.map((word, index) => (
                    <motion.span
                        key={index}
                        variants={wordVariants}
                        transition={{
                            duration: 0.5,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                        style={{ display: 'inline-block', marginRight: '0.25em' }}
                    >
                        {word}
                    </motion.span>
                ))}
            </Tag>
        );
    }

    // Split by character
    const chars = text.split('');

    return (
        <Tag
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: 0.5 }}
            transition={{ staggerChildren: staggerDelay, delayChildren: delay }}
        >
            {chars.map((char, index) => (
                <motion.span
                    key={index}
                    variants={charVariants}
                    transition={{
                        duration: 0.3,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                    style={{ display: 'inline-block' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </Tag>
    );
}

// Animated paragraph with line reveal
interface AnimatedParagraphProps {
    text: string;
    className?: string;
    delay?: number;
}

export function AnimatedParagraph({
    text,
    className = '',
    delay = 0,
}: AnimatedParagraphProps) {
    return (
        <motion.p
            className={className}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            {text}
        </motion.p>
    );
}
