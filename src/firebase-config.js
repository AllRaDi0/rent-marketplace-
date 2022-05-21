import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJvFgMaaOusf8-IN6MpCtD7H_ZHxbenI0",
  authDomain: "rent-marketplace-949d6.firebaseapp.com",
  projectId: "rent-marketplace-949d6",
  storageBucket: "rent-marketplace-949d6.appspot.com",
  messagingSenderId: "620619222245",
  appId: "1:620619222245:web:ae835678735d723a61580c",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
