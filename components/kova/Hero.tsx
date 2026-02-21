'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useKineticType } from '@/hooks/use-kinetic-type';
import MagneticButton from './MagneticButton';
import { HERO_STATS, LIVE_NOTIFICATIONS } from '@/lib/content';
import type { LiveNotification } from '@/lib/types';

function LiveOperationsPanel() {
  const [revenue, setRevenue] = useState(2847293);
  const [notifications, setNotifications] = useState<LiveNotification[]>(
    LIVE_NOTIFICATIONS.slice(0, 4)
  );
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const notifIntervalRef = useRef<ReturnType<typeof setInterval>>();
  const notifIndex = useRef(4);
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = !window.matchMedia('(pointer: fine)').matches;
    if (isMobile.current) return;

    intervalRef.current = setInterval(() => {
      const increment = Math.floor(Math.random() * 7200) + 1200;
      setRevenue((prev) => prev + increment);
    }, 5000);

    notifIntervalRef.current = setInterval(() => {
      const idx = notifIndex.current % LIVE_NOTIFICATIONS.length;
      const newNotif = {
        ...LIVE_NOTIFICATIONS[idx],
        id: `live-${Date.now()}`,
        timestamp: 'just now',
      };
      notifIndex.current++;
      setNotifications((prev) => [newNotif, ...prev.slice(0, 3)]);
    }, 3500);

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(notifIntervalRef.current);
    };
  }, []);

  const sparkBarHeights = useRef(
    Array.from({ length: 12 }, (_, i) =>
      i === 11 ? 100 : Math.floor(Math.random() * 60) + 20
    )
  ).current;

  return (
    <div
      className="glassmorphism rounded-2xl p-6 md:p-8 border border-kova-border-md shadow-[0_24px_64px_rgba(0,0,0,0.5)] md:animate-float contain-paint"
      style={{ willChange: 'transform' }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-kova-ghost" />
            <span className="w-1.5 h-1.5 rounded-full bg-kova-silver" />
            <span className="w-1.5 h-1.5 rounded-full bg-kova-chrome" />
          </div>
          <span className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-silver">
            KOVA COMMAND CENTER
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping-soft absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-green-400">
            LIVE
          </span>
        </div>
      </div>

      {/* Large metric */}
      <div className="mb-4">
        <div className="font-mono font-black text-3xl text-kova-white">
          ${revenue.toLocaleString('en-US')}
        </div>
        <div className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-silver mt-1">
          Revenue generated this month
        </div>
      </div>

      {/* Sparkline */}
      <div className="flex items-end gap-1 h-8 mb-4">
        {sparkBarHeights.map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-kova-chrome rounded-sm opacity-0 animate-fade-up"
            style={{
              height: `${h}%`,
              opacity: 0.2 + (h / 100) * 0.4,
              animationDelay: `${600 + i * 50}ms`,
              animationFillMode: 'forwards',
            }}
          />
        ))}
      </div>

      {/* Secondary metrics */}
      <div className="flex gap-6 mb-5 pb-5 border-b border-kova-border">
        <div>
          <div className="font-mono font-bold text-kova-white">4.2x ROAS</div>
          <div className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-silver">
            This month
          </div>
        </div>
        <div>
          <div className="font-mono font-bold text-kova-white">+284% CTR</div>
          <div className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-silver">
            vs. last month
          </div>
        </div>
      </div>

      {/* Live activity feed */}
      <div className="overflow-hidden h-[88px] contain-paint">
        {notifications.slice(0, 4).map((notif, i) => (
          <div
            key={notif.id}
            className={`flex items-center gap-3 py-1 font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] ${
              i === 0 ? 'animate-notif-in' : ''
            }`}
            style={{
              transition: 'transform 0.3s ease',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-kova-chrome flex-shrink-0" />
            <span className="text-kova-silver truncate flex-shrink-0 w-28">
              {notif.brand}
            </span>
            <span className="text-kova-chrome truncate flex-1">{notif.metric}</span>
            <span className="text-kova-ghost flex-shrink-0">{notif.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero({ onCtaClick }: { onCtaClick: () => void }) {
  const kineticRef = useKineticType();

  const scrollToWork = useCallback(() => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section className="min-h-[100dvh] relative flex items-center overflow-hidden grid-bg">
      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,200,208,0.03), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 w-full pt-24 pb-16 md:pt-32 md:pb-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-between">
          {/* Left column — 58% */}
          <div className="lg:w-[58%] flex-shrink-0">
            {/* Label */}
            <div
              className="flex items-center gap-3 mb-8 opacity-0 animate-fade-up"
              style={{ animationFillMode: 'forwards' }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping-soft absolute inline-flex h-full w-full rounded-full bg-kova-chrome" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-kova-chrome" />
              </span>
              <span className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-silver uppercase">
                FULL-SERVICE GROWTH AGENCY
              </span>
            </div>

            {/* Kinetic headline */}
            <div
              ref={kineticRef}
              className="kinetic-headline opacity-0 animate-reveal-up mb-8"
              style={{
                animationDelay: '100ms',
                animationFillMode: 'forwards',
                fontSize: 'clamp(4rem, 11vw, 10rem)',
                lineHeight: '0.88',
                letterSpacing: '-0.05em',
              }}
            >
              <span className="font-sans font-black text-kova-white block">WE BUILD</span>
              <span className="font-sans font-black text-kova-white block">MACHINES.</span>
            </div>

            {/* Sub-headline */}
            <p
              className="font-sans font-light text-kova-silver max-w-lg leading-snug mb-10 opacity-0 animate-fade-up"
              style={{
                animationDelay: '200ms',
                animationFillMode: 'forwards',
                fontSize: 'clamp(1.5rem, 3vw, 2.8rem)',
                lineHeight: '1.05',
                letterSpacing: '-0.02em',
              }}
            >
              Every brand that scaled past $1M had one thing in common.
              <br />
              They stopped guessing.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4 mb-12 opacity-0 animate-fade-up"
              style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}
            >
              <MagneticButton
                className="bg-kova-white text-kova-void font-mono font-bold py-4 px-8 rounded-full hover:shadow-[0_0_40px_rgba(200,200,208,0.08)] hover:scale-[1.02] transition-all duration-300 text-center"
                onClick={onCtaClick}
                data-cursor="GO &rarr;"
              >
                {'START GROWING \u2192'}
              </MagneticButton>
              <button
                onClick={scrollToWork}
                className="border border-kova-border-md text-kova-chrome font-mono font-bold py-4 px-8 rounded-full hover:border-kova-border-hi transition-all duration-300"
              >
                {'SEE OUR WORK \u2193'}
              </button>
            </div>

            {/* Micro stats */}
            <div
              className="flex items-center gap-0 opacity-0 animate-fade-up"
              style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
            >
              {HERO_STATS.map((stat, i) => (
                <div key={stat.label} className="flex items-center">
                  {i > 0 && (
                    <div className="w-px h-10 bg-kova-border mx-6" />
                  )}
                  <div>
                    <div className="font-mono font-bold text-kova-white text-xl">
                      {stat.value}
                    </div>
                    <div className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-silver">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — 42% */}
          <div className="lg:w-[42%] w-full flex-shrink-0">
            <LiveOperationsPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
