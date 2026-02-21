'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  as?: 'button' | 'a';
  href?: string;
  ariaLabel?: string;
  type?: 'button' | 'submit';
  [key: string]: unknown;
}

/**
 * Magnetic button component. On pointer:fine devices,
 * the button moves toward the cursor within an 80px detection radius.
 * Uses direct DOM manipulation for performance.
 */
export default function MagneticButton({
  children,
  className = '',
  onClick,
  as = 'button',
  href,
  ariaLabel,
  type = 'button',
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isFineMouse = window.matchMedia('(pointer: fine)').matches;
    if (!isFineMouse) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 80) {
        const maxTranslate = 14;
        const factor = 1 - dist / 80;
        const x = dx * factor * (maxTranslate / 40);
        const y = dy * factor * (maxTranslate / 40);
        el.style.transform = `translate(${x}px, ${y}px)`;
      } else {
        el.style.transform = '';
      }
    };

    const handleMouseLeave = () => {
      el.style.transform = '';
    };

    el.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.style.transform = '';
    };
  }, []);

  const Tag = as as 'button' | 'a';

  return (
    <Tag
      ref={ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>}
      className={className}
      onClick={onClick}
      href={as === 'a' ? href : undefined}
      aria-label={ariaLabel}
      type={as === 'button' ? type : undefined}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </Tag>
  );
}
