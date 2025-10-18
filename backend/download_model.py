"""
Utility to download the ML model from Google Drive on first run or deployment.
This keeps the model out of GitHub (>100MB limit) while ensuring it's available when needed.
"""

import os
import requests
from pathlib import Path
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get Google Drive URL from environment variable (more secure)
GOOGLE_DRIVE_MODEL_URL = os.getenv("MODEL_DOWNLOAD_URL", "")

# Local model path
MODEL_DIR = "./model"
MODEL_PATH = os.path.join(MODEL_DIR, "convnext_tiny_celeb.pth")

def get_google_drive_download_url(share_link):
    """
    Convert Google Drive share link to direct download URL.
    
    If you have a share link like:
    https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    
    This function converts it to:
    https://drive.google.com/uc?export=download&id=FILE_ID
    
    Args:
        share_link (str): Google Drive share link
    
    Returns:
        str: Direct download URL
    """
    if "drive.google.com" in share_link:
        if "/file/d/" in share_link:
            file_id = share_link.split("/file/d/")[1].split("/")[0]
            return f"https://drive.google.com/uc?export=download&id={file_id}"
    return share_link

def download_file_from_google_drive(url, destination):
    """
    Download a file from Google Drive with progress indication.
    Handles large files with confirmation tokens.
    
    Args:
        url (str): Google Drive download URL
        destination (str): Local file path to save the model
    """
    session = requests.Session()
    
    print(f"📥 Downloading model from Google Drive...")
    print(f"   URL: {url[:60]}...")
    
    response = session.get(url, stream=True)
    
    # Handle Google Drive warning for large files
    token = None
    for key, value in response.cookies.items():
        if key.startswith('download_warning'):
            token = value
            break
    
    if token:
        params = {'confirm': token}
        url_with_token = url + f"&confirm={token}"
        response = session.get(url_with_token, stream=True)
    
    # Save the file
    total_size = int(response.headers.get('content-length', 0))
    block_size = 8192
    downloaded = 0
    
    os.makedirs(os.path.dirname(destination), exist_ok=True)
    
    with open(destination, 'wb') as f:
        for chunk in response.iter_content(chunk_size=block_size):
            if chunk:
                f.write(chunk)
                downloaded += len(chunk)
                if total_size > 0:
                    progress = (downloaded / total_size) * 100
                    print(f"\r   Progress: {progress:.1f}% ({downloaded / (1024*1024):.1f} MB / {total_size / (1024*1024):.1f} MB)", end='')
    
    print(f"\n✅ Model downloaded successfully to: {destination}")
    print(f"   File size: {os.path.getsize(destination) / (1024*1024):.1f} MB")

def ensure_model_exists():
    """
    Check if the model file exists locally.
    If not, download it from Google Drive.
    
    Returns:
        bool: True if model is ready, False otherwise
    """
    if os.path.exists(MODEL_PATH):
        file_size = os.path.getsize(MODEL_PATH) / (1024 * 1024)
        print(f"✅ Model already exists: {MODEL_PATH} ({file_size:.1f} MB)")
        return True
    
    print(f"⚠️  Model not found at: {MODEL_PATH}")
    
    if not GOOGLE_DRIVE_MODEL_URL or GOOGLE_DRIVE_MODEL_URL == "your_google_drive_model_link_here":
        print("❌ ERROR: Google Drive model URL not configured!")
        print("   Please set MODEL_DOWNLOAD_URL in your .env file")
        print("   Example: MODEL_DOWNLOAD_URL=\"https://drive.google.com/file/d/YOUR_FILE_ID/view\"")
        return False
    
    try:
        # Convert share link to direct download URL if needed
        download_url = get_google_drive_download_url(GOOGLE_DRIVE_MODEL_URL)
        
        # Download the model
        download_file_from_google_drive(download_url, MODEL_PATH)
        
        return True
        
    except Exception as e:
        print(f"❌ Error downloading model: {str(e)}")
        return False

if __name__ == "__main__":
    """
    Can be run standalone to pre-download the model:
    python download_model.py
    """
    print("=" * 60)
    print("🤖 LUMERA AI - Model Download Utility")
    print("=" * 60)
    
    if ensure_model_exists():
        print("\n✅ Model is ready to use!")
        sys.exit(0)
    else:
        print("\n❌ Model download failed!")
        sys.exit(1)
