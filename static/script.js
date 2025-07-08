document.getElementById('uploadForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const equipeNumber = document.getElementById('equipeNumber').value.trim();
    const equipeName = document.getElementById('equipeName').value.trim();
    const photos = document.getElementById('photos').files;
    const messageElem = document.getElementById('message');

    // Numéros d'équipage autorisés
    const validNumbers = ['10', '20', '30', '40', '50'];

    // Validation simple
    if (!validNumbers.includes(equipeNumber)) {
        messageElem.style.color = 'red';
        messageElem.textContent = "Numéro d'équipage invalide. Les seuls numéros autorisés sont : 10, 20, 30, 40, 50.";
        return;
    }
    if (equipeName.length < 2) {
        messageElem.style.color = 'red';
        messageElem.textContent = "Le nom de l'équipe est trop court.";
        return;
    }
    if (photos.length === 0) {
        messageElem.style.color = 'red';
        messageElem.textContent = "Veuillez sélectionner au moins une photo.";
        return;
    }

    // Préparer les données à envoyer
    const formData = new FormData();
    formData.append('equipeNumber', equipeNumber);
    formData.append('equipeName', equipeName);
    for (let i = 0; i < photos.length; i++) {
        formData.append('photos', photos[i]);
    }

    try {
        messageElem.style.color = 'black';
        messageElem.textContent = "Envoi en cours... ⏳";

        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            messageElem.style.color = 'green';
            messageElem.textContent = "Photos envoyées avec succès ! Merci 👍";
            // Reset form
            document.getElementById('uploadForm').reset();
        } else {
            throw new Error("Erreur serveur");
        }
    } catch (error) {
        messageElem.style.color = 'red';
        messageElem.textContent = "Erreur lors de l'envoi : " + error.message;
    }
});
