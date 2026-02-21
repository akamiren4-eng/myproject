'use client';

import React from 'react';
import { Lock, BarChart2, RefreshCw, Zap } from 'lucide-react';
import SectionLabel from './SectionLabel';
import { useInView } from '@/hooks/use-in-view';
import { TESTIMONIALS, TRUST_SIGNALS, LOGO_ROW_1, LOGO_ROW_2 } from '@/lib/content';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Lock, BarChart2, RefreshCw, Zap,
};

const AVATAR_GRADIENTS: Record<string, string> = {
  J: 'linear-gradient(135deg, rgba(200,200,208,0.15), rgba(200,200,208,0.05))',
  S: 'linear-gradient(135deg, rgba(200,200,208,0.10), rgba(200,200,208,0.02))',
  D: 'linear-gradient(135deg, rgba(200,200,208,0.20), rgba(200,200,208,0.08))',
};

function LogoMarquee({
  items,
  direction,
}: {
  items: string[];
  direction: 'left' | 'right';
}) {
  const content = items.join('   ');
  return (
    <div className="marquee-fade overflow-hidden">
      <div
        className={`flex whitespace-nowrap ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
        style={{ animationDuration: direction === 'left' ? '25s' : '30s' }}
      >
        {[0, 1].map((k) => (
          <span
            key={k}
            className="font-sans font-bold text-xl text-kova-ghost/40 tracking-widest uppercase hover:[&>span]:text-kova-silver/70 px-8"
          >
            {items.map((item) => (
              <span key={`${k}-${item}`} className="transition-colors duration-300 mx-8">
                {item}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

const SocialProof = React.memo(function SocialProof() {
  const [ref, isInView] = useInView();

  return (
    <section id="clients" className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <SectionLabel number="08" label="CLIENTS" />
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
          Trusted by brands that
        </h2>
        <p
          className="font-sans font-light text-kova-chrome mb-16"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.8rem)',
            lineHeight: '1.05',
            letterSpacing: '-0.02em',
          }}
        >
          refuse to stay small.
        </p>
      </div>

      {/* Logo marquees */}
      <div className="space-y-4 mb-20">
        <LogoMarquee items={LOGO_ROW_1} direction="left" />
        <LogoMarquee items={LOGO_ROW_2} direction="right" />
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>

        {/* Trust signals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TRUST_SIGNALS.map((signal, i) => {
            const IconComponent = ICON_MAP[signal.icon];
            return (
              <div
                key={signal.title}
                className="rounded-xl border border-kova-border p-5 hover:border-kova-border-md transition-all duration-200"
              >
                {IconComponent && <IconComponent size={20} className="text-kova-silver mb-3" />}
                <div className="font-sans font-bold text-kova-chrome text-sm mb-1">
                  {signal.title}
                </div>
                <div className="font-sans text-xs text-kova-silver">
                  {signal.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: typeof TESTIMONIALS[number];
  index: number;
}) {
  const [ref, isInView] = useInView(0.12, true);

  return (
    <div
      ref={ref}
      className={`glassmorphism rounded-2xl p-6 md:p-8 border border-kova-border hover:border-kova-border-md hover:shadow-[0_24px_64px_rgba(0,0,0,0.5)] transition-all duration-300 opacity-0 ${
        isInView ? 'animate-fade-up' : ''
      }`}
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
      data-cursor="READ \u2192"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full border border-kova-border-md flex items-center justify-center"
            style={{ background: AVATAR_GRADIENTS[testimonial.initial] || AVATAR_GRADIENTS.J }}
          >
            <span className="font-mono font-bold text-kova-chrome text-lg">
              {testimonial.initial}
            </span>
          </div>
          <div>
            <div className="font-sans font-bold text-kova-chrome text-sm">
              {testimonial.name}
            </div>
            <div className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-silver">
              {testimonial.title}, {testimonial.company}
            </div>
          </div>
        </div>
        <div className="text-kova-chrome text-sm tracking-wider">
          {'★★★★★'}
        </div>
      </div>

      {/* Quote */}
      <p className="font-sans text-sm text-kova-silver leading-relaxed mb-4">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="border-t border-kova-border pt-4">
        <span className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-white bg-kova-carbon border border-kova-border-md rounded-full px-3 py-1">
          {testimonial.resultBadge}
        </span>
      </div>
    </div>
  );
}

export default SocialProof;
