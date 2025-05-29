from flask import Flask, request, jsonify
import cv2
from deepface import DeepFace
from transformers import pipeline
import joblib
import numpy as np
import os
import json
from datetime import datetime
import traceback
from predict import Predictor
from config import Config

app = Flask(__name__)
predictor = Predictor()
sentiment_analyzer = pipeline("sentiment-analysis")

LOGS_DIR = Config.BASE_DIR / 'logs'
os.makedirs(LOGS_DIR, exist_ok=True)

# Converts relative video path to absolute
def safe_video_path(relative_upload_path):
    return str(Config.BASE_DIR / relative_upload_path.replace("\\", "/"))

# Helper Functions
def analyze_video(video_path):
    try:
        cap = cv2.VideoCapture(video_path)
        frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        sample_rate = max(1, frame_count // 10)
        emotions = []
        frame_logs = []

        for i in range(0, frame_count, sample_rate):
            cap.set(cv2.CAP_PROP_POS_FRAMES, i)
            ret, frame = cap.read()
            if not ret:
                continue
            try:
                analysis = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
                dominant_emotion = analysis[0]['dominant_emotion']
                emotion_scores = {k: float(v) for k, v in analysis[0]['emotion'].items()}
                emotions.append(dominant_emotion)
                frame_logs.append({
                    'frame': i,
                    'dominant_emotion': dominant_emotion,
                    'emotion_scores': emotion_scores
                })
            except Exception as e:
                frame_logs.append({'frame': i, 'error': str(e)})

        cap.release()

        emotion_weights = {
            'happy': 1.0, 'surprise': 0.8, 'neutral': 0.6,
            'sad': 0.4, 'angry': 0.3, 'fear': 0.2, 'disgust': 0.1
        }
        score = sum(emotion_weights.get(e, 0.5) for e in emotions) / len(emotions) if emotions else 0.5

        # Save log
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        video_name = os.path.basename(video_path).replace('.mp4', '')
        log_file = LOGS_DIR / f"emotion_log_{video_name}_{timestamp}.json"
        with open(log_file, 'w', encoding='utf-8') as f:
            json.dump({
                'video_path': video_path,
                'final_emotion_score': round(score, 3),
                'frames': frame_logs
            }, f, indent=2)
        print(f"[LOG] Emotion analysis saved to: {log_file}")

        return score
    except Exception as e:
        print(f"[ERROR] Emotion analysis failed: {e}")
        return 0.5


@app.route('/interview-analyze', methods=['POST'])
def analyze_interviews():
    try:
        data = request.json
        results = {'scores': []}
        
        for interview in data['interviews']:
            # Extract data
            communication = interview.get('communication', 3)
            technical = interview.get('technical', 3)
            motivation = interview.get('motivation', 3)
            notes = interview.get('notes', '')
            video_path_raw = interview.get('video_path', '')

            # Analyze sentiment
            if notes.strip():
                sentiment = sentiment_analyzer(notes)[0]
                notes_score = sentiment['score'] if sentiment['label'] == 'POSITIVE' else 1 - sentiment['score']
                print(f"[SENTIMENT] Note: {notes}")
                print(f"[SENTIMENT] Label: {sentiment['label']}, Score: {notes_score}")
            else:
                notes_score = 0.5
                print("[SENTIMENT] No note provided, defaulting score to 0.5")

            # Analyze video
            video_path = safe_video_path(video_path_raw) if video_path_raw else None
            if video_path and os.path.exists(video_path):
                print(f"[VIDEO] Analyzing video at: {video_path}")
                video_score = analyze_video(video_path)
            else:
                print("[VIDEO] Missing or invalid video_path. Using default score 0.5")
                video_score = 0.5

            # Calculate manual score (form average)
            manual_score = (communication + technical + motivation) / 3

            # Predict with ML model
            ml_score = predictor.predict({
                'communication': communication,
                'technical': technical,
                'motivation': motivation,
                'notes': notes_score,
                'video': video_score
            }) if predictor.model else None

            if predictor.model:
                print("✅ Model is loaded.")
            else:
                print("❌ Model not loaded. Using fallback logic.")

            # Final score
            overall_score = ml_score if ml_score is not None else manual_score

            # Append result
            results['scores'].append({
                'notes': round(notes_score, 2),
                'video': round(video_score, 2),
                'overall': round(overall_score, 2)
            })

        return jsonify(results)

    except Exception as e:
        print("[ERROR] Exception in /interview-analyze:")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host=Config.HOST, port=Config.PORT, debug=Config.DEBUG)