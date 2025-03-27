"use client"; 
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBKfMZF8qU0bu6L1XQmPRmdOMku7ZaXv4Y",
    authDomain: "tienda-bebe-1c762.firebaseapp.com",
    projectId: "tienda-bebe-1c762",
    storageBucket: "tienda-bebe-1c762.appspot.com", // ✅ Corregido
    messagingSenderId: "546680345242",
    appId: "1:546680345242:web:16ca5b4a6324f1b62fc523"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
