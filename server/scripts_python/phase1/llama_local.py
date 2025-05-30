import os
import pdfplumber
import whisper
import pymysql
import requests
import json
import re
from flask import Flask, request, jsonify

app = Flask(__name__)

# Prepare log directory
os.makedirs("logs", exist_ok=True)

def log_to_file(filename, content):
    with open(os.path.join("logs", filename), "w", encoding="utf-8") as f:
        f.write(content)

print("[INFO] Loading Whisper model...")
whisper_model = whisper.load_model("base")
print("[DONE] Whisper model loaded.")

OLLAMA_URL = "http://localhost:11434/api/generate"

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

def extract_structured_profile_text(profile_text):
    print("[INFO] Asking LLaMA for structured plain-text profile...")
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
""".strip()

    log_to_file("llama_structured_input.txt", prompt)

    response = requests.post(OLLAMA_URL, json={
        "model": "llama3",
        "prompt": prompt,
        "stream": False
    })

    if response.status_code != 200:
        raise Exception(f"LLaMA API error: {response.text}")

    profile_summary = response.json().get("response", "").strip()
    log_to_file("structured_profile_text.txt", profile_summary)

    if not profile_summary:
        raise Exception("LLaMA returned empty structured summary")

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

        ✍️ Respect this output Format, no more, no less, and do not add any extra text or special characters:
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
    """.strip()

    response = requests.post(OLLAMA_URL, json={
        "model": "llama3",
        "prompt": prompt,
        "stream": False
    })

    if response.status_code != 200:
        raise Exception(f"LLaMA scoring API failed: {response.text}")

    result = response.json().get("response", "").strip()
    log_to_file(f"match_result_{offer['id']}.txt", result)
    print(f"[DONE] Scored offer {offer['id']}.")
    return result

@app.route("/analyze", methods=["POST"])
def analyze():
    print("[INFO] /analyze route triggered.")
    data = request.json

    # Get relative paths from JSON
    rel_cv_path = data.get("cv_path")
    rel_video_path = data.get("video_path")

    # Base directory of the server (up one level from scripts_python)
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

    # Resolve absolute paths
    cv_path = os.path.abspath(os.path.join(base_dir, rel_cv_path.replace("\\", "/"))) if rel_cv_path else None
    video_path = os.path.abspath(os.path.join(base_dir, rel_video_path.replace("\\", "/"))) if rel_video_path else None

    # Debug logs
    print(f"[DEBUG] Received cv_path: {rel_cv_path}")
    print(f"[DEBUG] Absolute CV Path: {cv_path}")
    print(f"[DEBUG] CV Exists? {os.path.exists(cv_path)}")
    print(f"[DEBUG] Video Exists? {os.path.exists(video_path) if video_path else 'No video'}")

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
            match = re.search(r"\*{0,2}Score\*{0,2}:\s*(\d+).*?\*{0,2}Explanation\*{0,2}:\s*(.*)", result_text, re.DOTALL)
            if match:
                offer["score"] = int(match.group(1))
                offer["explanation"] = match.group(2).strip()
            else:
                offer["score"] = 0
                offer["explanation"] = "Could not parse score from LLaMA response."
            enriched.append(offer)

        enriched.sort(key=lambda x: x["score"], reverse=True)
        log_to_file("final_results.json", json.dumps(enriched, indent=2))
        print("[DONE] All offers scored and sorted.")
        return jsonify(enriched)

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/offer-analyze", methods=["POST"])
def offer_analyze():
    print("[INFO] /offer-analyze route triggered.")
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
            row = cursor.fetchone()

        if not row:
            return jsonify({"error": "Offer not found"}), 404

        offer = dict(zip((
            "id", "poste", "nomEntreprise", "address", "city", "experience",
            "formations", "skills", "keywords", "langues", "description"
        ), row))

        log_to_file("offer_selected.txt", json.dumps(offer, indent=2))

        with connection.cursor() as cursor:
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
                base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

                rel_cv_path = seeker_data["cvFilePath"]
                rel_video_path = seeker_data.get("videoFilePath")

                cv_path = os.path.abspath(os.path.join(base_dir, rel_cv_path.replace("\\", "/"))) if rel_cv_path else None
                video_path = os.path.abspath(os.path.join(base_dir, rel_video_path.replace("\\", "/"))) if rel_video_path else None

                print(f"[DEBUG] Seeker {seeker_data['id']} CV path: {cv_path}")
                print(f"[DEBUG] CV Exists? {os.path.exists(cv_path)}")

                if not cv_path or not os.path.exists(cv_path):
                    raise Exception("Missing CV")


                cv_text = extract_cv_text(cv_path)
                video_text = transcribe_video(video_path) if video_path and os.path.exists(video_path) else ""
                combined = build_combined_profile(cv_text, video_text)
                structured = extract_structured_profile_text(combined)

                result_text = score_candidate_against_offer(structured, offer)

                match = re.search(r"\*{0,2}Score\*{0,2}:\s*(\d+).*?\*{0,2}Explanation\*{0,2}:\s*(.*)", result_text, re.DOTALL)
                seeker_data["matchPercentage"] = int(match.group(1)) if match else 0
                seeker_data["explanation"] = match.group(2).strip() if match else "Could not parse explanation"

            except Exception as e:
                print(f"[WARN] Error for seeker {seeker_data['id']}: {str(e)}")
                seeker_data["matchPercentage"] = 0
                seeker_data["explanation"] = "Erreur lors de l'analyse"

            enriched.append(seeker_data)

        enriched.sort(key=lambda x: x["matchPercentage"], reverse=True)
        log_to_file("sorted_applicants.json", json.dumps(enriched, indent=2))
        return jsonify(enriched)

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    print("[INFO] Flask server running at port 5000.")
    app.run(host="0.0.0.0", port=5000, debug=True)
