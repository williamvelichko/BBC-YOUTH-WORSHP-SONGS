import { useState, useEffect } from "react";
import { signInWithPopup, User } from "firebase/auth";
import { auth, provider } from "./firebase-config";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase-config";

const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

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
    (async () => {
      setIsLoading(true);
      if (user) {
        setIsLoggedIn(true);

        try {
          const dbUserRef = doc(collection(db, "users"), user.uid);
          const dbUserSnap = await getDoc(dbUserRef);

          if (dbUserSnap.exists() && dbUserSnap.data().enabled) {
            setIsAdmin(true);
          }
        } catch (message) {
          setIsAdmin(false);
        }
      } else {
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
      setIsLoading(false);
    })();
  }, [user]);

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
    isLoading,
    isAdmin,
    signInWithGoogle,
    signOutFromGoogle,
    checkLoggedIn,
  };
};

export default useFirebaseAuth;
