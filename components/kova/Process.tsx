'use client';

import React from 'react';
import SectionLabel from './SectionLabel';
import { useInView } from '@/hooks/use-in-view';
import { PROCESS_STEPS } from '@/lib/content';

const ProcessStepItem = React.memo(function ProcessStepItem({
  step,
  index,
  isLast,
}: {
  step: typeof PROCESS_STEPS[number];
  index: number;
  isLast: boolean;
}) {
  const [ref, isInView] = useInView(0.12, true);

  return (
    <div
      ref={ref}
      className={`relative flex gap-6 md:gap-10 opacity-0 ${isInView ? 'animate-fade-up' : ''}`}
      style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
    >
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className={`w-3 h-3 rounded-full border transition-all duration-500 ${
            isInView
              ? 'bg-kova-chrome border-kova-chrome shadow-[0_0_20px_rgba(200,200,208,0.06)]'
              : 'bg-kova-void border-kova-border-md'
          }`}
        />
        {!isLast && (
          <div className="w-px flex-1 bg-kova-border mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="pb-12 md:pb-16">
        <div className="flex items-center gap-4 mb-3 flex-wrap">
          <span className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-silver">
            {step.number}
          </span>
          <span className="font-sans font-bold text-kova-white text-lg">
            {step.title}
          </span>
          <span className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] border border-kova-border rounded-full px-2 py-0.5 text-kova-silver">
            {step.timeline}
          </span>
        </div>
        <p className="font-sans text-sm text-kova-silver leading-relaxed mb-3 max-w-md">
          {step.description}
        </p>
        <div className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-ghost">
          {'\u2192'} Output: {step.output}
        </div>
      </div>
    </div>
  );
});

export default function Process() {
  const [ref, isInView] = useInView();

  return (
    <section id="process" className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <SectionLabel number="07" label="PROCESS" />
        <h2
          ref={ref}
          className={`font-sans font-black text-kova-white mb-2 opacity-0 ${isInView ? 'animate-fade-up' : ''}`}
          style={{
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            lineHeight: '0.96',
            letterSpacing: '-0.03em',
            animationFillMode: 'forwards',
          }}
        >
          No guessing.
        </h2>
        <p
          className="font-sans font-light text-kova-chrome mb-16"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.8rem)',
            lineHeight: '1.05',
            letterSpacing: '-0.02em',
          }}
        >
          No wasted spend.
        </p>

        <div className="max-w-2xl">
          {PROCESS_STEPS.map((step, i) => (
            <ProcessStepItem
              key={step.number}
              step={step}
              index={i}
              isLast={i === PROCESS_STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
