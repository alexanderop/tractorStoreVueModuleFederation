import { init, loadRemote } from '@module-federation/enhanced/runtime'

declare global {
  interface Window {
    getComponent: (id: string) => () => Promise<any>
  }
}

// Initialize Module Federation runtime with proper configuration
init({
  name: 'host',
  remotes: [
    {
      name: 'decide',
      entry: 'http://localhost:5175/mf-manifest.json',
      alias: 'decide',
    },
    {
      name: 'explore',
      entry: 'http://localhost:3004/mf-manifest.json',
      alias: 'explore',
    },
    {
      name: 'checkout',
      entry: 'http://localhost:3003/mf-manifest.json',
      alias: 'checkout',
    },
  ],
  plugins: [
    // Fallback plugin that provides fallback components when loading fails
    {
      name: 'fallback-plugin',
      errorLoadRemote(args: any) {
        console.warn(`Failed to load remote: ${args.id}`, args.error)

        // Return a fallback Vue component
        return {
          default: {
            template: `<div style="padding: 2rem; text-align: center; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9; margin: 1rem 0;">
              <h3 style="color: #d73027; margin-bottom: 1rem;">🔌 Remote Component Unavailable</h3>
              <p><strong>Remote:</strong> ${args.id}</p>
              <p style="color: #666;">The remote microfrontend could not be loaded.</p>
              <p style="font-size: 12px; color: #999; margin-top: 1rem;">
                Make sure the remote service is running on the correct port.
              </p>
            </div>`,
          },
        }
      },
    },
  ],
})

// Create the window.getComponent function that returns proper promises
window.getComponent = (id: string) => {
  return async () => {
    try {
      // eslint-disable-next-line no-console
      console.log(`🔄 Loading remote component: ${id}`)
      const module = await loadRemote(id)
      // eslint-disable-next-line no-console
      console.log(`✅ Successfully loaded remote component: ${id}`, module)
      return module.default || module
    }
    catch (error) {
      console.error(`❌ Failed to load remote component: ${id}`, error)
      // Re-throw the error instead of returning a fallback
      // Let defineAsyncComponent handle the error with its errorComponent
      throw error
    }
  }
}
