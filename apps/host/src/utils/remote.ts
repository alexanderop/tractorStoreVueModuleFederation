import { defineAsyncComponent, h } from 'vue'

/** Wrap window.getComponent(id) into an async component with nice fallbacks */
export function remote(id: string, delay = 150) {
  return defineAsyncComponent({
    loader: async () => {
      const loader = (window as any).getComponent?.(id)
      if (!loader)
        throw new Error(`Remote loader missing for ${id}`)
      return await loader() // returns the SFC
    },
    delay,
    loadingComponent: { render: () => h('div', { class: 'mf-loading' }, 'Loading…') },
    errorComponent: { render: () => h('div', { class: 'mf-error' }, 'Failed to load.') },
    onError(retry, fail, err) {
      // simple auto-retry once
      console.warn('Remote load error:', err)
      setTimeout(retry, 200)
    },
  })
}
