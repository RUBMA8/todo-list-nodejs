import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { existsSync } from "node:fs";

// on verifie si la base de données existe déjà
const IS_NEW = !existsSync(process.env.DB_FILE);

export const db = await open({
    filename: process.env.DB_FILE,
    driver: sqlite3.Database,
});


// on verifie si la base de données n'existe pas déjà
if (IS_NEW) {
    console.log(
        "La base de données n'existe pas. Création de la base de données.",
    );

    await db.exec(`

        PRAGMA foreign_keys = ON;

        CREATE TABLE tache (
            id_tache INTEGER PRIMARY KEY AUTOINCREMENT,
            texte TEXT NOT NULL,
            est_fait INTEGER NOT NULL DEFAULT 0
        );

        INSERT INTO tache (texte, est_fait) VALUES 
            ('Suivre le cours', 1),
            ('Faire le laboratoire', 0);
        
`);
} else {
    console.log("La base de données existe déjà.");
}
