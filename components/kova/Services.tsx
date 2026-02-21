'use client';

import { useState } from 'react';
import {
  Target, Search, Monitor, MousePointerClick, BarChart3, RefreshCw,
  Compass, Palette, MessageSquare, Eye, BookOpen, Rocket,
  FileText, Video, PenTool, Mail, Users, Share2,
} from 'lucide-react';
import SectionLabel from './SectionLabel';
import AnimatedCounter from './AnimatedCounter';
import { useInView } from '@/hooks/use-in-view';
import { SERVICE_TABS } from '@/lib/content';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Target, Search, Monitor, MousePointerClick, BarChart3, RefreshCw,
  Compass, Palette, MessageSquare, Eye, BookOpen, Rocket,
  FileText, Video, PenTool, Mail, Users, Share2,
};

export default function Services() {
  const [activeTab, setActiveTab] = useState<'performance' | 'brand' | 'content'>('performance');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [ref, isInView] = useInView();

  const currentTab = SERVICE_TABS.find((t) => t.id === activeTab)!;

  const handleTabChange = (tabId: 'performance' | 'brand' | 'content') => {
    if (tabId === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setIsTransitioning(false);
    }, 150);
  };

  // Extract numeric value and suffix from metric string
  const metricMatch = currentTab.proof.metric.match(/([+\-]?)(\d+\.?\d*)(.*)/);
  const metricPrefix = metricMatch?.[1] || '';
  const numericValue = parseFloat(metricMatch?.[2] || '0');
  const metricSuffix = (metricMatch?.[3] || '').trim();

  return (
    <section id="services" className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <SectionLabel number="04" label="SERVICES" />
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
          Everything you need.
        </h2>
        <p
          className="font-sans font-light text-kova-chrome mb-12"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.8rem)',
            lineHeight: '1.05',
            letterSpacing: '-0.02em',
          }}
        >
          Nothing you don&apos;t.
        </p>

        {/* Tab bar */}
        <div className="relative border-b border-kova-border mb-10">
          <div className="flex">
            {SERVICE_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`font-mono text-sm py-4 px-6 transition-colors duration-200 relative min-h-[44px] ${
                  activeTab === tab.id ? 'text-kova-white' : 'text-kova-silver hover:text-kova-chrome'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-kova-chrome" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          className={`flex flex-col lg:flex-row gap-8 lg:gap-12 transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* Left: Services list */}
          <div className="lg:w-1/2">
            {currentTab.services.map((service, i) => {
              const IconComponent = ICON_MAP[service.iconName];
              return (
                <div
                  key={service.name}
                  className={`flex gap-4 py-4 ${
                    i < currentTab.services.length - 1 ? 'border-b border-kova-border' : ''
                  } opacity-0 animate-fade-up`}
                  style={{
                    animationDelay: `${i * 50}ms`,
                    animationFillMode: 'forwards',
                  }}
                >
                  {IconComponent && <IconComponent size={20} className="text-kova-silver flex-shrink-0 mt-0.5" />}
                  <div>
                    <div className="font-sans font-bold text-kova-chrome text-sm">
                      {service.name}
                    </div>
                    <div className="font-sans text-xs text-kova-silver mt-1">
                      {service.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Proof panel */}
          <div className="lg:w-1/2">
            <div className="glassmorphism rounded-2xl p-6 md:p-8 lg:p-10 border border-kova-border">
              <AnimatedCounter
                key={activeTab}
                target={numericValue}
                prefix={metricPrefix}
                suffix={metricSuffix ? ` ${metricSuffix}` : ''}
                decimals={numericValue % 1 !== 0 ? 1 : 0}
                duration={1500}
                className="font-mono font-black text-kova-white block mb-4"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                  lineHeight: '0.96',
                  letterSpacing: '-0.03em',
                }}
              />
              <div className="font-sans font-bold text-kova-chrome mb-4">
                {currentTab.proof.caseRef}
              </div>
              <p className="font-sans italic text-kova-silver text-sm leading-relaxed mb-4">
                &ldquo;{currentTab.proof.quote}&rdquo;
              </p>
              <div className="font-mono text-[0.7rem] leading-[1.5] tracking-[0.08em] text-kova-ghost">
                Verified client result
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
