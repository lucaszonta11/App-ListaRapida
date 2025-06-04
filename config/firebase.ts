import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCkPaM8ytz_Q7-bBN2Ebu3f23CrhrgFHio",
  authDomain: "app-lista-rapida.firebaseapp.com",
  databaseURL: "https://app-lista-rapida-default-rtdb.firebaseio.com",
  projectId: "app-lista-rapida",
  storageBucket: "app-lista-rapida.firebasestorage.app",
  messagingSenderId: "519950988382",
  appId: "1:519950988382:web:7b82d08165ca683daaf0cf",
  measurementId: "G-6WBHEJYWL2"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getDatabase(app);