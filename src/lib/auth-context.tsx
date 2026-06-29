'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface User {
  email: string;
  name: string;
}

export interface Auth {
  user: User | null;
  token: string | null;
}

interface AuthContextType {
  auth: Auth;
  setAuth: (auth: Auth) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  auth: { user: null, token: null },
  setAuth: () => {},
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuthState] = useState<Auth>({ user: null, token: null });

  // 初始化：从 localStorage 恢复
  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      try {
        setAuthState(JSON.parse(stored));
      } catch {
        // 忽略解析错误
      }
    }
  }, []);

  // 变更时持久化
  const setAuth = (next: Auth) => {
    setAuthState(next);
    if (next.user) {
      localStorage.setItem('auth', JSON.stringify(next));
    } else {
      localStorage.removeItem('auth');
    }
  };

  return (
    <AuthContext.Provider
      value={{ auth: { ...auth }, setAuth, isAuthenticated: !!auth.user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
