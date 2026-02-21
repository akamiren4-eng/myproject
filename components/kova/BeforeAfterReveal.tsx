'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { MoveHorizontal } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Mini bar chart                                                      */
/* ------------------------------------------------------------------ */
function BarChart({
  data,
  variant,
}: {
  data: number[];
  variant: 'decline' | 'growth';
}) {
  const barColor =
    variant === 'decline'
      ? 'bg-red-500/50'
      : 'bg-emerald-400/50';
  const barHover =
    variant === 'decline'
      ? 'group-hover:bg-red-500/70'
      : 'group-hover:bg-emerald-400/70';

  return (
    <div className="flex items-end gap-[6px] w-full h-full group">
      {data.map((h, i) => (
        <div
          key={i}
          className={`flex-1 rounded-[3px] transition-all duration-500 ${barColor} ${barHover}`}
          style={{ height: `${h}%`, transitionDelay: `${i * 40}ms` }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stat row                                                            */
/* ------------------------------------------------------------------ */
function Stat({
  label,
  value,
  variant,
}: {
  label: string;
  value: string;
  variant: 'bad' | 'good';
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-mono text-xs text-kova-silver/70 uppercase tracking-wider">
        {label}
      </span>
      <span
        className={`font-mono text-sm font-bold ${
          variant === 'bad' ? 'text-red-400' : 'text-emerald-400'
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dashboard panel (one half)                                          */
/* ------------------------------------------------------------------ */
function DashboardPanel({
  side,
}: {
  side: 'before' | 'after';
}) {
  const isBefore = side === 'before';

  const bars = isBefore
    ? [68, 52, 58, 42, 48, 32, 38, 25, 30, 18]
    : [18, 28, 38, 48, 55, 62, 72, 80, 90, 100];

  const stats = isBefore
    ? [
        { label: 'CTR', value: '-12%' },
        { label: 'ROAS', value: '1.2x' },
        { label: 'CAC', value: '$4,200' },
        { label: 'Conv Rate', value: '0.8%' },
      ]
    : [
        { label: 'CTR', value: '+284%' },
        { label: 'ROAS', value: '4.1x' },
        { label: 'CAC', value: '-67%' },
        { label: 'Conv Rate', value: '3.2%' },
      ];

  return (
    <div
      className={`w-full h-full ${
        isBefore ? 'bg-kova-obsidian' : 'bg-kova-carbon'
      } p-6 md:p-8 lg:p-10 flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div
          className={`font-mono text-[0.6875rem] tracking-[0.2em] uppercase font-semibold ${
            isBefore ? 'text-red-400/80' : 'text-emerald-400/80'
          }`}
        >
          {isBefore ? 'BEFORE KOVA' : 'AFTER KOVA'}
        </div>
        <div
          className={`w-2 h-2 rounded-full ${
            isBefore ? 'bg-red-400/60' : 'bg-emerald-400/60'
          }`}
        />
      </div>

      {/* Big metric */}
      <div className="mb-6">
        <div
          className={`font-mono font-black leading-none ${
            isBefore ? 'text-red-400/90' : 'text-emerald-400/90'
          }`}
          style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}
        >
          {isBefore ? '1.2x' : '4.1x'}
        </div>
        <div className="font-mono text-[0.65rem] tracking-[0.15em] text-kova-silver/60 uppercase mt-1">
          {isBefore ? 'Return on Ad Spend' : 'Return on Ad Spend'}
        </div>
      </div>

      {/* Stat rows */}
      <div className="flex flex-col gap-3 mb-6">
        {stats.map((s) => (
          <Stat
            key={s.label}
            label={s.label}
            value={s.value}
            variant={isBefore ? 'bad' : 'good'}
          />
        ))}
      </div>

      {/* Separator */}
      <div
        className={`h-px w-full mb-5 ${
          isBefore ? 'bg-red-400/10' : 'bg-emerald-400/10'
        }`}
      />

      {/* Chart */}
      <div className="flex-1 min-h-0">
        <div className="font-mono text-[0.6rem] tracking-[0.15em] text-kova-silver/50 uppercase mb-3">
          Monthly Performance
        </div>
        <div className="h-[calc(100%-1.5rem)] relative">
          {/* Horizontal grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-full h-px ${
                  isBefore ? 'bg-red-400/[0.06]' : 'bg-emerald-400/[0.06]'
                }`}
              />
            ))}
          </div>
          <BarChart
            data={bars}
            variant={isBefore ? 'decline' : 'growth'}
          />
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* BeforeAfterReveal (main export)                                     */
/* ================================================================== */
export default function BeforeAfterReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const isDragging = useRef(false);
  const [ready, setReady] = useState(false);

  // Mount check
  useEffect(() => {
    setReady(true);
  }, []);

  // Hint animation on desktop
  useEffect(() => {
    if (!ready) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;

    let raf: number;
    let startTime: number | null = null;

    const run = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;

      if (elapsed < 700) {
        setPosition(50 - 30 * (elapsed / 700));
        raf = requestAnimationFrame(run);
      } else if (elapsed < 1400) {
        setPosition(20 + 30 * ((elapsed - 700) / 700));
        raf = requestAnimationFrame(run);
      } else {
        setPosition(50);
      }
    };

    const timeout = setTimeout(() => {
      raf = requestAnimationFrame(run);
    }, 1000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [ready]);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(2, Math.min(98, pct)));
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Mobile: stacked cards
  const isMobile = ready && typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches;

  if (isMobile) {
    return (
      <div className="mt-16">
        <h3
          className="font-sans font-bold text-kova-white mb-2 text-balance"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          The transformation.
        </h3>
        <p className="font-sans text-sm text-kova-silver mb-6 leading-relaxed">
          Before and after comparison.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl overflow-hidden border border-kova-border h-[340px]">
            <DashboardPanel side="before" />
          </div>
          <div className="rounded-2xl overflow-hidden border border-kova-border-md h-[340px]">
            <DashboardPanel side="after" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <h3
        className="font-sans font-bold text-kova-white mb-2 text-balance"
        style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        The transformation.
      </h3>
      <p className="font-sans text-sm text-kova-silver mb-6 leading-relaxed">
        Drag to see the before and after.
      </p>

      {/* Slider container */}
      <div
        ref={containerRef}
        className="relative w-full rounded-2xl overflow-hidden border border-kova-border select-none touch-none"
        style={{ height: 'clamp(360px, 45vw, 520px)', cursor: 'col-resize' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="slider"
        aria-label="Before and after comparison slider"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* BEFORE -- full background layer */}
        <div className="absolute inset-0">
          <DashboardPanel side="before" />
        </div>

        {/* AFTER -- clipped overlay layer */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <DashboardPanel side="after" />
        </div>

        {/* Divider line + handle */}
        <div
          className="absolute top-0 bottom-0 z-10 pointer-events-none"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
        >
          {/* Vertical line */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-kova-white/30" />

          {/* Handle circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-kova-carbon border-2 border-kova-white/40 flex items-center justify-center shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
            <MoveHorizontal size={16} className="text-kova-white" />
          </div>
        </div>
      </div>

      {/* Label */}
      <p className="font-mono text-[0.65rem] tracking-[0.1em] text-kova-ghost text-center mt-4 uppercase">
        Drag to compare
      </p>
    </div>
  );
}
