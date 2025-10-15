import React from 'react';

const PrivacySection = () => (
  <section className="w-full py-10 flex flex-col items-center animate-fadeUp" id="privacy" style={{background: 'linear-gradient(90deg, #f2fdff 0%, #eaf8fb 100%)'}}>
    {/* Privacy Banner */}
    <div className="w-full bg-gradient-to-r from-cyan-50 to-teal-50 py-16 mb-8">
      <div className="w-full px-4 flex flex-col items-center gap-3">
        <div className="flex items-center gap-3 text-accent-primary">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path d="M12 2L5 7v13a2 2 0 002 2h10a2 2 0 002-2V7l-7-5z" stroke="currentColor" strokeWidth="2"/>
            <circle cx="12" cy="12" r="5" fill="currentColor"/>
          </svg>
          <span className="text-xl font-bold" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>Privacy is our priority</span>
        </div>
        <p className="text-lg text-center text-muted max-w-3xl" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>
          Your privacy is secured and never stored without consent
        </p>
      </div>
    </div>
  </section>
);

export default PrivacySection;
