import { onMounted, onUnmounted, ref } from 'vue'

function modifyHistory(type: 'pushState' | 'replaceState') {
  const orig = history[type]
  return function (this: History, ...args: any[]) {
    const rv = orig.apply(this, args as any)
    const ev = new Event(type.toLowerCase())
    window.dispatchEvent(ev)
    return rv
  }
}

function navigate(route: string, state?: any) {
  history.pushState(state, '', route)
}

function scrollToTop() {
  window.scrollTo(0, 0)
}

function onClick(e: MouseEvent) {
  const target = e.target as Element | null
  const link = target instanceof Element ? target.closest('a') : null

  if (
    link
    && link instanceof HTMLAnchorElement
    && link.href
    && (!link.target || link.target === '_self')
    && link.origin === location.origin
    && !link.hasAttribute('download')
    && e.button === 0
    && !e.metaKey
    && !e.ctrlKey
    && !e.altKey
    && !e.shiftKey
    && !e.defaultPrevented
  ) {
    e.preventDefault()
    navigate(link.pathname, {})
  }
}

history.pushState = modifyHistory('pushState') as any
history.replaceState = modifyHistory('replaceState') as any

export function useHistory() {
  const url = ref(location.pathname)

  onMounted(() => {
    function onHistory() {
      scrollToTop()
      url.value = location.pathname
    }
    window.addEventListener('popstate', onHistory)
    window.addEventListener('pushstate', onHistory)
    window.addEventListener('replacestate', onHistory)
    document.addEventListener('click', onClick)
  })

  onUnmounted(() => {
    window.removeEventListener('popstate', () => {})
    window.removeEventListener('pushstate', () => {})
    window.removeEventListener('replacestate', () => {})
    document.removeEventListener('click', onClick)
  })

  return url
}
