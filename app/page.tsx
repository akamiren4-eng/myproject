'use client';

import { useState, useCallback } from 'react';
import CustomCursor from '@/components/kova/CustomCursor';
import Nav from '@/components/kova/Nav';
import Hero from '@/components/kova/Hero';
import DualMarquee from '@/components/kova/DualMarquee';
import Results from '@/components/kova/Results';
import Work from '@/components/kova/Work';
import ROICalculator from '@/components/kova/ROICalculator';
import Services from '@/components/kova/Services';
import Process from '@/components/kova/Process';
import SocialProof from '@/components/kova/SocialProof';
import Pricing from '@/components/kova/Pricing';
import FinalCTA from '@/components/kova/FinalCTA';
import Footer from '@/components/kova/Footer';
import OrderModal from '@/components/kova/OrderModal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('SCALE');
  const [selectedPrice, setSelectedPrice] = useState('$7,500');

  const handleCtaClick = useCallback(() => {
    setSelectedPlan('SCALE');
    setSelectedPrice('$7,500');
    setModalOpen(true);
  }, []);

  const handleOrder = useCallback((tierName: string, price: string) => {
    setSelectedPlan(tierName);
    setSelectedPrice(price);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <main className="bg-kova-void text-kova-chrome overflow-x-hidden">
      <CustomCursor />
      <Nav onCtaClick={handleCtaClick} />
      <Hero onCtaClick={handleCtaClick} />
      <DualMarquee />
      <Results />
      <Work />
      <ROICalculator onCtaClick={handleCtaClick} />
      <Services />
      <Process />
      <SocialProof />
      <Pricing onOrder={handleOrder} />
      <FinalCTA onCtaClick={handleCtaClick} />
      <Footer />
      <OrderModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        selectedPlan={selectedPlan}
        selectedPrice={selectedPrice}
      />
    </main>
  );
}
