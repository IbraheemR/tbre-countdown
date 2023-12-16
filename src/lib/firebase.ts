import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const app = initializeApp({
    apiKey: "AIzaSyAsodCfaznBGRqB0tVoBHmpypHlCr0pNHw",
    authDomain: "tbre-noticeboard.firebaseapp.com",
    projectId: "tbre-noticeboard",
    storageBucket: "tbre-noticeboard.appspot.com",
    messagingSenderId: "714687842339",
    appId: "1:714687842339:web:3231a010bb8b9c67540996"
});

export const firestore = getFirestore(app);