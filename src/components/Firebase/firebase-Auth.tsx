import { useState, useEffect } from "react";
import { signInWithPopup, User } from "firebase/auth";
import { auth, provider } from "./firebase-config";

const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Sign-In Successful:", result.user);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const signOutFromGoogle = async () => {
    try {
      await auth.signOut();
      console.log("Logout Successful");
    } catch (error) {
      console.error("Sign-Out Error:", error);
    }
  };

  const checkLoggedIn = () => {
    const currentUser = auth.currentUser;
    return !!currentUser;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoggedIn(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    user,
    isLoggedIn,
    signInWithGoogle,
    signOutFromGoogle,
    checkLoggedIn,
  };
};

export default useFirebaseAuth;
