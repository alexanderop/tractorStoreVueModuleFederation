import { defineStore, getActivePinia, setActivePinia } from 'pinia'
import type { CartItem } from '../composables/cartStore'

// Always ensure we use the global Pinia instance in module federation
function ensureGlobalPinia() {
  if (typeof window !== 'undefined' && window.__CHECKOUT_PINIA__) {
    const currentPinia = getActivePinia()
    if (currentPinia !== window.__CHECKOUT_PINIA__) {
      setActivePinia(window.__CHECKOUT_PINIA__)
      console.log('🔧 Set active Pinia to global instance')
    }
  }
}

// Call this before defining the store
ensureGlobalPinia()

interface CartState {
  items: CartItem[]
}

const cartStore = defineStore('cart', {
  state: (): CartState => ({
    items: []
  }),

  getters: {
    // Total number of items in cart
    totalItems: (state): number => 
      state.items.reduce((total, item) => total + item.quantity, 0),

    // Get all items in cart
    cartItems: (state): CartItem[] => state.items,

    // Check if cart is empty
    isEmpty: (state): boolean => state.items.length === 0,

    // Find item by SKU
    findItem: (state) => (sku: string): CartItem | undefined => 
      state.items.find(item => item.sku === sku),

    // Get item count by SKU
    getItemQuantity: (state) => (sku: string): number => {
      const item = state.items.find(item => item.sku === sku)
      return item ? item.quantity : 0
    }
  },

  actions: {
    // Add item to cart
    addItem(sku: string, quantity: number = 1) {
      const existingItem = this.findItem(sku)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({ sku, quantity })
      }
      
      // Dispatch global event for cross-microfrontend communication
      window.dispatchEvent(new CustomEvent('updated-cart', {
        detail: { items: [...this.items] }
      }))
      
      console.log(`🛒 Pinia Store: Added ${quantity}x ${sku} to cart. Total items: ${this.totalItems}`)
    },

    // Remove item from cart completely
    removeItem(sku: string) {
      const index = this.items.findIndex(item => item.sku === sku)
      
      if (index >= 0) {
        this.items.splice(index, 1)
        
        // Dispatch global event for cross-microfrontend communication
        window.dispatchEvent(new CustomEvent('updated-cart', {
          detail: { items: [...this.items] }
        }))
        
        console.log(`🛒 Pinia Store: Removed ${sku} from cart. Total items: ${this.totalItems}`)
      }
    },

    // Update item quantity
    updateQuantity(sku: string, quantity: number) {
      if (quantity <= 0) {
        this.removeItem(sku)
        return
      }

      const item = this.findItem(sku)
      if (item) {
        item.quantity = quantity
        
        // Dispatch global event for cross-microfrontend communication
        window.dispatchEvent(new CustomEvent('updated-cart', {
          detail: { items: [...this.items] }
        }))
        
        console.log(`🛒 Pinia Store: Updated ${sku} quantity to ${quantity}. Total items: ${this.totalItems}`)
      }
    },

    // Clear entire cart
    clearCart() {
      this.items = []
      
      // Dispatch global event for cross-microfrontend communication
      window.dispatchEvent(new CustomEvent('updated-cart', {
        detail: { items: [] }
      }))
      
      console.log('🛒 Pinia Store: Cart cleared')
    },

    // Set cart items (used by event bridge)
    setItems(items: CartItem[]) {
      this.items = [...items]
    }
  }
})

// Store the singleton on window to survive navigation
declare global {
  interface Window {
    __CHECKOUT_CART_STORE__?: ReturnType<typeof cartStore>
  }
}

// Export a wrapper that ensures global Pinia is used and returns singleton
export function useCartStore() {
  if (!window.__CHECKOUT_CART_STORE__) {
    ensureGlobalPinia()
    window.__CHECKOUT_CART_STORE__ = cartStore()
    console.log('🛒 Created global cart store instance')
  }
  return window.__CHECKOUT_CART_STORE__
}