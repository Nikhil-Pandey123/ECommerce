
import { create } from 'zustand';

interface WishlistItem {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface WishlistState {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>(set => ({
  wishlist: [],

  addToWishlist: item =>
    set(state => {
      const exists = state.wishlist.find(i => i.id === item.id);
      if (exists) return state; 
      return { wishlist: [...state.wishlist, item] };
    }),

  removeFromWishlist: id =>
    set(state => ({
      wishlist: state.wishlist.filter(item => item.id !== id),
    })),

    clearWishlist:()=> set(() => ({ wishlist: [] })),

}));
