import { create } from 'zustand';

interface CartState {
  cartItems: number;
  addItem: () => void;
  reset: () => void;
}

const useCartStore = create<CartState>((set) => ({
  cartItems: 0,
  addItem: () => set((state) => ({ cartItems: state.cartItems + 1 })),
  reset: () => set({ cartItems: 0 }),
}));

export default useCartStore;
