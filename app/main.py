from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import pandas as pd
import json
import os
from .models.dbscan_model import DBSCANModel
from .models.text_categorizer import TextCategorizer
from .models.image_classifier import ImageClassifier

app = FastAPI(title="Verifix ML Server API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize models
dbscan_model = DBSCANModel()
text_categorizer = TextCategorizer()
issue_categorizer = TextCategorizer()
image_classifier = ImageClassifier()

class ClusterRequest(BaseModel):
    data: List[List[float]]
    eps: Optional[float] = 0.5
    min_samples: Optional[int] = 5

class TextRequest(BaseModel):
    texts: List[str]

class PredictionResponse(BaseModel):
    predictions: List[int]
    probabilities: Optional[List[List[float]]] = None

#Routes
@app.get("/")
async def root():
    return {"message": "Verifix ML Server API is running", "version": "1.0.0"}

@app.post("/cluster", response_model=dict)
async def cluster_data(request: ClusterRequest):
    try:
        dbscan_model.eps = request.eps
        dbscan_model.min_samples = request.min_samples
        
        clusters = dbscan_model.fit(request.data)
        
        return {
            "clusters": clusters.tolist(),
            "n_clusters": len(set(clusters)) - (1 if -1 in clusters else 0),
            "noise_points": list(clusters).count(-1)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/categorize/text", response_model=PredictionResponse)
async def categorize_text(request: TextRequest):
    try:
        predictions = [0] * len(request.texts)  # Placeholder
        probabilities = [[0.5, 0.5]] * len(request.texts)  # Placeholder
        
        return PredictionResponse(
            predictions=predictions,
            probabilities=probabilities
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/categorize/issues", response_model=PredictionResponse)
async def categorize_issues(request: TextRequest):
    # Same as text categorization
    return await categorize_text(request)

@app.post("/classify/image")
async def classify_image(file: UploadFile = File(...)):
    try:
        # Save uploaded file
        upload_dir = "data/uploads"
        os.makedirs(upload_dir, exist_ok=True)
        
        file_path = os.path.join(upload_dir, file.filename)
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Validate and classify
        result = image_classifier.validate_image(file_path)
        os.remove(file_path)
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy", "models": ["DBSCAN", "Text Categorizer", "Image Classifier", "Issue Categorizer"]}
