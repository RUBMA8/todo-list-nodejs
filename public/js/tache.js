// Variables
const listeTache = document.getElementById('liste-tache');
const formTache = document.getElementById('form-tache');
const texteTache = document.getElementById('texte-tache');

// Fonctionnalités
/**
 * Ajoute une tâche dans l'interface graphique
 * @param {number} id id de la tâche dans la liste sur le serveur.
 * @param {string} texte Texte de la tâche à ajouter.
 * @param {boolean} est_fait Valeur indiquant si la tâche est coché ou non.
 */
function addTacheClient(id, texte, est_fait) {
    const li = document.createElement('li');

    const label = document.createElement('label');
    li.append(label);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = est_fait;
    checkbox.addEventListener('change', cocheTacheServeur);
    checkbox.dataset.id = id;
    label.append(checkbox);

    const texteTache = document.createTextNode(texte);
    label.append(texteTache);

    listeTache.append(li);
}

/**
 * Cherche la liste des tâches sur le serveur et affiche chaque tâche dans 
 * l'interface graphique.
 */
async function getTachesServeur() {
    // Envoyer la requête HTTP
    const reponse = await fetch('/api/taches');

    // Traitement de la réponse
    if(reponse.ok) {
        // Chercher les données dans la réponse
        const taches = await reponse.json();
        
        for(let i = 0 ; i < taches.length ; i++) {
            addTacheClient(taches[i].id_tache, taches[i].texte, taches[i].est_fait);
        }
    }
}

/**
 * Ajoute une tâche dans la liste sur le serveur et dans l'interface 
 * graphique.
 * @param {SubmitEvent} event Évènement de soumission du formulaire.
 */
async function addTacheServeur(event) {
    event.preventDefault();

    // Préparation des données
    const data = {
        texte: texteTache.value
    }

    // Envoyer la requête HTTP
    const reponse = await fetch('/api/tache', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    // Traitement de la réponse
    if(reponse.ok) {
        // Chercher les données de la réponse
        const dataReponse = await reponse.json();

        addTacheClient(dataReponse.id, data.texte, false);
        texteTache.value = '';
        texteTache.focus();
    }
}

/**
 * Change l'état d'une tâche dans la liste sur le serveur.
 * @param {Event} event Évènement de changement d'état de la case à cocher.
 */
function cocheTacheServeur(event) {
    // Préparation des données
    const data = {
        id: event.currentTarget.dataset.id
    };

    // Envoyer la requête HTTP
    fetch('/api/tache', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

// À exécuter au démarrage
getTachesServeur();
formTache.addEventListener('submit', addTacheServeur);
