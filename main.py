from flask import Flask, request, render_template, redirect, url_for
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
VALID_NUMBERS = {'10', '20', '30', '40', '50'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def index():
    # Affiche le formulaire (sans message par défaut)
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_photos():
    try:
        equipe_number = request.form['team_number']
        equipe_name = request.form['team_name']
        files = request.files.getlist('photos')

        if equipe_number not in VALID_NUMBERS:
            return render_template("index.html", error="Numéro d'équipe invalide.")

        if not equipe_name.strip():
            return render_template("index.html", error="Le nom de l'équipe ne peut pas être vide.")

        if not files:
            return render_template("index.html", error="Aucune photo sélectionnée.")

        folder_name = f"{equipe_number}_{equipe_name.replace(' ', '_')}"
        path = os.path.join(app.config['UPLOAD_FOLDER'], folder_name)
        os.makedirs(path, exist_ok=True)

        for file in files:
            if file and file.filename:
                filename = secure_filename(file.filename)
                file.save(os.path.join(path, filename))

        return render_template("index.html", success=True)

    except Exception as e:
        return render_template("index.html", error=f"Erreur serveur : {str(e)}")

if __name__ == "__main__":
    app.run(debug=True)
