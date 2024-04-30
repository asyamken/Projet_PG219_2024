const fs = require('fs-extra');
const path = require('path');

const usersDataPath = path.join(__dirname, 'users.json');

fs.unlink(usersDataPath, (err) => {
    if (err) {
        console.error('Erreur lors de la suppression du fichier des utilisateurs :', err);
    } else {
        console.log('Fichier des utilisateurs supprimé avec succès');
    }
});

const uploadsPath = path.join(__dirname, 'uploads');
fs.remove(uploadsPath, (err) => {
    if (err) {
        console.error('Erreur lors de la suppression du répertoire des images :', err);
    } else {
        console.log('Répertoire des images supprimé avec succès');
    }
});