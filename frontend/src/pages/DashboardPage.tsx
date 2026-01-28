import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Music, Upload, History, Settings } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { Link } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Загружено файлов', value: '0', icon: Upload, color: 'from-blue-500 to-cyan-500' },
    { label: 'Добавлено треков', value: '0', icon: Music, color: 'from-purple-500 to-pink-500' },
    { label: 'Успешных операций', value: '0', icon: History, color: 'from-green-500 to-emerald-500' },
  ];

  const quickActions = [
    { title: 'Загрузить файл', description: 'Начать новую миграцию', icon: Upload, to: '/' },
    { title: 'История операций', description: 'Просмотреть историю', icon: History, to: '/history' },
    { title: 'Настройки', description: 'Настройки аккаунта', icon: Settings, to: '/profile' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Панель управления</h1>
            <p className="text-gray-400">Добро пожаловать, {user?.username}!</p>
          </div>
          <Link to="/">
            <Button className="px-6">
              <Upload className="w-4 h-4" />
              Новая загрузка
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Быстрые действия</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.to}
                className="group p-4 border border-white/10 rounded-xl hover:border-primary-500/50 transition-all duration-300 hover:bg-white/5"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-lg group-hover:bg-primary-500/20 transition-colors">
                    <action.icon className="w-5 h-5 text-gray-300 group-hover:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-400">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-white mb-4">📊 Активность</h2>
            <div className="space-y-4">
              <p className="text-gray-400 text-center py-8">
                История операций появится здесь после загрузки файлов
              </p>
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold text-white mb-4">ℹ️ Информация</h2>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl">
                <h3 className="font-semibold text-white mb-2">Текущий статус</h3>
                <p className="text-gray-300">Система работает в обычном режиме</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <h3 className="font-semibold text-white mb-2">API Яндекс.Музыки</h3>
                <p className="text-gray-300">Соединение установлено</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl">
                <h3 className="font-semibold text-white mb-2">Последнее обновление</h3>
                <p className="text-gray-300">Система обновлена сегодня</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};