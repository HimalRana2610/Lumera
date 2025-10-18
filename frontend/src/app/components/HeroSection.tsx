import React from 'react';
import Image from 'next/image';

const HeroSection = () => (
  <section className="w-full min-h-[90vh] flex flex-col items-center justify-center py-24 animate-fadeUp bg-gradient-to-br from-[#181c2f] via-[#23244a] to-[#101a2a]">
    <div className="flex flex-col items-center gap-8 w-full max-w-6xl px-4">
      <div className="bg-gradient-to-br from-[#a084ee] via-[#7f5af0] to-[#6f6ee8] rounded-3xl p-2 shadow-[0_0_48px_0_#a084ee88] animate-float flex items-center justify-center">
        <Image
          src="/logo_new.jpg"
          alt="LUMÉRA AI Logo"
          width={120}
          height={120}
          className="rounded-xl shadow-lg bg-white"
          style={{ boxShadow: '0 0 15px rgba(139,92,246,0.5)', background: '#fff', padding: '8px' }}
          unoptimized
          key={Date.now()}
        />
      </div>
  <h1 className="heading-1 bg-clip-text text-transparent bg-gradient-to-r from-[#a084ee] via-[#f472b6] to-[#6ee7b7] drop-shadow-[0_2px_16px_rgba(160,132,238,0.7)]" style={{letterSpacing:'-0.02em'}}>LUM<span className="inline-block">É</span>RA <span className="text-[#a084ee]">AI</span></h1>
  <p className="lead text-[#e6f6f2] max-w-3xl text-center font-medium">Advanced CNN-powered facial attribute analysis with privacy-first detailed reporting. Your data security is our top priority.</p>
      <div className="flex gap-6 mt-8 w-full justify-center">
  <a href="/analysis" className="btn-ghost bg-gradient-to-r from-[#a084ee] via-[#f472b6] to-[#6ee7b7] text-white font-semibold rounded-xl shadow-xl hover:from-[#f472b6] hover:to-[#a084ee] hover:text-[#181e2a] transition-all duration-200">Start Analysis →</a>
        <button
          className="btn-ghost border-2 border-[#a084ee] text-[#a084ee] font-semibold rounded-xl hover:bg-[#23244a] transition-all duration-200"
          onClick={() => {
            const el = document.getElementById('privacy');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
        >
          🔒 Privacy Policy
        </button>
      </div>
    </div>
  </section>
);

export default HeroSection;
