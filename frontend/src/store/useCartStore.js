import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],
  total: 0,
  addItem: (product) => set((state) => {
    const existing = state.items.find(i => i.product_id === product.id);
    if (existing) {
      const updatedItems = state.items.map(i => 
        i.product_id === product.id ? { ...i, quantity: i.quantity + 1, subtotal: (i.quantity + 1) * i.unit_price } : i
      );
      return { items: updatedItems, total: updatedItems.reduce((acc, curr) => acc + curr.subtotal, 0) };
    }
    const newItems = [...state.items, { product_id: product.id, name: product.name, unit_price: product.price, quantity: 1, subtotal: product.price, image_url: product.image_url }];
    return { items: newItems, total: newItems.reduce((acc, curr) => acc + curr.subtotal, 0) };
  }),
  removeItem: (productId) => set((state) => {
    const newItems = state.items.filter(i => i.product_id !== productId);
    return { items: newItems, total: newItems.reduce((acc, curr) => acc + curr.subtotal, 0) };
  }),
  clearCart: () => set({ items: [], total: 0 }),
}));
