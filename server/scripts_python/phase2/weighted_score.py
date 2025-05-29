from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(_name_)

# Load sentiment analysis model once at startup
sentiment_analyzer = pipeline("sentiment-analysis")

def get_sentiment_score(note: str) -> float:
    try:
        result = sentiment_analyzer(note)[0]
        return result['score'] if result['label'] == 'POSITIVE' else 1 - result['score']
    except Exception:
        return 0.5  # fallback neutral score

@app.route('/interview-analyze', methods=['POST'])
def analyze_interviews():
    try:
        data = request.json
        interviews = data.get("interviews", [])
        results = []

        for interview in interviews:
            note = interview.get("notes", "")
            notes_score = get_sentiment_score(note) if note else 0.0

            # Placeholder for emotion/video score logic
            video_score = 0.0  # Replace this later with actual video analysis

            # Collect all valid scores
            scores = [
                interview.get("communication"),
                interview.get("technical"),
                interview.get("motivation"),
                notes_score,
                video_score
            ]
            valid_scores = [s for s in scores if s is not None]

            overall_score = round(sum(valid_scores) / len(valid_scores), 5) if valid_scores else None

            results.append({
                'notes': round(notes_score, 5),
                'video': round(video_score, 5),
                'overall': overall_score
            })

        return jsonify({ 'scores': results })

    except Exception as e:
        return jsonify({ 'error': str(e) }), 500

if _name_ == '_main_':
    app.run(host='0.0.0.0', port=4000, debug=True)