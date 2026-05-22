'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { UserProfile } from './types';
import { apiCall, setAuthToken, getAuthToken, clearAuthToken } from './api-client';

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load auth on mount
  useEffect(() => {
    const storedToken = getAuthToken();
    if (storedToken) {
      setToken(storedToken);
      // TODO: Verify token and fetch user profile
      // const response = await apiCall('/api/auth/me', { token: storedToken });
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (response.success && response.data) {
        setToken(response.data.token);
        setUser(response.data.user);
        setAuthToken(response.data.token);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur de connexion';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response.success && response.data) {
        setToken(response.data.token);
        setUser(response.data.user);
        setAuthToken(response.data.token);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur d\'inscription';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    clearAuthToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        isAuthenticated: !!token && !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
