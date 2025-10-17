import React from 'react';

const FeaturesSection = () => (
  <section className="w-full py-20 flex flex-col items-center animate-fadeUp bg-gradient-to-br from-[#181c2f] via-[#23244a] to-[#101a2a]" id="features">
  <h2 className="heading-2 mb-12 text-center text-white animate-fadeUp" style={{textShadow:'0 2px 16px #a084ee88'}}>Why Choose LUMÉRA AI</h2>
    <div className="flex flex-col md:flex-row gap-12 justify-center items-stretch w-full max-w-[1600px] px-2 md:px-8">
      {/* Card 1 */}
      <div className="glass-card flex-1 p-14 flex flex-col items-center text-center min-w-[320px] max-w-[500px] mx-auto animate-float" style={{color:'#fff', fontFamily:'Poppins, Inter, sans-serif'}}>
        <div className="bg-gradient-to-br from-[#a084ee] via-[#7f5af0] to-[#6ee7b7] rounded-xl p-4 mb-6 shadow-[0_0_24px_0_#a084ee88]">
          <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#a084ee" fillOpacity="0.12"/><path d="M24 8c-8.84 0-16 7.16-16 16s7.16 16 16 16 16-7.16 16-16-7.16-16-16-16zm-2 28c-6.63 0-12-5.37-12-12s5.37-12 12-12 12 5.37 12 12-5.37 12-12 12zm8-16c0-4.42-3.58-8-8-8s-8 3.58-8 8h2c0-3.31 2.69-6 6-6s6 2.69 6 6h2zm-8 8c-2.21 0-4-1.79-4-4h8c0 2.21-1.79 4-4 4zm-6-8h2c0 2.21 1.79 4 4 4s4-1.79 4-4h2c0 3.31-2.69 6-6 6s-6-2.69-6-6z" fill="#a084ee"/></svg>
        </div>
  <h3 className="heading-3 mb-2 text-white">Advanced AI Technology</h3>
  <p className="body-text text-[#b3b8e0] font-medium">Powered by state-of-the-art Convolutional Neural Networks for accurate facial attribute detection</p>
      </div>
      {/* Card 2 */}
      <div className="glass-card flex-1 p-14 flex flex-col items-center text-center min-w-[320px] max-w-[500px] mx-auto border-2 border-[#a084ee] animate-float" style={{color:'#fff', fontFamily:'Poppins, Inter, sans-serif', boxShadow:'0 8px 40px 0 #a084ee33'}}>
        <div className="bg-gradient-to-br from-[#f472b6] via-[#a084ee] to-[#6ee7b7] rounded-xl p-4 mb-6 shadow-[0_0_24px_0_#f472b688]">
          <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#f472b6" fillOpacity="0.12"/><path d="M24 8c-8.84 0-16 7.16-16 16s7.16 16 16 16 16-7.16 16-16-7.16-16-16-16zm-2 28c-6.63 0-12-5.37-12-12s5.37-12 12-12 12 5.37 12 12-5.37 12-12 12zm8-16c0-4.42-3.58-8-8-8s-8 3.58-8 8h2c0-3.31 2.69-6 6-6s6 2.69 6 6h2zm-8 8c-2.21 0-4-1.79-4-4h8c0 2.21-1.79 4-4 4zm-6-8h2c0 2.21 1.79 4 4 4s4-1.79 4-4h2c0 3.31-2.69 6-6 6s-6-2.69-6-6z" fill="#f472b6"/></svg>
        </div>
  <h3 className="heading-3 mb-2 text-white">Privacy Protected</h3>
  <p className="body-text text-[#b3b8e0] font-medium">Your data is encrypted end-to-end. Detailed analysis only with explicit consent</p>
      </div>
      {/* Card 3 */}
      <div className="glass-card flex-1 p-14 flex flex-col items-center text-center min-w-[320px] max-w-[500px] mx-auto animate-float" style={{color:'#fff', fontFamily:'Poppins, Inter, sans-serif'}}>
        <div className="bg-gradient-to-br from-[#6ee7b7] via-[#a084ee] to-[#f472b6] rounded-xl p-4 mb-6 shadow-[0_0_24px_0_#6ee7b788]">
          <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="#6ee7b7" fillOpacity="0.12"/><path d="M16 8h16c2.21 0 4 1.79 4 4v24c0 2.21-1.79 4-4 4H16c-2.21 0-4-1.79-4-4V12c0-2.21 1.79-4 4-4zm0 4v24h16V12H16zm4 4h8v2h-8v-2zm0 4h8v2h-8v-2zm0 4h6v2h-6v-2z" fill="#6ee7b7"/></svg>
        </div>
  <h3 className="heading-3 mb-2 text-white">Detailed Reports</h3>
  <p className="body-text text-[#b3b8e0] font-medium">Get comprehensive analysis with confidence scores and downloadable PDF reports</p>
      </div>
    </div>
  </section>
);

export default FeaturesSection;
