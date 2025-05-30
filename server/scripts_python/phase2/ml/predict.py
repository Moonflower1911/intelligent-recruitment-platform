import joblib
import pandas as pd
from config import Config

class Predictor:
    def __init__(self):
        self.model = self._load_model()
    
    def _load_model(self):
        try:
            return joblib.load(Config.MODEL_PATH)
        except:
            return None
    
    def predict(self, features):
        if not self.model:
            return None
            
        try:
            input_data = pd.DataFrame([[
                features['communication'],
                features['technical'],
                features['motivation'],
                features['notes'],
                features['video']
            ]], columns=[
                'communication_score',
                'technical_score',
                'motivation_score',
                'notes_score',
                'video_score'
            ])
            return float(self.model.predict(input_data)[0])
        except:
            return None