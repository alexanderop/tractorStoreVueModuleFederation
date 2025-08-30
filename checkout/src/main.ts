// Main entry point for checkout microfrontend
// This file is only used for standalone development
// In production, components are consumed via Module Federation

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './bootstrap' // Initialize Pinia and event bridge

// Initialize cart store
console.log('Checkout microfrontend loaded')

// Create a minimal app for development
const app = createApp({
  template: '<div>Checkout Microfrontend - Components exposed via Module Federation</div>'
})

// Use global Pinia instance if available, otherwise create new one
if (window.__CHECKOUT_PINIA__) {
  app.use(window.__CHECKOUT_PINIA__)
} else {
  app.use(createPinia())
}

app.mount('#app')