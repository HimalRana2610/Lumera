import React from 'react';

const steps = [
  {
    number: 1,
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="14" y="22" width="20" height="14" rx="3" stroke="#FFD700" strokeWidth="2.5" fill="none"/>
        <circle cx="24" cy="29" r="3.5" stroke="#FFD700" strokeWidth="2.5" fill="none"/>
        <path d="M19 22V19C19 17.3 20.3 16 22 16H26C27.7 16 29 17.3 29 19V22" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
    title: 'Upload or Capture Image',
    desc: 'Use your camera or upload a photo for instant AI-powered analysis.'
  },
  {
    number: 2,
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M26 12L18 26H24L22 36L30 22H24L26 12Z" fill="#FFD700" stroke="#FFD700" strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Get Instant Summary',
    desc: 'Receive an AI-generated summary of detected facial attributes in seconds.'
  },
  {
    number: 3,
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="16" y="28" width="4" height="8" rx="2" fill="#00E5FF"/>
        <rect x="22" y="20" width="4" height="16" rx="2" fill="#FFD700"/>
        <rect x="28" y="32" width="4" height="4" rx="2" fill="#FF6B9D"/>
      </svg>
    ),
    title: 'Optional Detailed Analysis',
    desc: 'With your consent, access comprehensive attribute breakdown and confidence scores.'
  }
];

const HowItWorks = () => (
  <section className="w-full py-24 flex flex-col items-center animate-fadeUp bg-gradient-to-br from-[#181c2f] via-[#23244a] to-[#101a2a]" id="how-it-works">
    <h2 className="text-5xl md:text-6xl font-extrabold mb-20 text-center text-white font-sans animate-fadeUp tracking-tight" style={{letterSpacing:'-0.02em', textShadow:'0 2px 16px #a084ee88'}}>How It Works</h2>
    <div className="relative w-full max-w-3xl flex flex-col items-center mx-auto">
      {steps.map((step, idx) => (
        <div key={step.number} className="relative z-10 flex flex-row items-center w-full group mb-12 last:mb-0">
          <div className="flex flex-col items-center mr-8 min-w-[112px]">
            <div className="relative flex flex-col items-center justify-center">
              <div 
                className="w-28 h-28 rounded-full flex flex-col items-center justify-center relative"
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)',
                  boxShadow: '0 0 0 6px rgba(139, 92, 246, 0.3), 0 0 40px 10px rgba(139, 92, 246, 0.6), 0 0 60px 20px rgba(139, 92, 246, 0.4)',
                }}
              >
                <div className="flex items-center justify-center mb-1">
                  {step.icon}
                </div>
                <span 
                  className="text-white text-2xl font-black mt-1" 
                  style={{
                    textShadow: '0 0 10px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.3)',
                    fontFamily: 'Poppins, Inter, sans-serif'
                  }}
                >
                  {step.number}
                </span>
              </div>
            </div>
            {idx < steps.length - 1 && (
              <div className="w-1 h-16 bg-gradient-to-b from-[#8B5CF6] to-[#6D28D9] opacity-80 mt-2"></div>
            )}
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="bg-[#23244a]/80 border border-[#a084ee] rounded-2xl px-8 py-6 shadow-lg mb-2">
              <div className="text-2xl md:text-3xl font-extrabold text-white mb-2 animate-fadeUp tracking-tight font-sans" style={{fontFamily:'Poppins, Inter, sans-serif'}}>{step.title}</div>
              <div className="text-lg md:text-xl text-[#b3b8e0] font-medium animate-fadeUp font-sans" style={{fontFamily:'Poppins, Inter, sans-serif'}}>{step.desc}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorks;
