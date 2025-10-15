from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import io
import os
import datetime
from model_loader import predict_attributes_from_bytes, load_model
from summarizer import generate_summary, save_analysis_to_file
from utils.pdf_generator import generate_pdf_report

app = FastAPI()

# Load the model when the app starts
print("Loading AI model...")
model = load_model()
print("Model loaded successfully!")

# CORS configuration
origins = [
    "http://localhost:3000",  # React app default port
    "http://localhost:8000",  # FastAPI default port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")
    
    # Read image bytes
    image_bytes = await file.read()
    
    try:
        # Step 1: Get model predictions
        prediction = predict_attributes_from_bytes(image_bytes)
        
        if "error" in prediction:
            raise HTTPException(status_code=500, detail=f"Model prediction failed: {prediction['error']}")
        
        # Step 2: Generate summary using the attribute interpreter
        analysis_data = generate_summary(prediction)
        
        # Step 3: Save analysis to file for potential PDF generation
        analysis_file_path = save_analysis_to_file(analysis_data)
        
        # Return comprehensive analysis
        return JSONResponse(content={
            "success": True,
            "prediction": prediction,
            "summary": analysis_data["summary"],
            "skincare_recommendations": analysis_data["skincare_recommendations"],
            "grooming_recommendations": analysis_data["grooming_recommendations"],
            "grouped_attributes": analysis_data["grouped_attributes"],
            "analysis_file": analysis_file_path
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.post("/generate_report")
async def generate_report(data: dict):
    """
    Generate a PDF report from analysis data.
    Expects analysis data in the request body.
    """
    try:
        # Check if we have analysis data
        if not data or "summary" not in data:
            raise HTTPException(status_code=400, detail="Invalid analysis data provided")
        
        # Generate PDF report
        pdf_bytes, filename = generate_pdf_report(data)
        
        if pdf_bytes is None:
            raise HTTPException(status_code=500, detail="Failed to generate PDF report")
        
        # Return PDF as streaming response
        return StreamingResponse(
            io.BytesIO(pdf_bytes),
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename={filename}"
            }
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Report generation failed: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "Lumera AI Facial Analysis API is running"}
