
import './globals.css';
import type { Metadata } from 'next';
import './fonts';

import Image from 'next/image';
import Link from 'next/link';


export const metadata: Metadata = {
  title: 'LUMÉRA AI',
  description: 'LUMÉRA AI – Modern facial attribute analysis and reporting. Privacy-first, powered by deep learning.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans min-h-screen w-full bg-gradient-to-br from-[#0a101a] to-[#101a2a] text-[#e6f6f2]">
        <div className="min-h-screen w-full flex flex-col">
          {/* Modern Header with Brand */}
          <header className="w-full py-2.5 px-6 bg-gradient-to-r from-[#1a1d35] via-[#252850] to-[#1a1d35] shadow-lg border-b-2 border-[#8B5CF6]/30 sticky top-0 z-50" style={{boxShadow: '0 4px 20px rgba(139,92,246,0.3)'}}>
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.jpg"
                  alt="LUMERA AI Logo"
                  width={50}
                  height={50}
                  className="rounded-xl shadow-lg border-2 border-[#8B5CF6] animate-float"
                  style={{boxShadow: '0 0 15px rgba(139,92,246,0.5)'}}
                  unoptimized
                  key={Date.now()}
                />
                <span
                  className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent"
                  style={{
                    fontFamily: 'Poppins, Inter, sans-serif',
                    letterSpacing: '0.02em',
                    backgroundImage: 'linear-gradient(90deg, #a084ee 0%, #ff77c8 40%, #f4c6a5 60%, #a084ee 100%)',
                    textShadow: '0 2px 20px rgba(139,92,246,0.6)'
                  }}
                >
                  LUM<span className="inline-block">É</span>RA <span className="text-[#8B5CF6]">AI</span>
                </span>
              </div>
              <nav className="hidden md:flex items-center gap-5">
                <Link href="/" className="px-5 py-2 rounded-xl font-bold text-base bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200" style={{boxShadow: '0 4px 15px rgba(139,92,246,0.4)'}}>
                  Home
                </Link>
                <Link href="/analysis" className="px-5 py-2 rounded-xl font-bold text-base bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200" style={{boxShadow: '0 4px 15px rgba(124,58,237,0.4)'}}>
                  Analysis
                </Link>
              </nav>
            </div>
          </header>
          <main className="flex-1 w-full flex flex-col items-center justify-start bg-gradient-to-br from-[#0a101a] to-[#101a2a]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
