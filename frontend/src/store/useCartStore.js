import { create } from 'zustand';
import api from '../services/api';

export const useCartStore = create((set) => ({
  items: [],
  total: 0,
  loading: false,

  fetchCart: async () => {
    set({ loading: true });
    try {
      const res = await api.get('/cart');
      set({ items: res.data.data.items, total: res.data.data.total, loading: false });
    } catch (err) {
      console.error('Sepet çekilemedi:', err);
      set({ loading: false });
    }
  },

  addItem: async (product) => {
    set({ loading: true });
    try {
      const res = await api.post('/cart/add', { product_id: product.id, quantity: 1 });
      set({ items: res.data.data.items, total: res.data.data.total, loading: false });
    } catch (err) {
      alert(err.response?.data?.message || 'Ürün eklenemedi. Giriş yaptığınızdan emin olun.');
      set({ loading: false });
    }
  },

  removeItem: async (productId) => {
    set({ loading: true });
    try {
      const res = await api.delete(`/cart/remove/${productId}`);
      set({ items: res.data.data.items, total: res.data.data.total, loading: false });
    } catch (err) {
      console.error('Ürün silinemedi:', err);
      set({ loading: false });
    }
  },

  clearCart: async () => {
    set({ loading: true });
    try {
      await api.delete('/cart/clear');
      set({ items: [], total: 0, loading: false });
    } catch (err) {
      console.error('Sepet temizlenemedi:', err);
      set({ loading: false });
    }
  },
}));
