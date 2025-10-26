from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Body
from fastapi import Request
import requests
import sys

import io
import os
sys.path.append(os.path.dirname(__file__))
from test import test_api

import datetime

# CRITICAL: Ensure model_loader.py is available before importing
# This allows storing sensitive model code in Google Drive instead of GitHub
import sys


from Gemini import (
    configure_gemini,
    generate_summary as gemini_generate_summary,
    generate_content as gemini_generate_content,
    generate_html_report as gemini_generate_html_report,
    load_json_file as gemini_load_json_file,
)
from temp import crop_face
import base64
import numpy as np
import cv2
import tempfile
import shutil

app = FastAPI()
# Mount static files for serving saved images
BASE_DIR = os.path.dirname(__file__)
STATIC_DIR = os.path.join(BASE_DIR, "static")
USER_IMAGES_DIR = os.path.join(STATIC_DIR, "user_images")
ACCEPTED_DIR = os.path.join(STATIC_DIR, "accepted")
REPORTS_DIR = os.path.join(STATIC_DIR, "reports")
os.makedirs(USER_IMAGES_DIR, exist_ok=True)
os.makedirs(ACCEPTED_DIR, exist_ok=True)
os.makedirs(REPORTS_DIR, exist_ok=True)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# Load the model when the app starts
print("Loading AI model...")
print("Model loaded successfully!")

# CORS configuration
origins = [
    "http://localhost:3000",  # React app default port
    "http://localhost:8000",  # FastAPI default port
    "http://127.0.0.1:3000",  # Allow loopback host as well
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict(request: Request, file: UploadFile = File(...)):
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")

    # Save uploaded image for reference
    name_root, _ = os.path.splitext(file.filename or "uploaded.jpg")
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S_%f")
    output_filename = f"{name_root}_{timestamp}.jpg"
    output_path = os.path.join(USER_IMAGES_DIR, output_filename)
    image_bytes = await file.read()
    with open(output_path, "wb") as f_out:
        f_out.write(image_bytes)

    # Crop the face from the uploaded image
    cropped_output_path = os.path.join(USER_IMAGES_DIR, f"cropped_{output_filename}")
    try:
        crop_face(output_path, cropped_output_path, expand_ratio=0.3)
        with open(cropped_output_path, "rb") as cf:
            cropped_image_bytes = cf.read()
        cropped_image_data_url = "data:image/jpeg;base64," + base64.b64encode(cropped_image_bytes).decode("utf-8")
    except Exception as e:
        print(f"[ERROR] Cropping failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Cropping failed: {str(e)}")

    # Use test_api to get prediction from Hugging Face using cropped image
    try:
        prediction = test_api(cropped_output_path)
        print("[DEBUG] Hugging Face prediction:", prediction)
        if prediction is None:
            print("[ERROR] No prediction returned from Hugging Face API.")
            raise HTTPException(status_code=500, detail="No prediction returned from Hugging Face API.")

        # Step 1: Generate summary
        try:
            configure_gemini()
            print("[DEBUG] Gemini configured successfully.")
        except Exception as e:
            print(f"[ERROR] Gemini configuration failed: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Gemini configuration failed: {str(e)}")

        mapping_path = os.path.join(BASE_DIR, "attribute_mapping.json")
        try:
            feature_descriptions = gemini_load_json_file(mapping_path)
            print("[DEBUG] Attribute mapping loaded.")
        except Exception as e:
            print(f"[ERROR] Failed to load attribute mapping: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Failed to load attribute mapping: {str(e)}")

        try:
            summary_text = gemini_generate_summary(prediction)
            print("[DEBUG] Summary generated.")
        except Exception as e:
            print(f"[ERROR] Summary generation failed: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Summary generation failed: {str(e)}")

        try:
            content_sections = gemini_generate_content(prediction, feature_descriptions)
            print("[DEBUG] Content sections generated.")
        except Exception as e:
            print(f"[ERROR] Content generation failed: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Content generation failed: {str(e)}")

        # Step 2: Generate HTML report and save under static/reports
        report_filename = f"report_{name_root}_{timestamp}.html"
        report_path = os.path.join(REPORTS_DIR, report_filename)
        base_url_for_image = str(request.base_url).rstrip('/')
        absolute_image_url = f"{base_url_for_image}/static/user_images/{output_filename}"
        try:
            html = gemini_generate_html_report(
                data=prediction,
                summary=summary_text,
                content=content_sections,
                image_path=absolute_image_url,
            )
            with open(report_path, "w", encoding="utf-8") as rf:
                rf.write(html)
            print("[DEBUG] HTML report generated and saved.")
        except Exception as e:
            print(f"[ERROR] Failed to generate HTML report: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Failed to generate HTML report: {str(e)}")

        base_url = str(request.base_url).rstrip('/')
        report_url = f"{base_url}/static/reports/{report_filename}"
        cropped_image_url = f"{base_url}/static/user_images/{output_filename}"

        print("[DEBUG] Returning JSON response.")
        return JSONResponse(content={
            "success": True,
            "prediction": prediction,
            "summary": summary_text,
            "skincare_recommendations": content_sections.get("skincare_list", []),
            "grooming_recommendations": content_sections.get("grooming_list", []),
            "grouped_attributes": None,
            "report_url": report_url,
            "cropped_image": cropped_image_data_url,
            "cropped_image_url": cropped_image_url,
            "cropped_image_filename": output_filename
        })
    except Exception as e:
        print(f"[ERROR] Analysis failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

## Removed legacy PDF report endpoint

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "Lumera AI Facial Analysis API is running"}

@app.post("/consent")
async def consent(request: Request, data: dict = Body(...)):
    """
    Records user consent by moving the cropped image to the accepted folder.
    Expects JSON body: { "filename": "<cropped_filename>.jpg" }
    """
    filename = data.get("filename")
    if not filename or not isinstance(filename, str):
        raise HTTPException(status_code=400, detail="filename is required")

    src_path = os.path.join(USER_IMAGES_DIR, os.path.basename(filename))
    if not os.path.exists(src_path):
        raise HTTPException(status_code=404, detail="Source image not found")

    dst_path = os.path.join(ACCEPTED_DIR, os.path.basename(filename))
    try:
        # Copy image from user_images to accepted (retain original for report)
        shutil.copy2(src_path, dst_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to record consent: {str(e)}")

    base_url = str(request.base_url).rstrip('/')
    return {"success": True, "accepted_image_url": f"{base_url}/static/accepted/{os.path.basename(filename)}"}



import os
import uvicorn
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    
    uvicorn.run("app:app", host="0.0.0.0", port=port)
