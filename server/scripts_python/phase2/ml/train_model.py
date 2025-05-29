import pandas as pd
from xgboost import XGBRegressor
import joblib
from config import Config

def train_model():
    """Train and save the scoring model using XGBoost"""
    try:
        df = pd.read_csv(Config.DATASET_PATH)

        X = df[['communication_score', 'technical_score', 'motivation_score', 
                'notes_score', 'video_score']]
        y = df['overall_score']

        # Create and train the XGBoost model
        model = XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=4, random_state=42)
        model.fit(X, y)

        # Save the model
        joblib.dump(model, Config.MODEL_PATH)
        print(f"✅ XGBoost model trained and saved to {Config.MODEL_PATH}")
        return True

    except Exception as e:
        print(f"❌ Training failed: {str(e)}")
        return False

if __name__ == "__main__":
    train_model()
