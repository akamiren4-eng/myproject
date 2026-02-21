import { useEffect, useRef } from 'react';
import { mapRange } from '@/lib/helpers';

/**
 * Kinetic variable font weight animation on scroll.
 * Maps scroll position to font-weight 900 -> 200 while headline is in viewport.
 * Updates CSS variable directly to avoid React re-renders.
 */
export function useKineticType() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const windowH = window.innerHeight;

        if (rect.top > windowH || rect.bottom < 0) return;

        const progress = mapRange(rect.top, windowH * 0.8, -rect.height, 0, 1);
        const weight = mapRange(progress, 0, 1, 900, 200);
        el.style.setProperty('--headline-weight', String(Math.round(weight)));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return ref;
}
