# car-api
# java_projetpartie2
# Classic Cars – Application Web (Front + API)

## Description du projet

Ce projet est une application web permettant de gérer une liste de voitures classiques.
Elle communique avec une API REST sécurisée par une clé API et permet d’afficher, consulter et supprimer des voitures.

Le projet est divisé en deux parties :

* **Backend (API)** : gestion des données et des routes
* **Frontend** : interface utilisateur en HTML, CSS et JavaScript modulaire

---

## Fonctionnalités

* Affichage de la liste des voitures
* Consultation des détails d’une voiture
* Ajout d’une voiture via un formulaire (modal Bootstrap)
* Suppression d’une voiture avec confirmation (modal)
* Gestion du cas désynchronisé (404 si la voiture est déjà supprimée)
* Mise à jour dynamique de l’interface sans rechargement de page

---

## Technologies utilisées

* HTML5
* CSS3 / Bootstrap 5
* JavaScript (ES Modules)
* Node.js
* Express
* Git & GitHub

---

## Organisation du projet

```
front/
│
├── index.html
├── car.html
├── js/
│   ├── config.js        // Configuration de l’API
│   ├── api.js           // Appels API (fetch, delete, etc.)
│   ├── ui.js            // Fonctions UI (loading, error)
│   ├── dom.js           // Manipulation du DOM
│   ├── utils.js         // Fonctions utilitaires
│   ├── home.js          // Logique de la page index.html
│   ├── car-details.js   // Logique de la page car.html
│   └── script.js        // Point d’entrée principal
│
└── imgs/
```

---

## Installation et lancement en local

### 1. Lancer le backend (API)

À la racine du projet :

```bash
npm install
npm start
```

L’API est disponible sur :

```
http://localhost:3000/api
```

---

### 2. Lancer le frontend

Dans le dossier `front/` :

```bash
npx live-server
```

Le site est accessible via l’URL affichée dans le terminal.

---

## Configuration de l’API (Frontend)

Dans le fichier `front/js/config.js` :

```js
export const API_CONFIG = {
  baseURL: "http://localhost:3000/api",
  apiKey: "ma-super-cle-api-2024",
  endpoints: { cars: "/cars" },
};
```

---

## Tests de fonctionnement

* Chargement de la liste des voitures
* Navigation vers la page de détails
* Suppression d’une voiture avec confirmation
* Suppression simultanée dans deux onglets (gestion du 404)
* Vérification des requêtes réseau dans l’onglet Network du navigateur

---

## Déploiement

### Frontend

* Déployé sur **GitHub Pages**
* Hébergement statique

### Backend

* Déployé sur **Render**
* API accessible via une URL publique

## Auteur

* Nom : Maroua zaid   , chaimaa es-saoudi
* Projet  – Développement Web

