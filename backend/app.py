from fastapi import FastAPI, UploadFile, File, HTTPException, Body, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import sys
import base64
import tempfile
import datetime

sys.path.append(os.path.dirname(__file__))
from test import test_api
from temp import crop_face
from Gemini import (
    configure_gemini,
    generate_report_data as gemini_generate_report,
    generate_html_report as gemini_generate_html_report,
    load_json_file as gemini_load_json_file,
)

app = FastAPI()
BASE_DIR = os.path.dirname(__file__)

# NOTE: This backend is stateless — it does NOT write uploaded images or reports to
# disk. The cropped face is returned as a base64 data URL and the report is returned as
# inline HTML, so it runs on read-only/serverless filesystems (e.g. Vercel) as well as
# locally without any persistent storage.

# CORS configuration
# Localhost dev origins are always allowed; production origins come from the
# FRONTEND_ORIGINS env var (comma-separated), e.g.
# FRONTEND_ORIGINS=https://lumera-frontend.vercel.app
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
extra_origins = os.environ.get("FRONTEND_ORIGINS", "")
if extra_origins:
    origins.extend(o.strip() for o in extra_origins.split(",") if o.strip())

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/predict")
async def predict(request: Request, file: UploadFile = File(...)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")

    name_root, _ = os.path.splitext(file.filename or "uploaded.jpg")
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S_%f")
    cropped_filename = f"cropped_{name_root}_{timestamp}.jpg"
    image_bytes = await file.read()

    # Crop + predict use file paths, so write to a temp dir that's cleaned up after.
    with tempfile.TemporaryDirectory() as tmp:
        input_path = os.path.join(tmp, "input.jpg")
        cropped_path = os.path.join(tmp, "cropped.jpg")
        with open(input_path, "wb") as f_out:
            f_out.write(image_bytes)

        try:
            crop_face(input_path, cropped_path, expand_ratio=0.3)
            with open(cropped_path, "rb") as cf:
                cropped_bytes = cf.read()
            cropped_image_data_url = "data:image/jpeg;base64," + base64.b64encode(cropped_bytes).decode("utf-8")
        except Exception as e:
            print(f"[ERROR] Cropping failed: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Cropping failed: {str(e)}")

        try:
            prediction = test_api(cropped_path)
        except Exception as e:
            print(f"[ERROR] Prediction failed: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

    if prediction is None:
        raise HTTPException(status_code=500, detail="No prediction returned from the model API.")
    print("[DEBUG] Hugging Face prediction received.")

    try:
        configure_gemini()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini configuration failed: {str(e)}")

    try:
        feature_descriptions = gemini_load_json_file(os.path.join(BASE_DIR, "attribute_mapping.json"))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load attribute mapping: {str(e)}")

    try:
        # Single Gemini call returns both the summary and the content sections
        summary_text, content_sections = gemini_generate_report(prediction, feature_descriptions)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Report generation failed: {str(e)}")

    # Self-contained HTML report: the cropped image is embedded as a data URL, so the
    # report needs no static file serving and can be opened/downloaded as-is.
    try:
        html = gemini_generate_html_report(
            data=prediction,
            summary=summary_text,
            content=content_sections,
            image_path=cropped_image_data_url,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate HTML report: {str(e)}")

    return JSONResponse(content={
        "success": True,
        "prediction": prediction,
        "summary": summary_text,
        "skincare_recommendations": content_sections.get("skincare_list", []),
        "grooming_recommendations": content_sections.get("grooming_list", []),
        "grouped_attributes": None,
        "report_html": html,
        "cropped_image": cropped_image_data_url,
        "cropped_image_filename": cropped_filename,
    })


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "Lumera AI Facial Analysis API is running"}


@app.post("/consent")
async def consent(data: dict = Body(...)):
    """Records user consent to use their image for model improvement.

    This backend is stateless, so the image is not persisted here. To actually retain
    consented images, wire this up to external storage (e.g. Vercel Blob / S3).
    """
    filename = data.get("filename")
    if not filename or not isinstance(filename, str):
        raise HTTPException(status_code=400, detail="filename is required")
    return {"success": True}


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("app:app", host="0.0.0.0", port=port)
