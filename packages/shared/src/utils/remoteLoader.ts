import type { AsyncComponentOptions } from 'vue'

/**
 * Loads a remote component using the host's global loader function.
 * @param id - The remote component identifier (e.g., 'explore/Header')
 * @returns An async component configuration object for Vue
 */
export function loadRemoteComponent(id: string): AsyncComponentOptions {
  return {
    loader: async () => {
      // Use the global getComponent function provided by the host app
      const getComponent = (window as any).getComponent

      if (!getComponent) {
        const errorMsg = `'window.getComponent' is not available. Ensure the host application is running and has initialized the Module Federation runtime.`
        console.error(errorMsg)
        throw new Error(errorMsg)
      }

      const componentLoader = getComponent(id)
      
      // The host's getComponent returns a function that returns the promise
      const module = await componentLoader() as any
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