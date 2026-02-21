'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionLabel from './SectionLabel';
import MagneticButton from './MagneticButton';
import { useInView } from '@/hooks/use-in-view';
import { PRICING_TIERS } from '@/lib/content';
import type { PricingTier } from '@/lib/types';

function PricingCard({
  tier,
  isAnnual,
  index,
  onOrder,
}: {
  tier: PricingTier;
  isAnnual: boolean;
  index: number;
  onOrder: (tierName: string, price: string) => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ref, isInView] = useInView(0.12, true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const price = tier.price === 'custom'
    ? 'Custom'
    : isAnnual && tier.annualPrice
      ? `$${tier.annualPrice.toLocaleString('en-US')}`
      : `$${(tier.price as number).toLocaleString('en-US')}`;

  const priceLabel = tier.price === 'custom' ? 'Contact us' : '/mo';

  const handleOrder = () => {
    onOrder(tier.name, price);
  };

  // Mobile: accordion pattern
  if (isMobile) {
    return (
      <div
        ref={ref}
        className={`glassmorphism rounded-2xl p-6 border transition-all duration-300 opacity-0 ${
          isInView ? 'animate-fade-up' : ''
        } ${tier.isPopular ? 'border-kova-chrome/30' : 'border-kova-border'}`}
        style={{
          animationDelay: `${index * 80}ms`,
          animationFillMode: 'forwards',
          order: tier.isPopular ? -1 : index,
        }}
        data-cursor="SELECT \u2192"
      >
        {tier.isPopular && (
          <div className="text-center mb-4">
            <span className="bg-kova-chrome text-kova-void font-mono font-bold text-[0.6875rem] leading-[1.4] tracking-[0.18em] px-4 py-1 rounded-full">
              MOST POPULAR
            </span>
          </div>
        )}

        <div className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-silver uppercase mb-2">
          {tier.name}
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="font-mono font-black text-kova-white text-2xl">{price}</span>
          <span className="font-mono text-kova-silver text-sm">{priceLabel}</span>
        </div>
        {isAnnual && tier.price !== 'custom' && (
          <span className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-chrome">
            SAVE 20%
          </span>
        )}
        <p className="font-sans text-sm text-kova-silver mt-2 mb-4">{tier.tagline}</p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-silver hover:text-kova-chrome transition-colors mb-4 min-h-[44px]"
        >
          {expanded ? 'HIDE FEATURES' : `SEE ALL ${tier.features.length} FEATURES`}
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          />
        </button>

        {expanded && (
          <div className="space-y-2 mb-4 animate-fade-up" style={{ animationDuration: '0.3s' }}>
            {tier.features.map((f) => (
              <div key={f} className="font-sans text-xs text-kova-silver flex gap-2">
                <span className="text-kova-chrome flex-shrink-0">{'\u2713'}</span>
                {f}
              </div>
            ))}
          </div>
        )}

        <MagneticButton
          className={`w-full py-3 rounded-xl font-mono font-bold text-sm min-h-[44px] transition-all duration-300 ${
            tier.isPopular
              ? 'bg-kova-white text-kova-void hover:shadow-[0_0_40px_rgba(200,200,208,0.08)]'
              : 'border border-kova-border-md text-kova-chrome hover:bg-kova-chrome hover:text-kova-void'
          }`}
          onClick={handleOrder}
        >
          {tier.ctaLabel} {'\u2192'}
        </MagneticButton>
      </div>
    );
  }

  // Desktop: 3D flip cards
  return (
    <div
      ref={ref}
      className={`card-flip-container opacity-0 ${isInView ? 'animate-fade-up' : ''} ${
        tier.isPopular ? 'md:scale-[1.05] relative z-10' : ''
      }`}
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'forwards' }}
      data-cursor="SELECT \u2192"
    >
      {tier.isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <span className="bg-kova-chrome text-kova-void font-mono font-bold text-[0.6875rem] leading-[1.4] tracking-[0.18em] px-4 py-1 rounded-full whitespace-nowrap">
            MOST POPULAR
          </span>
        </div>
      )}

      <div className={`card-flip-inner ${flipped ? 'flipped' : ''}`} style={{ minHeight: '460px' }}>
        {/* Front face */}
        <div
          className={`card-face absolute inset-0 glassmorphism rounded-2xl p-6 md:p-8 border flex flex-col ${
            tier.isPopular ? 'border-kova-chrome/30' : 'border-kova-border'
          }`}
        >
          <div className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-accent uppercase mb-3">
            {tier.name}
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-mono font-black text-kova-white"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.8rem)', lineHeight: '1.05', letterSpacing: '-0.02em' }}
            >
              {price}
            </span>
            <span className="font-mono text-kova-silver text-sm">{priceLabel}</span>
          </div>
          {isAnnual && tier.price !== 'custom' && (
            <span className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-chrome mb-2 inline-block">
              SAVE 20%
            </span>
          )}
          <p className="font-sans text-xs text-kova-silver mb-4">{tier.tagline}</p>
          <div className="border-t border-kova-border pt-4 mb-4 space-y-2 flex-1">
            {tier.features.slice(0, 4).map((f) => (
              <div key={f} className="font-sans text-xs text-kova-silver flex gap-2">
                <span className="text-kova-chrome flex-shrink-0">{'\u2713'}</span>
                {f}
              </div>
            ))}
            {tier.features.length > 4 && (
              <div className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-ghost mt-2">
                ...and {tier.features.length - 4} more
              </div>
            )}
          </div>

          <button
            onClick={() => setFlipped(true)}
            className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-silver hover:text-kova-chrome transition-colors mb-3 min-h-[44px]"
          >
            {'SEE FULL PLAN \u21BB'}
          </button>

          <MagneticButton
            className={`w-full py-3 rounded-xl font-mono font-bold text-sm min-h-[44px] transition-all duration-300 ${
              tier.isPopular
                ? 'bg-kova-white text-kova-void hover:shadow-[0_0_40px_rgba(200,200,208,0.08)]'
                : 'border border-kova-border-md text-kova-chrome hover:bg-kova-chrome hover:text-kova-void'
            }`}
            onClick={handleOrder}
          >
            {tier.ctaLabel} {'\u2192'}
          </MagneticButton>
        </div>

        {/* Back face */}
        <div
          className={`card-face card-face-back absolute inset-0 glassmorphism rounded-2xl p-6 md:p-8 border flex flex-col overflow-y-auto ${
            tier.isPopular ? 'border-kova-chrome/30' : 'border-kova-border'
          }`}
        >
          <button
            onClick={() => setFlipped(false)}
            className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-silver hover:text-kova-chrome transition-colors mb-4 text-left min-h-[44px]"
          >
            {'\u2190 BACK'}
          </button>
          <div className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-accent uppercase mb-4">
            {tier.name}
          </div>
          <div className="space-y-2 flex-1 mb-4">
            {tier.features.map((f) => (
              <div key={f} className="font-sans text-xs text-kova-silver flex gap-2">
                <span className="text-kova-chrome flex-shrink-0">{'\u2713'}</span>
                {f}
              </div>
            ))}
          </div>
          <MagneticButton
            className={`w-full py-3 rounded-xl font-mono font-bold text-sm min-h-[44px] transition-all duration-300 ${
              tier.isPopular
                ? 'bg-kova-white text-kova-void hover:shadow-[0_0_40px_rgba(200,200,208,0.08)]'
                : 'border border-kova-border-md text-kova-chrome hover:bg-kova-chrome hover:text-kova-void'
            }`}
            onClick={handleOrder}
          >
            {tier.ctaLabel} {'\u2192'}
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}

