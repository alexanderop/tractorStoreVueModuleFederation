import { ref, onMounted, onUnmounted } from 'vue'

export interface CartItem {
  sku: string
  quantity: number
}

// Local storage key for cart persistence
const CART_STORAGE_KEY = 'tractor-store-cart'

// Load cart from localStorage
function loadCartFromStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return Array.isArray(parsed) ? parsed : []
    }
  } catch (error) {
    console.warn('Failed to load cart from localStorage:', error)
  }
  return []
}

// Save cart to localStorage
function saveCartToStorage(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.warn('Failed to save cart to localStorage:', error)
  }
}

// Global cart store
const store: CartItem[] = loadCartFromStorage()

// Initialize global event listeners once
if (!window.__CART_INITIALIZED__) {
  window.__CART_INITIALIZED__ = true

  window.addEventListener('add-to-cart', (ev: Event) => {
    const { sku } = (ev as CustomEvent).detail
    const item = store.find((m) => m.sku === sku)

    if (item) {
      item.quantity++
    } else {
      store.push({ sku, quantity: 1 })
    }

    saveCartToStorage(store)
    window.dispatchEvent(new CustomEvent('updated-cart'))
    console.log(`🛒 Added ${sku} to cart. Total items: ${store.reduce((sum, item) => sum + item.quantity, 0)}`)
  })

  window.addEventListener('remove-from-cart', (ev: Event) => {
    const { sku } = (ev as CustomEvent).detail
    const index = store.findIndex((m) => m.sku === sku)

    if (index >= 0) {
      store.splice(index, 1)
      saveCartToStorage(store)
      window.dispatchEvent(new CustomEvent('updated-cart'))
      console.log(`🛒 Removed ${sku} from cart. Total items: ${store.reduce((sum, item) => sum + item.quantity, 0)}`)
    }
  })

  window.addEventListener('clear-cart', () => {
    store.splice(0, store.length)
    saveCartToStorage(store)
    window.dispatchEvent(new CustomEvent('updated-cart'))
    console.log('🛒 Cart cleared')
  })
}

// Main cart composable with all functionality
export function useCart() {
  const items = ref<CartItem[]>([...store])
  const count = ref(store.reduce((sum, item) => sum + item.quantity, 0))

  const refresh = () => {
    items.value = [...store]
    count.value = store.reduce((sum, item) => sum + item.quantity, 0)
  }

  onMounted(() => {
    window.addEventListener('updated-cart', refresh)
    // Refresh immediately to sync with current store data
    refresh()
  })

  onUnmounted(() => {
    window.removeEventListener('updated-cart', refresh)
  })

  return {
    items,
    count
  }
}


// Global type declaration
declare global {
  interface Window {
    __CART_INITIALIZED__?: boolean
  }
}