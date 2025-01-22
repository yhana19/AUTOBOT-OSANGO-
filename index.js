const { spawn } = require("child_process");
const path = require("path");
const admin = require("firebase-admin");

const firebaseConfig = {
    apiKey: "AIzaSyDEdrwfF9m_af0zOVUF7TbRWFomnrmbZUs",
    authDomain: "metoushela-3d094.firebaseapp.com",
    projectId: "metoushela-3d094",
    storageBucket: "metoushela-3d094.appspot.com",
    messagingSenderId: "530111318315",
    appId: "1:530111318315:web:4ea87a6c7f3aa05cef9d6e",
    measurementId: "G-FBWGC7Y652",
};

// Initialiser Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.applicationDefault(), 
    projectId: firebaseConfig.projectId,
});
const {Storage} = require('@google-cloud/storage');

async function authenticateImplicitWithAdc() {
  // This snippet demonstrates how to list buckets.
  // NOTE: Replace the client created below with the client required for your application.
  // Note that the credentials are not specified when constructing the client.
  // The client library finds your credentials using ADC.
  const storage = new Storage({
    projectId,
  });
  const [buckets] = await storage.getBuckets();
  console.log('Buckets:');

  for (const bucket of buckets) {
    console.log(`- ${bucket.name}`);
  }

  console.log('Listed all storage buckets.');
}

authenticateImplicitWithAdc();
// Accéder à Firestore ou à une autre base de données Firebase
const db = admin.firestore();

// Exemple : Lire les données d'une collection Firestore
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


readData();

// Gestion du script enfant
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
