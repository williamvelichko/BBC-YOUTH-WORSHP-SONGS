import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
