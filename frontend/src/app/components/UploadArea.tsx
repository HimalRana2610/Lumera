'use client';

import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = { width: 400, height: 320, facingMode: 'user' };

export default function UploadArea({ onImageUpload }: { onImageUpload: (f: File) => void; }) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const webcamRef = useRef<Webcam | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [camera, setCamera] = useState(false);
  const [drag, setDrag] = useState(false);

  const openFile = () => fileRef.current?.click();
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (f) { const r = new FileReader(); r.onload = () => setPreview(String(r.result)); r.readAsDataURL(f); onImageUpload(f); }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className={`glass-card w-full max-w-2xl mx-auto rounded-2xl p-8 ${drag ? 'border-[var(--accent-primary)]' : ''} transition-all`}>
        <input ref={fileRef} type="file" className="hidden" accept="image/*" onChange={onFile} />
        <div
          className={`rounded-xl p-6 min-h-[260px] flex flex-col items-center justify-center transition-all ${camera ? '' : 'hover:shadow-lg'}`}
          onDragOver={(e)=>{e.preventDefault(); setDrag(true);}}
          onDragLeave={()=>setDrag(false)}
          onDrop={(e)=>{
            e.preventDefault(); setDrag(false);
            const f = e.dataTransfer.files?.[0];
            if(f){ const r=new FileReader(); r.onload=()=>setPreview(String(r.result)); r.readAsDataURL(f); onImageUpload(f); }
          }}
        >
          {!preview && !camera && (
            <>
              <div className="text-[var(--muted)] mb-4 text-lg">Drag & drop an image or</div>
              <div className="flex gap-3">
                <button onClick={openFile} className="btn-ghost font-semibold text-base">Upload from Files</button>
                <button onClick={()=>setCamera(true)} className="bg-[var(--accent-primary)] text-black px-5 py-2 rounded-lg font-semibold text-base shadow-md hover:scale-105 transition-transform">Open Camera</button>
              </div>
            </>
          )}

          {camera && (
            <div className="w-full max-w-lg h-64 bg-black rounded-lg overflow-hidden relative">
              <Webcam ref={webcamRef} audio={false} videoConstraints={videoConstraints} screenshotFormat="image/png" className="w-full h-full object-cover" />
              <button
                onClick={async ()=>{
                  const src = webcamRef.current?.getScreenshot();
                  if(src){
                    setPreview(src);
                    const res = await fetch(src);
                    const blob = await res.blob();
                    const f = new File([blob],'capture.png',{type:'image/png'});
                    onImageUpload(f);
                  }
                  setCamera(false);
                }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[var(--accent-primary)] text-black py-2 px-6 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
              >Capture</button>
            </div>
          )}

          {preview && !camera && (
            <div className="w-full max-w-lg h-64 rounded-lg overflow-hidden">
              <img src={preview} alt="preview" className="w-full h-full object-contain rounded-lg" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}