//CONFIGURATION DU SERVEUR
//importation des variables d'environnement
import "dotenv/config";

//import des modules de sécurité
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

//importation des modules
import express, {json,} from "express";
import { addTache, cocheTache, getTaches } from './model/tache.js';

// Création du serveur Express
const app = express();

//Configuration des middlewares de sécurité
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(json());
app.use(express.static("public"));

// Programmation des routes
// Route retournant la liste des tâches à faire
app.get('/api/taches', async (request, response) => {
    const taches = await getTaches();
    response.status(200).json(taches);
});

// Route ajoutant une tâche à la liste des tâches à faire
app.post('/api/tache', async (request, response) => {
    const id = await addTache(request.body.texte);
    response.status(201).json({ id: id });
});

// Route cochant ou décochant une tâche dans la liste des tâches à faire
app.patch('/api/tache', async (request, response) => {
    await cocheTache(request.body.id);
    response.status(200).end();
});



//Demarrer le serveur
app.listen(process.env.PORT);
console.log("Serveur démarré");
console.log("http://localhost:" + process.env.PORT);
console.log("Bienvenue");
