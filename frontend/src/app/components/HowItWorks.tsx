import React from 'react';

const steps = [
  {
    number: 1,
    title: 'Upload or Capture Image',
    desc: 'Use your camera or upload a photo for instant analysis.'
  },
  {
    number: 2,
    title: 'Get Instant Summary',
    desc: 'Receive an AI-generated summary of detected facial attributes.'
  },
  {
    number: 3,
    title: 'Optional Detailed Analysis',
    desc: 'With your consent, access comprehensive attribute breakdown and confidence scores.'
  }
];

const HowItWorks = () => (
  <section className="w-full py-24 flex flex-col items-center animate-fadeUp bg-gradient-to-br from-[#E0F7FA] to-[#B2EBF2]" id="how-it-works">
  <h2 className="text-5xl md:text-6xl font-extrabold mb-20 text-center text-black font-sans animate-fadeUp tracking-tight" style={{letterSpacing:'-0.02em'}}>How It Works</h2>
    <div className="relative w-full max-w-2xl flex flex-col items-center mx-auto">
      <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-2 bg-gradient-to-b from-cyan-200 via-cyan-300 to-cyan-100 rounded-full animate-scan" style={{zIndex:0, opacity:0.13}}></div>
      {steps.map((step, idx) => (
        <div key={step.number} className="relative z-10 flex flex-row items-center w-full group mb-16 last:mb-0">
          <div className="flex flex-col items-center mr-8">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-200 flex items-center justify-center text-white text-4xl font-extrabold shadow-2xl border-4 border-white group-hover:scale-110 transition-transform duration-300 animate-float" style={{boxShadow:'0 8px 32px 0 #2dd4bf33'}}>
              {step.number}
            </div>
            {idx < steps.length - 1 && (
              <div className="w-2 h-16 bg-gradient-to-b from-cyan-200 to-cyan-100 rounded-full animate-pulse"></div>
            )}
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-2xl md:text-3xl font-extrabold text-black mb-2 animate-fadeUp tracking-tight font-sans" style={{fontFamily:'Poppins, Inter, sans-serif'}}>{step.title}</div>
            <div className="text-lg md:text-xl text-[#6b7a89] font-medium animate-fadeUp font-sans" style={{fontFamily:'Poppins, Inter, sans-serif'}}>{step.desc}</div>
          </div>
        </div>
      ))}
      {/* Animated floating icon at the bottom for innovation */}
      <div className="absolute left-1/2 -bottom-16 -translate-x-1/2 animate-float">
        <svg width="56" height="56" fill="none" viewBox="0 0 56 56"><rect width="56" height="56" rx="16" fill="#00F0FF" fillOpacity="0.13"/><path d="M28 16c-6.63 0-12 5.37-12 12 0 2.99 1.32 5.71 3.57 7.78C20.01 39.66 23.56 42 28 42s7.99-2.34 8.43-6.22C38.68 33.71 40 30.99 40 28c0-6.63-5.37-12-12-12Zm0 21.6c-2.7 0-4.8-2.1-4.8-4.8h9.6c0 2.7-2.1 4.8-4.8 4.8Zm-7.2-9.6c0-3.97 3.23-7.2 7.2-7.2s7.2 3.23 7.2 7.2H20.8Z" fill="#00F0FF"/></svg>
      </div>
    </div>
  </section>
);

export default HowItWorks;
