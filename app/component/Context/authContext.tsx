'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type UserRole = 'admin' | 'subadmin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  initials: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('marinemart_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (password.length < 4) {
      setIsLoading(false);
      return false;
    }

    const newUser: User = {
      id: '1',
      name: role === 'admin' ? 'Super Admin' : 'Sub Admin',
      email: email,
      role: role,
      initials: role === 'admin' ? 'SA' : 'SU',
    };

    setUser(newUser);
    localStorage.setItem('marinemart_user', JSON.stringify(newUser));
    setIsLoading(false);
    
    // Redirect based on role
    if (role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push('/subadmin/dashboard');
    }
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('marinemart_user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};