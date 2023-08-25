import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, provider } from "./firebase-config";

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google Sign-In Successful:", result.user);
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};

export const signOutFromGoogle = async () => {
  try {
    const user = await auth.signOut();
    console.log(user, "logout Successful");
  } catch (error) {
    console.error("Sign-Out Error:", error);
  }
};

export const checkLoggedIn = () => {
  const user = auth.currentUser;

  if (user) {
    console.log("User is logged in:", user);
    return true;
  } else {
    console.log("User is not logged in");
    return false;
  }
};
