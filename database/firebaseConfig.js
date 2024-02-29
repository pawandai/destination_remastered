import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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
const app = initializeApp(firebase_config);
export const auth = getAuth(app);
