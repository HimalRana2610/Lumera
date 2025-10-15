'use client';

import React, { useEffect, useState } from 'react';

interface SummaryCardProps {
  imageUrl: string;
  summary: string;
  attributes: { [key: string]: number };
  onDownloadReport: () => void;
  onAnalyzeAnother: () => void;
}

const attributeIcons: Record<string, React.ReactNode> = {
  'Youthful Appearance': (
    <span className="inline-block w-5 h-5 text-mint-400">🌱</span>
  ),
  'Clear Skin': (
    <span className="inline-block w-5 h-5 text-aqua-400">✨</span>
  ),
  'Smiling': (
    <span className="inline-block w-5 h-5 text-yellow-300">😊</span>
  ),
  'Oval Face': (
    <span className="inline-block w-5 h-5 text-pink-300">💠</span>
  ),
  'Dark Hair': (
    <span className="inline-block w-5 h-5 text-gray-400">🖤</span>
  ),
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  imageUrl,
  summary,
  attributes,
  onDownloadReport,
  onAnalyzeAnother,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 80);
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="glass-card relative overflow-hidden border-2 border-transparent bg-gradient-to-br from-[rgba(45,212,191,0.10)] to-[rgba(110,231,183,0.08)] shadow-xl animate-fadeUp">
        {/* Animated AI Icon */}
        <div className="absolute left-1/2 -top-8 -translate-x-1/2 z-20">
          <div className="bg-gradient-to-tr from-aqua-500 to-mint-400 rounded-full p-2 shadow-lg animate-float">
            <svg className="w-10 h-10 text-white drop-shadow-lg" fill="none" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="14" fill="#2DD4BF" fillOpacity="0.18" />
              <ellipse cx="16" cy="19" rx="8" ry="6" fill="#2DD4BF" fillOpacity="0.25" />
              <circle cx="16" cy="13" r="6" fill="#2DD4BF" />
              <ellipse cx="13.5" cy="12" rx="1.2" ry="1.5" fill="#fff" />
              <ellipse cx="18.5" cy="12" rx="1.2" ry="1.5" fill="#fff" />
              <ellipse cx="16" cy="16" rx="2.2" ry="1.1" fill="#fff" fillOpacity="0.5" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 p-6 md:p-10 pt-16">
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-2)] mb-2 animate-fadeUp">
            AI Analysis Results
          </h2>
          {/* Animated Divider */}
          <div className="mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-aqua-400 via-mint-400 to-aqua-400 mb-6 animate-pulse" />

          <div className="grid md:grid-cols-2 gap-8">
            {/* Image with animated border */}
            <div className="relative group rounded-xl overflow-hidden shadow-lg animate-fadeUp">
              <img
                src={imageUrl}
                alt="analyzed"
                className="w-full h-56 object-cover rounded-xl border-2 border-[var(--accent-primary)] group-hover:scale-105 transition-transform duration-700"
              />
              {/* AI grid overlay on hover */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-[rgba(45,212,191,0.04)] border border-[rgba(45,212,191,0.04)] rounded-[2px]"
                      style={{ animationDelay: `${i * 18}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Summary and Attributes */}
            <div className="flex flex-col gap-6">
              {/* Summary Section */}
              <div className="glass-card p-5 rounded-xl border-0 shadow-lg animate-fadeUp relative">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-6 h-6 text-aqua-400 animate-pulse" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="text-lg font-semibold text-aqua-400">Summary</span>
                </div>
                <p className="text-[var(--muted)] leading-relaxed text-base font-medium animate-fadeUp">
                  {summary}
                </p>
              </div>

              {/* Attributes Section */}
              <div className="flex flex-wrap gap-3 animate-fadeUp">
                {Object.entries(attributes).map(([label, val], idx) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[rgba(45,212,191,0.18)] to-[rgba(110,231,183,0.12)] shadow-md border border-[var(--accent-primary)] animate-fadeUp"
                    style={{ animationDelay: `${220 + idx * 80}ms` }}
                  >
                    <span className="text-xl">{attributeIcons[label] || '🔹'}</span>
                    <span className="font-semibold text-[var(--foreground)]">{label}</span>
                    <div className="relative w-20 h-2 bg-[rgba(255,255,255,0.08)] rounded-full mx-2 overflow-hidden">
                      <div
                        className="absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r from-aqua-400 to-mint-400 transition-all duration-700"
                        style={{ width: `${Math.round(val * 100)}%` }}
                      />
                    </div>
                    <span className="text-aqua-400 font-mono text-sm">{(val * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-10 animate-fadeUp">
            <button
              onClick={onDownloadReport}
              className="relative overflow-hidden bg-gradient-to-r from-aqua-500 to-mint-500 text-black font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-aqua-400 group"
              type="button"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Report
              </span>
              {/* Ripple effect */}
              <span className="absolute inset-0 bg-white opacity-0 group-active:opacity-10 transition duration-300 rounded-xl" />
            </button>
            <button
              onClick={onAnalyzeAnother}
              className="relative overflow-hidden btn-ghost font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-aqua-400 group"
              type="button"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                Analyze Another
              </span>
              <span className="absolute inset-0 bg-aqua-400 opacity-0 group-active:opacity-10 transition duration-300 rounded-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;