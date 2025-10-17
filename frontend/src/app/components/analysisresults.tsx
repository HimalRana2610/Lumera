import React from 'react';
import Image from 'next/image';

interface AnalysisResultsProps {
  imageUrl: string;
  summary: string;
  attributes: { label: string; value: string }[];
  onDownload: () => void;
  onReset: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  imageUrl,
  summary,
  attributes,
  onDownload,
  onReset
}) => {
  return (
    <div className="w-full max-w-4xl animate-fadeUp">
      <div className="glass-card rounded-3xl overflow-hidden p-8">
        <h2 className="heading-3 text-center mb-6 animate-slideIn">
          <span className="bg-gradient-to-r from-aqua-400 to-mint-400 bg-clip-text text-transparent">
            Analysis Results
          </span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 animate-fadeIn">
          <div className="space-y-4">
            <div className="relative group">
              <Image 
                src={imageUrl} 
                alt="Analyzed" 
                width={800}
                height={600}
                className="w-full rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="glass-card rounded-xl p-4 animate-fadeUp" style={{animationDelay: '0.2s'}}>
              <h3 className="heading-3 text-aqua-400 mb-2">Summary</h3>
              <p className="body-text text-gray-200">{summary}</p>
            </div>
          </div>

          <div className="space-y-4 animate-fadeUp" style={{animationDelay: '0.4s'}}>
            <div className="glass-card rounded-xl p-4">
              <h3 className="heading-3 text-aqua-400 mb-3">Attributes</h3>
              <div className="space-y-3">
                {attributes.map((attr, index) => (
                  <div 
                    key={attr.label}
                    className="flex justify-between items-center p-2 rounded-lg bg-black/20 animate-fadeIn"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <span className="text-gray-300">{attr.label}</span>
                    <span className="font-semibold text-aqua-400">{attr.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={onDownload}
                className="flex-1 bg-gradient-to-r from-aqua-500 to-mint-500 hover:from-aqua-600 hover:to-mint-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 animate-pulse-glow"
              >
                Download Report
              </button>
              <button
                onClick={onReset}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
              >
                Analyze Another
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;