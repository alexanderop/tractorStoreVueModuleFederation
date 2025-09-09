import { loadRemote } from '@module-federation/runtime'

/**
 * Loads a remote component using Module Federation
 * @param id - The remote component identifier (e.g., 'explore/Header')
 * @returns A function that returns a promise resolving to the component
 */
export function loadRemoteComponent(id: string) {
  return async () => {
    const module = await loadRemote(id) as any
    return module.default || module
  }
}