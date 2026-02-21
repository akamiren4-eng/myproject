import { useEffect, useRef, useState } from 'react';

/**
 * IntersectionObserver hook for scroll-triggered animations.
 * Returns a ref and a boolean indicating visibility.
 * @param threshold - Visibility threshold (0-1), default 0.12
 * @param triggerOnce - Only trigger once, default true
 */
export function useInView(threshold = 0.12, triggerOnce = true) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) observer.unobserve(el);
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return [ref, isInView] as const;
}
