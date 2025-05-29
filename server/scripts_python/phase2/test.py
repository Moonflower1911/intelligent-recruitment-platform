from flask import Flask, request, jsonify
import cv2
from deepface import DeepFace
import numpy as np
import os
import json
from datetime import datetime

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(CURRENT_DIR, '..', '..'))
LOGS_DIR = os.path.join(PROJECT_ROOT, 'logs')
os.makedirs(LOGS_DIR, exist_ok=True)

app = Flask(__name__)


def safe_video_path(relative_upload_path):
    safe_rel_path = relative_upload_path.replace("\\", "/")
    return os.path.join(PROJECT_ROOT, safe_rel_path)


def analyze_emotions(video_path):
    log_entries = []
    try:
        cap = cv2.VideoCapture(video_path)
        frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        sample_rate = max(1, frame_count // 10)
        emotions = []

        for i in range(0, frame_count, sample_rate):
            cap.set(cv2.CAP_PROP_POS_FRAMES, i)
            ret, frame = cap.read()
            if not ret:
                continue
            try:
                analysis = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
                dominant_emotion = analysis[0]['dominant_emotion']
                # Convert emotion scores to standard Python floats
                raw_emotion_scores = analysis[0]['emotion']
                emotion_scores = {k: float(v) for k, v in raw_emotion_scores.items()}

                emotions.append(dominant_emotion)

                log_entries.append({
                    'frame': i,
                    'dominant_emotion': dominant_emotion,
                    'emotion_scores': emotion_scores
                })
            except Exception as e:
                log_entries.append({
                    'frame': i,
                    'error': str(e)
                })

        cap.release()

        if not emotions:
            return 0.0

        emotion_score_map = {
            'happy': 1.0,
            'surprise': 0.8,
            'neutral': 0.6,
            'sad': 0.4,
            'angry': 0.3,
            'fear': 0.2,
            'disgust': 0.1
        }

        scored_emotions = [emotion_score_map.get(e, 0.5) for e in emotions]
        final_score = sum(scored_emotions) / len(scored_emotions)

        # Save log
        log_data = {
            'video_path': video_path,
            'total_frames_analyzed': len(log_entries),
            'final_emotion_score': round(final_score, 3),
            'frame_logs': log_entries
        }

        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        video_name = os.path.basename(video_path).replace('.mp4', '')
        log_file = os.path.join(LOGS_DIR, f"emotion_log_{video_name}_{timestamp}.json")

        with open(log_file, 'w', encoding='utf-8') as f:
            json.dump(log_data, f, indent=2)

        print(f"[LOG] Emotion analysis saved to: {log_file}")
        return final_score

    except Exception as e:
        print(f"[ERROR] Emotion analysis failed: {e}")
        return 0.0


@app.route('/interview-analyze', methods=['POST'])
def analyze_interviews():
    try:
        data = request.json
        results = []

        for interview in data['interviews']:
            scores = [
                interview.get('communication'),
                interview.get('technical'),
                interview.get('motivation')
            ]
            valid_scores = [s for s in scores if s is not None]

            overall = sum(valid_scores) / len(valid_scores) if valid_scores else None

            video_path_raw = interview.get('video_path')
            video_path = safe_video_path(video_path_raw)

            print(f"Attempting to analyze video at: {video_path}")
            print(f"File exists: {os.path.exists(video_path)}")

            video_score = analyze_emotions(video_path) if video_path and os.path.exists(video_path) else 0.0

            results.append({
                'notes': 0,
                'video': round(video_score, 2),
                'overall': round(overall, 2) if overall is not None else None
            })

        return jsonify({'scores': results})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000, debug=True)
