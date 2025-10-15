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
      
      <div className="w-full max-w-2xl mx-auto">
        <div 
          className={`relative bg-white rounded-3xl shadow-xl border-2 border-dashed transition-all duration-200 ${
            isDragging ? 'border-cyan-400 bg-cyan-50' : 'border-gray-200 hover:border-cyan-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
        <div className="p-12 text-center">
          {/* Upload Icon */}
          <div className="mb-6 flex justify-center">
            <div className="bg-cyan-50 rounded-full p-6">
              <svg width="48" height="48" fill="none" viewBox="0 0 48 48">
                <rect width="48" height="48" rx="12" fill="#00F0FF" fillOpacity="0.12"/>
                <path d="M24 16v12m0 0-4-4m4 4 4-4" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2" style={{fontFamily:'Poppins, Inter, sans-serif'}}>
            Upload or Capture Image
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-500 mb-8">
            Drag and drop an image, or use the buttons below
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Upload Image Button */}
            <button
              onClick={handleUploadClick}
              className="bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
              style={{fontFamily:'Poppins, Inter, sans-serif'}}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path d="M10 2v12m0 0-4-4m4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Upload Image
            </button>

            {/* Use Camera Button */}
            <button
              onClick={handleCameraClick}
              className="border-2 border-cyan-400 text-cyan-500 hover:bg-cyan-50 font-bold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              style={{fontFamily:'Poppins, Inter, sans-serif'}}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path d="M3 7a2 2 0 012-2h2.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 3h4.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.93 5H21a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" stroke="currentColor" strokeWidth="2"/>
                <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2"/>
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
