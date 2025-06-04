import os
import json
import pymysql
import pdfplumber
import whisper
import re
import string
from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer, ENGLISH_STOP_WORDS
from sklearn.metrics.pairwise import cosine_similarity
from nltk.stem import PorterStemmer
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

print("[INFO] Loading Whisper model...")
whisper_model = whisper.load_model("base")
print("[DONE] Whisper model loaded.")

DB_CONFIG = {
    'host': os.getenv('DB_HOST'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASS'),
    'database': os.getenv('DB_NAME'),
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.Cursor,
}

stemmer = PorterStemmer()

def resolve_path(rel_path):
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    return os.path.abspath(os.path.join(base_dir, rel_path.replace("\\", "/")))

def extract_cv_text(cv_path):
    with pdfplumber.open(cv_path) as pdf:
        return "\n".join([page.extract_text() or "" for page in pdf.pages])

def transcribe_video(video_path):
    result = whisper_model.transcribe(video_path)
    return result["text"].strip()

def clean_text(text):
    text = text.lower()
    text = re.sub(r"[\n\r]", " ", text)
    text = re.sub(rf"[{re.escape(string.punctuation)}]", "", text)
    words = [w for w in text.split() if w not in ENGLISH_STOP_WORDS and len(w) > 1]
    stemmed = [stemmer.stem(w) for w in words]
    return " ".join(stemmed)

def tfidf_baseline_score(profile_text, job_offer_text):
    vectorizer = TfidfVectorizer(stop_words='english', lowercase=True, ngram_range=(1, 2))
    vectors = vectorizer.fit_transform([profile_text, job_offer_text])
    similarity = cosine_similarity(vectors[0:1], vectors[1:2])[0][0]
    return round(similarity * 100, 2)

def build_offer_text(offer):
    text = " ".join([
        offer.get("poste", ""),
        offer.get("skills", ""),
        offer.get("keywords", ""),
        offer.get("formations", ""),
        offer.get("langues", ""),
        offer.get("description", "")
    ])
    return clean_text(text)

@app.route("/offer-analyze", methods=["POST"])
def offer_baseline():
    data = request.json
    offer_id = data.get("offer_id")
    if not offer_id:
        return jsonify({"error": "Missing offer_id"}), 400

    try:
        connection = pymysql.connect(**DB_CONFIG)
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT id, poste, nomEntreprise, address, city, experience,
                       formations, skills, keywords, langues, description
                FROM RecruiterForms
                WHERE id = %s
            """, (offer_id,))
            offer_row = cursor.fetchone()

            if not offer_row:
                return jsonify({"error": "Offer not found"}), 404

            offer = dict(zip((
                "id", "poste", "nomEntreprise", "address", "city", "experience",
                "formations", "skills", "keywords", "langues", "description"
            ), offer_row))

            offer_text = build_offer_text(offer)

            cursor.execute("""
                SELECT jsf.id, jsf.cvFilePath, jsf.videoFilePath,
                       jsf.nom, jsf.prenom, jsf.email, jsf.phoneNumber, jsf.address
                FROM Interests i
                JOIN JobSeekerForms jsf ON jsf.UserJobSeekerId = i.UserJobSeekerId
                WHERE i.OfferId = %s
            """, (offer_id,))
            seekers = cursor.fetchall()

        connection.close()

        enriched = []
        for seeker in seekers:
            seeker_data = dict(zip((
                "id", "cvFilePath", "videoFilePath",
                "nom", "prenom", "email", "phoneNumber", "address"
            ), seeker))

            try:
                rel_cv_path = seeker_data["cvFilePath"]
                rel_video_path = seeker_data.get("videoFilePath")

                cv_path = resolve_path(rel_cv_path) if rel_cv_path else None
                video_path = resolve_path(rel_video_path) if rel_video_path else None

                print(f"[DEBUG] Seeker {seeker_data['id']} CV path: {cv_path}")
                print(f"[DEBUG] CV Exists? {os.path.exists(cv_path)}")

                if not cv_path or not os.path.exists(cv_path):
                    raise Exception("CV not found")

                cv_text = extract_cv_text(cv_path)
                video_text = transcribe_video(video_path) if video_path and os.path.exists(video_path) else ""
                profile_text = clean_text(cv_text + "\n" + video_text)

                score = tfidf_baseline_score(profile_text, offer_text)
                seeker_data["tfidfScore"] = score

            except Exception as e:
                print(f"[WARN] {seeker_data['id']}: {str(e)}")
                seeker_data["tfidfScore"] = 0.0

            enriched.append(seeker_data)

        enriched.sort(key=lambda x: x["tfidfScore"], reverse=True)
        return jsonify(enriched)

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/analyze", methods=["POST"])
def baseline_analyze():
    print("[INFO] /baseline-analyze route triggered.")
    data = request.json
    rel_cv_path = data.get("cv_path")
    rel_video_path = data.get("video_path")

    cv_path = resolve_path(rel_cv_path) if rel_cv_path else None
    video_path = resolve_path(rel_video_path) if rel_video_path else None

    print(f"[DEBUG] Absolute CV Path: {cv_path}")
    print(f"[DEBUG] CV Exists? {os.path.exists(cv_path)}")

    if not cv_path or not os.path.exists(cv_path):
        return jsonify({"error": "CV file is missing or invalid"}), 400

    try:
        cv_text = extract_cv_text(cv_path)
        video_text = transcribe_video(video_path) if video_path and os.path.exists(video_path) else ""
        combined_text = clean_text(cv_text + "\n" + video_text)

        connection = pymysql.connect(**DB_CONFIG)
        offers = []
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT id, poste, nomEntreprise, address, city, experience,
                       formations, skills, keywords, langues, description
                FROM RecruiterForms
            """)
            rows = cursor.fetchall()
            for row in rows:
                offer = dict(zip((
                    "id", "poste", "nomEntreprise", "address", "city", "experience",
                    "formations", "skills", "keywords", "langues", "description"
                ), row))
                offers.append(offer)
        connection.close()

        for offer in offers:
            offer_text = build_offer_text(offer)
            score = tfidf_baseline_score(combined_text, offer_text)
            offer["matchPercentage"] = score

        offers.sort(key=lambda x: x["matchPercentage"], reverse=True)
        print("[DONE] Job offers scored using TF-IDF baseline.")
        return jsonify(offers)

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, host="0.0.0.0", debug=True)
