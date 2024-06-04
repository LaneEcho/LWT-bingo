import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app, db } from '../../firebase/firebase-api';
import { doc, getDoc } from 'firebase/firestore';

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
  const [newUser, setNewUser] = useState<boolean>();

  useEffect(() => {
    // Set up listener that sets user on change
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  React.useEffect(() => {
    const fetchUsername = async () => {
      try {
        // For now I'm storing the username via setUser here when updating,
        // but this will break as soon as user refreshes tab

        if (!user?.uid) {
          return;
        }
        const userDocRef = doc(db, 'users', user?.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const username = userDocSnap.data().username;
          setUser({ ...user, username });
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('😢 Error fetching username:', error);
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
    // checkIfNewUser()
    setUser({ ...user, username });
  }
};
