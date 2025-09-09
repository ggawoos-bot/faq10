
// Fix: Use a namespace import for firebase/app to avoid potential module resolution errors.
import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your web app's Firebase configuration.
// You can find this in your project's settings in the Firebase console.
  const firebaseConfig = {
    apiKey: "AIzaSyALICY0zBIfHEgfyH1Cld0nlCWZlVCUN3M",
    authDomain: "faq11-c6149.firebaseapp.com",
    projectId: "faq11-c6149",
    storageBucket: "faq11-c6149.firebasestorage.app",
    messagingSenderId: "1084196335748",
    appId: "1:1084196335748:web:76839e7054a23d056f92d1"
  };

// Initialize Firebase
// Fix: Call initializeApp using the imported firebase namespace.
const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);