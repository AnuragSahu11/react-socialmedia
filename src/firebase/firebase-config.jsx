import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,

  authDomain: "tradepeer-33c0f.firebaseapp.com",

  projectId: "tradepeer-33c0f",

  storageBucket: "tradepeer-33c0f.appspot.com",

  messagingSenderId: "521221497018",

  appId: "1:521221497018:web:6deeedc92c0810e8146283",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { app, auth, db };
