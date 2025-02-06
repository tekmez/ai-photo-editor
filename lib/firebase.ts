import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from '../firebaseConfig';

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Auth servisini oluştur - AsyncStorage persistence ile
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Firestore servisini oluştur
const firestore = getFirestore(app);

// Storage servisini oluştur
const storage = getStorage(app);

// Servisleri dışa aktar
export { auth, firestore, storage, app }; 