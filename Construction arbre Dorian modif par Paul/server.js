const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { exec } = require('child_process');

const app = express();
const upload = multer({ dest: 'uploads/' });

let userIdCounter = 1;

function generateUserId() {
    return userIdCounter++;
}

function getLastUserId(callback) {
    const usersDataPath = path.join(__dirname, 'users.json');
    fs.readFile(usersDataPath, 'utf8', (err, data) => {
        if (err) {
            callback(1);
        } else {
            try {
                const users = JSON.parse(data);
                if (users.length > 0) {
                    const lastUser = users[users.length - 1];
                    callback(lastUser.id + 1);
                } else {
                    callback(1);
                }
            } catch (error) {
                console.error('Erreur lors de la lecture du fichier users.json :', error);
                callback(1);
            }
        }
    });
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(__dirname));

// Servir explicitement arbre.html au lieu de index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'arbre.html'));
});

app.post('/upload', upload.single('image'), (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const nomParent1 = req.body.nomParent1;
    const prenomParent1 = req.body.prenomParent1;
    const nomParent2 = req.body.nomParent2;
    const prenomParent2 = req.body.prenomParent2;
    const imagePath = req.file ? req.file.path : null;

    const userId = generateUserId();
    const filename = imagePath ? `${userId}.jpg` : null;

    if (imagePath) {
        const newPath = path.join(__dirname, 'uploads', filename);
        fs.rename(imagePath, newPath, (err) => {
            if (err) {
                console.error('Erreur lors du renommage du fichier :', err);
                return res.status(500).json({ error: 'Erreur lors du renommage du fichier' });
            }
            saveUserData(res, userId, nom, prenom, nomParent1, prenomParent1, nomParent2, prenomParent2, filename);
        });
    } else {
        saveUserData(res, userId, nom, prenom, nomParent1, prenomParent1, nomParent2, prenomParent2, null);
    }
});

function saveUserData(res, userId, nom, prenom, nomParent1, prenomParent1, nomParent2, prenomParent2, filename) {
    const user = {
        id: userId,
        nom: nom,
        prenom: prenom,
        nomParent1: nomParent1,
        prenomParent1: prenomParent1,
        nomParent2: nomParent2,
        prenomParent2: prenomParent2,
        imageUrl: filename ? `/uploads/${filename}` : null
    };

    const usersDataPath = path.join(__dirname, 'users.json');
    fs.readFile(usersDataPath, (err, data) => {
        let users = [];
        if (!err) {
            users = JSON.parse(data);
        }
        users.push(user);
        fs.writeFile(usersDataPath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error('Erreur lors de l\'enregistrement des données utilisateur :', err);
                res.status(500).json({ error: 'Erreur lors de l\'enregistrement des données utilisateur' });
            } else {
                console.log('Données utilisateur enregistrées avec succès');
                res.json({ message: 'Données utilisateur enregistrées avec succès' });
            }
        });
    });
}

const PORT = process.env.PORT || 3000;

let server;

getLastUserId((lastId) => {
    userIdCounter = lastId;
    server = app.listen(PORT, () => {
        console.log(`Serveur en écoute sur le port ${PORT}`);
    });
});

process.stdin.setEncoding('utf8');
process.stdin.on('data', (input) => {
    input = input.trim();
    if (input === 'stop') {
        console.log('Arrêt du serveur en cours...');
        server.close(() => {
            console.log('Serveur arrêté');
            console.log('Nettoyage des données...');
            exec('node reset.js', (err, stdout, stderr) => {
                if (err) {
                    console.error('Erreur lors du nettoyage des données :', err);
                } else {
                    console.log(stdout);
                    process.exit();
                }
            });
        });
    }
    if (input === 'exit') {
        console.log('Arrêt du serveur en cours...');
        server.close(() => {
            console.log('Serveur arrêté');
            process.exit();
        });
    }
});