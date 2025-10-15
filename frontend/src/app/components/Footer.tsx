import React from 'react';

const Footer = () => (
  <footer className="w-full py-6 flex flex-col items-center text-center text-[var(--muted)] text-sm animate-fadeUp">
    <div>© {new Date().getFullYear()} AI Facial Insight Generator. All rights reserved.</div>
  </footer>
);

export default Footer;
