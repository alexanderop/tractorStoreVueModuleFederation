// Bootstrap Pinia and cart event bridge for module federation
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { initializeCartEventBridge } from './composables/cartEventBridge'

// Create global Pinia instance for module federation
declare global {
  interface Window {
    __CHECKOUT_PINIA__?: any
  }
}

// Initialize Pinia globally if not already done
if (!window.__CHECKOUT_PINIA__) {
  console.log('🚀 Initializing Pinia for checkout microfrontend...')
  
  // Create a minimal Vue app to initialize Pinia
  const pinia = createPinia()
  const app = createApp({})
  app.use(pinia)
  
  // Store Pinia instance globally for module federation
  window.__CHECKOUT_PINIA__ = pinia
  
  // Initialize the event bridge
  initializeCartEventBridge()
  
  console.log('🚀 Checkout microfrontend bootstrap completed')
}
