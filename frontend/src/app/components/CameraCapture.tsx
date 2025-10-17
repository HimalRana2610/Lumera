'use client';
import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import Image from 'next/image';

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
  onClose: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      setIsCapturing(true);
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
      }
      setIsCapturing(false);
    }
  }, [webcamRef]);

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  const usePhoto = () => {
    if (capturedImage) {
      // Convert data URL to File object
      fetch(capturedImage)
        .then(res => res.blob())
        .then(() => {
          onCapture(capturedImage);
        });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" style={{backdropFilter:'blur(8px)'}}>
      <div className="rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden" style={{background:'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(109,40,217,0.15) 100%)', border:'2px solid rgba(139,92,246,0.3)', backdropFilter:'blur(16px)'}}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#8B5CF6]/30">
          <h2 className="heading-3 text-white">
            Camera Capture
          </h2>
          <button
            onClick={onClose}
            className="text-[#b3b8e0] hover:text-white text-xl font-bold transition-colors"
          >
            ×
          </button>
        </div>

        {/* Camera/Image Preview */}
        <div className="p-4">
          {!capturedImage ? (
            <div className="relative bg-black rounded-xl overflow-hidden">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-80 object-cover"
                videoConstraints={{
                  width: { ideal: 1280 },
                  height: { ideal: 720 },
                  facingMode: 'user'
                }}
              />
              <button
                onClick={capture}
                disabled={isCapturing}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#3ee7f2] to-[#3fd3ff] text-white py-3 px-8 rounded-full font-bold shadow-lg hover:from-[#3fd3ff] hover:to-[#3ee7f2] transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
                style={{fontFamily:'Poppins, Inter, sans-serif', boxShadow:'0 4px 20px rgba(62,231,242,0.5)'}}
              >
                {isCapturing ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Capturing...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="10" cy="10" r="3" fill="currentColor"/>
                    </svg>
                    Capture Photo
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="relative bg-gray-100 rounded-xl overflow-hidden">
              <Image
                src={capturedImage}
                alt="Captured"
                width={1280}
                height={720}
                className="w-full h-80 object-cover"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-[#8B5CF6]/30" style={{background:'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(109,40,217,0.08) 100%)'}}>
          {!capturedImage ? (
            <div className="flex justify-center">
              <button
                onClick={onClose}
                className="bg-[#2d3148] hover:bg-[#343a5b] text-white font-semibold py-3 px-8 rounded-xl transition-colors"
                style={{fontFamily:'Poppins, Inter, sans-serif'}}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex gap-3 justify-center">
              <button
                onClick={retakePhoto}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center gap-2"
                style={{fontFamily:'Poppins, Inter, sans-serif', boxShadow:'0 4px 15px rgba(139,92,246,0.4)'}}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18l-6-6m0 0l6-6m-6 6h12" />
                </svg>
                Retake
              </button>
              <button
                onClick={usePhoto}
                className="bg-gradient-to-r from-[#3ee7f2] to-[#3fd3ff] hover:from-[#3fd3ff] hover:to-[#3ee7f2] text-white font-semibold py-3 px-8 rounded-xl transition-colors flex items-center gap-2 shadow-lg"
                style={{fontFamily:'Poppins, Inter, sans-serif', boxShadow:'0 4px 20px rgba(62,231,242,0.5)'}}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Use this photo
              </button>
              <button
                onClick={onClose}
                className="bg-[#2d3148] hover:bg-[#343a5b] text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center gap-2"
                style={{fontFamily:'Poppins, Inter, sans-serif'}}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;
