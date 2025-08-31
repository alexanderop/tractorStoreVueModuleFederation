// Main entry point for checkout microfrontend
// This file is only used for standalone development
// In production, components are consumed via Module Federation

import { createApp } from 'vue'
import './bootstrap' // Initialize cart store and event bridge

// Initialize cart store
console.log('Checkout microfrontend loaded')

// Create a minimal app for development
const app = createApp({
  template: '<div>Checkout Microfrontend - Components exposed via Module Federation</div>'
})

app.mount('#app')