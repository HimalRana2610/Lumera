'use client';
import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

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
        .then(blob => {
          const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
          onCapture(capturedImage);
        });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800" style={{fontFamily:'Poppins, Inter, sans-serif'}}>
            Camera Capture
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition-colors"
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
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-teal-300 text-white py-3 px-8 rounded-full font-bold shadow-lg hover:from-cyan-300 hover:to-teal-200 transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
                style={{fontFamily:'Poppins, Inter, sans-serif'}}
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
              <img
                src={capturedImage}
                alt="Captured"
                className="w-full h-80 object-cover"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          {!capturedImage ? (
            <div className="flex justify-center">
              <button
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
                style={{fontFamily:'Poppins, Inter, sans-serif'}}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex gap-3 justify-center">
              <button
                onClick={retakePhoto}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center gap-2"
                style={{fontFamily:'Poppins, Inter, sans-serif'}}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18l-6-6m0 0l6-6m-6 6h12" />
                </svg>
                Retake
              </button>
              <button
                onClick={usePhoto}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors flex items-center gap-2 shadow-lg"
                style={{fontFamily:'Poppins, Inter, sans-serif'}}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Use this photo
              </button>
              <button
                onClick={onClose}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center gap-2"
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
