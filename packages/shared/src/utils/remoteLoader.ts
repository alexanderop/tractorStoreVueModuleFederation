import { loadRemote } from '@module-federation/runtime'
import type { AsyncComponentOptions } from 'vue'

/**
 * Loads a remote component using Module Federation
 * @param id - The remote component identifier (e.g., 'explore/Header')
 * @returns A function that returns a promise resolving to the component
 */
export function loadRemoteComponent(id: string): AsyncComponentOptions {
  return {
    loader: async () => {
      const module = await loadRemote(id) as any
      return module.default || module
    },
    timeout: 15_000,
    onError(err, retry, fail, attempts) {
      console.warn(`Failed to load remote component ${id} (attempt ${attempts}):`, err)
      if (attempts <= 2) {
        console.info(`Retrying remote component ${id} (attempt ${attempts + 1})`)
        retry()
      } else {
        console.error(`Failed to load remote component ${id} after ${attempts} attempts`)
        fail()
      }
    },
    suspensible: true
  }
}