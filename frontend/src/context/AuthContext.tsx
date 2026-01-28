import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginData, RegisterData, UserUpdateData } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openAuthModal: (mode: 'login' | 'register') => void;
  closeAuthModal: () => void;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (data: UserUpdateData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = authService.getCurrentUser();
      if (storedUser && authService.isAuthenticated()) {
        try {
          setUser(storedUser);
        } catch (error) {
          authService.logout();
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (data: LoginData) => {
    try {
      const response = await authService.login(data);
      if (response.access_token) {
        const decoded = decodeJwt(response.access_token);
        const userId = parseInt(decoded.sub);
        const user = await authService.getUser(userId);
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        closeAuthModal();
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const newUser = await authService.register(data);
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      closeAuthModal();
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUser = async (data: UserUpdateData) => {
    if (!user) throw new Error('Пользователь не авторизован');
    const updatedUser = await authService.updateUser(user.id, data);
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const decodeJwt = (token: string): { sub: string } => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthModalOpen, authModalMode, openAuthModal, closeAuthModal, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};