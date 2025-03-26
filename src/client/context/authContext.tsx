import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app, db, subscribeToUserRank } from '../../firebase/firebase-api';
import { doc, getDoc } from 'firebase/firestore';

const auth = getAuth(app);

export interface LeaderboardUser extends User {
  rank?: number;
  username?: string;
  totalScore?: number;
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
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const leaderboardUser: LeaderboardUser = { ...authUser };
        setUser(leaderboardUser);
        fetchUsername(leaderboardUser);
        subscribeToRank(leaderboardUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const subscribeToRank = (user: LeaderboardUser) => {
    if (!user?.uid) {
      return;
    }

    const unsubscribe = subscribeToUserRank(
      user.uid,
      (rank, score) => {
        setUser({
          ...user,
          rank: rank,
          totalScore: score.totalScore,
          username: score.username,
        });
      },
      (error) => {
        console.error('😢 Error fetching user data:', error);
      }
    );

    // Cleanup function to unsubscribe when the component unmounts or user changes
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  };

  const fetchUsername = async (user: LeaderboardUser, retryCount = 0) => {
    try {
      if (!user?.uid) {
        return;
      }
      const userDocRef = doc(db, 'users', user?.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const username = userDocSnap.data().username;
        setUser({ ...user, username });
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
