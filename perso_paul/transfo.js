const fs = require('fs');
const path = require('path');

function imageToBytes(imagePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(imagePath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(Array.from(data));
            }
        });
    });
}

function saveImageFromUrl(imageUrl) {
    return new Promise((resolve, reject) => {
        const filename = path.basename(imageUrl);
        const imagePath = path.join(__dirname, filename);
        const file = fs.createWriteStream(imagePath);

        https.get(imageUrl, response => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => resolve(imagePath));
            });
        }).on('error', err => {
            fs.unlink(imagePath, () => reject(err));
        });
    });
}

// Exemple d'utilisation
const imageUrl = 'C:\Users\Coulomb\Pictures\Screenshots\carbon_footprint.png';

saveImageFromUrl(imageUrl)
    .then(imagePath => {
        console.log('Image enregistrée:', imagePath);
        return imageToBytes(imagePath);
    })
    .then(bytes => {
        console.log('Image convertie en tableau de bytes:', bytes);
        // Utiliser les bytes comme vous le souhaitez
    })
    .catch(err => {
        console.error('Erreur:', err);
    });