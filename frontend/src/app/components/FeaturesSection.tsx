import React from 'react';

const FeaturesSection = () => (
  <section className="w-full py-20 flex flex-col items-center animate-fadeUp bg-transparent" id="features">
  <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center text-black font-sans animate-fadeUp" style={{letterSpacing:'-0.02em'}}>Why Choose Our Platform</h2>
    <div className="flex flex-col md:flex-row gap-12 justify-center items-stretch w-full max-w-[1600px] px-2 md:px-8">
  <div className="bg-white flex-1 p-14 flex flex-col items-center text-center rounded-3xl shadow-2xl min-w-[320px] max-w-[500px] mx-auto animate-float" style={{color:'#111', fontFamily:'Poppins, Inter, sans-serif'}}>
        <div className="bg-cyan-400/20 rounded-xl p-4 mb-6">
          <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#00F0FF" fillOpacity="0.12"/><path d="M24 8c-8.84 0-16 7.16-16 16s7.16 16 16 16 16-7.16 16-16-7.16-16-16-16zm-2 28c-6.63 0-12-5.37-12-12s5.37-12 12-12 12 5.37 12 12-5.37 12-12 12zm8-16c0-4.42-3.58-8-8-8s-8 3.58-8 8h2c0-3.31 2.69-6 6-6s6 2.69 6 6h2zm-8 8c-2.21 0-4-1.79-4-4h8c0 2.21-1.79 4-4 4zm-6-8h2c0 2.21 1.79 4 4 4s4-1.79 4-4h2c0 3.31-2.69 6-6 6s-6-2.69-6-6z" fill="#00F0FF"/></svg>
        </div>
  <h3 className="font-bold text-2xl md:text-3xl mb-3 text-black font-sans">Advanced AI Technology</h3>
        <p className="text-lg md:text-xl text-[#6b7a89] font-medium">Powered by state-of-the-art Convolutional Neural Networks for accurate facial attribute detection</p>
      </div>
  <div className="bg-white flex-1 p-14 flex flex-col items-center text-center rounded-3xl shadow-2xl min-w-[320px] max-w-[500px] mx-auto border-2 border-cyan-300 animate-float" style={{color:'#111', fontFamily:'Poppins, Inter, sans-serif', boxShadow:'0 8px 40px 0 #2dd4bf33'}}>
        <div className="bg-cyan-400/20 rounded-xl p-4 mb-6">
          <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#00F0FF" fillOpacity="0.12"/><path d="M24 8c-8.84 0-16 7.16-16 16s7.16 16 16 16 16-7.16 16-16-7.16-16-16-16zm-2 28c-6.63 0-12-5.37-12-12s5.37-12 12-12 12 5.37 12 12-5.37 12-12 12zm8-16c0-4.42-3.58-8-8-8s-8 3.58-8 8h2c0-3.31 2.69-6 6-6s6 2.69 6 6h2zm-8 8c-2.21 0-4-1.79-4-4h8c0 2.21-1.79 4-4 4zm-6-8h2c0 2.21 1.79 4 4 4s4-1.79 4-4h2c0 3.31-2.69 6-6 6s-6-2.69-6-6z" fill="#00F0FF"/></svg>
        </div>
  <h3 className="font-bold text-2xl md:text-3xl mb-3 text-black font-sans">Privacy Protected</h3>
        <p className="text-lg md:text-xl text-[#6b7a89] font-medium">Your data is encrypted end-to-end. Detailed analysis only with explicit consent</p>
      </div>
  <div className="bg-white flex-1 p-14 flex flex-col items-center text-center rounded-3xl shadow-2xl min-w-[320px] max-w-[500px] mx-auto animate-float" style={{color:'#111', fontFamily:'Poppins, Inter, sans-serif'}}>
        <div className="bg-cyan-400/20 rounded-xl p-4 mb-6">
          <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#00F0FF" fillOpacity="0.12"/><path d="M16 8h16c2.21 0 4 1.79 4 4v24c0 2.21-1.79 4-4 4H16c-2.21 0-4-1.79-4-4V12c0-2.21 1.79-4 4-4zm0 4v24h16V12H16zm4 4h8v2h-8v-2zm0 4h8v2h-8v-2zm0 4h6v2h-6v-2z" fill="#00F0FF"/></svg>
        </div>
  <h3 className="font-bold text-2xl md:text-3xl mb-3 text-black font-sans">Detailed Reports</h3>
        <p className="text-lg md:text-xl text-[#6b7a89] font-medium">Get comprehensive analysis with confidence scores and downloadable PDF reports</p>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
