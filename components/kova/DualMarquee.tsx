'use client';

import { MARQUEE_ROW_1, MARQUEE_ROW_2 } from '@/lib/content';

function MarqueeRow({
  items,
  direction,
  speed,
  className,
}: {
  items: readonly string[];
  direction: 'left' | 'right';
  speed: string;
  className: string;
}) {
  const content = items.join(' \u00B7 ');

  return (
    <div
      className="marquee-fade overflow-hidden group"
      style={{ willChange: 'transform' }}
    >
      <div
        className={`flex whitespace-nowrap ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        } group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: speed }}
      >
        <span className={`${className} px-4`}>
          {content} {' \u00B7 '} {content} {' \u00B7 '}
        </span>
        <span className={`${className} px-4`}>
          {content} {' \u00B7 '} {content} {' \u00B7 '}
        </span>
      </div>
    </div>
  );
}

export default function DualMarquee() {
  return (
    <section className="py-5 border-y border-kova-border bg-kova-obsidian/50">
      <div className="flex flex-col gap-3">
        <MarqueeRow
          items={MARQUEE_ROW_1}
          direction="left"
          speed="35s"
          className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-silver"
        />
        <MarqueeRow
          items={MARQUEE_ROW_2}
          direction="right"
          speed="40s"
          className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-ghost uppercase"
        />
      </div>
    </section>
  );
}
