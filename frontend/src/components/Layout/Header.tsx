import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music, User, LogOut, Menu, X, Upload } from 'lucide-react';
import { Button } from '../UI/Button';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

export const Header: React.FC = () => {
  const { user, logout, openAuthModal } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Вы успешно вышли из системы');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-white/10 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 gradient-bg rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Music className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text tracking-tight">MusicMigration</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105 px-3 py-2 rounded-lg hover:bg-white/5">Главная</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105 px-3 py-2 rounded-lg hover:bg-white/5">
                  <div className="flex items-center gap-2"><Upload className="w-4 h-4" /><span>Панель</span></div>
                </Link>
                <div className="flex items-center gap-4">
                  <Link to="/profile" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-white/5">
                    <User className="w-4 h-4" /><span className="font-medium">{user.username}</span>
                  </Link>
                  <Button variant="secondary" onClick={handleLogout} className="px-4 py-2">
                    <LogOut className="w-4 h-4" />Выйти
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Button onClick={() => openAuthModal('login')} variant="secondary" className="px-5">Войти</Button>
                <Button onClick={() => openAuthModal('register')} className="px-5">Регистрация</Button>
              </div>
            )}
          </nav>

          <button className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-white/10 pt-3 animate-fade-in">
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-gray-300 hover:text-white py-3 px-4 rounded-lg hover:bg-white/5 transition-colors" onClick={() => setIsMenuOpen(false)}>Главная</Link>
              {user ? (
                <>
                  <Link to="/dashboard" className="text-gray-300 hover:text-white py-3 px-4 rounded-lg hover:bg-white/5 transition-colors" onClick={() => setIsMenuOpen(false)}>Панель управления</Link>
                  <Link to="/profile" className="text-gray-300 hover:text-white py-3 px-4 rounded-lg hover:bg-white/5 transition-colors" onClick={() => setIsMenuOpen(false)}>Профиль</Link>
                  <Button variant="danger" onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="mt-2"><LogOut className="w-4 h-4" />Выйти</Button>
                </>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  <Button onClick={() => { openAuthModal('login'); setIsMenuOpen(false); }} variant="secondary" className="w-full">Войти</Button>
                  <Button onClick={() => { openAuthModal('register'); setIsMenuOpen(false); }} className="w-full">Регистрация</Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};