import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, DEMO_USERS } from '@/data/demo-data';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => boolean;
  logout: () => void;
  loginAsStudent: () => void;
  loginAsAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string) => {
    const found = DEMO_USERS.find(u => u.email === email);
    if (found) {
      setUser(found);
      return true;
    }
    // Create guest-turned-student
    const newUser: User = {
      id: 'user_new_' + Date.now(),
      name: email.split('@')[0],
      email,
      role: 'student',
      created_at: new Date().toISOString(),
    };
    setUser(newUser);
    return true;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const loginAsStudent = useCallback(() => {
    setUser(DEMO_USERS.find(u => u.role === 'student')!);
  }, []);

  const loginAsAdmin = useCallback(() => {
    setUser(DEMO_USERS.find(u => u.role === 'admin')!);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loginAsStudent, loginAsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
