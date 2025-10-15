
'use client';

import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorks from './components/HowItWorks';
import PrivacySection from './components/PrivacySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-gradient-to-br from-[#f8feff] to-[#e6f6f2] text-[#0a101a] font-sans overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <PrivacySection />
      <ContactSection />
      <Footer />
    </main>
  );
}