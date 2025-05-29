import os
from pathlib import Path

class Config:
    # Directory setup
    BASE_DIR = Path(__file__).resolve().parents[3]
    
    # Model paths
    MODEL_PATH = BASE_DIR / "scripts_python/phase2/ml/interview_score_predictor.pkl"
    DATASET_PATH = BASE_DIR / "scripts_python/phase2/ml/interview_scores_dataset.csv"

    
    # Flask settings
    HOST = '0.0.0.0'
    PORT = 4000
    DEBUG = True