export default function Pricing({
  onOrder,
}: {
  onOrder: (tierName: string, price: string) => void;
}) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [ref, isInView] = useInView();

  return (
    <section id="pricing" className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <SectionLabel number="07" label="PRICING" />
        <h2
          ref={ref}
          className={`font-sans font-black text-kova-white mb-4 opacity-0 ${isInView ? 'animate-fade-up' : ''}`}
          style={{
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            lineHeight: '0.96',
            letterSpacing: '-0.03em',
            animationFillMode: 'forwards',
          }}
        >
          Choose your growth tier.
        </h2>
        <p className="font-sans font-light text-kova-chrome mb-10"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.8rem)',
            lineHeight: '1.05',
            letterSpacing: '-0.02em',
          }}
        >
          Every tier includes everything below it. No hidden fees.
        </p>

        {/* Toggle */}
        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={() => setIsAnnual(false)}
            className={`font-mono text-sm py-2 px-4 rounded-full transition-all duration-200 min-h-[44px] ${
              !isAnnual ? 'bg-kova-chrome text-kova-void' : 'text-kova-silver hover:text-kova-chrome'
            }`}
          >
            MONTHLY
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`font-mono text-sm py-2 px-4 rounded-full transition-all duration-200 min-h-[44px] ${
              isAnnual ? 'bg-kova-chrome text-kova-void' : 'text-kova-silver hover:text-kova-chrome'
            }`}
          >
            ANNUAL <span className="text-xs opacity-70">(save 20%)</span>
          </button>
        </div>

        {/* Cards grid -- 1col mobile, 2col tablet, 3col desktop. 5th card spans full on md */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRICING_TIERS.map((tier, i) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              isAnnual={isAnnual}
              index={i}
              onOrder={onOrder}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
