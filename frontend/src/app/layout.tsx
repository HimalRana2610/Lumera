
import './globals.css';
import type { Metadata } from 'next';
import './fonts';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'AI Facial Insight Generator',
  description: 'Advanced CNN-powered facial attribute analysis with privacy-first detailed reporting. Your data security is our top priority.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans min-h-screen w-full bg-gradient-to-br from-[#f8feff] to-[#e6f6f2] text-[#0a101a]">
        <div className="min-h-screen w-full flex flex-col">
          {/* Header with Logo */}
          <header className="w-full py-4 px-6 bg-white/10 backdrop-blur-sm border-b border-cyan-200/20 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src="/logo.jpg"
                  alt="AI Facial Insight Generator Logo"
                  width={60}
                  height={60}
                  className="rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
                />
                <h1 className="text-2xl font-bold text-cyan-600" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>
                  AI Facial Insight Generator
                </h1>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <a href="/" className="text-cyan-600 hover:text-cyan-800 font-medium transition-colors">Home</a>
                <a href="/analysis" className="text-cyan-600 hover:text-cyan-800 font-medium transition-colors">Analysis</a>
              </nav>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
