import { useCartStore } from '../stores/cart'

/**
 * Event bridge that connects global custom events with Pinia cart store
 * This maintains backward compatibility while providing better state management
 */
export function initializeCartEventBridge() {
  // Get the cart store instance
  const cartStore = useCartStore()

  // Flag to prevent initialization multiple times
  if ((window as any).cartEventBridgeInitialized) {
    console.log('🌉 Cart event bridge already initialized')
    return
  }

  console.log('🌉 Initializing cart event bridge...')

  // Event handler for adding items to cart
  const handleAddToCart = (event: Event) => {
    const customEvent = event as CustomEvent
    const { sku, quantity = 1 } = customEvent.detail
    
    console.log(`🌉 Event Bridge: Received add-to-cart for ${sku}`)
    cartStore.addItem(sku, quantity)
  }

  // Event handler for removing items from cart
  const handleRemoveFromCart = (event: Event) => {
    const customEvent = event as CustomEvent
    const { sku } = customEvent.detail
    
    console.log(`🌉 Event Bridge: Received remove-from-cart for ${sku}`)
    cartStore.removeItem(sku)
  }

  // Event handler for clearing the cart
  const handleClearCart = () => {
    console.log('🌉 Event Bridge: Received clear-cart')
    cartStore.clearCart()
  }

  // Event handler for updating cart quantity
  const handleUpdateQuantity = (event: Event) => {
    const customEvent = event as CustomEvent
    const { sku, quantity } = customEvent.detail
    
    console.log(`🌉 Event Bridge: Received update-quantity for ${sku}: ${quantity}`)
    cartStore.updateQuantity(sku, quantity)
  }

  // Register global event listeners
  window.addEventListener('add-to-cart', handleAddToCart)
  window.addEventListener('remove-from-cart', handleRemoveFromCart)
  window.addEventListener('clear-cart', handleClearCart)
  window.addEventListener('update-cart-quantity', handleUpdateQuantity)

  // Mark as initialized
  ;(window as any).cartEventBridgeInitialized = true
  
  console.log('🌉 Cart event bridge initialized successfully')

  // Return cleanup function (useful for testing or hot reloading)
  return () => {
    window.removeEventListener('add-to-cart', handleAddToCart)
    window.removeEventListener('remove-from-cart', handleRemoveFromCart)
    window.removeEventListener('clear-cart', handleClearCart)
    window.removeEventListener('update-cart-quantity', handleUpdateQuantity)
    ;(window as any).cartEventBridgeInitialized = false
    console.log('🌉 Cart event bridge cleaned up')
  }
}

/**
 * Utility function to get the cart store instance
 * This can be used by components that need direct access to the store
 */
export function getCartStore() {
  return useCartStore()
}