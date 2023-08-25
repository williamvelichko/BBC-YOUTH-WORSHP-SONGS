import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5ZtPpf7Tk-DXdpgAkgJA6Hxhtf1sBAOI",
  authDomain: "bbc-worship.firebaseapp.com",
  projectId: "bbc-worship",
  storageBucket: "bbc-worship.appspot.com",
  messagingSenderId: "752925683870",
  appId: "1:752925683870:web:03253d3b1ec84997118b8f",
  measurementId: "G-FFG47N1F0V",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
