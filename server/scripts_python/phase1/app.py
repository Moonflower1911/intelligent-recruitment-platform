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




# Create logs directory if needed
os.makedirs("logs", exist_ok=True)

def log_to_file(name, content):
    with open(os.path.join("logs", name), "w", encoding="utf-8") as f:
        f.write(content)

# Whisper model
print("[INFO] Loading Whisper model...")
whisper_model = whisper.load_model("base")
print("[DONE] Whisper model loaded.")

# DB Config
DB_CONFIG = {
    'host': os.getenv('DB_HOST'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASS'),
    'database': os.getenv('DB_NAME'),
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.Cursor,
}


stemmer = PorterStemmer()

def extract_cv_text(cv_path):
    with pdfplumber.open(cv_path) as pdf:
        text = "\n".join([page.extract_text() or "" for page in pdf.pages])
    log_to_file("cv_text.txt", text)
    return text

def transcribe_video(video_path):
    result = whisper_model.transcribe(video_path)
    text = result["text"].strip()
    log_to_file("video_text.txt", text)
    return text

def clean_text(text):
    text = text.lower()
    text = re.sub(r"[\n\r]", " ", text)
    text = re.sub(rf"[{re.escape(string.punctuation)}]", "", text)
    words = [w for w in text.split() if w not in ENGLISH_STOP_WORDS and len(w) > 1]
    stemmed = [stemmer.stem(w) for w in words]
    cleaned = " ".join(stemmed)
    return cleaned

def tfidf_baseline_score(profile_text, job_offer_text):
    documents = [profile_text, job_offer_text]
    vectorizer = TfidfVectorizer(
        stop_words='english',
        lowercase=True,
        ngram_range=(1, 2)
    )
    vectors = vectorizer.fit_transform(documents)
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
    cleaned = clean_text(text)
    log_to_file("offer_text_cleaned.txt", cleaned)
    return cleaned

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
                cv_path = seeker_data["cvFilePath"]
                video_path = seeker_data.get("videoFilePath")
                if not cv_path or not os.path.exists(cv_path):
                    raise Exception("CV not found")

                cv_text = extract_cv_text(cv_path)
                video_text = transcribe_video(video_path) if video_path and os.path.exists(video_path) else ""
                profile_text = clean_text(cv_text + "\n" + video_text)
                log_to_file(f"profile_{seeker_data['id']}.txt", profile_text)

                score = tfidf_baseline_score(profile_text, offer_text)
                seeker_data["tfidfScore"] = score
            except Exception as e:
                print(f"[WARN] {seeker_data['id']}: {str(e)}")
                seeker_data["tfidfScore"] = 0.0

            enriched.append(seeker_data)

        enriched.sort(key=lambda x: x["tfidfScore"], reverse=True)
        log_to_file("baseline_results.json", json.dumps(enriched, indent=2))
        return jsonify(enriched)

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/analyze", methods=["POST"])
def baseline_analyze():
    print("[INFO] /baseline-analyze route triggered.")
    data = request.json
    cv_path = data.get("cv_path")
    video_path = data.get("video_path")

    if not cv_path or not os.path.exists(cv_path):
        return jsonify({"error": "CV file is missing or invalid"}), 400

    try:
        cv_text = extract_cv_text(cv_path)
        video_text = transcribe_video(video_path) if video_path and os.path.exists(video_path) else ""
        combined_text = clean_text(cv_text + "\n" + video_text)
        log_to_file("combined_profile_text.txt", combined_text)

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
        log_to_file("jobseeker_offer_baseline_results.json", json.dumps(offers, indent=2))

        print("[DONE] Job offers scored using TF-IDF baseline.")
        return jsonify(offers)

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, host="0.0.0.0", debug=True)
