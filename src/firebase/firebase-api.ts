import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, serverTimestamp, FieldValue, query, orderBy, limit, getDocs, DocumentData, QueryDocumentSnapshot, onSnapshot, setDoc, doc } from 'firebase/firestore';
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

/**
 * 
 * @param userId 
 * @param score 
 */
export const submitScore = async (userId: string, score: number) => {
  const gameId = "bingo";
  console.log('Submitting...', userId, gameId, score);

  const scoreData: ScoreData = {
    userId,
    gameId,
    score,
    timestamp: serverTimestamp() // Use Firestore server timestamp
  };

  try {
    const docRef = await addDoc(collection(db, "scores"), scoreData);
    console.log(`Score submitted! Document ID: ${docRef.id}, Game ID: ${gameId}, Score: ${score}, User ID: ${userId}`);
  } catch (error) {
    console.error('Error submitting score:', error);
    throw new Error('Failed to submit score');
  }
};

export const updateUser = async (userId: string, username: string, isOptedIn?: boolean) => {
  const userRef = doc(db, "users", userId);

  try {
    const isFirstTimeUser = false;
    await setDoc(userRef, { username, isOptedIn, isFirstTimeUser }, { merge: true });
    console.log("Username and iOptedIn saved!");
  } catch (error) {
    console.error("Error saving username:", error);
  }
}

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
  const scoresRef = collection(db, "leaderboards", "bingo", "userScores");
  const q = query(scoresRef, orderBy("totalScore", "desc"), limit(10));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const scores: any[] = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => (
      {
        id: doc.id,
        totalScore: doc.data().totalScore as number,
        username: doc.data().username
      }
    ));
    onScoresUpdate(scores);
  }, (error: Error) => {
    console.error("Error subscribing to top scores:", error);
    onError(new Error('Failed to subscribe to top scores'));
  });

  return unsubscribe;
};

export { db, app };
