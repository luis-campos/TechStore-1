"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  variant?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id && i.variant === item.variant)

        if (existingItem) {
          // BUG: Doesn't check stock limits when adding existing items
          set((state) => ({
            items: state.items.map((i) =>
              i.id === item.id && i.variant === item.variant
                ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                : i,
            ),
          }))
        } else {
          set((state) => ({
            items: [...state.items, { ...item, quantity: item.quantity || 1 }],
          }))
        }
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },

      updateQuantity: (id, quantity) => {
        // BUG: Allows negative quantities
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        // BUG: Calculation error - multiplies by quantity twice
        return get().items.reduce((total, item) => total + item.price * item.quantity * item.quantity, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
