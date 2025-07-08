document.getElementById('uploadForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const equipeNumber = document.getElementById('team_number').value.trim();
    const equipeName = document.getElementById('team_name').value.trim();
    const photos = document.getElementById('photos').files;
    const messageElem = document.getElementById('message');

    const validNumbers = ['10', '20', '30', '40', '50'];

    if (!validNumbers.includes(equipeNumber)) {
        messageElem.className = 'message error';
        messageElem.textContent = "❌ Numéro d'équipage invalide.";
        return;
    }
    if (equipeName.length < 2) {
        messageElem.className = 'message error';
        messageElem.textContent = "❌ Nom d'équipe trop court.";
        return;
    }
    if (photos.length === 0) {
        messageElem.className = 'message error';
        messageElem.textContent = "❌ Veuillez ajouter au moins une photo.";
        return;
    }

    const formData = new FormData();
    formData.append('team_number', equipeNumber);
    formData.append('team_name', equipeName);
    for (let i = 0; i < photos.length; i++) {
        formData.append('photos', photos[i]);
    }

    messageElem.className = 'message';
    messageElem.textContent = "⏳ Envoi en cours...";

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            messageElem.className = 'message success';
            messageElem.textContent = "✅ Photos envoyées avec succès !";
            document.getElementById('uploadForm').reset();
        } else {
            const text = await response.text();
            messageElem.className = 'message error';
            messageElem.textContent = "❌ Erreur : " + text;
        }
    } catch (error) {
        messageElem.className = 'message error';
        messageElem.textContent = "❌ Erreur de connexion : " + error.message;
    }
});
