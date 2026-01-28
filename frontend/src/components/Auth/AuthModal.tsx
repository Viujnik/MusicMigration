import React, { useState } from 'react';
import { X } from 'lucide-react';
import { LoginPage } from '../../pages/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login'
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={handleOverlayClick}>
      <div className="glass-panel w-full max-w-md relative animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
          <X className="w-5 h-5" />
        </button>
        <div className="p-6">
          <div className="flex mb-6 border-b border-white/10">
            <button className={`flex-1 py-3 font-semibold transition-colors ${mode === 'login' ? 'text-white border-b-2 border-primary-500' : 'text-gray-400 hover:text-gray-300'}`} onClick={() => setMode('login')}>Вход</button>
            <button className={`flex-1 py-3 font-semibold transition-colors ${mode === 'register' ? 'text-white border-b-2 border-primary-500' : 'text-gray-400 hover:text-gray-300'}`} onClick={() => setMode('register')}>Регистрация</button>
          </div>
          {mode === 'login' ? <LoginPage onSuccess={onClose} /> : <RegisterPage onSuccess={onClose} />}
        </div>
      </div>
    </div>
  );
};