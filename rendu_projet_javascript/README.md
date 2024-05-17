# Application arbre généalogique

Ceci est le readme de l'application/site web de création d'arbre généalogique créé par Paul Coulomb et Dorian Peltier.

## Table des matières

- [Installation](#installation)
- [Utilisation](#utilisation)
- [Contribuer](#contribuer)
- [Licence](#licence)

## Installation

Pour faire marcher le programme en serveur local (nous n'avons pas pu réaliser une base de données en ligne) : 
- installer npm
- installer multer avec "npm install multer"
- Lancer le serveur avec "npm start"
- Lancer un navigateur de recherche et chercher "http://localhost:3000"

## Utilisation

Ce qui peux être fait avec l'application :
- Cliquer sur le bouton pour commencer un arbre place un premier portrait à partir duquel on peut :
    - Cliquer sur le bouton en forme de croix au dessus pour rajouter un portrait au dessus (ATTENTION : cette fonctionnalité est incomplète et ne marche que si l'on créer une personne au dessus en tout premier quand on commence un arbre)
    - Cliquer sur le bouton en forme de croix en dessous pour rajouter un enfant au portrait en question.
    - Cliquer sur le cadre blanc pour insérer une image au portrait de la personne. 
    - Modifier les zones d'input du nom, du prénom et de l'âge.
    - Cliquer sur le bouton "Valider" pour finaliser le portrait d'une personne
- Cliquer sur les boutons en haut de l'écran pour avoir des fonctionnalités diverses :
    - Le bouton "Afficher" permet de coupler deux personnes et relier avec leurs enfants en cliquant sur les carrés noirs de liens (le placement du noeud n'a jamais être optimisé)
    - Le bouton "Ajouter" permet de, en cliquant sur un cadre noir, rajouter un voisin qui s'insère à la droite du portrait choisi.
    - Le bouton "Modifier", si on a eu le temps de l'implémenter, permet de dévérrouiller tout les portrait pour pouvoir modifier leurs informations
    - Le bouton "Supprimer" ne fais rien, on a pas eu le temps.
- Après avoir validé des portraits, en rechargeant la page, on peut cliquer sur le bouton pour continuer l'arbre pour reprendre de là ou on en été (contient de nombreux bugs, surtout le fait que les portraits sont indépendant à la création, donc ne voient pas leurs boutons d'ajouts supprimés comme il faut, et le fait que les couplages ne se font pas comme il faut du fait de l'indépendance. L'enregistrement du couplage aboutissait à trop de bugs pour être conserver, et il faudrait beaucoup plus de temps pour lfaire du débuggage)


Sur le terminal du serveur, il est possible de taper "exit" pour arrêter le serveur, ou "stop" pour arrêter le serveur et supprimer les données des utilisateurs stockés.

## Créateurs du projet

- Paul Coulomb (Partie serveur, reconstruction d'arbre, fusion des codes)
- Dorian Peltier (Front-end (cadre avec les personnes, le placement, l'architecture de l'arbre, couplage), le README)
