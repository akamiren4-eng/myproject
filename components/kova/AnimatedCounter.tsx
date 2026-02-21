'use client';

import { useEffect, useRef, useState } from 'react';
import { easeOutExpo } from '@/lib/helpers';
import { useInView } from '@/hooks/use-in-view';

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Animated counter with easeOutExpo easing.
 * Uses RAF loop with useRef for frame tracking.
 */
export default function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 2200,
  decimals = 0,
  delay = 0,
  className = '',
  style,
}: AnimatedCounterProps) {
  const [ref, isInView] = useInView(0.12, true);
  const [displayValue, setDisplayValue] = useState('0');
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutExpo(progress);
        const currentValue = eased * target;

        setDisplayValue(currentValue.toFixed(decimals));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayValue(target.toFixed(decimals));
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, target, duration, decimals, delay]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}
