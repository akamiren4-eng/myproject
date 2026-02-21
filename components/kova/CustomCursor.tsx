'use client';

import { useEffect, useRef, useCallback } from 'react';
import { lerp } from '@/lib/helpers';

/**
 * Custom cursor — desktop only (pointer: fine).
 * Dot follows instantly, ring lags with lerp interpolation.
 * Uses refs and direct DOM manipulation — never setState for 60fps.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);
  const labelRef = useRef<HTMLSpanElement>(null);

  const updateCursor = useCallback(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.08);
    ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.08);

    dot.style.transform = `translate(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px)`;
    ring.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;

    rafId.current = requestAnimationFrame(updateCursor);
  }, []);

  useEffect(() => {
    const isFineMouse = window.matchMedia('(pointer: fine)').matches;
    if (!isFineMouse) return;

    document.documentElement.classList.add('cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const ring = ringRef.current;
      const label = labelRef.current;
      if (!ring || !label) return;

      const target = e.target as HTMLElement;
      const interactive = target.closest('button, a, [data-cursor]');

      if (interactive) {
        const cursorType = interactive.getAttribute('data-cursor');
        if (cursorType) {
          ring.style.width = '100px';
          ring.style.height = '100px';
          ring.style.marginLeft = '-30px';
          ring.style.marginTop = '-30px';
          ring.style.background = 'rgba(200,200,208,0.06)';
          label.textContent = cursorType;
          label.style.opacity = '1';
        } else {
          ring.style.width = '60px';
          ring.style.height = '60px';
          ring.style.marginLeft = '-10px';
          ring.style.marginTop = '-10px';
          ring.style.opacity = '0.6';
          label.style.opacity = '0';
        }
      } else if (target.closest('p, h1, h2, h3, h4, span, li')) {
        ring.style.width = '60px';
        ring.style.height = '60px';
        ring.style.marginLeft = '-10px';
        ring.style.marginTop = '-10px';
        ring.style.opacity = '0.3';
        label.style.opacity = '0';
      }
    };

    const handleMouseOut = () => {
      const ring = ringRef.current;
      const label = labelRef.current;
      if (!ring || !label) return;
      ring.style.width = '40px';
      ring.style.height = '40px';
      ring.style.marginLeft = '0px';
      ring.style.marginTop = '0px';
      ring.style.opacity = '1';
      ring.style.background = 'transparent';
      label.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    rafId.current = requestAnimationFrame(updateCursor);

    return () => {
      document.documentElement.classList.remove('cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [updateCursor]);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{ background: 'rgba(242,242,245,0.9)', willChange: 'transform' }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          border: '1.5px solid rgba(200,200,208,0.4)',
          willChange: 'transform',
          transition: 'width 0.3s ease, height 0.3s ease, opacity 0.3s ease, background 0.3s ease, margin 0.3s ease',
        }}
        aria-hidden="true"
      >
        <span
          ref={labelRef}
          className="font-mono text-[7px] text-kova-chrome tracking-widest"
          style={{ opacity: 0, transition: 'opacity 0.2s ease' }}
        />
      </div>
    </>
  );
}
