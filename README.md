# Liste de Tâches avec Base de Données

Une application web de gestion de liste de tâches (Todo List) construite avec Node.js, Express et SQLite.

## Description

Cette application permet de gérer une liste de tâches à faire avec les fonctionnalités suivantes :
- Afficher toutes les tâches
- Ajouter de nouvelles tâches
- Cocher/décocher les tâches pour marquer leur état d'achèvement
- Persistance des données dans une base de données SQLite

## Auteur

Ruben-Marie Bouakaly

## Technologies utilisées

### Backend
- **Node.js** - Environnement d'exécution JavaScript
- **Express 5** - Framework web minimaliste
- **SQLite3** - Base de données légère embarquée
- **dotenv** - Gestion des variables d'environnement

### Sécurité et Performance
- **Helmet** - Protection des en-têtes HTTP
- **CORS** - Gestion des requêtes cross-origin
- **Compression** - Compression des réponses HTTP

### Outils de développement
- **Nodemon** - Redémarrage automatique du serveur en développement

## Structure du projet

```
liste_tache_db/
├── db/
│   ├── db.js           # Configuration et initialisation de la base de données
│   └── tache.db        # Fichier de la base de données SQLite
├── model/
│   └── tache.js        # Modèle de données pour les tâches
├── public/
│   ├── css/            # Feuilles de style
│   ├── js/             # Scripts client
│   └── index.html      # Page principale
├── .env                # Variables d'environnement
├── .gitignore          # Fichiers ignorés par Git
├── package.json        # Dépendances et scripts npm
└── server.js           # Point d'entrée du serveur Express
```

## Installation

1. Cloner le dépôt :
```bash
git clone [url-du-depot]
cd liste_tache_db
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer les variables d'environnement :
Le fichier `.env` contient les configurations suivantes :
```
PORT=5300
DB_FILE=./db/tache.db
```

## Utilisation

### Démarrer le serveur en mode production
```bash
npm start
```

### Démarrer le serveur en mode développement (avec auto-reload)
```bash
npm run dev
```

Le serveur sera accessible à l'adresse : `http://localhost:5300`

## API REST

### GET /api/taches
Récupère la liste de toutes les tâches.

**Réponse :**
```json
[
  {
    "id_tache": 1,
    "texte": "Suivre le cours",
    "est_fait": 1
  },
  {
    "id_tache": 2,
    "texte": "Faire le laboratoire",
    "est_fait": 0
  }
]
```

### POST /api/tache
Ajoute une nouvelle tâche.

**Corps de la requête :**
```json
{
  "texte": "Nouvelle tâche"
}
```

**Réponse :**
```json
{
  "id": 3
}
```

### PATCH /api/tache
Coche ou décoche une tâche (inverse son état).

**Corps de la requête :**
```json
{
  "id": 2
}
```

**Réponse :** Status 200 OK

## Base de données

La base de données SQLite est créée automatiquement au premier démarrage avec la structure suivante :

### Table `tache`
| Colonne     | Type    | Description                          |
|-------------|---------|--------------------------------------|
| id_tache    | INTEGER | Identifiant unique (clé primaire)    |
| texte       | TEXT    | Texte de la tâche                    |
| est_fait    | INTEGER | État (0 = à faire, 1 = fait)         |

## Fonctionnalités de sécurité

- **Helmet** : Protection contre les vulnérabilités courantes du web
- **CORS** : Configuration des autorisations d'accès cross-origin
- **Compression** : Compression gzip des réponses pour améliorer les performances

## Licence

UNLICENSED

---

Projet développé dans le cadre du cours au Collège La Cité
