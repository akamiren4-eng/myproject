'use client';

import React from 'react';

interface SectionLabelProps {
  number: string;
  label: string;
}

const SectionLabel = React.memo(function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <div className="font-mono text-[0.6875rem] leading-[1.4] tracking-[0.18em] uppercase text-kova-silver mb-6">
      {number} — {label}
    </div>
  );
});

export default SectionLabel;
