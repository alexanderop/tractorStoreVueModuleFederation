import { router } from './router/index'

// Navigation bridge - listens for events from remotes and uses Vue Router
window.addEventListener('mf:navigate', (e: Event) => {
  const to = (e as CustomEvent).detail?.to as string
  if (to) {
    router.push(to)
  }
})
