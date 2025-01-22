// Importation des modules nécessaires
const { spawn } = require("child_process");
const path = require("path");
const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDEdrwfF9m_af0zOVUF7TbRWFomnrmbZUs",
    authDomain: "metoushela-3d094.firebaseapp.com",
    projectId: "metoushela-3d094",
    storageBucket: "metoushela-3d094.appspot.com",
    messagingSenderId: "530111318315",
    appId: "1:530111318315:web:4ea87a6c7f3aa05cef9d6e",
    measurementId: "G-FBWGC7Y652",
};

// Initialisation du SDK Firebase Admin
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: firebaseConfig.projectId,
});

// Fonction pour authentifier et lister les buckets de stockage
async function authenticateImplicitWithAdc() {
    try {
        const storage = new Storage({ projectId: firebaseConfig.projectId });
        const [buckets] = await storage.getBuckets();

        console.log("Buckets:");
        buckets.forEach((bucket) => {
            console.log(`- ${bucket.name}`);
        });

        console.log("Listed all storage buckets.");
    } catch (error) {
        console.error("Erreur lors de l'authentification ou de la liste des buckets :", error);
    }
}

// Appeler la fonction d'authentification
authenticateImplicitWithAdc();

// Accès à Firestore
const db = admin.firestore();

// Fonction pour lire les données d'une collection Firestore
async function readData() {
    try {
        const snapshot = await db.collection("exampleCollection").get();
        snapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
        });
    } catch (error) {
        console.error("Erreur lors de la lecture des données Firestore :", error);
    }
}

// Lire les données
readData();

// Gestion du processus enfant
const SCRIPT_FILE = "auto.js";
const SCRIPT_PATH = path.join(__dirname, SCRIPT_FILE);

function start() {
    const main = spawn("node", [SCRIPT_PATH], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true,
    });

    main.on("close", (exitCode) => {
        if (exitCode === 0) {
            console.log("Main process exited with code 0");
        } else if (exitCode === 1) {
            console.log("Main process exited with code 1. Restarting...");
            start();
        } else {
            console.error(`Main process exited with code ${exitCode}`);
        }
    });
}

// Lancer le script enfant
start();
        
