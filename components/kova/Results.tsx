'use client';

import SectionLabel from './SectionLabel';
import AnimatedCounter from './AnimatedCounter';
import { useInView } from '@/hooks/use-in-view';
import { RESULTS_METRICS } from '@/lib/content';

function ResultCard({
  label,
  value,
  prefix,
  suffix,
  bar,
  description,
  index,
}: {
  label: string;
  value: number;
  prefix: string;
  suffix: string;
  bar: number;
  description: string;
  index: number;
}) {
  const [ref, isInView] = useInView(0.12, true);

  return (
    <div
      ref={ref}
      className={`glassmorphism rounded-2xl p-6 md:p-8 border border-kova-border hover:border-kova-border-md hover:shadow-[0_32px_80px_rgba(0,0,0,0.6)] transition-all duration-300 opacity-0 ${
        isInView ? 'animate-fade-up' : ''
      }`}
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      <div className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-silver uppercase mb-4">
        {label}
      </div>
      <div className="flex items-baseline gap-1 mb-4">
        {prefix && (
          <span className="font-mono text-2xl text-kova-silver">{prefix}</span>
        )}
        <AnimatedCounter
          target={value}
          decimals={value % 1 !== 0 ? 1 : 0}
          className="font-mono font-black text-kova-white"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            lineHeight: '0.96',
            letterSpacing: '-0.03em',
          }}
          delay={index * 100}
        />
        {suffix && (
          <span className="font-mono text-2xl text-kova-silver">{suffix}</span>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-px bg-kova-border rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-kova-chrome rounded-full transition-all duration-[2000ms] ease-spring"
          style={{ width: isInView ? `${bar}%` : '0%' }}
        />
      </div>

      <p className="font-sans text-sm text-kova-silver leading-relaxed">{description}</p>
    </div>
  );
}

export default function Results() {
  return (
    <section id="results" className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <SectionLabel number="03" label="PROOF" />
        <h2
          className="font-sans font-black text-kova-white mb-4"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            lineHeight: '0.96',
            letterSpacing: '-0.03em',
          }}
        >
          Numbers don&apos;t lie.
        </h2>
        <p className="font-sans font-light text-kova-chrome mb-12 max-w-lg"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.8rem)',
            lineHeight: '1.05',
            letterSpacing: '-0.02em',
          }}
        >
          Tracked, verified, and averaged across 127 client accounts.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {RESULTS_METRICS.map((metric, i) => (
            <ResultCard key={metric.label} {...metric} index={i} />
          ))}
        </div>

        <p className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-ghost text-center mt-6">
          Measured across 127 client accounts, 2022-2026. Results vary by industry, channel, and ad spend.
        </p>
      </div>
    </section>
  );
}
