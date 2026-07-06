import { create } from "zustand";
import type { CartItem } from "@/types";

export type { CartItem };

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  addItem: (item: Omit<CartItem, "quantity" | "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  isOpen: false,
  setOpen: (open) => set({ isOpen: open }),
  addItem: (newItem) =>
    set((state) => {
      const itemId = `${newItem.productId}-${newItem.size}-${newItem.color}`;
      const existingItemIndex = state.items.findIndex((item) => item.id === itemId);

      let updatedItems = [...state.items];
      if (existingItemIndex > -1) {
        updatedItems[existingItemIndex].quantity += 1;
      } else {
        updatedItems.push({
          ...newItem,
          id: itemId,
          quantity: 1,
        });
      }
      return { items: updatedItems, isOpen: true };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      ),
    })),
  clearCart: () => set({ items: [] }),
}));
