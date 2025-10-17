import React from 'react';

const Footer = () => (
  <footer className="w-full py-8 flex flex-col items-center text-center bg-gradient-to-t from-[#181c2f] via-[#23244a] to-[#101a2a] text-[#b3b8e0] animate-fadeUp border-t border-[#a084ee]/30">
  <div className="heading-3 mb-1 bg-gradient-to-r from-[#a084ee] via-[#f472b6] to-[#6ee7b7] bg-clip-text text-transparent" style={{letterSpacing:'0.005em'}}>LUMÉRA AI</div>
  <div className="caption mb-2 text-[#b3b8e0]">Advanced Facial Attribute Analysis</div>
  <div className="flex gap-6 mb-2 body-text">
      <a href="#features" className="hover:text-[#a084ee] transition">Features</a>
      <a href="#how-it-works" className="hover:text-[#a084ee] transition">How It Works</a>
      <a href="#privacy" className="hover:text-[#a084ee] transition">Privacy</a>
      <a href="#contact" className="hover:text-[#a084ee] transition">Contact</a>
    </div>
  <div className="caption text-[#6f6ee8]">© {new Date().getFullYear()} LUMÉRA AI. All rights reserved. | Built with <span className='text-[#f472b6]'>♥</span> for Privacy</div>
  </footer>
);

export default Footer;
