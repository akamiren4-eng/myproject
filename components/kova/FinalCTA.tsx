'use client';

import MagneticButton from './MagneticButton';
import { useInView } from '@/hooks/use-in-view';

export default function FinalCTA({ onCtaClick }: { onCtaClick: () => void }) {
  const [ref, isInView] = useInView(0.2, true);

  return (
    <section
      id="final-cta"
      className="min-h-[100dvh] relative flex items-center justify-center overflow-hidden"
    >
      {/* Breathing radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(200,200,208,0.04), transparent)',
            animation: 'breathe 10s ease-in-out infinite',
          }}
        />
      </div>

      <div ref={ref} className="relative z-10 text-center max-w-3xl mx-auto px-5 md:px-10">
        <div className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-ghost uppercase mb-8">
          READY TO SCALE?
        </div>

        <h2
          className={`font-sans font-black text-kova-white mb-6 text-glow-chrome opacity-0 ${
            isInView ? 'animate-reveal-up' : ''
          }`}
          style={{
            fontSize: 'clamp(4rem, 11vw, 10rem)',
            lineHeight: '0.88',
            letterSpacing: '-0.05em',
            animationFillMode: 'forwards',
          }}
        >
          Ready to stop
          <br />
          guessing?
        </h2>

        <p
          className={`font-sans font-light text-kova-silver text-xl max-w-xl mx-auto mb-12 opacity-0 ${
            isInView ? 'animate-fade-up' : ''
          }`}
          style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
        >
          Most brands waste 60% of their marketing budget on channels that don&apos;t convert.
          <br />
          Let&apos;s fix that — starting this week.
        </p>

        <div
          className={`opacity-0 ${isInView ? 'animate-fade-up' : ''}`}
          style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
        >
          <MagneticButton
            className="bg-kova-white text-kova-void font-mono font-bold text-lg py-5 px-14 rounded-full animate-chrome-pulse shadow-[0_0_40px_rgba(200,200,208,0.08)] hover:scale-[1.02] transition-transform duration-300 inline-block"
            onClick={onCtaClick}
            data-cursor="GO \u2192"
          >
            {'GET YOUR GROWTH PLAN \u2192'}
          </MagneticButton>

          <div className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-ghost mt-6">
            {'Free 30-min strategy call \u00B7 No commitment \u00B7 Cancel any time'}
          </div>
        </div>
      </div>
    </section>
  );
}
