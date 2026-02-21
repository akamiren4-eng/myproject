'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { NAV_LINKS } from '@/lib/content';

export default function Nav({ onCtaClick }: { onCtaClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleLinkClick = (link: string) => {
    setMobileOpen(false);
    const sectionMap: Record<string, string> = {
      Work: 'work',
      Services: 'services',
      Results: 'results',
      Pricing: 'pricing',
      Contact: 'final-cta',
    };
    const el = document.getElementById(sectionMap[link] || link.toLowerCase());
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-smooth ${
          scrolled
            ? 'bg-kova-void/75 backdrop-blur-2xl border-b border-kova-border'
            : 'bg-transparent'
        }`}
        style={{ WebkitBackdropFilter: scrolled ? 'blur(40px)' : undefined }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 flex items-center justify-between h-16 md:h-20">
          {/* Left: Logo */}
          <div className="flex flex-col">
            <span className="font-sans font-black text-xl text-kova-white tracking-tight leading-none">
              KOVA
            </span>
            <span className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-silver hidden md:block">
              GROWTH MARKETING
            </span>
          </div>

          {/* Center: Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => handleLinkClick(link)}
                className="relative font-sans text-sm text-kova-silver hover:text-kova-chrome transition-colors duration-200 py-1 group"
              >
                {link}
                <span className="absolute bottom-0 left-0 h-px w-full bg-kova-chrome/40 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-spring" />
              </button>
            ))}
          </div>

          {/* Right: CTA + Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <MagneticButton
              className="hidden md:inline-flex border border-kova-border-md text-kova-chrome font-mono font-bold text-sm py-2.5 px-6 rounded-full hover:bg-kova-chrome hover:text-kova-void hover:border-transparent hover:shadow-[0_0_40px_rgba(200,200,208,0.08)] transition-all duration-300"
              onClick={onCtaClick}
              data-cursor="GO &rarr;"
            >
              {'START GROWING \u2192'}
            </MagneticButton>

            <button
              className="md:hidden text-kova-chrome p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-kova-void/98 backdrop-blur-2xl flex flex-col justify-center px-8 safe-top safe-bottom"
          style={{ WebkitBackdropFilter: 'blur(40px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setMobileOpen(false); }}
        >
          <div className="flex flex-col gap-6">
            {NAV_LINKS.map((link, i) => (
              <button
                key={link}
                onClick={() => handleLinkClick(link)}
                className="font-sans font-black text-kova-white text-left opacity-0 animate-fade-up"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                  lineHeight: '0.96',
                  letterSpacing: '-0.03em',
                  animationDelay: `${i * 60}ms`,
                  animationFillMode: 'forwards',
                }}
              >
                {link}
              </button>
            ))}
          </div>
          <button
            onClick={() => { setMobileOpen(false); onCtaClick(); }}
            className="mt-auto mb-8 w-full bg-kova-white text-kova-void font-mono font-bold py-4 rounded-full text-base"
          >
            {'START GROWING \u2192'}
          </button>
        </div>
      )}
    </>
  );
}
