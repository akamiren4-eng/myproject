'use client';

import { useState, useMemo } from 'react';
import SectionLabel from './SectionLabel';
import { useInView } from '@/hooks/use-in-view';
import { INDUSTRY_MULTIPLIERS } from '@/lib/content';

const INDUSTRIES = ['E-Commerce', 'SaaS', 'Retail', 'B2B', 'Health', 'Other'];

export default function ROICalculator({ onCtaClick }: { onCtaClick: () => void }) {
  const [monthlySpend, setMonthlySpend] = useState(10000);
  const [currentROAS, setCurrentROAS] = useState(2.0);
  const [industry, setIndustry] = useState('E-Commerce');
  const [ref, isInView] = useInView();

  const results = useMemo(() => {
    const multiplier = INDUSTRY_MULTIPLIERS[industry] || 1.05;
    const projectedROAS = currentROAS * 3.4 * multiplier;
    const currentRevenue = monthlySpend * currentROAS;
    const projectedRevenue = monthlySpend * projectedROAS;
    const monthlyUplift = projectedRevenue - currentRevenue;
    const annualUplift = monthlyUplift * 12;
    const roasImprovement = projectedROAS - currentROAS;
    const roi = ((projectedRevenue - monthlySpend) / monthlySpend) * 100;
    const dollarReturn = projectedRevenue / monthlySpend;

    return {
      projectedROAS: projectedROAS.toFixed(1),
      roasImprovement: roasImprovement.toFixed(1),
      monthlyRevenue: Math.round(projectedRevenue).toLocaleString('en-US'),
      currentRevenue: Math.round(currentRevenue).toLocaleString('en-US'),
      annualUplift: Math.round(annualUplift).toLocaleString('en-US'),
      roi: Math.round(roi).toLocaleString('en-US'),
      dollarReturn: dollarReturn.toFixed(1),
    };
  }, [monthlySpend, currentROAS, industry]);

  return (
    <section id="calculator" className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <SectionLabel number="05" label="CALCULATOR" />
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
          What could KOVA do for you?
        </h2>
        <p
          className="font-sans font-light text-kova-chrome mb-16"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.8rem)',
            lineHeight: '1.05',
            letterSpacing: '-0.02em',
          }}
        >
          Enter your numbers. See your potential.
        </p>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left: Inputs */}
          <div className="lg:w-1/2 space-y-10">
            {/* Monthly Ad Spend */}
            <div>
              <label className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-silver uppercase block mb-4">
                MONTHLY AD SPEND
              </label>
              <div
                className="font-mono font-black text-kova-white mb-4"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.8rem)',
                  lineHeight: '1.05',
                  letterSpacing: '-0.02em',
                }}
              >
                ${monthlySpend.toLocaleString('en-US')}
              </div>
              <input
                type="range"
                min={500}
                max={100000}
                step={500}
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full"
                data-cursor="EDIT \u2192"
                aria-label="Monthly ad spend slider"
              />
              <div className="flex justify-between font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-ghost mt-2">
                <span>$500</span>
                <span>$100,000</span>
              </div>
            </div>

            {/* Current ROAS */}
            <div>
              <label className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-silver uppercase block mb-4">
                CURRENT ROAS
              </label>
              <div
                className="font-mono font-black text-kova-white mb-4"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.8rem)',
                  lineHeight: '1.05',
                  letterSpacing: '-0.02em',
                }}
              >
                {currentROAS.toFixed(1)}x
              </div>
              <input
                type="range"
                min={0.5}
                max={10}
                step={0.1}
                value={currentROAS}
                onChange={(e) => setCurrentROAS(Number(e.target.value))}
                className="w-full"
                data-cursor="EDIT \u2192"
                aria-label="Current ROAS slider"
              />
              <div className="flex justify-between font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-ghost mt-2">
                <span>0.5x</span>
                <span>10x</span>
              </div>
            </div>

            {/* Industry */}
            <div>
              <label className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-silver uppercase block mb-4">
                INDUSTRY
              </label>
              <div className="flex flex-wrap gap-3">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setIndustry(ind)}
                    className={`border rounded-full font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] px-4 py-2 transition-all duration-200 min-h-[44px] ${
                      industry === ind
                        ? 'bg-kova-chrome text-kova-void border-transparent'
                        : 'border-kova-border text-kova-silver hover:border-kova-border-md'
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Results panel */}
          <div className="lg:w-1/2">
            <div className="glassmorphism rounded-2xl p-6 md:p-8 lg:p-10 border border-kova-border">
              <div className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-silver uppercase mb-8">
                PROJECTED RESULTS WITH KOVA
              </div>

              <div className="space-y-6">
                <div className="border-b border-kova-border pb-6">
                  <div className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-silver mb-1">
                    Projected ROAS
                  </div>
                  <div className="font-mono font-bold text-kova-white text-2xl">
                    {results.projectedROAS}x
                  </div>
                  <div className="font-mono text-sm text-kova-chrome mt-1">
                    {'\u2191'} {results.roasImprovement}x improvement
                  </div>
                </div>

                <div className="border-b border-kova-border pb-6">
                  <div className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-silver mb-1">
                    Monthly Revenue Impact
                  </div>
                  <div className="font-mono font-bold text-kova-white text-2xl">
                    ${results.monthlyRevenue}
                  </div>
                  <div className="font-mono text-sm text-kova-silver mt-1">
                    vs your current ${results.currentRevenue}
                  </div>
                </div>

                <div className="border-b border-kova-border pb-6">
                  <div className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-silver mb-1">
                    Annual Revenue Uplift
                  </div>
                  <div className="font-mono font-bold text-kova-white text-2xl">
                    ${results.annualUplift}
                  </div>
                  <div className="font-mono text-sm text-kova-silver mt-1">
                    Based on KOVA avg 340% ROAS improvement
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-silver mb-1">
                    Estimated ROI (12mo)
                  </div>
                  <div className="font-mono font-bold text-kova-white text-2xl">
                    {results.roi}%
                  </div>
                  <div className="font-mono text-sm text-kova-silver mt-1">
                    Every $1 spent returns ${results.dollarReturn}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-kova-border">
                <div className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-ghost mb-4">
                  Based on 127 client average. Not a guarantee.
                </div>
              </div>

              <button
                onClick={onCtaClick}
                className="w-full border border-kova-border-hi text-kova-chrome font-mono font-bold py-3 px-8 rounded-full hover:bg-kova-chrome hover:text-kova-void transition-all duration-300 min-h-[44px]"
              >
                {'READY TO SEE REAL NUMBERS? \u2192'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
