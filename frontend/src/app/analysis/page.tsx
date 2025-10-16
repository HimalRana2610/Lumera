'use client';
import NewUploadArea from '../components/NewUploadArea';
import { uploadImageForAnalysis, recordConsent } from '../lib/api';
import React, { useState } from 'react';
import Image from 'next/image';

export default function AnalysisPage() {
  const [showUpload, setShowUpload] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisData, setAnalysisData] = useState<{ 
    summary: string; 
    attributes: Record<string, number | string>;
    skincare_recommendations?: string[];
    grooming_recommendations?: string[];
    grouped_attributes?: any;
    cropped_image?: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);
  const [consentShown, setConsentShown] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [croppedFilename, setCroppedFilename] = useState<string | null>(null);

  const onImageUpload = (file: File) => {
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(String(e.target?.result));
      setShowUpload(false);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateSummary = async () => {
    if (!uploadedFile) return;
    try {
      setErrorMsg(null);
      setIsGeneratingSummary(true);
      const data = await uploadImageForAnalysis(uploadedFile);
      setAnalysisData(data);
      if ((data as any)?.cropped_image_filename) {
        setCroppedFilename((data as any).cropped_image_filename);
      }
      setShowSummary(true);
    } catch (error) {
      console.error('Error generating summary:', error);
      const anyErr = error as any;
      const msg = anyErr?.message || anyErr?.response?.data?.detail || 'Failed to analyze image. Ensure a clear face is visible and try again.';
      setErrorMsg(msg);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const handleGetDetailed = () => {
    setConsentShown(true);
  };

  const handleAcceptConsent = async () => {
    try {
      if (croppedFilename) {
        await recordConsent(croppedFilename);
      }
    } catch (e) {
      console.error('Consent recording failed', e);
      alert('Failed to record consent. Please try again.');
      return;
    }

    setConsentShown(false);
    setShowDetailed(true);

    if (analysisData?.report_url) {
      window.open(analysisData.report_url, '_blank');
    }
  };

  const handleRejectConsent = () => {
    setConsentShown(false);
    setShowDetailed(false);
  };

  const resetToUpload = () => {
    setShowUpload(true);
    setImagePreview(null);
    setUploadedFile(null);
    setAnalysisData(null);
    setShowSummary(false);
    setShowDetailed(false);
    setConsentShown(false);
    setIsGeneratingReport(false);
  };

  const renderDetailedAnalysis = () => {
    if (!analysisData) return null;

    return (
      <div className="glass-card p-6 rounded-xl mt-6 animate-fadeUp">
        {/* <h3 className="text-2xl font-bold text-center mb-4 text-[#0a101a]" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>
          Detailed Analysis & Recommendations
        </h3> */}
        
        {/* Skincare Recommendations */}
        {/* {analysisData.skincare_recommendations && analysisData.skincare_recommendations.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-bold mb-3 text-[#0a101a] flex items-center gap-2">
              <span>🧴</span>
              Skincare Recommendations
            </h4>
            <div className="space-y-2">
              {analysisData.skincare_recommendations.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span className="text-[#0a101a] font-medium">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* Grooming Recommendations */}
        {/* {analysisData.grooming_recommendations && analysisData.grooming_recommendations.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-bold mb-3 text-[#0a101a] flex items-center gap-2">
              <span>💇‍♂️</span>
              Grooming Recommendations
            </h4>
            <div className="space-y-2">
              {analysisData.grooming_recommendations.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span className="text-[#0a101a] font-medium">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* PDF Download Success Message */}
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 text-green-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Report Generated Successfully!</span>
          </div>
          <p className="text-green-600 text-sm mt-1">
            Click Ctrl+P to open the print dialog and save as PDF to download the report
          </p>
        </div>
      </div>
    );
  };

  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-gradient-to-br from-[#f8feff] to-[#e6f6f2] text-[#0a101a] font-sans overflow-x-hidden">
      {/* Navigation back to homepage */}
      <div className="w-full max-w-6xl px-4 pt-8">
        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-600 font-medium transition-colors"
          style={{fontFamily:'Poppins, Inter, sans-serif'}}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <path d="M12.5 15l-5-5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Homepage
        </a>
      </div>
      
      <div className="w-full flex flex-col items-center justify-center py-16 max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-cyan-100 rounded-2xl p-4 mb-6 flex items-center justify-center">
            <Image
              src="/logo.jpg"
              alt="AI Facial Insight Generator Logo"
              width={70}
              height={70}
              className="rounded-lg"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-cyan-400 mb-2 text-center" style={{fontFamily:'Poppins, Inter, sans-serif'}}>AI Facial Insight Generator</h1>
          <p className="text-xl md:text-2xl text-[#9fbfc3] text-center max-w-2xl">Advanced CNN-powered facial attribute analysis with privacy-first detailed reporting</p>
        </div>

        {showUpload ? (
          <NewUploadArea onImageUpload={onImageUpload} />
        ) : (
          <>
            {/* Image Preview */}
            <div className="relative mb-8 animate-fadeUp">
              <div className="border-4 border-cyan-300 rounded-2xl p-4 bg-white shadow-2xl max-w-md mx-auto">
                {errorMsg ? (
                  <div className="p-4 text-red-600 text-center font-semibold">{errorMsg}</div>
                ) : (
                  <>
                    {/* Show cropped face if available, else original preview */}
                    {analysisData?.cropped_image ? (
                      <img src={analysisData.cropped_image} alt="Cropped Face" className="w-full h-64 object-cover rounded-xl" />
                    ) : (
                      imagePreview && <img src={imagePreview} alt="Analysis Image" className="w-full h-64 object-cover rounded-xl" />
                    )}
                  </>
                )}
                <button
                  onClick={resetToUpload}
                  className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
              {!showSummary && (
                <button
                  onClick={handleGenerateSummary}
                  className="bg-gradient-to-r from-cyan-400 to-teal-300 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:from-cyan-300 hover:to-teal-200 transition-all duration-200 flex items-center gap-2 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={isGeneratingSummary}
                  style={{fontFamily: 'Poppins, Inter, sans-serif'}}
                >
                  {isGeneratingSummary ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Generate Summary
                    </>
                  )}
                </button>
              )}
              {showSummary && !showDetailed && (
                <button
                  onClick={handleGetDetailed}
                  className="bg-gradient-to-r from-teal-300 to-cyan-400 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:from-teal-200 hover:to-cyan-300 transition-all duration-200 flex items-center gap-2 justify-center"
                  style={{fontFamily: 'Poppins, Inter, sans-serif'}}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Get Detailed Analysis
                </button>
              )}
            </div>

            {/* Consent Circle */}
            {consentShown && (
              <div className="flex flex-col items-center mb-8 animate-fadeUp">
                <p className="text-center text-[#0a101a] mb-6 max-w-xl" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>
                  {isGeneratingReport
                    ? "Generating your detailed PDF report..."
                    : "To get detailed analysis report, please allow us to use your uploaded image to improve our AI model. Your image will be used securely and only for model training purposes. You can choose to accept or reject this request below."}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={handleRejectConsent}
                    disabled={isGeneratingReport}
                    className="px-6 py-3 rounded-xl bg-gray-200 text-gray-800 font-bold shadow hover:bg-gray-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{fontFamily: 'Poppins, Inter, sans-serif'}}
                  >
                    Reject
                  </button>
                  <button
                    onClick={handleAcceptConsent}
                    disabled={isGeneratingReport}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-300 text-white font-bold shadow hover:from-cyan-300 hover:to-teal-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{fontFamily: 'Poppins, Inter, sans-serif'}}
                  >
                    Accept
                  </button>
                </div>
              </div>
            )}

            {/* Summary */}
            {showSummary && analysisData && (
              <div className="glass-card p-6 rounded-xl mb-6 animate-fadeUp max-w-2xl">
                <h2 className="text-2xl font-bold text-center mb-4 text-[#0a101a]" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>
                  AI-Generated Summary
                </h2>
                <p className="text-[var(--muted)] leading-relaxed text-base font-medium text-center" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>
                  {analysisData.summary}
                </p>
              </div>
            )}

            {/* Detailed Analysis */}
            {showDetailed && renderDetailedAnalysis()}

            {/* New Upload Button */}
            <button
              onClick={resetToUpload}
              className="mt-8 bg-gradient-to-r from-cyan-400 to-teal-300 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:from-cyan-300 hover:to-teal-200 transition-all duration-200"
              style={{fontFamily:'Poppins, Inter, sans-serif'}}
            >
              Analyze Another Image
            </button>
          </>
        )}
      </div>
    </main>
  );
}
