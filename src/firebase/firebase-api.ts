import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  FieldValue,
  query,
  orderBy,
  limit,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
  onSnapshot,
  setDoc,
  doc,
} from 'firebase/firestore';
import { firebaseConfig } from './firebase-config';

interface ScoreData {
  userId: string;
  gameId: string;
  score: number;
  timestamp: FieldValue;
}

interface Score {
  id: string;
  totalScore: number;
  // TODO: Update username when user updates.
  username?: string;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('Firebase initialized');

// Initialize Firestore
const db = getFirestore(app);
const analytics = getAnalytics(app);

/**
 *
 * @param userId
 * @param score
 */
export const submitScore = async (userId: string, score: number) => {
  const gameId = 'bingo';
  console.log('Submitting...', userId, gameId, score);

  const scoreData: ScoreData = {
    userId,
    gameId,
    score,
    timestamp: serverTimestamp(), // Use Firestore server timestamp
  };

  try {
    const docRef = await addDoc(collection(db, 'scores'), scoreData);
    console.log(
      `Score submitted! Document ID: ${docRef.id}, Game ID: ${gameId}, Score: ${score}, User ID: ${userId}`
    );
  } catch (error) {
    console.error('Error submitting score:', error);
    throw new Error('Failed to submit score');
  }
};

export const updateUser = async (
  userId: string,
  username: string,
  isOptedIn?: boolean
) => {
  const userRef = doc(db, 'users', userId);

  try {
    const isFirstTimeUser = false;
    await setDoc(
      userRef,
      { username, isOptedIn, isFirstTimeUser },
      { merge: true }
    );
    console.log('Username and iOptedIn saved!');
  } catch (error) {
    console.error('Error saving username:', error);
  }
};

/**
 * Subscribes to the top 10 scores from the leaderboard in descending order.
 * @param onScoresUpdate Callback function to handle updates to the scores.
 * @param onError Callback function to handle errors.
 * @returns A function to unsubscribe from the updates.
 */
export const subscribeToTopScores = (
  onScoresUpdate: (scores: Score[]) => void,
  onError: (error: Error) => void
): (() => void) => {
  const scoresRef = collection(db, 'leaderboards', 'bingo', 'userScores');
  const q = query(scoresRef, orderBy('totalScore', 'desc'), limit(10));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const scores: any[] = snapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => ({
          id: doc.id,
          totalScore: doc.data().totalScore as number,
          username: doc.data().username,
        })
      );
      onScoresUpdate(scores);
    },
    (error: Error) => {
      console.error('Error subscribing to top scores:', error);
      onError(new Error('Failed to subscribe to top scores'));
    }
  );

  return unsubscribe;
};

/**
 * Given the userId, returns the rank of the user from totalScore collection, if found.
 * Otherwise return -1 for a rank and undefined score.
 * 
 * @param userId 
 * @returns rank of user, and totalScore collection corresponding to userId
 */
export const getRankByUserId = async (userId: string) => {
  const scoresRef = collection(db, 'leaderboards', 'bingo', 'userScores');

  // Create a query to order by totalScore in descending order
  const q = query(scoresRef, orderBy('totalScore', 'desc'));

  // Execute the query
  const querySnapshot = await getDocs(q);

  let rank = 1;
  let userRank = -1; // Initialize with a value indicating the user was not found
  let userScore: Score = {
    id: undefined,
    totalScore: undefined,
    username: undefined
  };

  // Iterate through the results to find the user's rank
  querySnapshot.forEach((doc) => {
    if (doc.id === userId) {
      userRank = rank;
      userScore = doc.data() as Score; // Figure out how to type responses better!
    }
    rank++;
  });

  // Return the user's rank if found, otherwise return -1 or any other value indicating not found
  return { rank: userRank, score: userScore };
};

export { db, app, analytics };
