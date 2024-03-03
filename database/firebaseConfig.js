import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebase_config = {
  apiKey: 'AIzaSyC3bkCzjnFnu1O_fPPcz0S4zTePv1Qldw4',
  authDomain: 'startek-45163.firebaseapp.com',
  projectId: 'startek-45163',
  storageBucket: 'startek-45163.appspot.com',
  messagingSenderId: '79477868011',
  appId: '1:79477868011:web:08530fddd7925b87b445ae',
  measurementId: 'G-8XFR9306M6',
};

// Initialize Firebase
export const app = initializeApp(firebase_config);
export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage();
