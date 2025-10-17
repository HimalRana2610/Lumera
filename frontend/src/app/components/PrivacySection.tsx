import React from 'react';

const PrivacySection = () => (
  <section className="w-full py-20 flex flex-col items-center animate-fadeUp bg-gradient-to-br from-[#181c2f] via-[#23244a] to-[#101a2a]" id="privacy">
    <div className="w-full max-w-6xl px-4">
      {/* Privacy Header with Icon */}
      <div className="w-full mb-12 rounded-3xl p-8 md:p-12" style={{
        background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(109,40,217,0.15) 100%)',
        border: '2px solid rgba(139,92,246,0.3)',
        boxShadow: '0 0 40px 0 rgba(139,92,246,0.2)'
      }}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Icon */}
          <div 
            className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              boxShadow: '0 0 30px rgba(139,92,246,0.6)'
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 4L8 10V18C8 26 20 36 20 36C20 36 32 26 32 18V10L20 4Z" stroke="white" strokeWidth="2.5" fill="rgba(255,255,255,0.1)"/>
              <circle cx="20" cy="19" r="4" fill="white"/>
              <path d="M20 15V19L22 21" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          
          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-3" style={{fontFamily: 'Poppins, Inter, sans-serif', textShadow: '0 2px 16px rgba(139,92,246,0.5)'}}>
              Privacy is Our Priority
            </h2>
            <p className="text-lg md:text-xl text-[#b3b8e0]" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>
              Your privacy is secured with enterprise-grade encryption and never stored without consent
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* End-to-End Encryption */}
        <div 
          className="rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(109,40,217,0.12) 100%)',
            border: '2px solid rgba(139,92,246,0.25)',
            boxShadow: '0 4px 20px rgba(139,92,246,0.15)'
          }}
        >
          <div 
            className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              boxShadow: '0 0 20px rgba(255,215,0,0.4)'
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="8" y="12" width="16" height="12" rx="2" stroke="white" strokeWidth="2.5" fill="rgba(255,255,255,0.1)"/>
              <circle cx="16" cy="18" r="2.5" fill="white"/>
              <path d="M12 12V9C12 6.8 13.8 5 16 5C18.2 5 20 6.8 20 9V12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>
            End-to-End Encryption
          </h3>
          <p className="text-base text-[#b3b8e0]" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>
            Military-grade AES-256 encryption
          </p>
        </div>

        {/* No Data Storage */}
        <div 
          className="rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(109,40,217,0.12) 100%)',
            border: '2px solid rgba(139,92,246,0.25)',
            boxShadow: '0 4px 20px rgba(139,92,246,0.15)'
          }}
        >
          <div 
            className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
            style={{
              background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
              boxShadow: '0 0 20px rgba(239,68,68,0.4)'
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="12" stroke="white" strokeWidth="2.5" fill="rgba(255,255,255,0.1)"/>
              <path d="M10 10L22 22M22 10L10 22" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>
            No Data Storage
          </h3>
          <p className="text-base text-[#b3b8e0]" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>
            Images deleted after analysis
          </p>
        </div>

        {/* Explicit Consent */}
        <div 
          className="rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(109,40,217,0.12) 100%)',
            border: '2px solid rgba(139,92,246,0.25)',
            boxShadow: '0 4px 20px rgba(139,92,246,0.15)'
          }}
        >
          <div 
            className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              boxShadow: '0 0 20px rgba(16,185,129,0.4)'
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="6" y="6" width="20" height="20" rx="3" stroke="white" strokeWidth="2.5" fill="rgba(255,255,255,0.1)"/>
              <path d="M11 16L15 20L21 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>
            Explicit Consent
          </h3>
          <p className="text-base text-[#b3b8e0]" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>
            Full control over your data
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default PrivacySection;
