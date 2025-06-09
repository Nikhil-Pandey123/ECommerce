import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  quantity?: number;
}

interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCartCount: () => number;
  updateQuantity: (id: string, quantity: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const cart = get().cart;
        const existing = cart.find(item => item.id === product.id);

        if (existing) {
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: (item.quantity || 1) + 1 }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
      },

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ cart: [] }),

      getCartCount: () => get().cart.reduce((acc, item) => acc + (item.quantity || 1), 0),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })),
    }),
    {
      name: 'airflex-cart', // key in localStorage
    }
  )
);
