import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD_5fEHUTDqxGgapY45NdGrMkfKQitwNWI',
  authDomain: 'gallery-pro-243f5.firebaseapp.com',
  projectId: 'gallery-pro-243f5',
  storageBucket: 'gallery-pro-243f5.appspot.com',
  messagingSenderId: '951550425718',
  appId: '1:951550425718:web:6b66c2e8663ce2d7f57d57',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
export { auth, storage, db };
