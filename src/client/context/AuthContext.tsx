import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app, db, getRankByUserId } from '../../firebase/firebase-api';
import { doc, getDoc } from 'firebase/firestore';

const auth = getAuth(app);

export interface LeaderboardUser extends User {
  rank?: number;
  username?: string;
  totalScore?: number;
  linkedInURL?: string;
}

interface AuthContextType {
  user: LeaderboardUser | null;
  setUsername: (username: string) => void;
  // Improvement: we can have sign in/log in/log out fns here.
  setLinkedInURL: (linkedInURL: string) => void;
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
    const fetchUsername = async (user: LeaderboardUser, retryCount = 0) => {
      try {
        // For now I'm storing the username via setUser here when updating,
        // but this will break as soon as user refreshes tab

        if (!user?.uid) {
          return;
        }
        const userDocRef = doc(db, 'users', user?.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const username = userData.username;
          const linkedInURL = userData.linkedInURL
          setUser({ ...user, username, linkedInURL });
        } else {
          if (retryCount < 3) {
            setTimeout(() => fetchUsername(user, retryCount + 1), 5000);
          } else {
            console.error('User not found');
          }
        }
      } catch (error) {
        console.error('😢 Error fetching username:', error);
      }
    };

    fetchUsername(user);
  }, [user?.uid, db]);

  React.useEffect(() => {
    const fetchRank = async (user: LeaderboardUser, retryCount = 0) => {
      try {
        if (!user?.uid) {
          return;
        }
        const rank = await getRankByUserId(user.uid);
        setUser({
          ...user,
          rank: rank.rank,
          totalScore: rank.score.totalScore,
          username: rank.score.username,
        });
        console.error('User not found');
      } catch (error) {
        console.error('😢 Error fetching username:', error);
      }
    };

    fetchRank(user);
  }, [user?.uid, db]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUsername,
        setLinkedInURL
      }}
    >
      {children}
    </AuthContext.Provider>
  );

  function setUsername(username: string) {
    // checkIfNewUser()
    setUser({ ...user, username });
  }

  function setLinkedInURL(linkedInURL: string) {
    setUser({ ...user, linkedInURL})
  }
};
