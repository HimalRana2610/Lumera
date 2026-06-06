import React from 'react';

const TEAM = [
  { name: 'Himal Rana', email: 'u23ai053@coed.svnit.ac.in' },
  { name: 'Shreyansh Mishra', email: 'u23ai041@coed.svnit.ac.in' },
  { name: 'Ankit Yadav', email: 'u23ai039@coed.svnit.ac.in' },
  { name: 'Chirag Bhut', email: 'u23ai070@coed.svnit.ac.in' },
];

const ContactSection = () => (
  <section className="w-full py-16 flex flex-col items-center animate-fadeUp bg-gradient-to-br from-[#181c2f] via-[#23244a] to-[#101a2a]" id="contact">
    <h2 className="heading-2 mb-4 text-center text-[#b3e0ff]" style={{textShadow:'0 2px 16px #6f6ee888'}}>Get In Touch</h2>
    <p className="body-text mb-8 text-[#b3b8e0] text-center">Built by four friends &mdash; reach out to any of us</p>
    {/* Team Contact Card */}
    <div className="rounded-2xl p-10 shadow-[0_0_32px_0_#23244a88] flex flex-col gap-8 items-center max-w-4xl w-full border border-[#6f6ee8] bg-gradient-to-br from-[#23244a] to-[#181c2f]" style={{fontFamily:'Poppins, Inter, sans-serif'}}>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {TEAM.map((member) => (
          <div key={member.email} className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-xl p-4 bg-gradient-to-br from-[#6f6ee8] to-[#a084ee] shadow-lg">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <path d="M4 6h16v12H4V6zm0 0l8 6 8-6" stroke="#fff" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="heading-3 text-white mb-1">{member.name}</span>
            <a href={`mailto:${member.email}`} className="caption text-[#b3b8e0] hover:text-white transition break-all">{member.email}</a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ContactSection;
