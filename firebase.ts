// FIX: Use Firebase v9 syntax.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your web app's Firebase configuration.
// You can find this in your project's settings in the Firebase console.

  //const firebaseConfig = {
// apiKey: "AIzaSyALICY0zBIfHEgfyH1Cld0nlCWZlVCUN3M",
//authDomain: "faq11-c6149.firebaseapp.com",
//projectId: "faq11-c6149",
  //storageBucket: "faq11-c6149.firebasestorage.app",
  //messagingSenderId: "1084196335748",
//appId: "1:1084196335748:web:76839e7054a23d056f92d1"
//};

  const firebaseConfig = {
    apiKey: "AIzaSyDwvLnPHWBT-4Nwxps6opFMrnMM12swK3Q",
    authDomain: "faq10-39268.firebaseapp.com",
    projectId: "faq10-39268",
    storageBucket: "faq10-39268.firebasestorage.app",
    messagingSenderId: "777520723935",
    appId: "1:777520723935:web:c9841b968696158b15366a"
  };


// Initialize Firebase
// FIX: Use Firebase v9 initialization syntax.
const app = initializeApp(firebaseConfig);
// FIX: Use Firebase v9 firestore export.
export const db = getFirestore(app);
