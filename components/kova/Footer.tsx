'use client';

import { useState } from 'react';
import MagneticButton from './MagneticButton';

const SERVICE_LINKS = ['Performance', 'Brand', 'Content', 'Analytics'];
const COMPANY_LINKS = ['About', 'Work', 'Process', 'Pricing', 'Contact'];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  const handleLinkClick = (link: string) => {
    const sectionMap: Record<string, string> = {
      Work: 'work',
      Services: 'services',
      Performance: 'services',
      Brand: 'services',
      Content: 'services',
      Analytics: 'services',
      Process: 'process',
      Pricing: 'pricing',
      Contact: 'final-cta',
      Results: 'results',
    };
    const el = document.getElementById(sectionMap[link] || link.toLowerCase());
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-kova-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="font-sans font-black text-2xl text-kova-white mb-2">KOVA</div>
            <p className="font-sans text-kova-silver text-sm mb-6">
              &ldquo;We build machines.&rdquo;
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Instagram', 'YouTube'].map((social) => (
                <MagneticButton
                  key={social}
                  as="a"
                  href="#"
                  className="text-kova-ghost hover:text-kova-chrome transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  ariaLabel={social}
                >
                  <span className="font-mono text-xs">{social.slice(0, 2).toUpperCase()}</span>
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* Email capture */}
          <div>
            <div className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-silver uppercase mb-2">
              STAY IN THE LOOP
            </div>
            <p className="font-sans text-xs text-kova-ghost mb-4">
              Growth insights and case studies. No fluff.
            </p>

            {subscribed ? (
              <div className="font-mono text-sm text-kova-chrome">
                {'\u2713'} You&apos;re in.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-kova-obsidian border border-kova-border rounded-full px-5 py-3 font-mono text-sm text-kova-chrome placeholder-kova-ghost focus:outline-none focus:border-kova-border-hi transition-colors min-w-0"
                />
                <button
                  type="submit"
                  className="bg-kova-chrome text-kova-void rounded-full px-5 py-3 font-mono font-bold text-sm whitespace-nowrap hover:bg-kova-white transition-colors min-h-[44px]"
                >
                  {'SUBSCRIBE \u2192'}
                </button>
              </form>
            )}
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-silver uppercase mb-4">
                Services
              </div>
              {SERVICE_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => handleLinkClick(link)}
                  className="font-sans text-sm text-kova-ghost hover:text-kova-silver transition-colors mb-2 min-h-[44px] flex items-center"
                >
                  {link}
                </button>
              ))}
            </div>
            <div>
              <div className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-silver uppercase mb-4">
                Company
              </div>
              {COMPANY_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => handleLinkClick(link)}
                  className="font-sans text-sm text-kova-ghost hover:text-kova-silver transition-colors mb-2 min-h-[44px] flex items-center"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-kova-border mt-12 pt-6 flex flex-wrap justify-between items-center gap-4">
          <span className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-ghost/50">
            {'\u00A9'} 2026 KOVA Growth Marketing.
          </span>
          <div className="flex gap-6">
            <a href="#" className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-ghost/50 hover:text-kova-ghost transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-ghost/50 hover:text-kova-ghost transition-colors">
              Terms
            </a>
          </div>
        </div>

        <div className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-ghost/25 mt-4 text-center">
          Built with unreasonable attention to your results.
        </div>
      </div>
    </footer>
  );
}
