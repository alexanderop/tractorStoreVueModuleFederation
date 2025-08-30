import { ref, onMounted, onUnmounted } from 'vue'

export interface CartItem {
  sku: string
  quantity: number
}

// Global cart store using window object to ensure sharing across microfrontends
declare global {
  interface Window {
    tractorStoreCart?: CartItem[]
    tractorStoreCartInitialized?: boolean
  }
}

// Initialize global cart store if not already done
if (!window.tractorStoreCartInitialized) {
  window.tractorStoreCart = []
  window.tractorStoreCartInitialized = true

  // Event handlers for cart operations
  const handleAddToCart = (event: Event) => {
    const customEvent = event as CustomEvent
    const { sku } = customEvent.detail
    const cartStore = window.tractorStoreCart!
    const item = cartStore.find((m) => m.sku === sku)
    
    if (item) {
      item.quantity++
    } else {
      cartStore.push({ sku, quantity: 1 })
    }
    
    window.dispatchEvent(new CustomEvent('updated-cart'))
  }

  const handleRemoveFromCart = (event: Event) => {
    const customEvent = event as CustomEvent
    const { sku } = customEvent.detail
    const cartStore = window.tractorStoreCart!
    const index = cartStore.findIndex((m) => m.sku === sku)
    
    if (index >= 0) {
      cartStore.splice(index, 1)
      window.dispatchEvent(new CustomEvent('updated-cart'))
    }
  }

  const handleClearCart = () => {
    const cartStore = window.tractorStoreCart!
    cartStore.splice(0, cartStore.length)
    window.dispatchEvent(new CustomEvent('updated-cart'))
  }

  // Initialize global event listeners
  window.addEventListener('add-to-cart', handleAddToCart)
  window.addEventListener('remove-from-cart', handleRemoveFromCart)
  window.addEventListener('clear-cart', handleClearCart)
}

// Composable for components to use cart state
export function useCartStore() {
  const items = ref<CartItem[]>([...(window.tractorStoreCart || [])])
  
  const refresh = () => {
    items.value = [...(window.tractorStoreCart || [])]
  }
  
  onMounted(() => {
    window.addEventListener('updated-cart', refresh)
  })
  
  onUnmounted(() => {
    window.removeEventListener('updated-cart', refresh)
  })
  
  return {
    items: items
  }
}