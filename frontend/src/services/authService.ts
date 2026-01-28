import api from './api';
import {AuthResponse, LoginData, RegisterData, User, UserUpdateData} from '../types';

export const authService = {
    async register(data: RegisterData): Promise<User> {
        const response = await api.post('/users/register', data);
        return response.data;
    },

    async login(data: LoginData): Promise<AuthResponse> {
        const response = await api.post('/users/login', data);
        if (response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
        }
        return response.data;
    },

    async updateUser(id: number, data: UserUpdateData): Promise<User> {
        const response = await api.patch(`/users/${id}`, data);
        return response.data;
    },

    async deleteUser(id: number): Promise<User> {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    },

    async getUser(id: number): Promise<User> {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },

    logout(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
    },

    getCurrentUser(): User | null {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('access_token');
    }
};