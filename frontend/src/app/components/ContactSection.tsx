import React from 'react';

const ContactSection = () => (
  <section className="w-full py-16 flex flex-col items-center animate-fadeUp bg-gradient-to-br from-[#181c2f] via-[#23244a] to-[#101a2a]" id="contact">
    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-[#b3e0ff]" style={{fontFamily: 'Poppins, Inter, sans-serif', textShadow:'0 2px 16px #6f6ee888'}}>Get In Touch</h2>
    <p className="mb-8 text-[#b3b8e0] text-center">Have questions? We are here to help</p>
    {/* Contact Info Card */}
    <div className="rounded-2xl p-10 shadow-[0_0_32px_0_#23244a88] flex flex-col gap-8 items-center max-w-2xl w-full border border-[#6f6ee8] bg-gradient-to-br from-[#23244a] to-[#181c2f]" style={{fontFamily:'Poppins, Inter, sans-serif'}}>
      <div className="w-full flex flex-row justify-between items-center gap-8 mb-4">
        {/* Email */}
        <div className="flex flex-col items-center flex-1">
          <div className="mb-4 rounded-xl p-4 bg-gradient-to-br from-[#6f6ee8] to-[#a084ee] shadow-lg">
            <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
              <rect width="32" height="32" rx="8" fill="url(#email-gradient)" />
              <path d="M8 10h16v12H8V10zm0 0l8 6 8-6" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="email-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6f6ee8" />
                  <stop offset="1" stopColor="#a084ee" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="font-bold text-lg text-white mb-1">Email</span>
          <span className="text-[#b3b8e0] text-sm">support@lumeraai.com</span>
        </div>
        {/* Phone */}
        <div className="flex flex-col items-center flex-1">
          <div className="mb-4 rounded-xl p-4 bg-gradient-to-br from-[#6f6ee8] to-[#a084ee] shadow-lg">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1.02.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2a9 9 0 0 0-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z" fill="#fff"/>
            </svg>
          </div>
          <span className="font-bold text-lg text-white mb-1">Phone</span>
          <span className="text-[#b3b8e0] text-sm">+1 (555) 123-4567</span>
        </div>
        {/* Location */}
        <div className="flex flex-col items-center flex-1">
          <div className="mb-4 rounded-xl p-4 bg-gradient-to-br from-[#6f6ee8] to-[#a084ee] shadow-lg">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" fill="#fff"/>
            </svg>
          </div>
          <span className="font-bold text-lg text-white mb-1">Location</span>
          <span className="text-[#b3b8e0] text-sm">San Francisco, CA</span>
        </div>
      </div>
      <hr className="w-full border-t border-[#23244a] mb-4 opacity-40" />
      <div className="flex gap-4 justify-center">
        {/* X (Twitter) */}
        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#6f6ee8] via-[#a084ee] to-[#f472b6] shadow-lg hover:scale-105 transition">
          <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
            <path d="M5 5l12 12M17 5L5 17" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </a>
        {/* LinkedIn */}
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#6f6ee8] via-[#a084ee] to-[#f472b6] shadow-lg hover:scale-105 transition">
          <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
            <rect x="3" y="3" width="16" height="16" rx="4" stroke="#fff" strokeWidth="2"/>
            <rect x="6.5" y="9.5" width="2" height="5" rx="1" fill="#fff"/>
            <rect x="10" y="9.5" width="2" height="5" rx="1" fill="#fff"/>
            <circle cx="7.5" cy="7.5" r="1" fill="#fff"/>
          </svg>
        </a>
        {/* Facebook */}
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#6f6ee8] via-[#a084ee] to-[#f472b6] shadow-lg hover:scale-105 transition">
          <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
            <rect x="3" y="3" width="16" height="16" rx="4" stroke="#fff" strokeWidth="2"/>
            <path d="M13 7h-2a2 2 0 0 0-2 2v2H7v2h2v5h2v-5h2l1-2h-3V9a1 1 0 0 1 1-1h2V7z" fill="#fff"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
);

export default ContactSection;
