import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmfAkYQS55UBIn8lphcd6Ejig2aqsKwkE",
  authDomain: "analytics-sws.firebaseapp.com",
  projectId: "analytics-sws",
  storageBucket: "analytics-sws.firebasestorage.app",
  messagingSenderId: "209517929426",
  appId: "1:209517929426:web:bc1078d3ed359d57405e0b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
