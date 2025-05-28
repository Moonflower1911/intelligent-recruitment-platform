import os
from dotenv import load_dotenv
import pdfplumber
import whisper
import pymysql
import requests
import json
import re
from flask import Flask, request, jsonify

load_dotenv()  # Load environment variables from .env
print("Loaded OpenRouter API Key:", os.getenv("OPENROUTER_API_KEY"))

app = Flask(__name__)
os.makedirs("logs", exist_ok=True)

def log_to_file(filename, content):
    with open(os.path.join("logs", filename), "w", encoding="utf-8") as f:
        f.write(content)

print("[INFO] Loading Whisper model...")
whisper_model = whisper.load_model("base")
print("[DONE] Whisper model loaded.")

# API Config
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
HTTP_REFERER = os.getenv("HTTP_REFERER", "")
APP_TITLE = os.getenv("APP_TITLE", "")

DB_CONFIG = {
    'host': os.getenv('DB_HOST'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASS'),
    'database': os.getenv('DB_NAME'),
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.Cursor,
}

def extract_cv_text(cv_path):
    print("[INFO] Extracting CV text...")
    with pdfplumber.open(cv_path) as pdf:
        text = "\n".join([page.extract_text() or "" for page in pdf.pages])
    log_to_file("cv_output.txt", text)
    print("[DONE] CV text extracted.")
    return text

def transcribe_video(video_path):
    print("[INFO] Transcribing video...")
    result = whisper_model.transcribe(video_path)
    text = result["text"].strip()
    log_to_file("video_output.txt", text)
    print("[DONE] Video transcribed.")
    return text

def clean_text(text):
    return " ".join(text.replace("\n", " ").split())

def build_combined_profile(cv_text, video_text=""):
    print("[INFO] Building raw candidate profile...")
    profile = clean_text(cv_text + "\n" + video_text)
    log_to_file("profile_text.txt", profile)
    print("[DONE] Raw profile built.")
    return profile

def get_common_headers():
    return {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": HTTP_REFERER,
        "X-Title": APP_TITLE
    }

def extract_structured_profile_text(profile_text):
    print("[INFO] Asking LLaMA (OpenRouter) for structured plain-text profile...")

    prompt = f"""
        Extract the following **four fields** from the candidate's resume and return them in this strict format:

        Skills: <list of technologies, tools, programming languages>  
        Experience: <list of job titles only, no companies or dates>  
        Education: <list of degrees or specializations only, no schools or years>  
        Languages: <list of spoken/written languages with proficiency levels if available>

        Return each field clearly. If a field is missing or not mentioned, still include it but leave it blank.

        Example Output:
        Skills: Python, JavaScript  
        Experience: Software Engineer, Backend Developer  
        Education: Bachelor's in Computer Science  
        Languages: French (Fluent), English (Advanced)

        Candidate Resume:
        {profile_text}
    """
    log_to_file("llama_structured_input.txt", prompt)

    payload = {
        "model": "meta-llama/llama-4-scout:free",
        "messages": [
            {"role": "system", "content": "You are an expert recruitment assistant."},
            {"role": "user", "content": prompt}
        ]
    }

    response = requests.post(OPENROUTER_URL, headers=get_common_headers(), json=payload)

    if response.status_code != 200:
        raise Exception(f"OpenRouter API error: {response.text}")

    response_json = response.json()
    log_to_file("llama_raw_response.txt", json.dumps(response_json, indent=2))

    if "choices" not in response_json:
        raise Exception(f"Unexpected response format: {response_json}")

    profile_summary = response_json["choices"][0]["message"]["content"].strip()

    log_to_file("structured_profile_text.txt", profile_summary)

    if not profile_summary:
        raise Exception("Model returned empty structured summary")

    print("[DONE] Structured plain-text profile extracted.")
    return profile_summary

def get_job_offers():
    print("[INFO] Fetching job offers from DB...")
    connection = pymysql.connect(**DB_CONFIG)
    offers = []
    try:
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT id, poste, nomEntreprise, address, city, experience, formations,
                       skills, keywords, langues, description FROM RecruiterForms
            """)
            rows = cursor.fetchall()
            for row in rows:
                (
                    offer_id, poste, nomEntreprise, address, city,
                    experience, formations, skills, keywords, langues, description
                ) = row
                offers.append({
                    "id": offer_id,
                    "poste": poste,
                    "nomEntreprise": nomEntreprise,
                    "address": address,
                    "city": city,
                    "experience": experience,
                    "formations": formations,
                    "skills": skills,
                    "keywords": keywords,
                    "langues": langues,
                    "description": description
                })
    finally:
        connection.close()
    log_to_file("job_offers.txt", json.dumps(offers, indent=2))
    print(f"[DONE] Retrieved {len(offers)} job offers.")
    return offers

def score_candidate_against_offer(structured_profile_text, offer):
    print(f"[INFO] Scoring candidate against job offer ID {offer['id']}...")

    prompt = f"""
        You are an AI assistant trained to evaluate candidate-job fit for recruiters. Your task is to give a **score (0–100)** and a **short explanation** of how well the candidate's profile matches the job offer.

        --- 
        🎯 Your evaluation should focus on **domain-specific relevance**.

        📚 First, identify the **domain** of the job (e.g., Logistics, Software Development, Finance, Marketing) based on the job title, description, and keywords. Then match the candidate accordingly.

        ---  
        📐 Scoring Rules by Field Importance:
        🔵 Skills (HIGH)  
        🔵 Keywords (HIGH)  
        🟡 Poste (MEDIUM)  
        🟡 Formations (MEDIUM)  
        ⚪ Langues (LOW)

        💯 Scoring Scale:
        80–100: Excellent  
        50–79: Good  
        30–49: Moderate  
        10–29: Weak  
        0–9: Poor

        ✍️ Output Format:
        Score: <number from 0 to 100>  
        Explanation: <1 sentence explanation>

        Candidate Profile:
        {structured_profile_text}

        Job Offer:
        Poste: {offer['poste']}
        Skills: {offer['skills']}
        Formations: {offer['formations']}
        Langues: {offer['langues']}
        Keywords: {offer['keywords']}
        Description: {offer['description']}
    """

    payload = {
        "model": "meta-llama/llama-4-scout:free",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant for recruiter-candidate matching."},
            {"role": "user", "content": prompt}
        ]
    }

    response = requests.post(OPENROUTER_URL, headers=get_common_headers(), json=payload)

    if response.status_code != 200:
        raise Exception(f"Scoring API error: {response.text}")


    response_json = response.json()
    log_to_file("llama_raw_response.txt", json.dumps(response_json, indent=2))

    if "choices" not in response_json:
        raise Exception(f"Unexpected response format: {response_json}")

    result = response_json["choices"][0]["message"]["content"].strip()

    print(f"[DONE] Scored offer {offer['id']}.")
    return result

@app.route("/analyze", methods=["POST"])
def analyze():
    print("[INFO] /analyze route triggered.")
    data = request.json
    cv_path = data.get("cv_path")
    video_path = data.get("video_path")

    if not cv_path or not os.path.exists(cv_path):
        print("[ERROR] Missing or invalid CV path.")
        return jsonify({"error": "CV file is missing or not found"}), 400

    try:
        cv_text = extract_cv_text(cv_path)
        video_text = transcribe_video(video_path) if video_path and os.path.exists(video_path) else ""
        combined_profile = build_combined_profile(cv_text, video_text)

        structured_profile_text = extract_structured_profile_text(combined_profile)
        job_offers = get_job_offers()

        enriched = []
        for offer in job_offers:
            result_text = score_candidate_against_offer(structured_profile_text, offer)
            match = re.search(r"Score:\s*(\d+).*?Explanation:\s*(.*)", result_text, re.DOTALL)
            if match:
                offer["score"] = int(match.group(1))
                offer["explanation"] = match.group(2).strip()
            else:
                offer["score"] = 0
                offer["explanation"] = "Could not parse score from model response."
            enriched.append(offer)

        enriched.sort(key=lambda x: x["score"], reverse=True)
        log_to_file("final_results.json", json.dumps(enriched, indent=2))
        print("[DONE] All offers scored and sorted.")
        return jsonify(enriched)

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        return jsonify({"error": str(e)}), 500
@app.route("/offer-analyze", methods=["POST"])
def offer_baseline():
    return jsonify({"message": "OK from /offer-analyze"})
if __name__ == "__main__":
    print("[INFO] Flask server running at port 5000.")
    app.run(host="0.0.0.0", port=5000, debug=True)

