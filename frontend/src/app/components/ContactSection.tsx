import React from 'react';

const ContactSection = () => (
  <section className="w-full py-16 flex flex-col items-center animate-fadeUp" id="contact">
    

    <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>Contact Us</h2>


    {/* Contact Info Card */}
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg flex flex-col gap-4 items-start max-w-md w-full border border-gray-200/50">
      <div className="flex items-center gap-3">
        <span className="text-cyan-400">
          <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><path d="M2 4.5A2.5 2.5 0 0 1 4.5 2h13A2.5 2.5 0 0 1 20 4.5v13A2.5 2.5 0 0 1 17.5 20h-13A2.5 2.5 0 0 1 2 17.5v-13Z" stroke="#06b6d4" strokeWidth="1.5"/><path d="M4.5 6.5 11 12l6.5-5.5" stroke="#06b6d4" strokeWidth="1.5"/></svg>
        </span>
        <div>
          <span className="font-medium block text-foreground" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>Email</span>
          <span className="text-gray-600 block" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>support@facialinsight.com</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-cyan-400">
          <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><path d="M6.5 2h9A2.5 2.5 0 0 1 18 4.5v13A2.5 2.5 0 0 1 15.5 20h-9A2.5 2.5 0 0 1 4 17.5v-13A2.5 2.5 0 0 1 6.5 2Z" stroke="#06b6d4" strokeWidth="1.5"/><path d="M11 6.5v5l3.5 2" stroke="#06b6d4" strokeWidth="1.5"/></svg>
        </span>
        <div>
          <span className="font-medium block text-foreground" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>Phone</span>
          <span className="text-gray-600 block" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>+1 (555) 123-4567</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-cyan-400">
          <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><path d="M11 2C6.03 2 2 6.03 2 11c0 4.97 4.03 9 9 9s9-4.03 9-9c0-4.97-4.03-9-9-9Zm0 16.5A7.5 7.5 0 1 1 11 3.5a7.5 7.5 0 0 1 0 15Z" stroke="#06b6d4" strokeWidth="1.5"/><path d="M11 6.5v4l2.5 1.5" stroke="#06b6d4" strokeWidth="1.5"/></svg>
        </span>
        <div>
          <span className="font-medium block text-foreground" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>Location</span>
          <span className="text-gray-600 block" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>San Francisco, CA, USA</span>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
