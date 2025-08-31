import { router } from './router/index'

// Navigation bridge - listens for events from remotes and uses Vue Router
// Initialize global event listener once to prevent duplicates on module reload
if (!window.__MF_NAVIGATE_INITIALIZED__) {
  window.__MF_NAVIGATE_INITIALIZED__ = true
  
  window.addEventListener('mf:navigate', (e: Event) => {
    const to = (e as CustomEvent).detail?.to as string
    if (to) {
      router.push(to)
    }
  })
}

// Global type declaration
declare global {
  interface Window {
    __MF_NAVIGATE_INITIALIZED__?: boolean
  }
}
