import React, { createContext, useEffect, useState, ReactNode } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { app, db } from "../../firebase/firebase-api";
import { collection, getDocs, query } from "firebase/firestore";

const auth = getAuth(app);

export interface LeaderboardUser extends User {
  // TODO: Grab the rank to show active state in leaderbaord
  // We can do this for v2..
  rank?: number;
  username?: string;
}

interface AuthContextType {
  user: LeaderboardUser | null;
  setUsername: (username: string) => void;
  // Improvement: we can have sign in/log in/log out fns here.
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<LeaderboardUser | null>(null);

  useEffect(() => {
    // Set up listener that sets user on change
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  React.useEffect(() => {
    const fetchUsername = async () => {
      try {
        // TODO: getting insufficient permissions!
        // For now I'm storing the username via setUser here when updating,
        // but this will break as soon as user refreshes tab
        const collectionRef = collection(db, "users", user?.uid, "username");
        const q = query(collectionRef);
        const querySnapshot = await getDocs(q);

        let username = "";
        querySnapshot.forEach((doc) => {
          // Assuming there's only one document and it contains the username
          username = doc.data().username;
        });
        console.log("🚀 ~ querySnapshot.forEach ~ username:", username);

        setUser({ ...user, username });
      } catch (error) {
        console.error("😢 Error fetching username:", error);
      }
    };

    fetchUsername();
  }, [user?.uid, db]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

  function setUsername(username: string) {
    setUser({ ...user, username });
  }
};
