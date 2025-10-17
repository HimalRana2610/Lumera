'use client';
import React, { useRef, useState } from 'react';
import CameraCapture from './CameraCapture';

interface NewUploadAreaProps {
  onImageUpload: (file: File) => void;
}

const NewUploadArea: React.FC<NewUploadAreaProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    setShowCamera(true);
  };

  const handleCameraCapture = (imageSrc: string) => {
    // Convert data URL to File object
    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
        onImageUpload(file);
      });
    setShowCamera(false);
  };

  const handleCameraClose = () => {
    setShowCamera(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <>
      {showCamera && (
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={handleCameraClose}
        />
      )}
      
  <div id="upload" className="w-full max-w-2xl mx-auto">
        <div 
          className={`relative rounded-3xl shadow-xl border-2 border-dashed transition-all duration-200 ${
            isDragging ? 'border-[#8B5CF6] bg-[#8B5CF6]/10' : 'border-[#8B5CF6]/40 hover:border-[#8B5CF6]/60'
          }`}
          style={{
            background: isDragging 
              ? 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(109,40,217,0.15) 100%)'
              : 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(109,40,217,0.08) 100%)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(139,92,246,0.2)'
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
        <div className="p-12 text-center">
          {/* Upload Icon */}
          <div className="mb-6 flex justify-center">
            <div className="rounded-full p-6" style={{background:'linear-gradient(135deg, rgba(62,231,242,0.15) 0%, rgba(63,211,255,0.15) 100%)'}}>
              <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
                <path d="M24 32V20M24 20L20 24M24 20L28 24" stroke="#3ee7f2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M36 28V36C36 37.1 35.1 38 34 38H14C12.9 38 12 37.1 12 36V28" stroke="#3ee7f2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="heading-3 text-white mb-1">
            Upload or Capture Image
          </h2>

          {/* Description */}
          <p className="body-text text-[#b3b8e0] mb-6">
            Drag and drop an image, or use the buttons below
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Upload Image Button */}
            <button
              onClick={handleUploadClick}
              className="bg-gradient-to-r from-[#3ee7f2] to-[#3fd3ff] hover:from-[#3fd3ff] hover:to-[#3ee7f2] text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
              style={{fontFamily:'Poppins, Inter, sans-serif', boxShadow:'0 4px 20px rgba(62,231,242,0.4)'}}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path d="M10 14V6M10 6L7 9M10 6L13 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 12V16C17 16.5 16.5 17 16 17H4C3.5 17 3 16.5 3 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Upload Image
            </button>

            {/* Use Camera Button */}
            <button
              onClick={handleCameraClick}
              className="border-2 border-[#3ee7f2] text-[#3ee7f2] hover:bg-[#3ee7f2]/10 font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              style={{fontFamily:'Poppins, Inter, sans-serif'}}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="10" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 5L8 3H12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Use Camera
            </button>
          </div>
        </div>
      </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
    </>
  );
};

export default NewUploadArea;
