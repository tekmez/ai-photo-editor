import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from '../firebaseConfig';

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Auth servisini oluştur
const auth = getAuth(app);

// Firestore servisini oluştur
const firestore = getFirestore(app);

// Storage servisini oluştur
const storage = getStorage(app);

// Servisleri dışa aktar
export { auth, firestore, storage, app }; 