'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface CountUpProps {
    target: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    delay?: number;
    className?: string;
}

export default function CountUp({
    target,
    suffix = '',
    prefix = '',
    duration = 2,
    delay = 0,
    className = '',
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const [hasAnimated, setHasAnimated] = useState(false);

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        duration: duration * 1000,
        bounce: 0,
    });

    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView && !hasAnimated) {
            const timer = setTimeout(() => {
                motionValue.set(target);
                setHasAnimated(true);
            }, delay * 1000);

            return () => clearTimeout(timer);
        }
    }, [isInView, hasAnimated, motionValue, target, delay]);

    useEffect(() => {
        const unsubscribe = springValue.on('change', (latest) => {
            setDisplayValue(Math.round(latest));
        });

        return () => unsubscribe();
    }, [springValue]);

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay }}
        >
            {prefix}
            {displayValue}
            {suffix}
        </motion.span>
    );
}

// Stats item with count up animation
interface AnimatedStatProps {
    value: number;
    suffix?: string;
    label: string;
    delay?: number;
    className?: string;
}

export function AnimatedStat({
    value,
    suffix = '',
    label,
    delay = 0,
    className = '',
}: AnimatedStatProps) {
    return (
        <motion.div
            className={`text-center ${className}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <CountUp
                target={value}
                suffix={suffix}
                delay={delay + 0.3}
                className="text-5xl md:text-6xl font-serif font-semibold text-olive"
            />
            <p className="mt-2 text-olive/70 uppercase tracking-wider text-sm">{label}</p>
        </motion.div>
    );
}
