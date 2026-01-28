import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Music2 } from 'lucide-react';

export const HomePage: React.FC = () => {
  const {user} = useAuth();
  if (!user) {
    return (
        <div className="min-h-[70vh] flex items-center justify-center pt-12 md:pt-16">
          <div className="text-center space-y-8 max-w-2xl mx-auto px-4">
            <div className="space-y-4">
              <div className="inline-block p-4 bg-gradient-to-br from-primary-500/20 to-cyan-500/20 rounded-2xl">
                <Music2 className="w-16 h-16 text-primary-400"/>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Добро пожаловать в <span className="gradient-text">MusicMigration</span>
              </h1>
              <p className="text-xl text-gray-300">
                Мигрируйте ваши плейлисты между музыкальными сервисами
              </p>
            </div>

            <div className="glass-card p-8 space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">🔒 Требуется авторизация</h2>
                <p className="text-gray-300">
                  Для использования сервиса необходимо войти в систему или зарегистрироваться
                </p>
                <p className="text-sm text-gray-400">
                  Используйте кнопки в правом верхнем углу
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-primary-400">🎵</span>
                </div>
                <h3 className="font-semibold text-white">Загрузите список треков</h3>
                <p className="text-gray-400 text-sm">Поддерживаются .txt файлы с названиями треков</p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-cyan-400">⚡</span>
                </div>
                <h3 className="font-semibold text-white">Автоматический поиск</h3>
                <p className="text-gray-400 text-sm">Система найдёт треки в Яндекс.Музыке</p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-purple-400">❤️</span>
                </div>
                <h3 className="font-semibold text-white">Добавление в избранное</h3>
                <p className="text-gray-400 text-sm">Найденные треки автоматически добавляются в "Мне нравится"</p>
              </div>
            </div>
          </div>
        </div>
    );
  }
}