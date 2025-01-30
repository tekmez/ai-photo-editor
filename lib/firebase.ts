import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfig';

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Auth servisini oluştur
const auth = getAuth(app);

// Firestore servisini oluştur
const firestore = getFirestore(app);

// Servisleri dışa aktar
export { auth, firestore, app }; 