// Simplified bootstrap - just initialize cart store
import { initializeCartEventBridge } from './composables/cartEventBridge'
// Import cart store to initialize it
import './stores/cartStore'

// Initialize the event bridge (backward compatibility)
initializeCartEventBridge()

console.log('🚀 Checkout microfrontend bootstrap completed (simplified)')