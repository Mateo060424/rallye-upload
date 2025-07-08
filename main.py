from flask import Flask, request, render_template, jsonify
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
VALID_NUMBERS = {'10', '20', '30', '40', '50'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload_photos():
    equipe_number = request.form.get("equipeNumber")
    equipe_name = request.form.get("equipeName")
    files = request.files.getlist("photos")

    if equipe_number not in VALID_NUMBERS:
        return jsonify({"error": "Numéro d'équipage invalide"}), 400

    folder_name = f"{equipe_number}_{equipe_name.replace(' ', '_')}"
    path = os.path.join(UPLOAD_FOLDER, folder_name)
    os.makedirs(path, exist_ok=True)

    for file in files:
        if file:
            filename = secure_filename(file.filename)
            file.save(os.path.join(path, filename))

    return jsonify({"success": True})
