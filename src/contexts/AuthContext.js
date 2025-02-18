"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, login as appwriteLogin, logout as appwriteLogout, account } from '@/lib/appwrite';

const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkUser();

    // Poll for session changes every 5 seconds
    const interval = setInterval(checkUser, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const checkUser = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Error checking user session:', error);
    }
    setLoading(false);
  };

  const login = () => {
    appwriteLogin()
      .catch(error => {
        console.error('Login error:', error);
      });
  };

  const logout = async () => {
    try {
      await appwriteLogout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
} 