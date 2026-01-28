import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/UI/Input';
import { Button } from '../components/UI/Button';
import { User, Mail, Calendar, Save, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const ProfilePage: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        age: user.age.toString(),
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateUser({
        username: formData.username,
        email: formData.email,
        age: Number(formData.age),
      });
      setIsEditing(false);
      toast.success('Профиль обновлен!');
    } catch (error) {
      toast.error('Ошибка при обновлении профиля');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить аккаунт? Это действие необратимо.')) {
      try {
        // Здесь должен быть вызов API для удаления пользователя
        toast.success('Аккаунт удален');
        logout();
        navigate('/');
      } catch (error) {
        toast.error('Ошибка при удалении аккаунта');
      }
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Пользователь не найден</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="glass-card p-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{user.username}</h1>
                <p className="text-gray-400">ID: {user.id}</p>
              </div>
            </div>

            <Button
              variant="secondary"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Отмена' : 'Редактировать'}
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-gray-300">
                  <User className="w-4 h-4" />
                  Имя пользователя
                </label>
                {isEditing ? (
                  <Input
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    placeholder="Имя пользователя"
                  />
                ) : (
                  <div className="input-field bg-transparent border-none">
                    {user.username}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-2 text-gray-300">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Email"
                  />
                ) : (
                  <div className="input-field bg-transparent border-none">
                    {user.email}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-2 text-gray-300">
                  <Calendar className="w-4 h-4" />
                  Возраст
                </label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    placeholder="Возраст"
                  />
                ) : (
                  <div className="input-field bg-transparent border-none">
                    {user.age} лет
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <label className="text-gray-300">Дата регистрации</label>
                <div className="input-field bg-transparent border-none text-gray-400">
                  Зарегистрирован
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  loading={isLoading}
                  className="flex-1"
                >
                  <Save className="w-4 h-4" />
                  Сохранить изменения
                </Button>
              </div>
            )}
          </form>

          <div className="border-t border-white/10 pt-8">
            <h3 className="text-lg font-semibold text-white mb-4">Опасная зона</h3>
            <div className="space-y-4">
              <Button
                variant="danger"
                onClick={handleDelete}
                className="w-full md:w-auto"
              >
                <Trash2 className="w-4 h-4" />
                Удалить аккаунт
              </Button>
              <p className="text-sm text-gray-400">
                Внимание: удаление аккаунта необратимо. Все ваши данные будут удалены.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};