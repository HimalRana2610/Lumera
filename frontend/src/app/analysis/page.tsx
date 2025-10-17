'use client';
import NewUploadArea from '../components/NewUploadArea';
import { uploadImageForAnalysis, recordConsent } from '../lib/api';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AnalysisPage() {
  const [showUpload, setShowUpload] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisData, setAnalysisData] = useState<{ 
    summary: string; 
    attributes: Record<string, number | string>;
    skincare_recommendations?: string[];
    grooming_recommendations?: string[];
    grouped_attributes?: Record<string, unknown>;
    cropped_image?: string;
    report_url?: string;
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
      const data: {
        summary: string;
        attributes: Record<string, number | string>;
        skincare_recommendations?: string[];
        grooming_recommendations?: string[];
        grouped_attributes?: Record<string, unknown>;
        cropped_image?: string;
        cropped_image_filename?: string;
        report_url?: string;
      } = await uploadImageForAnalysis(uploadedFile);
      setAnalysisData(data);
      if (data?.cropped_image_filename) {
        setCroppedFilename(data.cropped_image_filename);
      }
      setShowSummary(true);
    } catch (error) {
      console.error('Error generating summary:', error);
      let msg = 'Failed to analyze image. Ensure a clear face is visible and try again.';
      if (error instanceof Error) {
        msg = error.message;
      } else if (typeof error === 'object' && error !== null && 'response' in error) {
        const maybeResp = error as { response?: { data?: { detail?: string } } };
        msg = maybeResp.response?.data?.detail || msg;
      }
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
    <main className="flex flex-col items-center w-full min-h-screen bg-gradient-to-br from-[#181c2f] via-[#23244a] to-[#101a2a] text-[#e6f6f2] font-sans overflow-x-hidden">
      {/* Navigation back to homepage */}
      <div className="w-full px-4 pt-6">
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
            style={{
              fontFamily:'Poppins, Inter, sans-serif',
              background:'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(109,40,217,0.15) 100%)',
              border:'2px solid rgba(139,92,246,0.3)',
              color:'#a084ee',
              boxShadow:'0 4px 15px rgba(139,92,246,0.2)'
            }}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path d="M12.5 15l-5-5 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Homepage
          </Link>
        </div>
      </div>
      
      <div className="w-full flex flex-col items-center justify-center py-12 max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center mb-10">
          <div className="rounded-2xl p-4 mb-6 flex items-center justify-center" style={{background:'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(109,40,217,0.15) 100%)', boxShadow:'0 0 24px rgba(139,92,246,0.35)'}}>
            <Image
              src="/logo_new.jpg"
              alt="LUMERA AI Logo"
              width={70}
              height={70}
              className="rounded-xl shadow-lg border border-[#8B5CF6] bg-white p-2"
              style={{ boxShadow: '0 0 15px rgba(139,92,246,0.5)', background: '#fff', padding: '8px', borderWidth: '2px' }}
              unoptimized
              key={Date.now()}
            />
          </div>
          <h1 className="heading-2 mb-2 text-center bg-clip-text text-transparent" style={{fontFamily:'Poppins, Inter, sans-serif', backgroundImage:'linear-gradient(90deg, #3ee7f2 0%, #3fd3ff 40%, #3ee7f2 100%)', textShadow:'0 2px 16px rgba(62,231,242,0.35)'}}>ILLUMINATE YOUR BEAUTY WITH AI</h1>
          <p className="lead text-[#b3b8e0] text-center max-w-2xl">Advanced CNN-powered facial attribute analysis with privacy-first detailed reporting</p>
        </div>

        {showUpload ? (
          <NewUploadArea onImageUpload={onImageUpload} />
        ) : (
          <>
            {/* Image Preview */}
            <div className="relative mb-8 animate-fadeUp">
              <div className="rounded-2xl p-4 bg-[#0f1222] shadow-2xl max-w-md mx-auto border border-[#8B5CF6]/40" style={{boxShadow:'0 10px 40px rgba(139,92,246,0.35)'}}>
                {errorMsg ? (
                  <div className="p-4 text-red-600 text-center font-semibold">{errorMsg}</div>
                ) : (
                  <>
                    {/* Show cropped face if available, else original preview */}
                    {analysisData?.cropped_image ? (
                      <Image src={analysisData.cropped_image} alt="Cropped Face" width={400} height={256} className="w-full h-64 object-cover rounded-xl" />
                    ) : (
                      imagePreview && <Image src={imagePreview} alt="Analysis Image" width={400} height={256} className="w-full h-64 object-cover rounded-xl" />
                    )}
                  </>
                )}
                <button
                  onClick={resetToUpload}
                  className="absolute top-2 right-2 bg-[#EF4444] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg hover:bg-[#DC2626] transition-colors"
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
                  className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-semibold px-6 py-3 rounded-xl shadow-xl hover:from-[#7C3AED] hover:to-[#8B5CF6] transition-all duration-200 flex items-center gap-2 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={isGeneratingSummary}
                  style={{fontFamily: 'Poppins, Inter, sans-serif', boxShadow:'0 4px 20px rgba(139,92,246,0.4)'}}
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
                  className="bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white font-semibold px-6 py-3 rounded-xl shadow-xl hover:from-[#8B5CF6] hover:to-[#7C3AED] transition-all duration-200 flex items-center gap-2 justify-center"
                  style={{fontFamily: 'Poppins, Inter, sans-serif', boxShadow:'0 4px 20px rgba(124,58,237,0.4)'}}
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
                <p className="text-center text-[#e6f6f2] mb-6 max-w-xl" style={{fontFamily: 'Poppins, Inter, sans-serif'}}>
                  {isGeneratingReport
                    ? "Generating your detailed PDF report..."
                    : "To get detailed analysis report, please allow us to use your uploaded image to improve our AI model. Your image will be used securely and only for model training purposes. You can choose to accept or reject this request below."}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={handleRejectConsent}
                    disabled={isGeneratingReport}
                    className="px-6 py-3 rounded-xl bg-[#2d3148] text-[#e6e8ff] font-bold shadow hover:bg-[#343a5b] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{fontFamily: 'Poppins, Inter, sans-serif'}}
                  >
                    Reject
                  </button>
                  <button
                    onClick={handleAcceptConsent}
                    disabled={isGeneratingReport}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-bold shadow hover:from-[#7C3AED] hover:to-[#8B5CF6] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{fontFamily: 'Poppins, Inter, sans-serif', boxShadow:'0 4px 20px rgba(139,92,246,0.4)'}}
                  >
                    Accept
                  </button>
                </div>
              </div>
            )}

            {/* Summary */}
            {showSummary && analysisData && (
              <div className="p-6 rounded-xl mb-6 animate-fadeUp max-w-2xl" style={{background:'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(109,40,217,0.12) 100%)', border:'2px solid rgba(139,92,246,0.25)', boxShadow:'0 4px 20px rgba(139,92,246,0.15)'}}>
                <h2 className="heading-3 text-center mb-3 text-white">
                  AI-Generated Summary
                </h2>
                <p className="body-text text-[#b3b8e0] leading-relaxed font-medium text-center">
                  {analysisData.summary}
                </p>
              </div>
            )}

            {/* Detailed Analysis */}
            {showDetailed && renderDetailedAnalysis()}

            {/* New Upload Button */}
            <button
              onClick={resetToUpload}
              className="mt-8 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:from-[#7C3AED] hover:to-[#8B5CF6] transition-all duration-200"
              style={{fontFamily:'Poppins, Inter, sans-serif', boxShadow:'0 4px 20px rgba(139,92,246,0.4)'}}
            >
              Analyze Another Image
            </button>
          </>
        )}
      </div>
    </main>
  );
}
