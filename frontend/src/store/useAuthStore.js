import { create } from 'zustand';
import api from '../services/api';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post('/users/login', { email, password });
      const { user, tokens } = res.data.data;
      
      localStorage.setItem('token', tokens.accessToken);
      set({ user, token: tokens.accessToken, loading: false });
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || 'Giriş yapılamadı', loading: false });
      return false;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  }
}));
