import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { firebaseKeys } from '../google/firebaseKeys';

const firebase_config = {
  // use your custom keys here
  ...firebaseKeys
};

// Initialize Firebase
export const app = initializeApp(firebase_config);
export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage();
