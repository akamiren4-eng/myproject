'use client';

import { useRef, useState, useEffect } from 'react';
import SectionLabel from './SectionLabel';
import BeforeAfterReveal from './BeforeAfterReveal';
import { useInView } from '@/hooks/use-in-view';
import { CASE_STUDIES } from '@/lib/content';

function CaseCard({
  brand,
  industry,
  mainMetric,
  mainMetricLabel,
  secondaryMetrics,
  timeline,
}: {
  brand: string;
  industry: string;
  mainMetric: string;
  mainMetricLabel: string;
  secondaryMetrics: { value: string; label: string }[];
  timeline: string;
}) {
  return (
    <div
      className="min-w-[340px] md:min-w-[420px] glassmorphism rounded-2xl p-6 md:p-8 border border-kova-border hover:border-kova-border-md hover:scale-[1.01] hover:shadow-[0_32px_80px_rgba(0,0,0,0.6)] transition-all duration-300 ease-spring snap-start flex-shrink-0"
      data-cursor="VIEW \u2192"
    >
      <div className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-silver uppercase mb-2">
        {industry}
      </div>
      <h3
        className="font-sans font-bold text-kova-chrome mb-4"
        style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.8rem)',
          lineHeight: '1.05',
          letterSpacing: '-0.02em',
        }}
      >
        {brand}
      </h3>
      <div className="border-t border-kova-border pt-4 mb-4">
        <div
          className="font-mono font-black text-kova-white mb-1"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            lineHeight: '0.96',
            letterSpacing: '-0.03em',
          }}
        >
          {mainMetric}
        </div>
        <div className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-silver">
          {mainMetricLabel}
        </div>
      </div>
      <div className="border-t border-kova-border pt-4 flex gap-6">
        {secondaryMetrics.map((m) => (
          <div key={m.label}>
            <div className="font-mono font-bold text-kova-white text-sm">{m.value}</div>
            <div className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-silver">
              {m.label}
            </div>
          </div>
        ))}
        <div>
          <div className="font-mono font-bold text-kova-white text-sm">{timeline}</div>
          <div className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-silver">
            Timeline
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const progress = scrollWidth > clientWidth
        ? scrollLeft / (scrollWidth - clientWidth)
        : 0;
      setScrollProgress(progress);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const [ref, isInView] = useInView();

  return (
    <section id="work" className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <SectionLabel number="04" label="WORK" />
        <h2
          ref={ref}
          className={`font-sans font-black text-kova-white mb-12 opacity-0 ${isInView ? 'animate-fade-up' : ''}`}
          style={{
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            lineHeight: '0.96',
            letterSpacing: '-0.03em',
            animationFillMode: 'forwards',
          }}
        >
          Results that speak.
        </h2>
      </div>

      {/* Horizontal scroll cases */}
      <div className="marquee-fade">
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide pb-4 px-5 md:px-10 lg:px-16"
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
        >
          <div className="flex gap-4 md:gap-5">
            {CASE_STUDIES.map((cs) => (
              <CaseCard key={cs.id} {...cs} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll progress */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 mt-4">
        <div className="h-px bg-kova-border rounded-full">
          <div
            className="h-full bg-kova-chrome rounded-full transition-all duration-100"
            style={{ width: `${Math.max(scrollProgress * 100, 2)}%` }}
          />
        </div>
      </div>

      {/* Before / After */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <BeforeAfterReveal />
      </div>
    </section>
  );
}
