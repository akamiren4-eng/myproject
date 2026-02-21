'use client';

import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
  selectedPrice: string;
}

export default function OrderModal({
  isOpen,
  onClose,
  selectedPlan,
  selectedPrice,
}: OrderModalProps) {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    contactMethod: 'email',
    budget: '',
    challenge: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    await new Promise((resolve) => setTimeout(resolve, 800));
    setFormState('success');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div
      className="fixed inset-0 bg-kova-void/92 backdrop-blur-2xl z-[100] flex items-start justify-center overflow-y-auto animate-fade-in"
      style={{ WebkitBackdropFilter: 'blur(40px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-lg mx-5 mt-[8vh] md:mt-[10vh] mb-10 glassmorphism rounded-2xl p-8 md:p-10 animate-fade-up safe-bottom"
        style={{ animationFillMode: 'forwards' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-kova-silver hover:text-kova-chrome transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {formState === 'success' ? (
          <div className="text-center py-10 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
            <div className="text-kova-chrome text-4xl mb-4">{'\u2713'}</div>
            <h3 className="font-sans font-black text-kova-white text-2xl mb-2">
              Request received.
            </h3>
            <p className="font-sans text-kova-silver mb-6">
              We&apos;ll reach out within 24 hours.
            </p>
            <span className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-white bg-kova-carbon border border-kova-border-md rounded-full px-3 py-1">
              {selectedPlan} {selectedPrice !== 'Custom' ? `\u00B7 ${selectedPrice}/mo` : ''}
            </span>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6">
              <div className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-silver uppercase mb-2">
                SELECTED PLAN:
              </div>
              <h3
                className="font-sans font-black text-kova-white mb-1"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.8rem)',
                  lineHeight: '1.05',
                  letterSpacing: '-0.02em',
                }}
              >
                {selectedPlan}
              </h3>
              <div className="font-mono text-kova-chrome">
                {selectedPrice !== 'Custom' ? `${selectedPrice}/mo` : 'Custom pricing'}
              </div>
            </div>

            <div className="h-px bg-kova-border mb-6" />

            <form
              onSubmit={handleSubmit}
              method="POST"
              action="FORMSPREE_ENDPOINT_HERE"
            >
              <input type="hidden" name="selectedPlan" value={selectedPlan} />
              <input type="hidden" name="selectedPrice" value={selectedPrice} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-silver uppercase block mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-kova-obsidian border border-kova-border rounded-xl px-4 py-3 font-sans text-sm text-kova-chrome placeholder-kova-ghost focus:outline-none focus:border-kova-border-hi transition-colors"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-silver uppercase block mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-kova-obsidian border border-kova-border rounded-xl px-4 py-3 font-sans text-sm text-kova-chrome placeholder-kova-ghost focus:outline-none focus:border-kova-border-hi transition-colors"
                    placeholder="Your Brand"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-silver uppercase block mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-kova-obsidian border border-kova-border rounded-xl px-4 py-3 font-sans text-sm text-kova-chrome placeholder-kova-ghost focus:outline-none focus:border-kova-border-hi transition-colors"
                  placeholder="you@company.com"
                />
              </div>

              <div className="mb-4">
                <label className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-silver uppercase block mb-2">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-kova-obsidian border border-kova-border rounded-xl px-4 py-3 font-sans text-sm text-kova-chrome placeholder-kova-ghost focus:outline-none focus:border-kova-border-hi transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="mb-4">
                <label className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-silver uppercase block mb-2">
                  Preferred Contact *
                </label>
                <select
                  name="contactMethod"
                  required
                  value={formData.contactMethod}
                  onChange={handleChange}
                  className="w-full bg-kova-obsidian border border-kova-border rounded-xl px-4 py-3 font-sans text-sm text-kova-chrome focus:outline-none focus:border-kova-border-hi transition-colors"
                >
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="telegram">Telegram</option>
                  <option value="phone">Phone Call</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-silver uppercase block mb-2">
                  Current Monthly Budget *
                </label>
                <select
                  name="budget"
                  required
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-kova-obsidian border border-kova-border rounded-xl px-4 py-3 font-sans text-sm text-kova-chrome focus:outline-none focus:border-kova-border-hi transition-colors"
                >
                  <option value="">Select...</option>
                  <option value="under1k">Under $1K</option>
                  <option value="1-5k">$1K - $5K</option>
                  <option value="5-20k">$5K - $20K</option>
                  <option value="20k+">$20K+</option>
                  <option value="unsure">Not sure</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] text-kova-silver uppercase block mb-2">
                  Biggest Growth Challenge *
                </label>
                <textarea
                  name="challenge"
                  required
                  rows={3}
                  value={formData.challenge}
                  onChange={handleChange}
                  className="w-full bg-kova-obsidian border border-kova-border rounded-xl px-4 py-3 font-sans text-sm text-kova-chrome placeholder-kova-ghost focus:outline-none focus:border-kova-border-hi transition-colors resize-none"
                  placeholder="Tell us what's not working and what you want to achieve..."
                />
              </div>

              <MagneticButton
                className="w-full bg-kova-white text-kova-void font-mono font-bold py-4 rounded-xl text-base hover:shadow-[0_0_40px_rgba(200,200,208,0.08)] transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px]"
                type="submit"
              >
                {formState === 'submitting' ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  'SEND MY REQUEST \u2192'
                )}
              </MagneticButton>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
