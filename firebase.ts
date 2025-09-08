
// FIX: Use a namespace import for firebase/app to work around a potential module resolution issue that can cause 'initializeApp' to not be found.
import * as firebaseApp from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your web app's Firebase configuration.
// You can find this in your project's settings in the Firebase console.
  const firebaseConfig = {
    apiKey: "AIzaSyBfRyh1FtiHjem4sBKunvg2PqG-VoVW-U0",
    authDomain: "faq10-29169.firebaseapp.com",
    projectId: "faq10-29169",
    storageBucket: "faq10-29169.firebasestorage.app",
    messagingSenderId: "1096546413755",
    appId: "1:1096546413755:web:3c5813cf3e9c2817c6cd9e"
  };

// Initialize Firebase
// FIX: Call initializeApp from the imported namespace.
const app = firebaseApp.initializeApp(firebaseConfig);
export const db = getFirestore(app);
