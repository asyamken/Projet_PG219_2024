const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let utilisateurs = [];

if (fs.existsSync("utilisateurs.json")) {
  const data = fs.readFileSync("utilisateurs.json");
  utilisateurs = JSON.parse(data);
}

const sauvegarderUtilisateurs = () => {
  fs.writeFileSync("utilisateurs.json", JSON.stringify(utilisateurs, null, 2));
};

app.get("/utilisateurs", (req, res) => {
  res.json(utilisateurs);
  console.log("Envoyé la liste des utilisateurs");
});

app.post("/utilisateurs", upload.single("image"), (req, res) => {
  const { nom, prenom } = req.body;
  const image = req.file ? req.file.path : null;

  if (!nom || !prenom) {
    return res.status(400).json({ error: "Nom et prénom requis" });
  }

  const indexUtilisateur = utilisateurs.findIndex(user => user.nom === nom && user.prenom === prenom);
  if (indexUtilisateur !== -1) {
    console.log("Utilisateur déjà existant, donc non ajouté");
    return res.status(404).json({ error: "Utilisateur déjà existant" });
  }

  const nouvelUtilisateur = { nom: nom, prenom: prenom, image: image };
  utilisateurs.push(nouvelUtilisateur);
  sauvegarderUtilisateurs();
  console.log("Nouvel utilisateur ajouté");
  res.status(201).json(nouvelUtilisateur);
});

app.delete("/utilisateurs/:nom/:prenom", (req, res) => {
  const { nom, prenom } = req.params;
  const indexUtilisateur = utilisateurs.findIndex(user => user.nom === nom && user.prenom === prenom);
  if (indexUtilisateur === -1) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }
  const utilisateurSupprime = utilisateurs.splice(indexUtilisateur, 1);
  sauvegarderUtilisateurs();
  console.log("Utilisateur supprimé :", utilisateurSupprime);
  res.sendStatus(204);
});

app.put("/utilisateurs/:nom/:prenom", upload.single("image"), (req, res) => {
  const { nom, prenom } = req.params;
  const nouvelNom = req.body.nom;
  const nouveauPrenom = req.body.prenom;
  const nouvelleImage = req.file ? req.file.path : null;

  const indexUtilisateur = utilisateurs.findIndex(user => user.nom === nom && user.prenom === prenom);
  if (indexUtilisateur === -1) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }

  if (nouvelNom) {
    utilisateurs[indexUtilisateur].nom = nouvelNom;
  }
  if (nouveauPrenom) {
    utilisateurs[indexUtilisateur].prenom = nouveauPrenom;
  }
  if (nouvelleImage) {
    utilisateurs[indexUtilisateur].image = nouvelleImage;
  }
  sauvegarderUtilisateurs(); // Sauvegarder les utilisateurs dans le fichier JSON
  console.log("Utilisateur mis à jour :", utilisateurs[indexUtilisateur]);
  res.json(utilisateurs[indexUtilisateur]);
});

app.patch("/utilisateurs/:nom/:prenom", (req, res) => {
  const { nom, prenom } = req.params;
  const nouvelNom = req.body.nom;
  const nouveauPrenom = req.body.prenom;
  const nouvelleImage = req.body.image;

  const indexUtilisateur = utilisateurs.findIndex(user => user.nom === nom && user.prenom === prenom);
  if (indexUtilisateur === -1) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }

  if (nouvelNom) {
    utilisateurs[indexUtilisateur].nom = nouvelNom;
  }
  if (nouveauPrenom) {
    utilisateurs[indexUtilisateur].prenom = nouveauPrenom;
  }
  if (nouvelleImage) {
    utilisateurs[indexUtilisateur].image = nouvelleImage;
  }
  sauvegarderUtilisateurs(); // Sauvegarder les utilisateurs dans le fichier JSON
  console.log("Utilisateur mis à jour :", utilisateurs[indexUtilisateur]);
  res.json(utilisateurs[indexUtilisateur]);
});

app.listen(3000, () => {
  console.log("En attente de requêtes pour le projet...");
});