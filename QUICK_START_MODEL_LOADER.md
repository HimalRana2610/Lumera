# Quick Start Guide - Secure model_loader.py Setup

## What Changed?
✅ `model_loader.py` can now be stored securely on Google Drive  
✅ Backend automatically downloads it if not present locally  
✅ File is excluded from Git repository  
✅ Easy setup with helper script  

## Quick Setup (3 Steps)

### 1️⃣ Upload to Google Drive
1. Go to https://drive.google.com
2. Upload `backend/model_loader.py`
3. Right-click → Share → "Anyone with the link" → Copy link

### 2️⃣ Configure URL
```bash
cd backend
python setup_model_loader_url.py
# Paste your Google Drive link when prompted
```

### 3️⃣ Test It
```bash
# Remove local file to test auto-download
rm model_loader.py   # or delete manually on Windows

# Start backend - it will auto-download model_loader.py
uvicorn app:app --reload
```

## What Happens on Startup?
```
Starting backend...
⚠️  ./model_loader.py not found locally.
📥 Downloading model_loader.py from Google Drive...
   Using gdown to download file ID: YOUR_FILE_ID
✅ Download completed successfully!
✅ model_loader.py is ready to use!
Loading AI model...
Model loaded successfully!
```

## For Deployment (Render/Railway)
Just add this environment variable:
```
MODEL_LOADER_URL=https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing
```

The platform will automatically download `model_loader.py` on first startup!

## Files Created
- `backend/download_code.py` - Handles downloading model_loader.py
- `backend/setup_model_loader_url.py` - Helper to configure .env
- `backend/MODEL_LOADER_SETUP.md` - Full documentation

## Files Modified
- `backend/app.py` - Added check for model_loader.py before import
- `backend/.env.example` - Added MODEL_LOADER_URL template
- `.gitignore` - Added model_loader.py to ignore list

## Security Notes
✅ `model_loader.py` is now gitignored (won't be committed)  
✅ `.env` with URL is gitignored (keeps URL private)  
✅ Works seamlessly in local development and production  

## Need Help?
See full documentation: `backend/MODEL_LOADER_SETUP.md`
