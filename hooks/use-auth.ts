import { useState, useEffect } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { authStorage } from '../lib/auth-storage';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // İlk yüklemede storage'dan kullanıcı bilgisini al
    authStorage.getUser().then(storedUser => {
      if (storedUser) {
        setUser(storedUser as User);
      }
      setLoading(false);
    });

    // Auth state değişikliklerini dinle
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Storage'ı güncelle
      await authStorage.saveUser(firebaseUser);
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await authStorage.saveUser(userCredential.user);
      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await authStorage.saveUser(userCredential.user);
      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const signOut = async () => {
    await auth.signOut();
    await authStorage.removeUser();
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };
} 