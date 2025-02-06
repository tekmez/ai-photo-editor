import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = '@auth_store';

export const authStorage = {
  async saveUser(user: any) {
    try {
      const userData = user ? {
        uid: user.uid,
        email: user.email,
      } : null;

      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Auth verisi kaydedilemedi:', error);
    }
  },

  async getUser() {
    try {
      const userStr = await AsyncStorage.getItem(AUTH_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Auth verisi okunamadı:', error);
      return null;
    }
  },

  async removeUser() {
    try {
      await AsyncStorage.removeItem(AUTH_KEY);
    } catch (error) {
      console.error('Auth verisi silinemedi:', error);
    }
  }
}; 