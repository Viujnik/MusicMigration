import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {Input} from '../components/UI/Input';
import {Button} from '../components/UI/Button';
import {toast} from 'react-hot-toast';

interface RegisterPageProps {
    onSuccess?: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({onSuccess}) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        age: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const {register} = useAuth();
    useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error('Пароли не совпадают');
            return;
        }
        if (Number(formData.age) < 13) {
            toast.error('Минимальный возраст - 13 лет');
            return;
        }
        setIsLoading(true);
        try {
            await register({
                username: formData.username,
                email: formData.email,
                age: Number(formData.age),
                password: formData.password,
            });
            toast.success('Регистрация успешна!');
            if (onSuccess) onSuccess();
        } catch (error) {
            toast.error('Ошибка регистрации. Возможно, пользователь уже существует.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white">Создать аккаунт</h2>
                <p className="text-gray-400">Присоединяйтесь к MusicMigration</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Имя пользователя"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Придумайте имя пользователя"
                    required
                />

                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Введите ваш email"
                    required
                />

                <Input
                    label="Возраст"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Введите ваш возраст"
                    min="13"
                    max="120"
                    required
                />

                <Input
                    label="Пароль"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Придумайте пароль"
                    required
                />

                <Input
                    label="Подтвердите пароль"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Повторите пароль"
                    required
                />

                <Button
                    type="submit"
                    loading={isLoading}
                    className="w-full mt-6"
                >
                    Зарегистрироваться
                </Button>
            </form>
        </div>
    );
};