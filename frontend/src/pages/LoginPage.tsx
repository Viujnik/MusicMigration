import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {Input} from '../components/UI/Input';
import {Button} from '../components/UI/Button';
import {toast} from 'react-hot-toast';

interface LoginPageProps {
    onSuccess?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({onSuccess}) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const {login} = useAuth();
    useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(formData);
            toast.success('Успешный вход!');
            if (onSuccess) onSuccess();
        } catch (error) {
            toast.error('Ошибка входа. Проверьте данные.');
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
                <h2 className="text-2xl font-bold text-white">С возвращением!</h2>
                <p className="text-gray-400">Войдите в свой аккаунт</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Имя пользователя"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Введите имя пользователя"
                    required
                />

                <Input
                    label="Пароль"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Введите пароль"
                    required
                />

                <Button
                    type="submit"
                    loading={isLoading}
                    className="w-full mt-6"
                >
                    Войти
                </Button>
            </form>
        </div>
    );
};