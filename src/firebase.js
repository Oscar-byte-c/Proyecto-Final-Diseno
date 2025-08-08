// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDsqx6ANCEgawTfRasHXrcXoKKcATMUriY",
  authDomain: "proyectofinal-e71c8.firebaseapp.com",
  databaseURL: "https://proyectofinal-e71c8-default-rtdb.firebaseio.com",
  projectId: "proyectofinal-e71c8",
  storageBucket: "proyectofinal-e71c8.firebasestorage.app",
  messagingSenderId: "126302900063",
  appId: "1:126302900063:web:bb67e9a6030bb0a505b0ea",
  measurementId: "G-3L4F56FY9K"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
